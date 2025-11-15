export default function PainSolution() {
  return (
    <section className="bg-[var(--surface)]" id="pains">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Your challenges</h2>
          <ul className="space-y-3 text-zinc-300">
            <li>• Hard to quickly validate if an idea is bankable</li>
            <li>• Unclear market size and niche dynamics</li>
            <li>• Time-consuming competitor discovery and benchmarking</li>
            <li>• Generic AI feedback with no data-backed scoring</li>
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Our solution</h2>
          <ul className="space-y-3 text-zinc-300">
            <li>• Instant feasibility and success score</li>
            <li>• Competitor mapping with links to landing pages</li>
            <li>• Analysis of competitor pages — and yours if you want</li>
            <li>• Clear, data-backed insights to decide and iterate</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

