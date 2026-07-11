export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute -top-1/3 left-1/4 w-[560px] h-[560px] rounded-full opacity-[0.14]"
        style={{
          background: 'radial-gradient(circle, rgba(79,107,255,0.4) 0%, transparent 68%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full opacity-[0.1]"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 68%)',
        }}
      />
      <div className="absolute inset-0 space-stars opacity-25" />
    </div>
  )
}
