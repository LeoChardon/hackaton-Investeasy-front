export default function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden"
    >
      <div className="hero-glow-bg h-[120vmax] w-[120vmax] max-h-[150vh] max-w-[150vw] rounded-full" />
    </div>
  )
}
