import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

/** One-shot reveal — no continuous scroll-linked transforms. */
export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
