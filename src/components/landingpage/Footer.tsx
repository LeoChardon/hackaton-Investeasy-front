export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-400">(c) {new Date().getFullYear()} Investeasy</p>
        <nav className="flex items-center gap-4 text-zinc-400">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
      </div>
    </footer>
  )
}
