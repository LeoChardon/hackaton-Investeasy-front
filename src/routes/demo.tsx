import { createFileRoute } from '@tanstack/react-router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import Agents from '@/components/dashboard/Agents'
import AgentTimeline, { TimelineStatusMap } from '@/components/dashboard/AgentTimeline'
import MarketSection from '@/components/dashboard/MarketSection'
import Score from '@/components/dashboard/Score'
import Profitability from '@/components/dashboard/Profitability'
import CompetitorsSection from '@/components/dashboard/Competitors'
import Positioning from '@/components/dashboard/Positioning'
import Similars from '@/components/dashboard/Similars'
import BaseInput from '@/components/dashboard/BaseInput'
import type {
  AnalyzeResponse,
  Competitor as CompetitorType,
  CoreAnalysisResponse,
  ScoreComputationRequest,
  ScoreComputationResponse,
  SimilarItem,
} from '@/lib/type'
import { TARGET_INSIGHTS, fallbackSummary } from '@/lib/type'

const env = import.meta.env as Record<string, string | undefined>
const rawBackendUrl =
  env.PUBLIC_BACK_URL ??
  env.VITE_PUBLIC_BACK_URL ??
  (typeof process !== 'undefined'
    ? process.env?.PUBLIC_BACK_URL ?? process.env?.VITE_PUBLIC_BACK_URL
    : undefined)

