import { GraduationCap, MapPin } from 'lucide-react'
import { SectionHeading, FadeIn } from './SectionHeading'
import { ProfilePhoto } from './ProfilePhoto'
import { summary, education, personalInfo } from '../data/portfolio'
import { SectionSpaceGlow } from './SectionSpaceGlow'

export function About() {
  return (
    <section id="about" className="py-24 md:py-28 px-6 relative">
      <SectionSpaceGlow />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading label="About" title="Background" />

        <div className="grid md:grid-cols-5 gap-10 items-center">
          <FadeIn className="md:col-span-2 flex justify-center md:justify-start">
            <ProfilePhoto src={personalInfo.profileImage} alt={personalInfo.name} size="md" />
          </FadeIn>

          <FadeIn delay={0.15} className="md:col-span-3">
            <div className="glass rounded-2xl p-6 md:p-8 border border-white/[0.07] space-card">
              <p className="text-sm md:text-base text-white/70 leading-relaxed">{summary}</p>

              <div className="mt-6 rounded-xl p-5 bg-white/[0.03] border border-white/[0.06] transition-transform duration-150 hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-500/15">
                    <GraduationCap className="text-cyan-glow" size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white/90">{education.school}</h3>
                    <p className="text-white/45 mt-1 text-sm">{education.degree}</p>
                    <p className="text-xs text-white/35 mt-2 font-mono">
                      {education.period} · CPI {education.gpa}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-white/40">
                <MapPin size={15} className="text-cyan-glow/70 shrink-0" />
                {personalInfo.location}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
