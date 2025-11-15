import { FormEvent } from 'react'
import { Link as LinkIcon, Sparkles } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

export default function CTABand() {
  const navigate = useNavigate()
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const idea = String(data.get('input') ?? '').trim()

    if (!idea) return

    navigate({ to: '/demo', search: { input: idea } })
  }

  return (
    <section id="cta">
<div className="max-w-7xl mx-auto px-6 py-10 pb-60 flex-col">
        {/* <div>
           <h3 className="text-2xl font-bold text-white">Is it worth to invest on..</h3> 
          <p className="text-center text-zinc-300">
            Paste your landing page URL or describe your startup idea. We’ll analyze feasibility, map competitors, and
            give you a data-backed score.
          </p>
        </div> */}
        <form onSubmit={onSubmit} className="w-full">
          <div className="relative mx-auto w-full md:max-w-3xl lg:max-w-4xl">

            <textarea
              rows={5}
              aria-label="Startup idea or landing page URL"
              placeholder="Describe your startup idea... What problem do you solve?"
              name="input"
              className="w-full min-h-40 md:min-h-44 rounded-2xl border-[var(--border)] bg-zinc-900 pl-12 pr-44 py-4 text-lg text-white placeholder-zinc-500 shadow-sm ring-1 ring-[var(--border)] focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
              onInput={(e) => {
                const el = e.currentTarget
                el.style.height = 'auto'
                el.style.height = `${el.scrollHeight}px`
              }}
            />
            <button
              type="submit"
              className="absolute right-2 bottom-3 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 h-12 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              <Sparkles size={16} />
              Analyze
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

