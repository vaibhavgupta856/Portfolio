import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block text-gradient"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

interface GlitchTextProps {
  children: string
  className?: string
}

export function GlitchText({ children, className = '' }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 text-gradient-flow">{children}</span>
      <span
        className="absolute inset-0 text-cyan-glow/40 translate-x-[2px] animate-glitch-1 select-none text-gradient-flow"
        aria-hidden
      >
        {children}
      </span>
      <span
        className="absolute inset-0 text-accent/40 -translate-x-[2px] animate-glitch-2 select-none text-gradient-flow"
        aria-hidden
      >
        {children}
      </span>
    </span>
  )
}
