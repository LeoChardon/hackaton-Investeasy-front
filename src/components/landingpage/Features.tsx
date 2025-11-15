export default function Features() {
  const items = [
    {
      title: 'Competitor Mapping',
      desc: 'Discover real competitors in your niche with direct links to their landing pages.',
    },
    {
      title: 'Feasibility & Success Score',
      desc: 'Get a clear, data-backed score based on idea type, market size, and industry.',
    },
    {
      title: 'Landing Page Analysis',
      desc: 'Benchmark your positioning by analyzing competitor pages — and your own.',
    },
    {
      title: 'Actionable Insights',
      desc: 'Understand market traction and profitability to decide what to build next.',
    },
  ] as const

  return (
    <section id="features" className="bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Key features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((f) => (
            <div key={f.title} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
