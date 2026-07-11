import { LusionCross, LusionCrossRow } from './LusionCross'

export function LusionScrollIndicator() {
  return (
    <div className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10 h-12 md:h-14 overflow-hidden">
      <LusionCrossRow className="absolute top-1/2 -translate-y-1/2" />

      <p className="scroll-nudge absolute left-1/2 top-1/2 font-display text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">
        scroll to explore
      </p>
    </div>
  )
}

export function LusionEndCrosses({ visible = true }: { visible?: boolean }) {
  const positions = [
    'left-0 top-0',
    'right-0 top-0',
    'left-0 bottom-0',
    'left-1/2 -translate-x-1/2 bottom-0',
    'right-0 bottom-0',
  ]

  return (
    <div className="pointer-events-none absolute inset-x-[20%] -inset-y-[5vh] md:inset-x-[15%]">
      {positions.map((pos, i) => (
        <div
          key={pos}
          className={`reveal absolute ${pos} ${visible ? 'is-in' : ''}`}
          style={{ transitionDelay: visible ? `${100 + i * 60}ms` : undefined }}
        >
          <LusionCross />
        </div>
      ))}
    </div>
  )
}
