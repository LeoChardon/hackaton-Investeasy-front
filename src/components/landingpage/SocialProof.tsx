export default function SocialProof() {
  const quotes = [
    {
      name: 'Amira — Founder',
      text: 'Investeasy gave us a fast reality check and a clear path forward.',
    },
    { name: 'Leo — Angel Investor', text: 'Great at spotting traction and mapping the competitive landscape.' },
    { name: 'Nina — Builder', text: 'The score and insights saved me weeks of research.' },
  ] as const

  return (
    <section className="bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">What people say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <div key={q.name} className="rounded-xl border-[var(--border)] bg-[var(--card)] p-6">
              <p className="text-zinc-200 italic">“{q.text}”</p>
              <p className="mt-4 text-sm text-zinc-400">{q.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

