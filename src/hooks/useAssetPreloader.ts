import { useEffect, useState } from 'react'
import { preloadCriticalAssets } from '../lib/preloadAssets'

const MIN_LOAD_MS = 700
const FADE_DELAY_MS = 250

export function useAssetPreloader() {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const minDelay = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MIN_LOAD_MS)
    })

    const assets = preloadCriticalAssets((value) => {
      if (!cancelled) setProgress(value)
    })

    Promise.all([minDelay, assets]).then(() => {
      if (cancelled) return
      setProgress(1)
      window.setTimeout(() => {
        if (!cancelled) setReady(true)
      }, FADE_DELAY_MS)
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (ready) {
      document.body.style.overflow = ''
    } else {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [ready])

  return { progress, ready }
}
