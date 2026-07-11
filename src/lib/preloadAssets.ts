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
    { weight: 15, run: preloadFonts },
    { weight: 25, run: () => preloadImage(personalInfo.profileImage) },
    { weight: 30, run: () => preloadFile(CONNECTORS_MODEL) },
    {
      weight: 30,
      run: () =>
        import('../components/ConnectorsScene').then(() => {
          connectorsPreloaded = true
        }),
    },
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
