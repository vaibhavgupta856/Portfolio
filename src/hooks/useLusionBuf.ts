import { useLoader } from '@react-three/fiber'
import type { BufferGeometry } from 'three'
import { LusionBufLoader } from '../lib/lusionBufLoader'

export function useLusionBuf(url: string): BufferGeometry {
  return useLoader(LusionBufLoader, url)
}
