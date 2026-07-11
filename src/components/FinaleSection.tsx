import { personalInfo } from '../data/portfolio'
import { SplitHeading } from './SplitHeading'
import { LusionEndCrosses } from './LusionDecor'

export function FinaleSection() {
  return (
    <section
      id="finale"
      className="relative min-h-[70vh] flex flex-col items-center justify-center pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-[#050818] to-[#030014]" />
      <div className="absolute inset-0 space-stars opacity-20" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20">
        <div className="relative text-center">
          <LusionEndCrosses />
          <a
            href={`mailto:${personalInfo.email}`}
            className="block section-heading-label hover:opacity-90 transition-opacity"
          >
            <SplitHeading text="Let's Connect" className="text-gradient" />
          </a>
        </div>
      </div>
    </section>
  )
}
