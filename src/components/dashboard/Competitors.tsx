type Competitor = {
  name: string
  landing_page: string
  logo_url?: string
}

type CompetitorsProps = {
  loading: boolean
  competitors?: Competitor[]
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-800 ${className ?? ''}`} />
}

export default function Competitors({ loading, competitors }: CompetitorsProps) {
  const hasCompetitors = Boolean(competitors && competitors.length > 0)

  return (
    <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Competitors</h2>
      <ul className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <li key={`competitor-skel-${idx}`} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-32 rounded-md" />
                </div>
                <Skeleton className="h-8 w-28 rounded-full" />
              </li>
            ))
          : hasCompetitors && competitors
            ? competitors.map((competitor) => (
                <li key={competitor.name} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    {competitor.logo_url ? (
                      <img
                        src={competitor.logo_url}
                        alt={`${competitor.name} logo`}
                        className="h-10 w-10 rounded-full object-cover border-[var(--border)] bg-zinc-900"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-zinc-800" />
                    )}
                    <span className="text-white truncate">{competitor.name}</span>
                  </div>
                  <a
                    href={competitor.landing_page}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100 border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                  >
                    Show website
                  </a>
                </li>
              ))
            : (
                <li className="text-sm text-zinc-400">No competitors detected yet.</li>
              )}
      </ul>
    </div>
  )
}

