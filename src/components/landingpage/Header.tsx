type Props = {
  title: string
  subtitle: string
  tagline: string
}

export default function Header({ title, subtitle, tagline }: Props) {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[var(--surface)]">
      {/* <div className="hero-glow-bg pointer-events-none fixed left-1/2 top-1/2 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" /> */}

<div className="mx-auto max-w-7xl px-6 pt-24 sm:pt-32 lg:px-8">

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Inve
            <span className="text-4xl">$</span>t
            <span className="text-5xl">€</span>
            asy
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">{subtitle}</p>
          <p className="mt-3 text-indigo-400/90">{tagline}</p>

        </div>
      </div>
    </section>
  )
}

