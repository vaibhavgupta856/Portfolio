import { motion } from 'framer-motion'

interface LoadingScreenProps {
  progress: number
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const pct = Math.round(progress * 100)

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014]"
      aria-live="polite"
      aria-busy="true"
      aria-label={`Loading portfolio, ${pct} percent`}
    >
      <div className="absolute inset-0 space-stars opacity-35" />

      <div className="relative z-10 flex flex-col items-center">
        <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-10">
          VG<span className="text-accent">.</span>
        </p>

        <div className="w-44 sm:w-52 h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent via-cyan-glow to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35 mt-5">
          Loading · {pct}%
        </p>
      </div>
    </motion.div>
  )
}
