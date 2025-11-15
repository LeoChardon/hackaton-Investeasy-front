import { useEffect, useMemo, useState } from 'react'
import type { ScoreComputationResponse } from '@/lib/type'

type ScoreProps = {
  loading: boolean
  result?: ScoreComputationResponse | null
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-zinc-800 ${className ?? ''}`} />
}

function ScoreRing({ value, size = 160, stroke = 14 }: { value: number; size?: number; stroke?: number }) {
  const radius = useMemo(() => (size - stroke) / 2, [size, stroke])
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius])
  const center = useMemo(() => size / 2, [size])

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    const duration = 1200
    const animate = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setProgress(Math.round(value * t))
      if (t < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value])

  const dashOffset = useMemo(() => circumference * (1 - progress / 100), [circumference, progress])

  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="block rotate-[-90deg]">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-zinc-800"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-indigo-600"
          strokeWidth={stroke}
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
            transition: 'stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center rotate-0">
        <div className="text-4xl font-bold text-white">{progress}</div>
        <div className="text-xs text-zinc-400">/ 100</div>
      </div>
    </div>
  )
}

export default function Score({ loading, result }: ScoreProps) {
  const scoreValue = result?.score?.value
  const normalizedScore = typeof scoreValue === 'number' ? Math.max(0, Math.min(100, scoreValue)) : null
  const description =
    result?.score?.reason ??
    result?.weight_explanation ??
    'Based on market size, entry barriers, competition density, and clarity of value proposition.'

  return (
    <div className="rounded-2xl border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Feasibility score</h2>
      <div className="flex items-center justify-center min-h-[184px]">
        {loading ? (
          <Skeleton className="h-36 w-36" />
        ) : normalizedScore !== null ? (
          <ScoreRing value={normalizedScore} />
        ) : (
          <span className="text-sm text-zinc-400">Waiting for analysis...</span>
        )}
      </div>
      <div className="mt-6 text-sm text-zinc-300 text-center min-h-[3rem]">
        {loading ? <Skeleton className="h-4 w-10/12 mx-auto rounded-md" /> : description}
      </div>
    </div>
  )
}

