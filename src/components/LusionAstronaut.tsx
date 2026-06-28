import { Suspense, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { BufferAttribute, BufferGeometry, Group, Quaternion, Vector3 } from 'three'
import { LUSION, type LusionAstronautPart } from '../lib/lusionAssets'
import {
  applyRootToGroup,
  loadBoneClip,
  loadRootClip,
  resolveAstronautPhase,
  resolveLoopFrames,
  sampleRootClip,
  skinGeometry,
  type BoneClip,
  type RootClip,
} from '../lib/lusionBoneAnimation'
import { useLusionBuf } from '../hooks/useLusionBuf'

const PART_MODEL: Record<LusionAstronautPart, string> = {
  helmet: LUSION.models.astronautHelmet,
  glove_shoes: LUSION.models.astronautGloveShoes,
  wearpack: LUSION.models.astronautWearpack,
}

type AnimRef = React.MutableRefObject<{ from: number; to: number; blend: number }>
type Clips = { loop: BoneClip; rootIn: RootClip; rootOut: RootClip }

let clipsCache: Clips | null = null
let clipsPromise: Promise<Clips> | null = null

function loadAllClips(): Promise<Clips> {
  if (clipsCache) return Promise.resolve(clipsCache)
  if (!clipsPromise) {
    clipsPromise = Promise.all([
      loadBoneClip(LUSION.models.astronautAnimations),
      loadRootClip(LUSION.models.astronautInAnimation),
      loadRootClip(LUSION.models.astronautOutAnimation),
    ]).then(([loop, rootIn, rootOut]) => {
      clipsCache = { loop, rootIn, rootOut }
      return clipsCache
    })
  }
  return clipsPromise
}

function useClips(): Clips {
  if (clipsCache) return clipsCache
  throw loadAllClips()
}

/** Clone mesh + bind pose so skinning never corrupts the rest pose. */
function useSkinnedMesh(part: LusionAstronautPart | 'helmet_glass') {
  const url = part === 'helmet_glass' ? LUSION.models.astronautHelmetGlass : PART_MODEL[part]
  const src = useLusionBuf(url)

  return useMemo(() => {
    const pos = src.getAttribute('position')
    const nor = src.getAttribute('normal')
    const boneIdx = src.getAttribute('boneIndices')
    const boneW = src.getAttribute('boneWeights')

    const geometry = new BufferGeometry()
    geometry.setIndex(src.index)
    for (const name in src.attributes) {
      if (name === 'position' || name === 'normal') continue
      geometry.setAttribute(name, src.getAttribute(name).clone())
    }
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(pos.count * 3), 3))
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(nor.count * 3), 3))

    return {
      geometry,
      bind: {
        position: new Float32Array(pos.array),
        normal: new Float32Array(nor.array),
        boneIndices: new Float32Array(boneIdx.array),
        boneWeights: new Float32Array(boneW.array),
        count: pos.count,
      },
      outPos: new Float32Array(pos.count * 3),
      outNor: new Float32Array(nor.count * 3),
    }
  }, [src])
}

function SkinnedSuitPart({
  part,
  loopClip,
  animRef,
}: {
  part: LusionAstronautPart
  loopClip: BoneClip
  animRef: AnimRef
}) {
  const { geometry, bind, outPos, outNor } = useSkinnedMesh(part)
  const maps = useTexture({
    map: LUSION.textures.astronaut[part].base,
    normalMap: LUSION.textures.astronaut[part].nor,
    aoMap: LUSION.textures.astronaut[part].arm,
  })

  useFrame(() => {
    const { from, to, blend } = animRef.current
    skinGeometry(loopClip, bind, from, to, blend, outPos, outNor)
    geometry.getAttribute('position').array.set(outPos)
    geometry.getAttribute('normal').array.set(outNor)
    geometry.getAttribute('position').needsUpdate = true
    geometry.getAttribute('normal').needsUpdate = true
  })

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        map={maps.map}
        normalMap={maps.normalMap}
        aoMap={maps.aoMap}
        roughness={0.42}
        metalness={0.12}
      />
    </mesh>
  )
}

function SkinnedGlassPart({ loopClip, animRef }: { loopClip: BoneClip; animRef: AnimRef }) {
  const { geometry, bind, outPos, outNor } = useSkinnedMesh('helmet_glass')

  useFrame(() => {
    const { from, to, blend } = animRef.current
    skinGeometry(loopClip, bind, from, to, blend, outPos, outNor)
    geometry.getAttribute('position').array.set(outPos)
    geometry.getAttribute('normal').array.set(outNor)
    geometry.getAttribute('position').needsUpdate = true
    geometry.getAttribute('normal').needsUpdate = true
  })

  return (
    <mesh geometry={geometry} castShadow>
      <meshPhysicalMaterial
        color="#b8ecff"
        transparent
        opacity={0.3}
        roughness={0.04}
        transmission={0.85}
        thickness={0.3}
      />
    </mesh>
  )
}

