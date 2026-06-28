import { useEffect, useRef } from 'react'

export function ScreenPaint() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let mx = 0
    let my = 0
    let px = 0
    let py = 0
    let raf = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.08)'
      ctx.fillRect(0, 0, w, h)

      const dx = mx - px
      const dy = my - py
      const dist = Math.hypot(dx, dy)

      if (dist > 1) {
        const steps = Math.min(12, Math.ceil(dist / 8))
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const x = px + dx * t
          const y = py + dy * t
          const radius = 18 + (1 - t) * 28

          const grad = ctx.createRadialGradient(x, y, 0, x, y, radius)
          grad.addColorStop(0, 'rgba(99, 102, 241, 0.35)')
          grad.addColorStop(0.4, 'rgba(34, 211, 238, 0.15)')
          grad.addColorStop(1, 'rgba(99, 102, 241, 0)')

          ctx.beginPath()
          ctx.fillStyle = grad
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      px = mx
      py = my
      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none opacity-60 mix-blend-screen"
      aria-hidden
    />
  )
}
