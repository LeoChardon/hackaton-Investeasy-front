import type { ChangeEvent } from 'react'
import { RefreshCw } from 'lucide-react'

type BaseInputProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  onRefresh: () => void
  loading?: boolean
  refreshDisabled?: boolean
  helperText?: string
  placeholder?: string
  rows?: number
}

export default function BaseInput({
  value,
  onChange,
  onRefresh,
  loading = false,
  refreshDisabled = false,
  helperText = undefined,
  placeholder = 'Describe your startup idea or paste a landing page URL...',
  rows = 4,
}: BaseInputProps) {
  return (
    <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <div className="text-xs uppercase tracking-wider text-zinc-400">Your input</div>
      <div className="mt-3 relative">
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="min-h-32 w-full resize-y rounded-2xl border-[var(--border)] bg-zinc-900 px-4 py-3 pr-16 text-base text-white placeholder-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshDisabled}
          className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border-indigo-500/40 bg-indigo-500/10 text-indigo-300 transition hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="sr-only">Refresh analysis</span>
        </button>
      </div>
      {helperText ? (
        <p className="mt-2 text-sm text-zinc-400" aria-live="polite">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

