import { useEffect, useRef, useState, type RefObject } from 'react'

/** One-shot IntersectionObserver — disconnects after first show (no permanent scroll tax). */
export function useInViewOnce<T extends HTMLElement>(
  rootMargin = '0px 0px -8% 0px',
): { ref: RefObject<T>; visible: boolean } {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return

    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setVisible(true)
        io.disconnect()
      },
      { rootMargin, threshold: 0.1 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [visible, rootMargin])

  return { ref: ref as RefObject<T>, visible }
}
