import { motion } from 'framer-motion'
import { Code2, Zap, Mail, Phone, MapPin, Github, Linkedin, FileText } from 'lucide-react'
import { SectionHeading, FadeIn } from './SectionHeading'
import { achievements, personalInfo } from '../data/portfolio'
import { SectionSpaceGlow } from './SectionSpaceGlow'

const iconMap = {
  code: Code2,
  zap: Zap,
}

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-28 px-6 relative">
      <SectionSpaceGlow />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading label="Contact" title="Get in Touch" />

        <div className="grid md:grid-cols-2 gap-8">
          <FadeIn>
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/[0.07] h-full space-card">
              <div className="space-y-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors group"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-500/15">
                    <Mail size={18} className="text-cyan-glow" />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/35 uppercase tracking-wider">Email</div>
                    <div className="text-white/75 text-sm">{personalInfo.email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-500/15">
                    <Phone size={18} className="text-cyan-glow" />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/35 uppercase tracking-wider">Phone</div>
                    <div className="text-white/75 text-sm">{personalInfo.phone}</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03]">
                  <div className="p-2.5 rounded-lg bg-indigo-500/15">
                    <MapPin size={18} className="text-cyan-glow" />
                  </div>
                  <div>
                    <div className="text-[10px] text-white/35 uppercase tracking-wider">Location</div>
                    <div className="text-white/75 text-sm">{personalInfo.location}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-white/[0.06] transition-colors text-white/50 hover:text-cyan-glow"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-white/[0.06] transition-colors text-white/50 hover:text-cyan-glow"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-white/[0.06] transition-colors text-white/50 hover:text-cyan-glow"
                  aria-label="LeetCode"
                >
                  <Code2 size={20} />
                </a>
                <a
                  href={personalInfo.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-white/[0.06] transition-colors text-white/50 hover:text-cyan-glow"
                  aria-label="Codeforces"
                >
                  <Zap size={20} />
                </a>
                <a
                  href={personalInfo.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:bg-white/[0.06] transition-colors text-white/50 hover:text-cyan-glow"
                  aria-label="Resume"
                >
                  <FileText size={20} />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-3">
              {achievements.map((item, i) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap]
                const inner = (
                  <>
                    <div className="p-2.5 rounded-lg bg-indigo-500/15">
                      <Icon size={20} className="text-cyan-glow" />
                    </div>
                    <div>
                      <div className="text-xs text-white/35">{item.title}</div>
                      <div className="font-display text-lg font-bold text-gradient">{item.value}</div>
                    </div>
                  </>
                )
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-xl glass border border-white/[0.06] overflow-hidden"
                  >
                    {'href' in item && item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 hover:bg-white/[0.04] transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-4">{inner}</div>
                    )}
                  </motion.div>
                )
              })}

              <motion.a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full mt-2 py-3.5 rounded-xl glass border border-white/[0.08] font-semibold text-sm tracking-wide text-white/75 hover:text-cyan-glow hover:border-cyan-glow/25 transition-colors"
              >
                <FileText size={16} />
                View Resume
              </motion.a>

              <motion.a
                href={`mailto:${personalInfo.email}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600/80 text-center font-semibold text-sm tracking-wide"
              >
                Send Message
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
