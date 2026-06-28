import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { personalInfo } from '../data/portfolio'
import { SplitHeading } from './SplitHeading'
import { StarField } from './StarField'
import { LusionEndCrosses } from './LusionDecor'

export function FinaleSection() {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  const contentY = useTransform(scrollYProgress, [0, 0.6], [80, 0])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <section
      id="finale"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-[#050818] to-[#030014]" />
      <StarField count={120} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">
        {/* end-section-content */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative text-center"
        >
          <LusionEndCrosses />

          {/* end-section-subtitle */}
          <motion.a
            href={`mailto:${personalInfo.email}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="block section-heading-label hover:opacity-90 transition-opacity"
          >
            <SplitHeading text="Let's Connect" className="text-gradient" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
