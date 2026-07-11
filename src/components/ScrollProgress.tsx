import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-accent via-cyan-glow to-fuchsia-400"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
