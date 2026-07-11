import { type ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
}

/** No Framer scroll observers — sections paint immediately. */
export function ScrollReveal({ children, className = '' }: ScrollRevealProps) {
  return <div className={className}>{children}</div>
}
