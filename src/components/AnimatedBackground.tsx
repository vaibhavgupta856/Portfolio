export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-1/3 left-1/4 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(79,107,255,0.35) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 65%)',
        }}
      />
      <div className="absolute inset-0 space-stars opacity-30" />
    </div>
  )
}
