const items = [
  'C++',
  'Python',
  'Go',
  'React',
  'FastAPI',
  'Distributed Systems',
  'Docker',
  'PostgreSQL',
  'LLM Agents',
]

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-2.5 border-y border-white/[0.04]">
      <div
        className={`flex gap-12 whitespace-nowrap w-max ${
          reverse
            ? 'animate-[marquee-reverse_40s_linear_infinite]'
            : 'animate-[marquee_32s_linear_infinite]'
        }`}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-xs md:text-sm text-white/20 uppercase tracking-[0.25em]"
          >
            {item}
            <span className="mx-12 text-cyan-glow/25">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden opacity-80 space-y-0">
      <MarqueeRow />
      <MarqueeRow reverse />
    </div>
  )
}
