import { SectionHeading, FadeIn } from './SectionHeading'
import { skills } from '../data/portfolio'

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-28 px-6 relative">
      <div className="max-w-6xl mx-auto relative">
        <SectionHeading label="Skills" title="Tech Stack" />

        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((group, groupIndex) => (
            <FadeIn key={group.category} delay={groupIndex * 0.06}>
              <div className="glass rounded-xl p-5 h-full border border-white/[0.07] space-card hover:border-cyan-glow/20 transition-colors duration-150">
                <h3 className="font-display text-base font-semibold text-white/80 mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-xs text-white/55 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
