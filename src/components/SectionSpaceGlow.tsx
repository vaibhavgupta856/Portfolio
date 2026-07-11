/** Soft ambient glow for section backgrounds — no animation, low GPU cost */
export function SectionSpaceGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute top-1/4 -left-1/4 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(79,107,255,0.08),transparent_70%)] blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06),transparent_70%)] blur-3xl" />
    </div>
  )
}
