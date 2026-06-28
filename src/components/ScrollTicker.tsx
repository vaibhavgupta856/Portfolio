import { motion } from 'framer-motion'

const items = [
  'CONTINUE TO SCROLL',
  'BUILD SYSTEMS',
  'SHIP CODE',
  'OPEN TO WORK',
  'IIT GOA · CSE',
]

function Row({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden py-4 border-y border-white/[0.05]">
      <motion.div
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="flex gap-16 whitespace-nowrap w-max"
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl md:text-4xl font-bold text-white/[0.07] uppercase tracking-wider"
          >
            {item}
            <span className="mx-16 text-accent/20">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function ScrollTicker() {
  return (
    <div className="relative w-full overflow-hidden pointer-events-none select-none">
      <Row />
      <Row reverse />
    </div>
  )
}
