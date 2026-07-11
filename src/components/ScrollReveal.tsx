import { type ReactNode } from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

/** CSS transform/opacity reveal — observer disconnects after first paint. */
export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  const { ref, visible } = useInViewOnce<HTMLDivElement>()

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-in' : ''} ${className}`}>
      {children}
    </div>
  )
}
