import universeVideo from '../../Stunning New Universe Fly-Through Really Puts Things Into Perspective(1080P_HD).webm'
import { personalInfo } from '../data/portfolio'

const CONNECTORS_MODEL = `${import.meta.env.BASE_URL}models/connectors.glb`

let connectorsPreloaded = false

export function areConnectorsPreloaded() {
  return connectorsPreloaded
}

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

function preloadFile(url: string): Promise<void> {
  return fetch(url, { cache: 'force-cache' })
    .then(() => undefined)
    .catch(() => undefined)
}

function preloadVideo(src: string, timeoutMs = 8000): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.muted = true
    video.preload = 'auto'
    video.playsInline = true

    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      video.src = ''
      video.load()
      resolve()
    }

    const timer = window.setTimeout(finish, timeoutMs)

    video.addEventListener('canplay', () => {
      window.clearTimeout(timer)
      finish()
    })
    video.addEventListener('error', () => {
      window.clearTimeout(timer)
      finish()
    })

    video.src = src
    video.load()
  })
}

function preloadFonts(): Promise<void> {
  if (document.fonts?.ready) {
    return document.fonts.ready.then(() => undefined).catch(() => undefined)
  }
  return Promise.resolve()
}

type WeightedTask = {
  weight: number
  run: () => Promise<unknown>
}

export async function preloadCriticalAssets(onProgress: (value: number) => void): Promise<void> {
  const tasks: WeightedTask[] = [
    { weight: 10, run: preloadFonts },
    { weight: 15, run: () => preloadImage(personalInfo.profileImage) },
    { weight: 20, run: () => preloadFile(CONNECTORS_MODEL) },
    {
      weight: 20,
      run: () =>
        import('../components/ConnectorsScene').then(() => {
          connectorsPreloaded = true
        }),
    },
    { weight: 35, run: () => preloadVideo(universeVideo) },
  ]

  const total = tasks.reduce((sum, task) => sum + task.weight, 0)
  let completed = 0

  await Promise.all(
    tasks.map(async (task) => {
      try {
        await task.run()
      } catch {
        /* non-fatal */
      }
      completed += task.weight
      onProgress(Math.min(completed / total, 0.99))
    }),
  )

  onProgress(1)
}

export { universeVideo }
