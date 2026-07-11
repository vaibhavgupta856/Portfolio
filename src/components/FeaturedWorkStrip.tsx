import { ArrowUpRight, ExternalLink, Github } from 'lucide-react'
import { projects, type Project } from '../data/portfolio'
import { SplitHeading } from './SplitHeading'
import { FadeIn } from './SectionHeading'
import { SectionSpaceGlow } from './SectionSpaceGlow'

function ProjectCard({ project }: { project: Project }) {
  const hasLinks = Boolean(project.github || project.demo)

  return (
    <article className="h-full glass rounded-xl p-5 md:p-6 border border-white/[0.07] hover:border-cyan-glow/25 transition-colors duration-150 group tech-card space-card flex flex-col">
      <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${project.gradient} mb-4`} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-glow/50 mb-1.5">
            {project.period}
          </p>
          <h3 className="font-display text-lg md:text-xl font-bold text-white leading-snug">
            {project.name}
          </h3>
          <p className="text-sm text-white/45 mt-0.5">{project.subtitle}</p>
        </div>
        {hasLinks && (
          <ArrowUpRight
            size={18}
            className="text-white/25 shrink-0 mt-1 group-hover:text-cyan-glow transition-colors"
          />
        )}
      </div>

      <p className="text-xs text-white/60 leading-relaxed mt-3 line-clamp-2">{project.description}</p>

      <ul className="mt-3 space-y-1.5">
        {project.highlights.slice(0, 2).map((h) => (
          <li key={h} className="flex gap-2 text-[11px] text-white/40 leading-snug">
            <span className="text-cyan-glow/70 shrink-0">·</span>
            <span className="line-clamp-1">{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.04] text-white/35 border border-white/[0.06]"
          >
            {t}
          </span>
        ))}
      </div>

      {hasLinks && (
        <div className="mt-auto pt-4 flex flex-wrap gap-2">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/90 hover:bg-accent-glow text-[11px] font-mono uppercase tracking-wider text-white transition-colors"
            >
              <ExternalLink size={12} />
              Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/[0.1] hover:border-cyan-glow/35 text-[11px] font-mono uppercase tracking-wider text-white/60 hover:text-cyan-glow transition-colors"
            >
              <Github size={12} />
              GitHub
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export function FeaturedWorkStrip() {
  return (
    <section id="projects" className="py-24 md:py-28 px-6 relative overflow-hidden">
      <SectionSpaceGlow />

      <div className="max-w-6xl mx-auto relative">
        <FadeIn>
          <p className="section-heading-label uppercase mb-3">Projects</p>
          <h2 className="section-title mb-10">
            <SplitHeading text="Featured Work" className="text-gradient-flow" />
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {projects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 0.04}>
              <div className="h-full transition-transform duration-150 hover:-translate-y-1">
                <ProjectCard project={project} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
