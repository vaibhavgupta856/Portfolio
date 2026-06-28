import { motion } from 'framer-motion'
import { LusionCross, LusionCrossRow } from './LusionCross'

export function LusionScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="absolute bottom-0 left-6 right-6 md:left-10 md:right-10 h-12 md:h-14 overflow-hidden"
    >
      <LusionCrossRow className="absolute top-1/2 -translate-y-1/2" />

      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/40 whitespace-nowrap">
        scroll to explore
      </p>
    </motion.div>
  )
}

export function LusionEndCrosses() {
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
        <motion.div
          key={pos}
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`absolute ${pos}`}
        >
          <LusionCross />
        </motion.div>
      ))}
    </div>
  )
}
