import { type ReactNode } from 'react'
import { LenisProvider } from '../context/LenisContext'

/** Native scrolling — Lenis disabled to avoid a permanent RAF tax. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return <LenisProvider lenis={null}>{children}</LenisProvider>
}
