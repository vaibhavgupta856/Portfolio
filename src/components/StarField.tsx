import { useMemo } from 'react'

interface StarFieldProps {
  count?: number
  className?: string
}

/** Static stars — no per-dot Framer loops (those crush FPS). */
export function StarField({ count = 60, className = '' }: StarFieldProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: (i * 47) % 100,
        y: (i * 31) % 100,
        size: (i % 3) + 1,
        opacity: 0.2 + (i % 5) * 0.1,
      })),
    [count],
  )

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}