const backendUrl = rawBackendUrl?.replace(/^['"]|['"]$/g, '').trim().replace(/\/$/, '')
const GOOGLE_SLIDES_ICON = 'https://www.google.com/s2/favicons?sz=64&domain=docs.google.com'
const createInitialTimelineStatus = (): TimelineStatusMap => ({
  idea: 'idle',
  market: 'idle',
  score: 'idle',
  competitor: 'idle',
  similar: 'idle',
})

export const Route = createFileRoute('/demo')({
  validateSearch: (search: Record<string, unknown>) => ({
    input: typeof search.input === 'string' ? search.input : '',
  }),
  component: DemoPage,
})


function DemoPage() {
  const { input } = Route.useSearch()
  const [ideaDraft, setIdeaDraft] = useState(input)
  const [activeIdea, setActiveIdea] = useState(input.trim())
  const [reloadKey, setReloadKey] = useState(0)
  const [coreAnalysis, setCoreAnalysis] = useState<CoreAnalysisResponse | null>(null)
  const [scoreDetails, setScoreDetails] = useState<ScoreComputationResponse | null>(null)
  const [competitorList, setCompetitorList] = useState<CompetitorType[] | null>(null)
  const [similarList, setSimilarList] = useState<SimilarItem[] | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [exportingPdf, setExportingPdf] = useState(false)
  const [exportingSlides, setExportingSlides] = useState(false)
  const [displayedSummary, setDisplayedSummary] = useState('')
  const [timelineStatus, setTimelineStatus] = useState<TimelineStatusMap>(() => createInitialTimelineStatus())
  const typewriterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rawSummary = coreAnalysis?.summary?.trim() ?? ''
  const summaryText = rawSummary || fallbackSummary
  const shouldAnimateSummary = Boolean(rawSummary)
  const summaryOutput = shouldAnimateSummary ? displayedSummary : summaryText
  const isTypingSummary =
    shouldAnimateSummary && !analysisLoading && displayedSummary.length > 0 && displayedSummary.length < rawSummary.length
  const isRefreshDisabled = !ideaDraft.trim() || analysisLoading
  const canExportAnalysis = Boolean(coreAnalysis && scoreDetails && coreAnalysis.profitability && coreAnalysis.target)
  const profitabilityHasError =
    !analysisLoading && (!!analysisError || (coreAnalysis !== null && !coreAnalysis?.profitability))

  const handleIdeaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIdeaDraft(event.target.value)
  }

  const handleRefresh = () => {
    const nextIdea = ideaDraft.trim()
    if (!nextIdea) return
    setActiveIdea((prev) => (prev === nextIdea ? prev : nextIdea))
    setReloadKey((key) => key + 1)
  }

  useEffect(() => {
    setIdeaDraft(input)
    setActiveIdea(input.trim())
  }, [input])

  useEffect(() => {
    if (!activeIdea) return
    console.log('Analyze request payload', { idea: activeIdea })
  }, [activeIdea, reloadKey])

  useEffect(() => {
    if (!activeIdea) {
      setCoreAnalysis(null)
      setScoreDetails(null)
      setCompetitorList(null)
      setSimilarList(null)
      setAnalysisError(null)
      setAnalysisLoading(false)
      setTimelineStatus(createInitialTimelineStatus())
      return
    }

    if (!backendUrl) {
      console.warn('PUBLIC_BACK_URL is not defined')
      setCoreAnalysis(null)
      setScoreDetails(null)
      setCompetitorList(null)
      setSimilarList(null)
      setTimelineStatus(createInitialTimelineStatus())
      setAnalysisError('Backend URL missing')
      setAnalysisLoading(false)
      return
    }

    let cancelled = false
    const markTimeline = (updates: Partial<TimelineStatusMap>) => {
      if (cancelled) return
      setTimelineStatus((prev) => ({ ...prev, ...updates }))
    }

    const fetchAnalysis = async () => {
      setAnalysisLoading(true)
      setAnalysisError(null)
      setCoreAnalysis(null)
      setScoreDetails(null)
      setCompetitorList(null)
      setSimilarList(null)
      setTimelineStatus({
        idea: 'in-progress',
        market: 'in-progress',
        score: 'idle',
        competitor: 'idle',
        similar: 'idle',
      })

      const ideaPayload = { idea: activeIdea }

      try {
        const coreResponse = await fetch(`${backendUrl}/analysis/core`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ideaPayload),
        })

        const coreData = (await coreResponse.json().catch(() => null)) as CoreAnalysisResponse | null

        if (!coreResponse.ok || !coreData) {
          throw new Error('Core analysis request failed')
        }

        if (cancelled) return
        setCoreAnalysis(coreData)
        markTimeline({
          idea: 'completed',
          market: 'completed',
          score: 'in-progress',
          competitor: 'in-progress',
          similar: 'in-progress',
        })

        const scorePayload: ScoreComputationRequest = {
          idea: activeIdea,
          score_components: coreData.score_components,
          category: coreData.category,
        }

        const scorePromise = fetch(`${backendUrl}/analysis/score`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(scorePayload),
        })
          .then(async (response) => {
            const payload = (await response.json().catch(() => null)) as ScoreComputationResponse | null
            if (!response.ok || !payload) throw new Error('Score computation failed')
            return payload
          })
          .catch((error) => {
            console.error('Score computation error', error)
            return null
          })
          .finally(() => markTimeline({ score: 'completed' }))

        const competitorsPromise = fetch(`${backendUrl}/analysis/competitors`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ideaPayload),
        })
          .then(async (response) => {
            const payload = (await response.json().catch(() => null)) as
              | { competitors?: CompetitorType[] }
              | CompetitorType[]
              | null
            if (!response.ok || !payload) throw new Error('Competitor request failed')
            return Array.isArray(payload) ? payload : payload?.competitors ?? null
          })
          .catch((error) => {
            console.error('Competitor fetch error', error)
            return null
          })
          .finally(() => markTimeline({ competitor: 'completed' }))

        const similarPromise = fetch(`${backendUrl}/analysis/similar`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ideaPayload),
        })
          .then(async (response) => {
            const payload = (await response.json().catch(() => null)) as
              | { similar?: SimilarItem[] }
              | SimilarItem[]
              | null
            if (!response.ok || !payload) throw new Error('Similar ideas request failed')
            return Array.isArray(payload) ? payload : payload?.similar ?? null
          })
          .catch((error) => {
            console.error('Similar ideas fetch error', error)
            return null
          })
          .finally(() => markTimeline({ similar: 'completed' }))

        const [scoreResult, competitorsResult, similarResult] = await Promise.all([
          scorePromise,
          competitorsPromise,
          similarPromise,
        ])

        if (cancelled) return
        setScoreDetails(scoreResult)
        setCompetitorList(competitorsResult)
        setSimilarList(similarResult)
      } catch (error) {
        if (cancelled) return
        setAnalysisError((error as Error)?.message ?? 'Analysis failed')
        setTimelineStatus(createInitialTimelineStatus())
        console.error('Analysis pipeline error', error)
      } finally {
        if (!cancelled) setAnalysisLoading(false)
      }
    }

    fetchAnalysis()

    return () => {
      cancelled = true
    }
  }, [activeIdea, backendUrl, reloadKey])

  useEffect(() => {
    if (typewriterTimeout.current) {
      clearTimeout(typewriterTimeout.current)
      typewriterTimeout.current = null
    }

    if (analysisLoading || !shouldAnimateSummary) {
      setDisplayedSummary('')
      return
    }

    const text = rawSummary
    if (!text) {
      setDisplayedSummary('')
      return
    }

    let index = 0

    const tick = () => {
      index += 1
      setDisplayedSummary(text.slice(0, index))
      if (index < text.length) {
        typewriterTimeout.current = setTimeout(tick, 18)
      }
    }

    typewriterTimeout.current = setTimeout(tick, 120)

    return () => {
      if (typewriterTimeout.current) {
        clearTimeout(typewriterTimeout.current)
        typewriterTimeout.current = null
      }
    }
  }, [rawSummary, analysisLoading, shouldAnimateSummary, activeIdea, reloadKey])

  const buildExportPayload = (): AnalyzeResponse | null => {
    if (!coreAnalysis || !scoreDetails) return null
    if (!coreAnalysis.profitability || !coreAnalysis.target) return null

    return {
      summary: coreAnalysis.summary ?? '',
      score: scoreDetails.score,
      profitability: coreAnalysis.profitability,
      target: coreAnalysis.target,
      competitors: competitorList ?? [],
      positioning: coreAnalysis.positioning ?? '',
      similar: similarList ?? [],
      category: scoreDetails.category ?? coreAnalysis.category ?? null,
    }
  }

  const handleDownloadPdf = async () => {
    if (!backendUrl || exportingPdf) return

    const payload = buildExportPayload()
    if (!payload) return

    try {
      setExportingPdf(true)
      const response = await fetch(`${backendUrl}/export/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error('PDF export failed', await response.text().catch(() => 'Unknown error'))
        return
      }

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `analysis-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('PDF export error', error)
    } finally {
      setExportingPdf(false)
    }
  }

  const handleGenerateSlides = async () => {
    if (!backendUrl || exportingSlides) return

    const payload = buildExportPayload()
    if (!payload) return

    try {
      setExportingSlides(true)
      const response = await fetch(`${backendUrl}/export/slide`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        console.error('Slide export failed', await response.text().catch(() => 'Unknown error'))
        return
      }

      const contentType = response.headers.get('content-type') ?? ''
      if (contentType.includes('application/json')) {
        const payload = (await response.json().catch(() => null)) as
          | { url?: string; link?: string; presentationUrl?: string }
          | null
        const presentationUrl = payload?.presentationUrl ?? payload?.url ?? payload?.link
        if (presentationUrl) {
          window.open(presentationUrl, '_blank', 'noopener,noreferrer')
        } else {
          console.warn('Slide export response missing presentation URL', payload)
        }
      } else {
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = `analysis-${Date.now()}.slides`
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(blobUrl)
      }
    } catch (error) {
      console.error('Slide export error', error)
    } finally {
      setExportingSlides(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] text-zinc-100">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="self-stretch lg:w-80 lg:flex-shrink-0 lg:sticky lg:left-0 lg:top-8">
            <AgentTimeline statusMap={timelineStatus} />
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={!canExportAnalysis || exportingPdf}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-white transition hover:border-indigo-500 hover:text-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download size={16} />
                {exportingPdf ? 'Generating PDF...' : 'Download PDF'}
              </button>
              <button
                type="button"
                onClick={handleGenerateSlides}
                disabled={!canExportAnalysis || exportingSlides}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-white transition hover:border-yellow-500/60 hover:text-yellow-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <img src={GOOGLE_SLIDES_ICON} alt="Google Slides logo" className="h-4 w-4" />
                {exportingSlides ? 'Generating Slides...' : 'Generate Google Slide'}
              </button>
            </div>
          </div>

          <div className="space-y-8 flex-1 w-full">
            <BaseInput
              value={ideaDraft}
              onChange={handleIdeaChange}
              onRefresh={handleRefresh}
              loading={analysisLoading}
              refreshDisabled={isRefreshDisabled}
            />

            <MarketSection
              loading={analysisLoading}
              summary={summaryOutput}
              isTyping={isTypingSummary}
              targetInsights={coreAnalysis?.target ?? TARGET_INSIGHTS}
            />

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Score loading={analysisLoading} result={scoreDetails} />
              <Profitability
                data={coreAnalysis?.profitability}
                loading={analysisLoading}
                hasError={profitabilityHasError}
              />
              <CompetitorsSection loading={analysisLoading} competitors={competitorList ?? undefined} />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Positioning text={coreAnalysis?.positioning} loading={analysisLoading} />
              <Similars loading={analysisLoading} items={similarList ?? undefined} />
            </section>



            <Agents />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoPage
