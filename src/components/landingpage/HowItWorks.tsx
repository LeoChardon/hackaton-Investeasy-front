export default function HowItWorks() {
  const steps = [
    { title: '1. Describe or paste URL', desc: 'Enter your idea or your landing page URL.' },
    { title: '2. We analyze the market', desc: 'We detect competitors and benchmark positioning.' },
    { title: '3. Get feasibility & score', desc: 'Receive a clear success score backed by data.' },
    { title: '4. Decide and iterate', desc: 'Use insights to refine your idea and go faster.' },
  ] as const

  return (
    <section id="how" className="bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">How it works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="rounded-xl border-[var(--border)] bg-[var(--card)] p-6 text-center">
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-zinc-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

