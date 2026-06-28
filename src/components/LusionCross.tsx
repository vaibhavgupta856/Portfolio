interface LusionCrossProps {
  className?: string
  color?: 'white' | 'black' | 'muted'
  style?: React.CSSProperties
}

export function LusionCross({ className = '', color = 'white', style }: LusionCrossProps) {
  const bar =
    color === 'black'
      ? 'bg-black'
      : color === 'muted'
        ? 'bg-white/25'
        : 'bg-white'

  return (
    <span
      className={`relative inline-block w-[var(--cross-size,0.875rem)] h-[var(--cross-size,0.875rem)] ${className}`}
      style={style}
    >
      <span className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] ${bar}`} />
      <span className={`absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full ${bar}`} />
    </span>
  )
}

interface LusionCrossRowProps {
  count?: number
  className?: string
  color?: 'white' | 'black' | 'muted'
}

export function LusionCrossRow({ count = 4, className = '', color = 'muted' }: LusionCrossRowProps) {
  return (
    <div className={`relative w-full h-[var(--cross-size,0.875rem)] ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <LusionCross
          key={i}
          color={color}
          className="absolute top-0"
          style={{
            left:
              i === 0
                ? 0
                : i === count - 1
                  ? 'calc(100% - var(--cross-size, 0.875rem))'
                  : `calc(${((100 / (count - 1)) * i).toFixed(3)}% - var(--cross-size, 0.875rem) / 2)`,
          }}
        />
      ))}
    </div>
  )
}
