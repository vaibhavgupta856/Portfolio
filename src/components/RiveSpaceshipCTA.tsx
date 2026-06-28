import { useCallback, useEffect, useState, type ComponentType, type MouseEvent } from 'react'
import { ErrorBoundary } from './ErrorBoundary'

interface RiveSpaceshipCTAProps {
  label: string
  href: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

function FallbackCTA({ label, href, onClick, className = '', onMouseEnter }: RiveSpaceshipCTAProps & { onMouseEnter?: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`group px-8 py-3.5 rounded-full bg-accent hover:bg-accent-glow font-medium transition-all duration-300 glow-border flex items-center gap-2 font-mono text-sm ${className}`}
    >
      {label}
      <span className="group-hover:translate-x-1 transition-transform">→</span>
    </a>
  )
}

export function RiveSpaceshipCTA(props: RiveSpaceshipCTAProps) {
  const [SpaceshipInner, setSpaceshipInner] = useState<ComponentType<RiveSpaceshipCTAProps> | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)

  const loadSpaceship = useCallback(() => {
    if (SpaceshipInner || loadFailed) return

    import('./SpaceshipInner')
      .then((mod) => setSpaceshipInner(() => mod.SpaceshipInner))
      .catch((err) => {
        console.error('Failed to load Rive spaceship:', err)
        setLoadFailed(true)
      })
  }, [SpaceshipInner, loadFailed])

  useEffect(() => {
    const timer = window.setTimeout(loadSpaceship, 3000)
    return () => window.clearTimeout(timer)
  }, [loadSpaceship])

  if (loadFailed || !SpaceshipInner) {
    return <FallbackCTA {...props} onMouseEnter={loadSpaceship} />
  }

  return (
    <ErrorBoundary fallback={<FallbackCTA {...props} />}>
      <SpaceshipInner {...props} />
    </ErrorBoundary>
  )
}
