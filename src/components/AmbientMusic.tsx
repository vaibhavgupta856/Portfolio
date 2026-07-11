import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const MUSIC_SRC = `${import.meta.env.BASE_URL}audio/ambient.mp3`
const VOLUME = 0.7

/** Minimal audio toggle — no full-screen gate overlay. */
export function AmbientMusic() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const toggle = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    if (!audio.paused) {
      audio.pause()
      setPlaying(false)
      return
    }

    audio.volume = VOLUME
    try {
      await audio.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }, [])

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="none" playsInline className="sr-only" aria-hidden />
      <button
        type="button"
        onClick={toggle}
        className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-3.5 py-2.5 rounded-full glass border border-white/[0.1] text-white/60 hover:text-cyan-glow hover:border-cyan-glow/30 transition-colors pointer-events-auto"
        aria-label={playing ? 'Mute ambient music' : 'Play ambient music'}
        aria-pressed={playing}
      >
        {playing ? <Volume2 size={16} className="text-cyan-glow" /> : <VolumeX size={16} />}
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] hidden sm:inline">
          {playing ? 'Sound on' : 'Sound off'}
        </span>
      </button>
    </>
  )
}
