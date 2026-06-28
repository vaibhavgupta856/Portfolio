import { FadeIn } from './SectionHeading'
import { SplitHeading } from './SplitHeading'
import { LusionCTA } from './LusionCTA'
import { summary } from '../data/portfolio'

export function ReelSection() {
  return (
    <section id="reel" className="py-20 md:py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h2 className="font-display text-[clamp(2.75rem,10vw,6rem)] font-extrabold leading-[0.95] tracking-tight mb-16 md:mb-24">
            <span className="block md:pl-[calc(16.666%+0.5rem)]">
              <SplitHeading text="Bold Ideas," className="text-white/90" />
            </span>
            <span className="block mt-1">
              <SplitHeading text="Brought to Life" className="text-gradient" delay={0.08} />
            </span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-12 gap-10 md:gap-6">
          <FadeIn delay={0.1} className="md:col-start-7 md:col-span-6">
            <p className="text-white/55 text-base md:text-xl leading-relaxed">{summary}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <LusionCTA
                label="My approach"
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
              <LusionCTA
                label="View projects"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
