const sponsors = [
  { name: 'Google Cloud', url: 'https://cloud.google.com/' },
  { name: 'Mistral', url: 'https://chat.mistral.ai/chat' },
  { name: 'Eleven Labs', url: 'https://elevenlabs.io/' },
  { name: 'Figma Make', url: 'https://www.figma.com/fr-fr/make/' },
  { name: 'Lovable', url: 'https://lovable.dev/pricing' },
  { name: 'Qdrant', url: 'https://qdrant.tech/' },
]

const favicon = (url: string) => `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(url)}`

export default function TrustBar() {
  return (
    <section className="bg-[var(--surface)] border-y border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-xs uppercase tracking-wider text-zinc-400 mb-4">Sponsored by</p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"
            >
              <img
                src={favicon(sponsor.url)}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-full border border-zinc-800"
                loading="lazy"
              />
              <span>{sponsor.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

