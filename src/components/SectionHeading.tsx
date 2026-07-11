import { type ReactNode } from 'react'
import { SplitHeading } from './SplitHeading'
import { useInViewOnce } from '../hooks/useInViewOnce'

interface SectionHeadingProps {
  label: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ label, title, subtitle, className = '' }: SectionHeadingProps) {
  const { ref, visible } = useInViewOnce<HTMLDivElement>()

  return (
    <div ref={ref} className={`mb-12 reveal ${visible ? 'is-in' : ''} ${className}`}>
      <span className="section-heading-label uppercase">{label}</span>

      <h2 className="section-title mt-3">
        <SplitHeading text={title} className="text-gradient-flow" />
      </h2>

      {subtitle && <p className="mt-3 text-sm text-white/45 max-w-xl">{subtitle}</p>}
    </div>
  )
}

interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function FadeIn({ children, delay = 0, className = '', direction = 'up' }: FadeInProps) {
  const { ref, visible } = useInViewOnce<HTMLDivElement>()
  const dir =
    direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : 'reveal'

  return (
    <div
      ref={ref}
      className={`${dir} ${visible ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}s` : undefined }}
    >
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
}

export function StaggerContainer({ children, className = '' }: StaggerContainerProps) {
  return <div className={className}>{children}</div>
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}
