import type { SimilarItem } from '@/lib/type'

type SimilarsProps = {
  loading?: boolean
  items?: SimilarItem[] | null
}

function formatPercentage(value: number) {
  return `${Math.round(Math.min(Math.max(value, 0), 1) * 100)}%`
}

export default function Similars({ loading, items }: SimilarsProps) {
  const hasItems = Boolean(items && items.length > 0)

  return (
    <section className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Similar unicorns</h2>
      {loading ? (
        <ul className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <li key={index} className="space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800/70" />
              <div className="h-3 w-1/4 animate-pulse rounded bg-zinc-800/70" />
            </li>
          ))}
        </ul>
      ) : hasItems && items ? (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.idea} className="rounded-xl border border-zinc-800 bg-[var(--surface)] p-3">
              <p className="text-sm font-medium text-white">{item.idea}</p>
              <p className="text-xs text-zinc-400">Similarity: {formatPercentage(item.similarity)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-zinc-400">No similar ideas detected yet.</p>
      )}
    </section>
  )
}
