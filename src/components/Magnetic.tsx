import { type ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = '' }: MagneticProps) {
  return <div className={`transition-transform duration-150 hover:-translate-y-0.5 ${className}`}>{children}</div>
}
