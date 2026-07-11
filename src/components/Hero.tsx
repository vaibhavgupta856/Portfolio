import { Github, Linkedin, Mail, Code2, Zap, FileText } from 'lucide-react'
import { personalInfo, stats } from '../data/portfolio'
import { ProfilePhoto } from './ProfilePhoto'
import { GlitchText } from './TextReveal'
import { LusionScrollIndicator } from './LusionDecor'
import { SectionSpaceGlow } from './SectionSpaceGlow'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center px-4 sm:px-6 pt-20 overflow-hidden"
    >
      <SectionSpaceGlow />

      <div className="max-w-6xl mx-auto w-full relative z-10 pointer-events-none">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left order-2 lg:order-1 pointer-events-none rounded-2xl p-6 md:p-8 text-panel border border-white/[0.06]">
            <p
              className="hero-enter font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-glow/60 mb-5"
              style={{ ['--enter-delay' as string]: '80ms' }}
            >
              {personalInfo.title}
            </p>

            <h1
              className="hero-enter font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-5"
              style={{ ['--enter-delay' as string]: '160ms' }}
            >
              <GlitchText>{personalInfo.name}</GlitchText>
            </h1>

            <p
              className="hero-enter text-white/55 text-base md:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed mb-2"
              style={{ ['--enter-delay' as string]: '260ms' }}
            >
              {personalInfo.tagline}
            </p>

            <div
              className="hero-enter mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 pointer-events-auto"
              style={{ ['--enter-delay' as string]: '360ms' }}
            >
              <a
                href="#experience"
                data-cursor="hover"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group px-8 py-3.5 rounded-full bg-accent hover:bg-accent-glow font-medium transition-[colors,transform] duration-200 hover:-translate-y-0.5 glow-border flex items-center gap-2 font-mono text-sm"
              >
                View Experience
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href={personalInfo.resume}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="px-7 py-3 rounded-full glass hover:bg-white/[0.06] font-medium transition-[colors,transform] duration-200 hover:-translate-y-0.5 flex items-center gap-2 font-mono text-sm border border-white/[0.08]"
              >
                <FileText size={16} />
                Resume
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                data-cursor="hover"
                className="px-7 py-3 rounded-full glass hover:bg-white/[0.06] font-medium transition-[colors,transform] duration-200 hover:-translate-y-0.5 flex items-center gap-2 font-mono text-sm border border-white/[0.08]"
              >
                <Mail size={16} />
                Contact
              </a>
            </div>

            <div
              className="hero-enter mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-5 pointer-events-auto"
              style={{ ['--enter-delay' as string]: '460ms' }}
            >
              {[
                { href: personalInfo.github, label: 'GitHub', Icon: Github },
                { href: personalInfo.linkedin, label: 'LinkedIn', Icon: Linkedin },
                { href: personalInfo.leetcode, label: 'LeetCode', Icon: Code2 },
                { href: personalInfo.codeforces, label: 'Codeforces', Icon: Zap },
                { href: personalInfo.resume, label: 'Resume', Icon: FileText },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/35 hover:text-cyan-glow transition-[colors,transform] duration-200 hover:-translate-y-0.5"
                >
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          <div
            className="hero-enter order-1 lg:order-2 flex justify-center pointer-events-auto"
            style={{ ['--enter-delay' as string]: '200ms' }}
          >
            <ProfilePhoto src={personalInfo.profileImage} alt={personalInfo.name} />
          </div>
        </div>

        <div
          className="hero-enter mt-14 grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 pointer-events-auto"
          style={{ ['--enter-delay' as string]: '560ms' }}
        >
          {stats.map((stat) => {
            const card = (
              <>
                <div className="font-display text-xl md:text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-[10px] text-white/35 mt-1 font-mono uppercase tracking-wider">
                  {stat.label}
                </div>
              </>
            )

            return (
              <div
                key={stat.label}
                className={`glass rounded-xl p-4 text-center border border-white/[0.06] transition-transform duration-200 hover:-translate-y-1 ${
                  'href' in stat && stat.href ? 'hover:border-cyan-glow/25' : ''
                }`}
              >
                {'href' in stat && stat.href ? (
                  <a
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="block"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            )
          })}
        </div>
      </div>

      <LusionScrollIndicator />
    </section>
  )
}
