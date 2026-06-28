import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { LenisProvider } from '../context/LenisContext'

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.25,
      wheelMultiplier: 1,
      autoRaf: false,
    })

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    setLenis(instance)

    let frame = 0
    const raf = (time: number) => {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisProvider lenis={lenis}>{children}</LenisProvider>
}
