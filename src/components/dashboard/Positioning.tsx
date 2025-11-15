type PositioningProps = {
  text?: string
}

export default function Positioning({ text }: PositioningProps) {
  return (
    <section className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <div className="text-xs uppercase tracking-wider text-zinc-400">Positioning</div>
      <p className="mt-2 text-lg text-white whitespace-pre-wrap">{text?.trim() || '-'}</p>
    </section>
  )
}

