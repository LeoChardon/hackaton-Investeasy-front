export default function Navbar() {
  const MODE_BADGE = (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
      {'*'}
    </span>
  )

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">
            Inve
            <span className="text-base">$</span>t
            <span className="text-base">€</span>
            asy
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-zinc-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          {MODE_BADGE}
          <a href="#cta" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold">Get started</a>
        </div>
      </div>
    </header>
  )
}
