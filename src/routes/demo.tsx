import { createFileRoute } from '@tanstack/react-router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import Agents from '@/components/dashboard/Agents'
import AgentTimeline from '@/components/dashboard/AgentTimeline'
import MarketSection from '@/components/dashboard/MarketSection'
import Score from '@/components/dashboard/Score'
import Profitability from '@/components/dashboard/Profitability'
import CompetitorsSection from '@/components/dashboard/Competitors'
import Positioning from '@/components/dashboard/Positioning'
import BaseInput from '@/components/dashboard/BaseInput'
import type { AnalyzeResult } from '@/lib/type'
import { TARGET_INSIGHTS, fallbackSummary } from '@/lib/type'

const env = import.meta.env as Record<string, string | undefined>
const rawBackendUrl =
  env.PUBLIC_BACK_URL ??
  env.VITE_PUBLIC_BACK_URL ??
  (typeof process !== 'undefined'
    ? process.env?.PUBLIC_BACK_URL ?? process.env?.VITE_PUBLIC_BACK_URL
    : undefined)

const backendUrl = rawBackendUrl?.replace(/^['"]|['"]$/g, '').trim().replace(/\/$/, '')

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
  const [analysis, setAnalysis] = useState<AnalyzeResult | null>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [exportingPdf, setExportingPdf] = useState(false)
  const [displayedSummary, setDisplayedSummary] = useState('')
  const typewriterTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rawSummary = analysis?.summary?.trim() ?? ''
  const summaryText = rawSummary || fallbackSummary
  const shouldAnimateSummary = Boolean(rawSummary)
  const summaryOutput = shouldAnimateSummary ? displayedSummary : summaryText
  const isTypingSummary =
    shouldAnimateSummary && !analysisLoading && displayedSummary.length > 0 && displayedSummary.length < rawSummary.length
  const isRefreshDisabled = !ideaDraft.trim() || analysisLoading

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
      setAnalysis(null)
      setAnalysisLoading(false)
      return
    }

    if (!backendUrl) {
      console.warn('PUBLIC_BACK_URL is not defined')
      setAnalysisLoading(false)
      return
    }

    const controller = new AbortController()
    let mounted = true

    const fetchAnalysis = async () => {
      setAnalysisLoading(true)
      try {
        const response = await fetch(`${backendUrl}/analyze_mock`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idea: activeIdea }),
          signal: controller.signal,
        })

        const payload = (await response.json().catch(() => null)) as AnalyzeResult | null

        if (!response.ok || !payload) {
          console.error('Analyze mock request failed', payload ?? 'Unknown error')
          return
        }

        if (!mounted) return

        setAnalysis(payload)
        console.log('Analyze mock result', payload)
      } catch (error) {
        if ((error as Error)?.name === 'AbortError') return
        console.error('Analyze mock request error', error)
      } finally {
        if (mounted) setAnalysisLoading(false)
      }
    }

    fetchAnalysis()

    return () => {
      mounted = false
      controller.abort()
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

  const handleDownloadPdf = async () => {
    if (!analysis || !backendUrl || exportingPdf) return

    try {
      setExportingPdf(true)
      const response = await fetch(`${backendUrl}/export/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analysis),
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

  return (
    <div className="min-h-screen bg-[var(--surface)] text-zinc-100">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="self-stretch lg:w-80 lg:flex-shrink-0 lg:sticky lg:left-0 lg:top-8">
            <AgentTimeline loading={analysisLoading} runKey={reloadKey} />
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={!analysis || exportingPdf}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-white transition hover:border-indigo-500 hover:text-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download size={16} />
              {exportingPdf ? 'Generating PDF…' : 'Download PDF'}
            </button>
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
              targetInsights={analysis?.target ?? TARGET_INSIGHTS}
            />

            <Positioning text={analysis?.positioning} />

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Score
                loading={analysisLoading}
                scoreValue={analysis?.score?.value}
                scoreReason={analysis?.score?.reason}
              />
              <Profitability data={analysis?.profitability} />
              <CompetitorsSection loading={analysisLoading} competitors={analysis?.competitors} />
            </section>

            <Agents />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoPage

