import { Suspense, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, useTexture } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'
import { MathUtils, type Mesh } from 'three'
import { ErrorBoundary } from './ErrorBoundary'
import { LusionAstronautModel, LusionAstronautStatic } from './LusionAstronaut'
import { LUSION } from '../lib/lusionAssets'
import { useLusionBuf } from '../hooks/useLusionBuf'

const ASTRONAUT_SCALE = 1.28

type TunnelAstronautCanvasProps = {
  scrollProgress: MotionValue<number>
}

/** Lerp scroll progress so spaceman + camera move smoothly */
function ScrollSmoother({
  targetRef,
  progressRef,
}: {
  targetRef: MutableRefObject<number>
  progressRef: MutableRefObject<number>
}) {
  useFrame((_, delta) => {
    const t = 1 - Math.exp(-7 * delta)
    progressRef.current = MathUtils.lerp(progressRef.current, targetRef.current, t)
  })
  return null
}

/** Lusion diamond prop */
function LusionDiamond({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const geometry = useLusionBuf(LUSION.models.diamond)
  const matcap = useTexture(LUSION.textures.whiteMatcap)
  const mesh = useRef<Mesh>(null)

  useFrame((state) => {
    if (!mesh.current) return
    const t = state.clock.elapsedTime
    const p = progressRef.current
    mesh.current.position.set(
      Math.sin(t * 0.7 + p * 3) * 2.2,
      1.2 + Math.cos(t * 0.5) * 0.4 - p * 2,
      -3 - p * 4,
    )
    mesh.current.rotation.set(t * 0.4, t * 0.6, t * 0.25)
  })

  return (
    <mesh ref={mesh} geometry={geometry} scale={1.8}>
      <meshMatcapMaterial matcap={matcap} transparent opacity={0.92} />
    </mesh>
  )
}

/** Real Lusion astronaut — scroll drives in / loop / out animation */
function LusionAstronautRig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <>
      <LusionAstronautModel animProgressRef={progressRef} scale={ASTRONAUT_SCALE} />
      <pointLight position={[0, 1, 0.4]} intensity={0.8} color="#22d3ee" distance={4} />
      <pointLight position={[0, 0.5, 1]} intensity={0.5} color="#ffffff" distance={3} />
    </>
  )
}

function TunnelCamera({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const camZ = useRef(5.5)
  const camY = useRef(0.5)
  const lookY = useRef(0.85)

  useFrame((state, delta) => {
    const p = progressRef.current
    const t = 1 - Math.exp(-6 * delta)
    const targetZ = 5.5 - p * 1.5
    const targetY = 0.5 + p * 0.8
    const targetLookY = 0.85 - p * 5

    camZ.current = MathUtils.lerp(camZ.current, targetZ, t)
    camY.current = MathUtils.lerp(camY.current, targetY, t)
    lookY.current = MathUtils.lerp(lookY.current, targetLookY, t)

    state.camera.position.z = camZ.current
    state.camera.position.y = camY.current
    state.camera.lookAt(0, lookY.current, 0)
  })
  return null
}

function TunnelScene({
  progressRef,
  targetRef,
}: {
  progressRef: MutableRefObject<number>
  targetRef: MutableRefObject<number>
}) {
  return (
    <>
      <color attach="background" args={['#030308']} />
      <fog attach="fog" args={['#030308', 4, 22]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <pointLight position={[-3, 2, 4]} intensity={0.9} color="#818cf8" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#22d3ee" />

      <ScrollSmoother targetRef={targetRef} progressRef={progressRef} />
      <TunnelCamera progressRef={progressRef} />
      <Stars radius={60} depth={40} count={900} factor={2.8} fade speed={0.4} />
      <LusionDiamond progressRef={progressRef} />
      <AstronautWithFallback progressRef={progressRef} />
    </>
  )
}

function TunnelCanvasInner({ scrollProgress }: TunnelAstronautCanvasProps) {
  const progressRef = useRef(0)
  const targetRef = useRef(0)

  useMotionValueEvent(scrollProgress, 'change', (v) => {
    targetRef.current = v
  })

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none">
      <Canvas
        dpr={[1, 1]}
        camera={{ position: [0, 0.5, 5.5], fov: 48 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <TunnelScene progressRef={progressRef} targetRef={targetRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function AstronautWithFallback({ progressRef }: { progressRef: MutableRefObject<number> }) {
  return (
    <ErrorBoundary fallback={<LusionAstronautStatic scrollRef={progressRef} scale={ASTRONAUT_SCALE} />}>
      <Suspense fallback={<LusionAstronautStatic scrollRef={progressRef} scale={ASTRONAUT_SCALE} />}>
        <Float speed={0.55} rotationIntensity={0.03} floatIntensity={0.05}>
          <LusionAstronautRig progressRef={progressRef} />
        </Float>
      </Suspense>
    </ErrorBoundary>
  )
}

export function TunnelAstronautCanvas(props: TunnelAstronautCanvasProps) {
  return (
    <ErrorBoundary fallback={null}>
      <TunnelCanvasInner {...props} />
    </ErrorBoundary>
  )
}
