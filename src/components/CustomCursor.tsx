import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (!finePointer) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const move = (x: number, y: number) => {
      const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      if (dotRef.current) dotRef.current.style.transform = transform
      if (ringRef.current) ringRef.current.style.transform = transform
    }

    const onMove = (e: MouseEvent) => {
      move(e.clientX, e.clientY)
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      setHovering(!!target?.closest('a, button, [data-cursor="hover"]'))
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  if (!enabled) return null

  const ringSize = hovering ? 52 : clicking ? 28 : 36

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[200] pointer-events-none mix-blend-difference will-change-transform"
        style={{
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      >
        <div
          className="rounded-full bg-white"
          style={{
            width: clicking ? 5 : hovering ? 6 : 8,
            height: clicking ? 5 : hovering ? 6 : 8,
          }}
        />
      </div>

      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[199] pointer-events-none rounded-full border border-white/40 will-change-transform"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: hovering ? 0.9 : 0.55,
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
        }}
      />
    </>
  )
}
