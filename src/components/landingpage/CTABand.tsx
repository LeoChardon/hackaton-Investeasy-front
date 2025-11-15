import { FormEvent, useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

const PLACEHOLDER_PROMPT = 'Describe your startup idea... What problem do you solve?'
const IDEA_VARIANTS = [
  'AI co-pilot that underwrites deals by reading financial docs.',
  'Marketplace that pairs angel investors with climate fintech founders.',
  'Risk engine scoring SaaS founders using alternative data in seconds.',
]

export default function CTABand() {
  const navigate = useNavigate()
  const [typedIdea, setTypedIdea] = useState('')
  const [ideaIndex, setIdeaIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const hasVariants = IDEA_VARIANTS.length > 0

  useEffect(() => {
    if (!hasVariants) return

    const currentIdea = IDEA_VARIANTS[ideaIndex] ?? ''
    let timeout: number

    if (!isDeleting && typedIdea === currentIdea) {
      timeout = window.setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && typedIdea === '') {
      timeout = window.setTimeout(() => {
        setIsDeleting(false)
        setIdeaIndex((prev) => (prev + 1) % IDEA_VARIANTS.length)
      }, 400)
    } else {
      timeout = window.setTimeout(() => {
        const nextLength = typedIdea.length + (isDeleting ? -1 : 1)
        setTypedIdea(currentIdea.slice(0, nextLength))
      }, isDeleting ? 35 : 85)
    }

    return () => window.clearTimeout(timeout)
  }, [hasVariants, ideaIndex, isDeleting, typedIdea])

  const placeholder = hasVariants ? `${PLACEHOLDER_PROMPT} ${typedIdea}` : PLACEHOLDER_PROMPT

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const idea = String(data.get('input') ?? '').trim()

    if (!idea) return

    navigate({ to: '/demo', search: { input: idea } })
  }

  return (
    <section id="cta">
      <div className="mx-auto flex max-w-7xl flex-col px-6 py-10 pb-60">
        <form onSubmit={onSubmit} className="w-full">
          <div className="relative mx-auto w-full md:max-w-3xl lg:max-w-4xl">
            <textarea
              rows={5}
              aria-label="Startup idea"
              placeholder={placeholder}
              name="input"
              className="w-full min-h-40 resize-y rounded-2xl border-[var(--border)] bg-zinc-900 px-12 pb-16 pt-4 text-lg text-white placeholder:text-zinc-500 shadow-sm ring-1 ring-[var(--border)] focus:outline-none focus:ring-2 focus:ring-indigo-500 md:min-h-44"
              onInput={(e) => {
                const el = e.currentTarget
                el.style.height = 'auto'
                el.style.height = `${el.scrollHeight}px`
              }}
            />
            <button
              type="submit"
              className="absolute bottom-3 right-2 inline-flex h-12 items-center gap-2 rounded-full bg-indigo-600 px-6 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
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
