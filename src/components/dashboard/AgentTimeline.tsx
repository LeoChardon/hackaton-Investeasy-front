import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'

const TIMELINE_STEPS = [
  'Understanding idea',
  'Market Analysis',
  'Competitor research',
  'Scoring',
  'Generating report',
  'Creating audio summary',
  'Sync with Notion (n8n)',
]

type AgentTimelineProps = {
  loading?: boolean
  runKey?: number
}

const STEP_DELAY = 420

export default function AgentTimeline({ loading = false, runKey = 0 }: AgentTimelineProps) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    let currentStep = 0

    const schedule = () => {
      timeout = setTimeout(() => {
        currentStep += 1
        setVisibleCount(Math.min(currentStep, TIMELINE_STEPS.length))

        if (currentStep < TIMELINE_STEPS.length) {
          schedule()
        } else if (loading) {
          timeout = setTimeout(() => {
            currentStep = 0
            setVisibleCount(0)
            schedule()
          }, STEP_DELAY)
        }
      }, STEP_DELAY)
    }

    setVisibleCount(0)
    currentStep = 0
    schedule()

    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [loading, runKey])

  const completedCount = Math.min(visibleCount, TIMELINE_STEPS.length)
  const progressRatio = TIMELINE_STEPS.length ? completedCount / TIMELINE_STEPS.length : 0

  return (
    <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-zinc-500">Agent timeline</p>
          <h2 className="text-2xl font-semibold text-white mt-1">Workflow playback</h2>
        </div>
        <span className="text-xs font-medium text-pink-500"></span>
      </div>

      <div className="relative pl-6">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-zinc-800" />
        <div
          className="absolute left-3 top-2 w-px bg-gradient-to-b from-pink-400 to-pink-500 transition-all duration-500"
          style={{
            height: progressRatio > 0 ? `calc((100% - 1rem) * ${progressRatio})` : 0,
            opacity: completedCount > 0 ? 1 : 0,
          }}
        />

        <ul className="space-y-4">
          {TIMELINE_STEPS.map((step, index) => {
            const isCompleted = index < completedCount
            const status = loading && index === completedCount ? 'In progress' : isCompleted ? 'Completed' : 'Queued task'

            return (
              <li key={step} className="relative flex items-start gap-4">
                <div className="relative">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-sm transition-all duration-500 ${
                      isCompleted
                        ? 'border-pink-500 bg-pink-500 text-white'
                        : 'border-zinc-700 text-zinc-600'
                    }`}
                  >
                    <Check size={14} />
                  </span>
                </div>
                <div>
                  <p
                    className={`font-medium transition-colors duration-500 ${
                      isCompleted ? 'text-white' : 'text-zinc-500'
                    }`}
                  >
                    {step}
                  </p>
                  <p className="text-xs text-zinc-500">{status}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

