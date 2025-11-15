import { Check } from 'lucide-react'

export type TimelineStepKey = 'idea' | 'market' | 'score' | 'competitor' | 'similar'
export type TimelineStepStatus = 'idle' | 'in-progress' | 'completed'
export type TimelineStatusMap = Record<TimelineStepKey, TimelineStepStatus>

const TIMELINE_STEPS: { key: TimelineStepKey; label: string }[] = [
  { key: 'idea', label: 'Understanding idea' },
  { key: 'market', label: 'Market Analysis' },
  { key: 'score', label: 'Scoring' },
  { key: 'similar', label: 'Similar unicorns research' },
  { key: 'competitor', label: 'Competitor research' },
]

type AgentTimelineProps = {
  statusMap?: Partial<TimelineStatusMap>
}

const DEFAULT_STATUS: TimelineStatusMap = {
  idea: 'idle',
  market: 'idle',
  score: 'idle',
  competitor: 'idle',
  similar: 'idle',
}

export default function AgentTimeline({ statusMap }: AgentTimelineProps) {
  const mergedStatus = { ...DEFAULT_STATUS, ...statusMap }
  const completedCount = TIMELINE_STEPS.filter((step) => mergedStatus[step.key] === 'completed').length
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
          {TIMELINE_STEPS.map((step) => {
            const status = mergedStatus[step.key]
            const isCompleted = status === 'completed'
            const isInProgress = status === 'in-progress'
            const statusLabel =
              status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In progress' : 'Queued task'

            return (
              <li key={step.key} className="relative flex items-start gap-4">
                <div className="relative">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-sm transition-all duration-500 ${
                      isCompleted
                        ? 'border-pink-500 bg-pink-500 text-white'
                        : isInProgress
                          ? 'border-pink-400 text-pink-400'
                          : 'border-zinc-700 text-zinc-600'
                    }`}
                  >
                    <Check size={14} />
                  </span>
                </div>
                <div>
                  <p
                    className={`font-medium transition-colors duration-500 ${
                      isCompleted ? 'text-white' : isInProgress ? 'text-pink-200' : 'text-zinc-500'
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-zinc-500">{statusLabel}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

