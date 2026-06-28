import * as THREE from 'three'
import {
  Suspense,
  useReducer,
  useMemo,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
} from '@react-three/drei'
import {
  CuboidCollider,
  BallCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from '@react-three/rapier'
import { EffectComposer, N8AO } from '@react-three/postprocessing'
import { easing } from 'maath'

const MODEL_URL = '/models/connectors.glb'

const accents = ['#4060ff', '#20ffa0', '#ff4060', '#ffcc00']

type ConnectorProps = {
  color: string
  roughness: number
  accent?: boolean
}

function shuffle(accent = 0): ConnectorProps[] {
  return [
    { color: '#444', roughness: 0.1 },
    { color: '#444', roughness: 0.75 },
    { color: '#444', roughness: 0.75 },
    { color: 'white', roughness: 0.1 },
    { color: 'white', roughness: 0.75 },
    { color: 'white', roughness: 0.1 },
    { color: accents[accent], roughness: 0.1, accent: true },
    { color: accents[accent], roughness: 0.75, accent: true },
    { color: accents[accent], roughness: 0.1, accent: true },
  ]
}

function getConnectorNode(nodes: Record<string, THREE.Object3D>) {
  if (nodes.connector) return nodes.connector as THREE.Mesh
  const first = Object.values(nodes).find((n) => (n as THREE.Mesh).isMesh) as THREE.Mesh | undefined
  if (!first) throw new Error('Connectors model has no mesh nodes')
  return first
}

function getBaseMaterial(materials: Record<string, THREE.Material>) {
  if (materials.base) return materials.base
  const first = Object.values(materials)[0]
  if (!first) throw new Error('Connectors model has no materials')
  return first
}

type ConnectorItemProps = ConnectorProps & {
  position?: [number, number, number]
  children?: ReactNode
}

function Connector({
  position,
  children,
  accent,
  color,
  ...props
}: ConnectorItemProps) {
  const api = useRef<RapierRigidBody>(null)
  const vec = useMemo(() => new THREE.Vector3(), [])
  const pos = useMemo<[number, number, number]>(
    () =>
      position ?? [
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(10),
        THREE.MathUtils.randFloatSpread(10),
      ],
    [position],
  )

  useFrame(() => {
    if (!api.current) return
    api.current.applyImpulse(
      vec.copy(api.current.translation()).negate().multiplyScalar(0.2),
      true,
    )
  })

  return (
    <RigidBody
      linearDamping={4}
      angularDamping={1}
      friction={0.1}
      position={pos}
      ref={api}
      colliders={false}
    >
      <CuboidCollider args={[0.38, 1.27, 0.38]} />
      <CuboidCollider args={[1.27, 0.38, 0.38]} />
      <CuboidCollider args={[0.38, 0.38, 1.27]} />
      {children ?? <ConnectorModel color={color} {...props} />}
      {accent && <pointLight intensity={4} distance={2.5} color={color} />}
    </RigidBody>
  )
}

function Pointer() {
  const ref = useRef<RapierRigidBody>(null)
  const vec = useMemo(() => new THREE.Vector3(), [])

  useFrame(({ mouse, viewport }) => {
    ref.current?.setNextKinematicTranslation(
      vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0),
    )
  })

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[1]} />
    </RigidBody>
  )
}

type ConnectorModelProps = {
  color?: string
  children?: ReactNode
} & ComponentPropsWithoutRef<'group'>

function ConnectorModel({ children, color = 'white', ...props }: ConnectorModelProps) {
  const ref = useRef<THREE.Mesh>(null)
  const { nodes, materials } = useGLTF(MODEL_URL)
  const connectorNode = useMemo(() => getConnectorNode(nodes), [nodes])
  const material = useMemo(
    () => getBaseMaterial(materials).clone(),
    [materials],
  )

  useFrame((_state, delta) => {
    const mat = ref.current?.material
    if (!mat || !('color' in mat)) return
    easing.dampC(
      (mat as THREE.MeshStandardMaterial).color,
      new THREE.Color(color),
      0.2,
      delta,
    )
  })

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={connectorNode.geometry}
        material={material}
        scale={10}
      >
        {children}
      </mesh>
    </group>
  )
}

function PhysicsScene({
  connectors,
  compact,
}: {
  connectors: ConnectorProps[]
  compact: boolean
}) {
  return (
    <Suspense fallback={null}>
      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {connectors.map((props, i) => (
          <Connector key={i} {...props} />
        ))}
        {!compact && (
          <Connector
            position={[10, 10, 5]}
            color={connectors[0]?.color ?? 'white'}
            roughness={0.1}
          >
            <ConnectorModel color={connectors[0]?.color ?? 'white'}>
              <MeshTransmissionMaterial
                clearcoat={1}
                thickness={0.1}
                anisotropicBlur={0.1}
                chromaticAberration={0.1}
                samples={6}
                resolution={256}
                color={connectors[0]?.color ?? 'white'}
              />
            </ConnectorModel>
          </Connector>
        )}
      </Physics>
    </Suspense>
  )
}

type SceneInnerProps = {
  interactive?: boolean
  compact?: boolean
  transparentBg?: boolean
  className?: string
}

function SceneInner({ interactive = true, compact = false, transparentBg = false, className = '' }: SceneInnerProps) {
  const [accent, click] = useReducer((state: number) => (state + 1) % accents.length, 0)
  const connectors = useMemo(() => {
    const all = shuffle(accent)
    return compact ? all.slice(0, 5) : all
  }, [accent, compact])

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        onClick={interactive ? click : undefined}
        shadows
        dpr={compact ? [1, 1] : [1, 1.5]}
        gl={{ antialias: false, alpha: transparentBg, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 15], fov: compact ? 20 : 17.5, near: 1, far: 20 }}
        className="touch-none"
      >
        {!transparentBg && <color attach="background" args={['#0a0a14']} />}
        <ambientLight intensity={0.4} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <PhysicsScene connectors={connectors} compact={!!compact} />
        {!compact && (
          <EffectComposer multisampling={4}>
            <N8AO distanceFalloff={1} aoRadius={1} intensity={3} />
          </EffectComposer>
        )}
        <Environment resolution={128}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer
              form="circle"
              intensity={4}
              rotation-x={Math.PI / 2}
              position={[0, 5, -9]}
              scale={2}
            />
          </group>
        </Environment>
      </Canvas>
    </div>
  )
}

function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#0a0a14]">
      <div className="w-10 h-10 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
    </div>
  )
}

export type ConnectorsSceneProps = SceneInnerProps

export function ConnectorsScene(props: ConnectorsSceneProps) {
  return (
    <Suspense fallback={<SceneFallback />}>
      <SceneInner {...props} />
    </Suspense>
  )
}
