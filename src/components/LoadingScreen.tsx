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
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030014]"
      aria-live="polite"
      aria-busy="true"
      aria-label={`Loading portfolio, ${pct} percent`}
    >
      <div className="absolute inset-0 space-stars opacity-35" />

      <motion.div
        className="absolute w-56 h-56 rounded-full border border-white/[0.06]"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full border border-cyan-glow/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center"
      >
        <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-10">
          VG<span className="text-accent">.</span>
        </p>

        <div className="w-44 sm:w-52 h-[2px] rounded-full bg-white/[0.08] overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent via-cyan-glow to-accent"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35 mt-5">
          Loading experience · {pct}%
        </p>
      </motion.div>
    </motion.div>
  )
}
