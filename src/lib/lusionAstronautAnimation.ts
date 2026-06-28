import {
  DataTexture,
  FloatType,
  LinearFilter,
  RGBAFormat,
  Vector2,
} from 'three'
import { loadLusionBuf } from './lusionBufLoader'

export const LUSION_BONE_COUNT = 53

export type LusionAnimationAtlas = {
  frameCount: number
  textureSize: Vector2
  positionTexture: DataTexture
  orientTexture: DataTexture
}

/** Build GPU bone atlases exactly like GoalTunnelAstronauts._onAnimationLoad */
export function buildAnimationAtlas(
  position: Float32Array,
  orient: Float32Array,
): LusionAnimationAtlas {
  const pointCount = position.length / 3
  const frameCount = pointCount / LUSION_BONE_COUNT
  const texWidth = Math.ceil(Math.sqrt(pointCount))
  const texHeight = Math.ceil(pointCount / texWidth)
  const texPixels = texWidth * texHeight

  const posData = new Float32Array(texPixels * 4)
  const orientData = new Float32Array(texPixels * 4)

  for (let p = 0, g = 0, v = 0; p < pointCount; p++, g += 3, v += 4) {
    posData[v] = position[g]
    posData[v + 1] = position[g + 1]
    posData[v + 2] = position[g + 2]
    posData[v + 3] = 1
    orientData[v] = orient[v]
    orientData[v + 1] = orient[v + 1]
    orientData[v + 2] = orient[v + 2]
    orientData[v + 3] = orient[v + 3]
  }

  const positionTexture = new DataTexture(posData, texWidth, texHeight, RGBAFormat, FloatType)
  positionTexture.minFilter = LinearFilter
  positionTexture.magFilter = LinearFilter
  positionTexture.needsUpdate = true
  positionTexture.flipY = false

  const orientTexture = new DataTexture(orientData, texWidth, texHeight, RGBAFormat, FloatType)
  orientTexture.minFilter = LinearFilter
  orientTexture.magFilter = LinearFilter
  orientTexture.needsUpdate = true
  orientTexture.flipY = false

  return {
    frameCount,
    textureSize: new Vector2(texWidth, texHeight),
    positionTexture,
    orientTexture,
  }
}

export async function loadLusionLoopAnimation(url: string): Promise<LusionAnimationAtlas> {
  const geometry = await loadLusionBuf(url)
  const position = geometry.getAttribute('position').array as Float32Array
  const orient = geometry.getAttribute('orient').array as Float32Array
  return buildAnimationAtlas(position, orient)
}

export function frameBlendFromProgress(progress: number, frameCount: number): [number, number, number] {
  const t = Math.max(0, Math.min(1, progress))
  const frame = t * (frameCount - 1)
  const from = Math.floor(frame)
  const to = Math.min(from + 1, frameCount - 1)
  return [from, to, frame - from]
}
