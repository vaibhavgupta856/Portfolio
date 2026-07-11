import { motion } from 'framer-motion'
import { SectionHeading, StaggerContainer, staggerItem } from './SectionHeading'
import { skills } from '../data/portfolio'

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-28 px-6 relative">
      <div className="max-w-6xl mx-auto relative">
        <SectionHeading label="Skills" title="Tech Stack" />

        <StaggerContainer className="grid md:grid-cols-2 gap-4">
          {skills.map((group) => (
            <motion.div key={group.category} variants={staggerItem}>
              <div className="glass rounded-xl p-5 h-full border border-white/[0.07] space-card hover:border-cyan-glow/20 transition-colors duration-200">
                <h3 className="font-display text-base font-semibold text-white/80 mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      whileHover={{ y: -2, backgroundColor: 'rgba(56,189,248,0.12)' }}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-xs text-white/55 border border-white/[0.06] cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
