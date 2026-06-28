import { createContext, useContext, type ReactNode } from 'react'
import type Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ lenis, children }: { lenis: Lenis | null; children: ReactNode }) {
  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}