function StaticSuitPart({ part }: { part: LusionAstronautPart }) {
  const geometry = useLusionBuf(PART_MODEL[part])
  const maps = useTexture({
    map: LUSION.textures.astronaut[part].base,
    normalMap: LUSION.textures.astronaut[part].nor,
    aoMap: LUSION.textures.astronaut[part].arm,
  })
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial map={maps.map} normalMap={maps.normalMap} aoMap={maps.aoMap} roughness={0.42} metalness={0.12} />
    </mesh>
  )
}

/** Always-visible fallback if skeletal animation fails to load */
export function LusionAstronautStatic({
  scrollRef,
  scale = 1.05,
}: {
  scrollRef: React.MutableRefObject<number>
  scale?: number
}) {
  const group = useRef<Group>(null)
  const glass = useLusionBuf(LUSION.models.astronautHelmetGlass)
  const smoothScroll = useRef(0)

  useFrame((state, delta) => {
    if (!group.current) return
    const t = 1 - Math.exp(-7 * delta)
    smoothScroll.current = smoothScroll.current + (scrollRef.current - smoothScroll.current) * t
    const p = smoothScroll.current
    const time = state.clock.elapsedTime
    group.current.position.y = 0.8 - p * 5 + Math.sin(time * 0.55) * 0.06
    group.current.position.x = Math.sin(time * 0.32 + p * 2) * 0.1
    group.current.rotation.z = Math.sin(time * 0.28) * 0.03
    group.current.rotation.y = Math.sin(time * 0.22) * 0.08
  })

  return (
    <group ref={group} scale={scale}>
      <StaticSuitPart part="wearpack" />
      <StaticSuitPart part="glove_shoes" />
      <StaticSuitPart part="helmet" />
      <mesh geometry={glass} castShadow>
        <meshPhysicalMaterial color="#b8ecff" transparent opacity={0.3} transmission={0.85} />
      </mesh>
    </group>
  )
}

function AnimatedAstronautInner({
  animProgressRef,
  scale = 1.05,
}: {
  animProgressRef: React.MutableRefObject<number>
  scale?: number
}) {
  const clips = useClips()
  const group = useRef<Group>(null)
  const animRef = useRef({ from: 0, to: 1, blend: 0 })
  const rootPos = useMemo(() => new Vector3(), [])
  const rootQuat = useMemo(() => new Quaternion(), [])
  const smoothScroll = useRef(0)
  const smoothPos = useMemo(() => new Vector3(), [])
  const smoothIdleX = useRef(0)
  const smoothRotZ = useRef(0)
  const smoothRotY = useRef(0)

  useFrame((state, delta) => {
    const scrollT = 1 - Math.exp(-7 * delta)
    smoothScroll.current += (animProgressRef.current - smoothScroll.current) * scrollT
    const scroll = smoothScroll.current
    const { phase, phaseT, loopT } = resolveAstronautPhase(scroll)

    if (phase === 'in') sampleRootClip(clips.rootIn, phaseT, rootPos, rootQuat)
    else if (phase === 'out') sampleRootClip(clips.rootOut, phaseT, rootPos, rootQuat)
    else {
      rootPos.set(0, 0, 0)
      rootQuat.identity()
    }

    const loopProgress =
      phase === 'loop'
        ? (loopT + state.clock.elapsedTime * 0.028) % 1
        : phase === 'in'
          ? phaseT * 0.25
          : 0.75 + phaseT * 0.25

    const [from, to, blend] = resolveLoopFrames(clips.loop, loopProgress)
    animRef.current = { from, to, blend }

    if (group.current) {
      applyRootToGroup(rootPos, rootQuat, group.current, scroll, phase, phaseT)
      smoothPos.copy(group.current.position)

      const t = state.clock.elapsedTime
      const idleT = 1 - Math.exp(-4 * delta)
      const targetIdleX = Math.sin(t * 0.32 + scroll * 2) * 0.08
      const targetRotZ = Math.sin(t * 0.28) * 0.03
      const targetRotY = Math.sin(t * 0.22) * 0.06

      smoothIdleX.current += (targetIdleX - smoothIdleX.current) * idleT
      smoothRotZ.current += (targetRotZ - smoothRotZ.current) * idleT
      smoothRotY.current += (targetRotY - smoothRotY.current) * idleT

      group.current.position.x = smoothPos.x + smoothIdleX.current
      group.current.rotation.z = smoothRotZ.current
      group.current.rotation.y = smoothRotY.current
    }
  })

  return (
    <group ref={group} scale={scale}>
      <SkinnedSuitPart part="wearpack" loopClip={clips.loop} animRef={animRef} />
      <SkinnedSuitPart part="glove_shoes" loopClip={clips.loop} animRef={animRef} />
      <SkinnedSuitPart part="helmet" loopClip={clips.loop} animRef={animRef} />
      <SkinnedGlassPart loopClip={clips.loop} animRef={animRef} />
    </group>
  )
}

export function LusionAstronautModel({
  animProgressRef,
  scale = 1.05,
}: {
  animProgressRef: React.MutableRefObject<number>
  scale?: number
}) {
  return (
    <Suspense fallback={<LusionAstronautStatic scrollRef={animProgressRef} scale={scale} />}>
      <AnimatedAstronautInner animProgressRef={animProgressRef} scale={scale} />
    </Suspense>
  )
}
