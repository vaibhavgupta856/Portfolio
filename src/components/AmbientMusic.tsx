import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const MUSIC_SRC = `${import.meta.env.BASE_URL}audio/ambient.mp3`
const VOLUME = 0.9
const ENTERED_KEY = 'portfolio-entered'

type MusicContextValue = {
  unlock: () => void
}

const MusicContext = createContext<MusicContextValue | null>(null)

export function useMusicUnlock() {
  return useContext(MusicContext)
}

function MusicControls() {
  const [soundOn, setSoundOn] = useState(true)
  const [showGate, setShowGate] = useState(() => {
    try {
      return sessionStorage.getItem(ENTERED_KEY) !== '1'
    } catch {
      return true
    }
  })
  const [audible, setAudible] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const soundOnRef = useRef(true)
  const audibleRef = useRef(false)

  const markAudible = useCallback(() => {
    audibleRef.current = true
    setAudible(true)
    setShowGate(false)
    try {
      sessionStorage.setItem(ENTERED_KEY, '1')
    } catch {
      /* ignore */
    }
  }, [])

  const unlock = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !soundOnRef.current || audibleRef.current) return

    audio.muted = false
    audio.volume = VOLUME
    audio.play()?.then(() => markAudible()).catch(() => {})
  }, [markAudible])

  const unlockRef = useRef(unlock)
  unlockRef.current = unlock

  useEffect(() => {
    const onGesture = () => unlockRef.current()
    window.addEventListener('pointerdown', onGesture, { capture: true })
    window.addEventListener('wheel', onGesture, { capture: true, passive: true })
    window.addEventListener('keydown', onGesture, { capture: true })
    return () => {
      window.removeEventListener('pointerdown', onGesture, { capture: true })
      window.removeEventListener('wheel', onGesture, { capture: true })
      window.removeEventListener('keydown', onGesture, { capture: true })
    }
  }, [])

  const dismissGate = useCallback(() => {
    unlockRef.current()
    setShowGate(false)
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (soundOnRef.current) {
      soundOnRef.current = false
      audibleRef.current = false
      setAudible(false)
      setSoundOn(false)
      audio.pause()
      return
    }

    soundOnRef.current = true
    setSoundOn(true)
    unlock()
  }, [unlock])

  return (
    <MusicContext.Provider value={{ unlock }}>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        playsInline
        preload="none"
        className="sr-only"
        aria-hidden
      />

      <AnimatePresence>
        {showGate && !audible && soundOn && (
          <motion.div
            key="sound-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[58] flex items-end justify-center pb-28 sm:pb-32"
            onPointerDown={dismissGate}
            onWheel={dismissGate}
            aria-hidden
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45 pointer-events-none select-none">
              Scroll or click to enter
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={toggle}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-3.5 py-2.5 rounded-full glass border border-white/[0.1] text-white/60 hover:text-cyan-glow hover:border-cyan-glow/30 transition-colors pointer-events-auto"
        aria-label={soundOn ? 'Mute ambient music' : 'Play ambient music'}
        aria-pressed={soundOn}
        data-cursor="hover"
      >
        {soundOn ? <Volume2 size={16} className="text-cyan-glow" /> : <VolumeX size={16} />}
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] hidden sm:inline">
          {soundOn ? 'Sound on' : 'Sound off'}
        </span>
      </motion.button>
    </MusicContext.Provider>
  )
}

export function AmbientMusic() {
  return <MusicControls />
}
