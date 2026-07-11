import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

/** Light hover lift — no continuous spring tracking. */
export function Magnetic({ children, className = '' }: MagneticProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.div>
  )
}
