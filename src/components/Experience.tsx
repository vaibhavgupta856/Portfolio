import { Briefcase, MapPin } from 'lucide-react'
import { SectionHeading, FadeIn } from './SectionHeading'
import { experience } from '../data/portfolio'
import { SectionSpaceGlow } from './SectionSpaceGlow'

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-28 px-6 relative">
      <SectionSpaceGlow />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading label="Experience" title="Work History" />

        <div className="relative">
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-cyan-glow/40 via-indigo-400/20 to-transparent" />

          <div className="space-y-10">
            {experience.map((job, index) => (
              <FadeIn key={`${job.company}-${job.period}`} delay={index * 0.08}>
                <div
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />

                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div className="w-9 h-9 rounded-full bg-[#030014] border border-cyan-glow/40 flex items-center justify-center">
                      <Briefcase size={14} className="text-cyan-glow" />
                    </div>
                  </div>

                  <div
                    className={`md:w-1/2 ml-14 md:ml-0 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="glass rounded-xl p-5 md:p-6 border border-white/[0.07] hover:border-cyan-glow/20 transition-colors space-card">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className="font-mono text-[10px] text-cyan-glow/80 px-2 py-0.5 rounded-full bg-cyan-glow/10">
                          {job.period}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-white/35">
                          <MapPin size={11} />
                          {job.location}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white/90">{job.role}</h3>
                      <p className="text-sm text-white/45 mt-0.5">{job.company}</p>

                      <ul className="mt-3 space-y-2">
                        {job.highlights.map((point, i) => (
                          <li key={i} className="flex gap-2 text-xs text-white/50 leading-relaxed">
                            <span className="text-cyan-glow/60 shrink-0">·</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
