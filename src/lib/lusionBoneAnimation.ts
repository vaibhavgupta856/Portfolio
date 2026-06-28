import { Quaternion, Vector3 } from 'three'
import { loadLusionBuf } from './lusionBufLoader'

export const LUSION_BONE_COUNT = 53

export type BoneClip = {
  frameCount: number
  /** [frame * boneCount + bone] */
  positions: Float32Array
  orients: Float32Array
}

export type RootClip = {
  frameCount: number
  positions: Float32Array
  orients: Float32Array
}

const _v = new Vector3()
const _q = new Quaternion()
const _v2 = new Vector3()

export async function loadBoneClip(url: string): Promise<BoneClip> {
  const geo = await loadLusionBuf(url)
  const positions = geo.getAttribute('position').array as Float32Array
  const orients = geo.getAttribute('orient').array as Float32Array
  const frameCount = positions.length / 3 / LUSION_BONE_COUNT
  return { frameCount, positions, orients }
}

export async function loadRootClip(url: string): Promise<RootClip> {
  const geo = await loadLusionBuf(url)
  return {
    frameCount: geo.getAttribute('position').count,
    positions: geo.getAttribute('position').array as Float32Array,
    orients: geo.getAttribute('orient').array as Float32Array,
  }
}

function readBonePos(clip: BoneClip, frame: number, bone: number, target: Vector3) {
  const i = (frame * LUSION_BONE_COUNT + bone) * 3
  return target.set(clip.positions[i], clip.positions[i + 1], clip.positions[i + 2])
}

function readBoneQuat(clip: BoneClip, frame: number, bone: number, target: Quaternion) {
  const i = (frame * LUSION_BONE_COUNT + bone) * 4
  return target.set(
    clip.orients[i],
    clip.orients[i + 1],
    clip.orients[i + 2],
    clip.orients[i + 3],
  )
}

function readRootSample(clip: RootClip, frame: number, pos: Vector3, quat: Quaternion) {
  const fi = Math.min(frame, clip.frameCount - 1)
  const pi = fi * 3
  const oi = fi * 4
  pos.set(clip.positions[pi], clip.positions[pi + 1], clip.positions[pi + 2])
  quat.set(clip.orients[oi], clip.orients[oi + 1], clip.orients[oi + 2], clip.orients[oi + 3])
}

export function sampleRootClip(clip: RootClip, t: number, pos: Vector3, quat: Quaternion) {
  const frame = t * (clip.frameCount - 1)
  const from = Math.floor(frame)
  const to = Math.min(from + 1, clip.frameCount - 1)
  const blend = frame - from
  const p0 = new Vector3()
  const p1 = new Vector3()
  const q0 = new Quaternion()
  const q1 = new Quaternion()
  readRootSample(clip, from, p0, q0)
  readRootSample(clip, to, p1, q1)
  pos.copy(p0).lerp(p1, blend)
  quat.copy(q0).slerp(q1, blend)
}

export type AstronautAnimPhase = 'in' | 'loop' | 'out'

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t))
  return x * x * (3 - 2 * x)
}

export function resolveAstronautPhase(scroll: number): {
  phase: AstronautAnimPhase
  phaseT: number
  loopT: number
} {
  if (scroll < 0.14) return { phase: 'in', phaseT: scroll / 0.14, loopT: 0 }
  if (scroll > 0.86) return { phase: 'out', phaseT: (scroll - 0.86) / 0.14, loopT: 1 }
  return { phase: 'loop', phaseT: 0, loopT: (scroll - 0.14) / 0.72 }
}

export function resolveLoopFrames(loop: BoneClip, loopT: number): [number, number, number] {
  const frame = loopT * (loop.frameCount - 1)
  const from = Math.floor(frame)
  const to = Math.min(from + 1, loop.frameCount - 1)
  return [from, to, frame - from]
}

/** Apply Lusion bone deformation to geometry (2-bone weights). */
export function skinGeometry(
  clip: BoneClip,
  source: {
    position: Float32Array
    normal: Float32Array
    boneIndices: Float32Array
    boneWeights: Float32Array
    count: number
  },
  fromFrame: number,
  toFrame: number,
  blend: number,
  outPos: Float32Array,
  outNor: Float32Array,
) {
  const bp0 = new Vector3()
  const bp1 = new Vector3()
  const bq0 = new Quaternion()
  const bq1 = new Quaternion()

  for (let i = 0; i < source.count; i++) {
    const bi = i * 2
    const b0 = source.boneIndices[bi]
    const b1 = source.boneIndices[bi + 1]
    const w0 = source.boneWeights[bi]
    const w1 = source.boneWeights[bi + 1]

    const pi = i * 3
    _v.set(source.position[pi], source.position[pi + 1], source.position[pi + 2])
    const nx = source.normal[pi]
    const ny = source.normal[pi + 1]
    const nz = source.normal[pi + 2]

    let px = 0
    let py = 0
    let pz = 0
    let nnx = 0
    let nny = 0
    let nnz = 0

    for (const [bone, w] of [
      [b0, w0],
      [b1, w1],
    ] as const) {
      readBonePos(clip, fromFrame, bone, bp0)
      readBoneQuat(clip, fromFrame, bone, bq0)
      readBonePos(clip, toFrame, bone, bp1)
      readBoneQuat(clip, toFrame, bone, bq1)
      bp0.lerp(bp1, blend)
      bq0.slerp(bq1, blend)

      _q.copy(bq0)
      _v2.copy(_v).applyQuaternion(_q).add(bp0)
      px += _v2.x * w
      py += _v2.y * w
      pz += _v2.z * w

      _v2.set(nx, ny, nz).applyQuaternion(_q)
      nnx += _v2.x * w
      nny += _v2.y * w
      nnz += _v2.z * w
    }

    outPos[pi] = px
    outPos[pi + 1] = py
    outPos[pi + 2] = pz
    const len = Math.hypot(nnx, nny, nnz) || 1
    outNor[pi] = nnx / len
    outNor[pi + 1] = nny / len
    outNor[pi + 2] = nnz / len
  }
}

/** Map Lusion root track + scroll into camera-visible tunnel space */
export function applyRootToGroup(
  rootPos: Vector3,
  rootQuat: Quaternion,
  group: { position: Vector3; quaternion: Quaternion },
  scroll: number,
  phase: AstronautAnimPhase,
  phaseT: number,
) {
  const baseY = 0.85 - scroll * 5
  const inEase = smoothstep(phaseT)
  const outEase = smoothstep(phaseT)

  if (phase === 'in') {
    group.position.set(
      rootPos.x * 0.15,
      baseY + (1 - inEase) * 2.2,
      (rootPos.z - 18) * -0.05,
    )
  } else if (phase === 'out') {
    group.position.set(rootPos.x * 0.15, baseY - outEase * 2, (rootPos.z - 18) * -0.05)
  } else {
    group.position.set(0, baseY, 0)
  }

  group.quaternion.slerp(rootQuat, 0.18)
}
