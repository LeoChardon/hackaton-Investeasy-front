type Props = {
  title: string
  subtitle: string
  tagline: string
}

export default function Header({ title, subtitle, tagline }: Props) {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-[var(--surface)]">
<div className="mx-auto max-w-7xl px-6 pt-10 sm:pt-14 lg:px-8">

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

