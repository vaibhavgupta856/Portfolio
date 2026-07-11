import { Suspense, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, useTexture } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'
import { type Mesh } from 'three'
import { ErrorBoundary } from './ErrorBoundary'
import { LusionAstronautStatic } from './LusionAstronaut'
import { LUSION } from '../lib/lusionAssets'
import { useLusionBuf } from '../hooks/useLusionBuf'

const ASTRONAUT_SCALE = 1.28

type TunnelAstronautCanvasProps = {
  scrollProgress: MotionValue<number>
}

function LusionDiamond({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const geometry = useLusionBuf(LUSION.models.diamond)
  const matcap = useTexture(LUSION.textures.whiteMatcap)
  const mesh = useRef<Mesh>(null)

  useFrame(() => {
    if (!mesh.current) return
    const p = progressRef.current
    mesh.current.position.set(Math.sin(p * 3) * 2.2, 1.2 - p * 2, -3 - p * 4)
    mesh.current.rotation.set(p * 2, p * 3, p)
  })

  return (
    <mesh ref={mesh} geometry={geometry} scale={1.8}>
      <meshMatcapMaterial matcap={matcap} transparent opacity={0.92} />
    </mesh>
  )
}

function TunnelCamera({ progressRef }: { progressRef: MutableRefObject<number> }) {
  useFrame((state) => {
    const p = progressRef.current
    state.camera.position.z = 5.5 - p * 1.5
    state.camera.position.y = 0.5 + p * 0.8
    state.camera.lookAt(0, 0.85 - p * 5, 0)
  })
  return null
}

function ScrollDriver({
  scrollProgress,
  progressRef,
}: {
  scrollProgress: MotionValue<number>
  progressRef: MutableRefObject<number>
}) {
  const invalidate = useThree((s) => s.invalidate)

  useMotionValueEvent(scrollProgress, 'change', (v) => {
    progressRef.current = v
    invalidate()
  })

  return null
}

function TunnelScene({
  scrollProgress,
  progressRef,
}: {
  scrollProgress: MotionValue<number>
  progressRef: MutableRefObject<number>
}) {
  return (
    <>
      <color attach="background" args={['#030308']} />
      <fog attach="fog" args={['#030308', 4, 22]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <pointLight position={[-3, 2, 4]} intensity={0.7} color="#818cf8" />

      <ScrollDriver scrollProgress={scrollProgress} progressRef={progressRef} />
      <TunnelCamera progressRef={progressRef} />
      <Stars radius={50} depth={30} count={280} factor={2.2} fade speed={0} />
      <Suspense fallback={null}>
        <LusionDiamond progressRef={progressRef} />
      </Suspense>
      <LusionAstronautStatic scrollRef={progressRef} scale={ASTRONAUT_SCALE} />
    </>
  )
}

function TunnelCanvasInner({ scrollProgress }: TunnelAstronautCanvasProps) {
  const progressRef = useRef(0)

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0.5, 5.5], fov: 48 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        frameloop="demand"
      >
        <TunnelScene scrollProgress={scrollProgress} progressRef={progressRef} />
      </Canvas>
    </div>
  )
}

export function TunnelAstronautCanvas(props: TunnelAstronautCanvasProps) {
  return (
    <ErrorBoundary fallback={null}>
      <TunnelCanvasInner {...props} />
    </ErrorBoundary>
  )
}
