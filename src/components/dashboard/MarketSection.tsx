import { TargetInsight } from "@/lib/type"

export type MarketSectionProps = {
  loading: boolean
  summary: string
  isTyping?: boolean
  targetInsights?: TargetInsight
}

const defaultInsights: TargetInsight = {
  segment: 'ICP',
  purchasing_power: 'Early-stage founders, indie builders, micro funds',
  justification: 'Willingness to pay between 19 and 79 per month driven by speed-to-signal needs.',
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-zinc-800 ${className ?? ''}`} />
}

export default function MarketSection({
  loading,
  summary,
  isTyping = false,
  targetInsights = defaultInsights,
}: MarketSectionProps) {
  const safeSummary = summary?.trim() ?? ''
  const { segment, purchasing_power, justification } = targetInsights ?? defaultInsights
  const targetDetails = [
    { label: 'Segment', value: segment },
    { label: 'Purchasing power', value: purchasing_power },
    { label: 'Justification', value: justification },
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6 lg:col-span-2">
        <div className="text-xs uppercase tracking-wider text-zinc-400">Market summary</div>
        <div className="text-zinc-300 min-h-[96px]" aria-live="polite">
          {loading ? (
            <>
              <Skeleton className="h-4 w-11/12 mb-2" />
              <Skeleton className="h-4 w-9/12 mb-2" />
              <Skeleton className="h-4 w-7/12" />
            </>
          ) : (
            <p className="mt-2 text-lg text-white whitespace-pre-wrap leading-relaxed">
              {safeSummary}
              {isTyping ? (
                <span className="ml-1 inline-block h-5 w-px bg-zinc-400 animate-pulse align-middle" />
              ) : null}
            </p>
          )}
        </div>
      </div>
      <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
        <h2 className="text-xl font-semibold text-white mb-3">Target & purchasing power</h2>
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} className="h-4 w-full last:w-5/6" />
            ))}
          </div>
        ) : (
          <ul className="text-zinc-300 space-y-2">
            {targetDetails.map((insight) =>
              insight.value ? (
                <li key={insight.label} className="flex items-start gap-2">
                  <span className="text-zinc-300">{insight.value}</span>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </div>
    </section>
  )
}

