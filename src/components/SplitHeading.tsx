import { motion } from 'framer-motion'

interface SplitHeadingProps {
  text: string
  className?: string
  delay?: number
}

export function SplitHeading({ text, className = '', delay = 0 }: SplitHeadingProps) {
  const words = text.split(' ')

  return (
    <span className={`${className} text-[1em] leading-[inherit]`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-bottom">
          {word.split('').map((char, ci) => (
            <motion.span
              key={`${word}-${wi}-${ci}`}
              initial={{ y: '100%', opacity: 0.85 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: 0.5,
                delay: delay + wi * 0.05 + ci * 0.02,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`inline-block origin-bottom [transform-style:preserve-3d] ${className}`}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}
