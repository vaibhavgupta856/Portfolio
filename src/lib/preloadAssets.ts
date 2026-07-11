import { personalInfo } from '../data/portfolio'

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
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
    { weight: 40, run: preloadFonts },
    { weight: 60, run: () => preloadImage(personalInfo.profileImage) },
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
