import { type ReactNode } from 'react'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

/** Passthrough — magnetic springs were adding lag on hover. */
export function Magnetic({ children, className = '' }: MagneticProps) {
  return <div className={className}>{children}</div>
}
