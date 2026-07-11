import { motion } from 'framer-motion'

interface ProfilePhotoProps {
  src: string
  alt: string
  size?: 'md' | 'lg'
}

export function ProfilePhoto({ src, alt, size = 'lg' }: ProfilePhotoProps) {
  const dim = size === 'lg' ? 'w-64 h-64 md:w-80 md:h-80' : 'w-48 h-48'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-3 rounded-full bg-gradient-to-r from-accent via-cyan-glow to-accent opacity-55 blur-sm"
      />

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className={`relative ${dim} rounded-full overflow-hidden ring-2 ring-white/10`}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-accent/10 pointer-events-none" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass font-mono text-[10px] text-accent-glow whitespace-nowrap"
      >
        vaibhav@iit-goa ~ $
      </motion.div>

      <motion.div
        animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.15, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]"
      />
    </motion.div>
  )
}
