import { useLoader } from '@react-three/fiber'
import type { LusionAnimationAtlas } from '../lib/lusionAstronautAnimation'
import { LusionAnimationLoader } from '../lib/lusionAnimationLoader'

export function useLusionAnimation(url: string): LusionAnimationAtlas {
  return useLoader(LusionAnimationLoader, url)
}
