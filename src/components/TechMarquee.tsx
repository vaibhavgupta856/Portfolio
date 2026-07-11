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

/** Static tech strip — CSS marquee was a permanent compositor tax. */
export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden opacity-70">
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 py-2.5 px-4 border-y border-white/[0.04]">
        {items.map((item) => (
          <span
            key={item}
            className="font-mono text-xs md:text-sm text-white/25 uppercase tracking-[0.22em]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
