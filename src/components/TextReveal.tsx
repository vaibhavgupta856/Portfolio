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
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: delay + i * 0.06,
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

/** Static gradient title — continuous glitch CSS was burning GPU. */
export function GlitchText({ children, className = '' }: GlitchTextProps) {
  return <span className={`text-gradient ${className}`}>{children}</span>
}
