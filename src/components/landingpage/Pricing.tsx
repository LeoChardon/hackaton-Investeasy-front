export default function Pricing() {
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 0,
      features: ['Competitor overview', 'Feasibility score', '5 analyses / month'],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      features: ['Full competitor mapping', 'Landing page analysis', '50 analyses / month'],
    },
    {
      id: 'investor',
      name: 'Investor',
      price: 79,
      features: ['Advanced filters & export', 'Portfolio tracking', 'Priority support'],
    },
  ] as const

  return (
    <section id="pricing" className="bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Simple pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.id} className="rounded-xl border-[var(--border)] bg-[var(--card)] p-6 flex-col">
              <h3 className="text-xl font-semibold text-white mb-2">{p.name}</h3>
              <div className="text-3xl font-bold text-white mb-4">{p.price.toFixed(0)}€<span className="text-base font-normal text-zinc-400">/mo</span></div>
              <ul className="text-zinc-300 space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>
              <a href="#cta" className="mt-auto text-center rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2">
                Choose {p.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

