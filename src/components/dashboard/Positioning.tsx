type PositioningProps = {
  text?: string
  loading?: boolean
}

export default function Positioning({ text, loading }: PositioningProps) {
  if (loading) {
    return (
      <section className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <div className="text-xs uppercase tracking-wider text-zinc-400">Positioning</div>
        <div className="mt-4 space-y-3">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-4 w-full animate-pulse rounded bg-zinc-800/70" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <div className="text-xs uppercase tracking-wider text-zinc-400">Positioning</div>
      <p className="mt-2 whitespace-pre-wrap text-lg text-white">{text?.trim() || '-'}</p>
    </section>
  )
}

