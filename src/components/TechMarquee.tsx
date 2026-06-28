import { motion } from 'framer-motion'

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
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="flex gap-12 whitespace-nowrap w-max"
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-xs md:text-sm text-white/20 uppercase tracking-[0.25em]"
          >
            {item}
            <span className="mx-12 text-cyan-glow/20">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function TechMarquee() {
  return (
    <div className="relative w-full overflow-hidden opacity-70">
      <MarqueeRow />
    </div>
  )
}
