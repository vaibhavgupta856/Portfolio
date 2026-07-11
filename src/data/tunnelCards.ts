import { experience, projects, stats } from './portfolio'

export type TunnelCard = {
  id: string
  tag: string
  title: string
  subtitle: string
  period: string
  description: string
  bullets: string[]
  gradient: string
  scroll: [number, number, number]
  position: 'left' | 'right' | 'center'
  offsetY: string
  github?: string
}

const projectTags = [
  'Featured Project',
  'AI Tooling',
  '3D Multiplayer',
  'Full Stack',
  'Systems & FPGA',
]

function buildRawCards(): Omit<TunnelCard, 'scroll' | 'offsetY' | 'position'>[] {
  const projectEntries = projects.map((project, index) => ({
    id: project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    tag: projectTags[index] ?? 'Project',
    title: project.name,
    subtitle: project.subtitle,
    period: project.period,
    description: project.description,
    bullets: project.highlights,
    gradient: project.gradient,
    github: project.github,
  }))

  const experienceEntries = [
    {
      id: 'siemens-rd',
      tag: 'Experience',
      title: experience[0].company,
      subtitle: experience[0].role,
      period: experience[0].period,
      description: experience[0].highlights[0],
      bullets: experience[0].highlights.slice(1),
      gradient: 'from-violet-500 via-indigo-500 to-blue-400',
    },
    {
      id: 'siemens-se',
      tag: 'Experience',
      title: experience[1].company,
      subtitle: experience[1].role,
      period: experience[1].period,
      description: experience[1].highlights[0],
      bullets: experience[1].highlights.slice(1),
      gradient: 'from-sky-500 via-blue-500 to-indigo-400',
    },
    {
      id: 'mercor',
      tag: 'Competitive Programming',
      title: experience[2].company,
      subtitle: experience[2].role,
      period: experience[2].period,
      description: experience[2].highlights[0],
      bullets: [
        ...experience[2].highlights.slice(1),
        `${stats[0].label}: ${stats[0].value} ${stats[0].suffix}`,
        `${stats[1].label}: ${stats[1].value} ${stats[1].suffix}`,
      ],
      gradient: 'from-amber-500 via-orange-500 to-rose-400',
    },
  ]

  return [...projectEntries, ...experienceEntries]
}

/** One card visible at a time — evenly spaced scroll slots */
function assignScrollSlots(
  cards: Omit<TunnelCard, 'scroll' | 'offsetY' | 'position'>[],
): TunnelCard[] {
  const count = cards.length
  const slot = 1 / count
  const pad = slot * 0.12

  return cards.map((card, i) => {
    const slotStart = i * slot
    const slotEnd = (i + 1) * slot
    return {
      ...card,
      scroll: [slotStart + pad * 0.3, slotStart + slot * 0.5, slotEnd - pad * 0.3],
      position: i % 2 === 0 ? 'left' : 'right',
      offsetY: '42%',
    }
  })
}

export const tunnelCards: TunnelCard[] = assignScrollSlots(buildRawCards())
