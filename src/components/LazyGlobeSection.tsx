import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const GlobeSection = lazy(() =>
  import('./GlobeSection').then((m) => ({ default: m.GlobeSection })),
)

export function LazyGlobeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="min-h-[480px]">
      {shouldLoad ? (
        <Suspense
          fallback={
            <div className="py-24 px-6 text-center text-white/40 font-mono">
              Loading globe...
            </div>
          }
        >
          <GlobeSection />
        </Suspense>
      ) : (
        <div className="py-24 px-6 text-center text-white/20 font-mono text-sm">
          Scroll to explore globe
        </div>
      )}
    </div>
  )
}
