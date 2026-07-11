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

export function TechMarquee() {
  const doubled = [...items, ...items]

  return (
    <div className="relative w-full overflow-hidden opacity-70">
      <div className="overflow-hidden py-2.5 border-y border-white/[0.04]">
        <div className="flex gap-12 whitespace-nowrap w-max animate-[marquee_36s_linear_infinite]">
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-mono text-xs md:text-sm text-white/20 uppercase tracking-[0.25em]"
            >
              {item}
              <span className="mx-12 text-cyan-glow/20">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
