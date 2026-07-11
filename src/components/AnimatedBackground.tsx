import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute -top-1/3 left-1/4 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(79,107,255,0.35) 0%, transparent 65%)',
        }}
        animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.25) 0%, transparent 65%)',
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />
      <div className="absolute inset-0 space-stars opacity-30 animate-[star-drift_80s_linear_infinite]" />
    </div>
  )
}
