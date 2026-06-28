import { useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface StarFieldProps {
  count?: number
  className?: string
}

export function StarField({ count = 80, className = '' }: StarFieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    [count],
  )

  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0.7, 1], [0, -120])
  const y2 = useTransform(scrollYProgress, [0.7, 1], [0, -60])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {stars.slice(0, count / 2).map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
            animate={{ opacity: [star.opacity, star.opacity * 0.3, star.opacity] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {stars.slice(count / 2).map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-cyan-glow/40 blur-[0.5px]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size * 1.5,
              height: star.size * 1.5,
              opacity: star.opacity * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
