import type { Profitability as ProfitabilityType } from '@/lib/type'

type ProfitMetric = {
  label: string
  value: string
  hint?: string
}

type ProfitabilityProps = {
  data?: ProfitabilityType | null
  loading?: boolean
  hasError?: boolean
}

const fallbackProfitability: ProfitabilityType = {
  roi_percentage: 38,
  timeframe_months: 12,
  reason: 'Recurring SaaS revenues with balanced CAC/LTV typically drive break-even inside the first year.',
}

const formatPercent = (value: number | undefined) =>
  typeof value === 'number' ? `${value}%` : 'N/A'
const formatMonths = (value: number | undefined) =>
  typeof value === 'number' ? `~${value} mo` : 'N/A'

export default function Profitability({ data, loading, hasError }: ProfitabilityProps) {
  if (loading) {
    return (
      <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
        <div className="mb-4 h-6 w-32 animate-pulse rounded bg-zinc-800/70" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="rounded-xl border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="h-4 w-24 animate-pulse rounded bg-zinc-800/70" />
              <div className="mt-3 h-6 w-20 animate-pulse rounded bg-zinc-800/70" />
              <div className="mt-2 h-3 w-32 animate-pulse rounded bg-zinc-800/70" />
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="h-4 w-20 animate-pulse rounded bg-zinc-800/70" />
          <div className="mt-3 h-16 w-full animate-pulse rounded bg-zinc-800/70" />
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6 text-center text-sm text-zinc-400">
        no information
      </div>
    )
  }

  const profitability = data ?? fallbackProfitability
  const metrics: ProfitMetric[] = [
    { label: 'Projected ROI', value: formatPercent(profitability.roi_percentage) },
    {
      label: 'Payback time',
      value: formatMonths(profitability.timeframe_months),
      hint: 'Estimated timeline to break-even',
    },
  ]

  return (
    <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Profitability</h2>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="text-sm text-zinc-400">{metric.label}</div>
            <div className="mt-1 text-2xl font-semibold text-white">{metric.value}</div>
            {metric.hint ? (
              <div className="mt-0.5 text-xs text-zinc-400">{metric.hint}</div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border-[var(--border)] bg-[var(--surface)] p-4">
        <div className="text-sm text-zinc-400">Rationale</div>
        <p className="mt-1 text-sm text-zinc-200 leading-relaxed">{profitability.reason}</p>
      </div>
    </div>
  )
}

