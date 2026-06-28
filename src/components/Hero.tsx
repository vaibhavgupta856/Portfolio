import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, Code2, Zap, FileText } from 'lucide-react'
import { personalInfo, stats } from '../data/portfolio'
import { ProfilePhoto } from './ProfilePhoto'
import { GlitchText } from './TextReveal'
import { RiveSpaceshipCTA } from './RiveSpaceshipCTA'
import { LusionScrollIndicator } from './LusionDecor'
import { Magnetic } from './Magnetic'
import { ConnectorsSectionBackground } from './ConnectorsHeroBackground'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center px-4 sm:px-6 pt-20 overflow-hidden"
    >
      <ConnectorsSectionBackground />

      <div className="max-w-6xl mx-auto w-full relative z-10 pointer-events-none">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="text-center lg:text-left order-2 lg:order-1 pointer-events-none rounded-2xl p-6 md:p-8 text-panel border border-white/[0.06]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-glow/60 mb-5"
            >
              {personalInfo.title}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-[0.02em] leading-[0.95]"
            >
              <span className="text-gradient">{personalInfo.name.split(' ')[0]}</span>
              <br />
              <GlitchText className="text-white/95">
                {personalInfo.name.split(' ')[1]}
              </GlitchText>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-5 text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed text-white/70"
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 pointer-events-auto"
            >
              <Magnetic>
                <RiveSpaceshipCTA
                  label="View Experience"
                  href="#experience"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                />
              </Magnetic>
              <Magnetic strength={0.12}>
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="px-7 py-3 rounded-full glass hover:bg-white/[0.06] font-medium transition-colors duration-150 flex items-center gap-2 font-mono text-sm border border-white/[0.08]"
                >
                  <FileText size={16} />
                  Resume
                </a>
              </Magnetic>
              <Magnetic strength={0.12}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  data-cursor="hover"
                  className="px-7 py-3 rounded-full glass hover:bg-white/[0.06] font-medium transition-colors duration-150 flex items-center gap-2 font-mono text-sm border border-white/[0.08]"
                >
                  <Mail size={16} />
                  Contact
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-5 pointer-events-auto"
            >
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-cyan-glow transition-colors"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-cyan-glow transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
              <a
                href={personalInfo.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-cyan-glow transition-colors"
                aria-label="LeetCode"
              >
                <Code2 size={22} />
              </a>
              <a
                href={personalInfo.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-cyan-glow transition-colors"
                aria-label="Codeforces"
              >
                <Zap size={22} />
              </a>
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/35 hover:text-cyan-glow transition-colors"
                aria-label="Resume"
              >
                <FileText size={22} />
              </a>
            </motion.div>
          </div>

          <motion.div style={{ scale: photoScale }} className="order-1 lg:order-2 flex justify-center pointer-events-auto">
            <ProfilePhoto src={personalInfo.profileImage} alt={personalInfo.name} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-14 grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 pointer-events-auto"
        >
          {stats.map((stat, i) => {
            const card = (
              <>
                <div className="font-display text-xl md:text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-[10px] text-white/35 mt-1 font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </>
            )

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.08 }}
                className={`glass rounded-xl p-4 text-center border border-white/[0.06] ${
                  'href' in stat && stat.href ? 'hover:border-cyan-glow/25 transition-colors' : ''
                }`}
              >
                {'href' in stat && stat.href ? (
                  <a
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="block hover:opacity-90 transition-opacity"
                    aria-label={`${stat.label} profile`}
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <LusionScrollIndicator />
    </section>
  )
}
