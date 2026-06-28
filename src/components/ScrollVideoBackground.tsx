import { useEffect, useRef } from 'react'
import universeVideo from '../../Stunning New Universe Fly-Through Really Puts Things Into Perspective(1080P_HD).webm'

const PLAYBACK_RATE = 5

/** Simple looping background — no scroll listeners (those caused stutter). */
export function ScrollVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.playsInline = true
    video.loop = true
    video.playbackRate = PLAYBACK_RATE

    const play = () => {
      video.playbackRate = PLAYBACK_RATE
      void video.play().catch(() => {})
    }

    const onVisibility = () => {
      if (document.hidden) video.pause()
      else play()
    }

    video.addEventListener('loadedmetadata', play)
    document.addEventListener('visibilitychange', onVisibility)
    if (video.readyState >= 1) play()

    return () => {
      video.removeEventListener('loadedmetadata', play)
      document.removeEventListener('visibilitychange', onVisibility)
      video.pause()
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none" aria-hidden>
      <video
        ref={videoRef}
        src={universeVideo}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#030014]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/48 via-[#030014]/22 to-[#030014]/44" />
    </div>
  )
}
