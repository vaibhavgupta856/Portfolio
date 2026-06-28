import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { areConnectorsPreloaded } from '../lib/preloadAssets'

const LazyConnectorsScene = lazy(() =>
  import('./ConnectorsScene').then((m) => ({ default: m.ConnectorsScene })),
)

function ConnectorsFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
      <div className="w-10 h-10 rounded-full border-2 border-cyan-glow/30 border-t-cyan-glow animate-spin" />
    </div>
  )
}

/** Lusion connectors — semi-transparent hero canvas panel */
export function ConnectorsSectionBackground() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (areConnectorsPreloaded()) {
      setShouldLoad(true)
      return
    }

    const idleTimer = window.setTimeout(() => setShouldLoad(true), 600)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(idleTimer)
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px' },
    )

    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      window.clearTimeout(idleTimer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
      <div className="absolute inset-x-0 top-10 bottom-3 sm:top-12 sm:bottom-5 w-full overflow-hidden opacity-80 ring-1 ring-white/[0.1] pointer-events-auto connectors-frame">
        {shouldLoad ? (
          <ErrorBoundary fallback={null}>
            <Suspense fallback={<ConnectorsFallback />}>
              <LazyConnectorsScene interactive transparentBg compact={false} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <ConnectorsFallback />
        )}
      </div>
    </div>
  )
}

export function SectionSpaceGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <div className="absolute top-1/4 -left-1/4 w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(79,107,255,0.08),transparent_70%)] blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.06),transparent_70%)] blur-3xl" />
    </div>
  )
}
