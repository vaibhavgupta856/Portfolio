/** Soft ambient glow — no blur filters (those tank FPS). */
export function SectionSpaceGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute top-1/4 -left-1/4 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(79,107,255,0.07),transparent_70%)]" />
      <div className="absolute bottom-1/4 -right-1/4 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.05),transparent_70%)]" />
    </div>
  )
}
