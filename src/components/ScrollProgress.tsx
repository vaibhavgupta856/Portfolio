import { useEffect } from 'react'

/** Native scroll progress — no Framer scroll subscription. */
export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress-bar')
    if (!bar) return

    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      bar.style.transform = `scaleX(${Math.min(Math.max(p, 0), 1)})`
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-accent via-cyan-glow to-fuchsia-400 origin-left"
      style={{ transform: 'scaleX(0)' }}
      aria-hidden
    />
  )
}
