import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { tunnelCards } from '../data/tunnelCards'
import { SplitHeading } from './SplitHeading'
import { ScrollDetailCard } from './LusionDetailCard'
import { LusionCrossRow } from './LusionCross'

export function SpacemanTunnelSection() {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const titleOpacity = useTransform(scrollYProgress, [0, 0.06, 0.14, 0.22], [1, 1, 0.95, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.18], [0, -100])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04, 0.1, 0.16], [0, 1, 1, 0])
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="tunnel"
      ref={containerRef}
      className="relative"
      style={{ height: 'min(700vh, 5200px)' }}
    >
      <div className="sticky top-0 h-[100svh] overflow-x-hidden overflow-y-visible bg-[#030308]">
        <div className="absolute inset-0 space-stars opacity-40 pointer-events-none" />
        <div className="absolute inset-0 tunnel-vignette pointer-events-none z-[6]" />

        <div className="absolute top-6 inset-x-[8%] z-20 pointer-events-none">
          <LusionCrossRow count={5} />
        </div>

        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-32 w-px bg-white/[0.08] z-20 hidden md:block">
          <motion.div
            style={{ height: progressBar }}
            className="w-full bg-gradient-to-b from-accent via-cyan-glow to-transparent origin-top"
          />
        </div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-x-0 top-[10%] z-20 px-6 text-center pointer-events-none"
        >
          <p className="section-heading-label uppercase">Tunnel</p>
          <h2 className="section-title mt-3 max-w-3xl mx-auto">
            <SplitHeading text="Summary" className="text-gradient-flow" />
          </h2>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 z-20 pointer-events-none"
        >
          Scroll
        </motion.p>

        <div className="absolute inset-x-0 top-[8%] bottom-[8%] z-[18]">
          {tunnelCards.map((card) => (
            <ScrollDetailCard key={card.id} card={card} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#030308] via-[#030308]/80 to-transparent pointer-events-none z-[16]" />
      </div>
    </section>
  )
}
