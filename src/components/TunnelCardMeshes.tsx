import { Suspense, useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import type { MotionValue } from 'framer-motion'
import { useMotionValueEvent } from 'framer-motion'
import {
  BufferAttribute,
  BufferGeometry,
  Group,
  MathUtils,
  type Texture,
} from 'three'
import { tunnelCards } from '../data/tunnelCards'
import { LUSION } from '../lib/lusionAssets'
import { loadLusionBuf } from '../lib/lusionBufLoader'

type TunnelCardMeshesProps = {
  scrollProgress: MotionValue<number>
}

/** 3D Lusion-style project cards + broken glass bursts on reveal */
export function TunnelCardMeshes({ scrollProgress }: TunnelCardMeshesProps) {
  const desktop = useTexture(LUSION.textures.desktop)
  const tablet = useTexture(LUSION.textures.tablet)
  const blockTex = useTexture(LUSION.textures.whiteBlock)

  return (
    <Suspense fallback={null}>
      {tunnelCards.map((card, i) => (
        <FloatingCard
          key={card.id}
          card={card}
          texture={i % 2 === 0 ? desktop : tablet}
          blockTex={blockTex}
          scrollProgress={scrollProgress}
          index={i}
        />
      ))}
    </Suspense>
  )
}

function FloatingCard({
  card,
  texture,
  blockTex,
  scrollProgress,
  index,
}: {
  card: (typeof tunnelCards)[0]
  texture: Texture
  blockTex: Texture
  scrollProgress: MotionValue<number>
  index: number
}) {
  const group = useRef<Group>(null)
  const scrollRef = useRef(0)
  const [showBurst, setShowBurst] = useState(false)
  const burstTriggered = useRef(false)
  const isLeft = card.position === 'left'
  const [enter, , exit] = card.scroll

  useMotionValueEvent(scrollProgress, 'change', (v) => {
    scrollRef.current = v
    if (!burstTriggered.current && v >= enter + 0.03) {
      burstTriggered.current = true
      setShowBurst(true)
    }
  })

  useFrame((state) => {
    if (!group.current) return
    const v = scrollRef.current
    const t = state.clock.elapsedTime

    const visible = v >= enter - 0.02 && v <= exit + 0.04
    group.current.visible = visible
    if (!visible) return

    const enterT = MathUtils.smoothstep(v, enter, enter + 0.12)
    const exitT = 1 - MathUtils.smoothstep(v, exit - 0.08, exit)
    const strength = enterT * exitT

    group.current.position.set(
      (isLeft ? -2.4 : card.position === 'right' ? 2.4 : 0) * enterT,
      0.5 - index * 0.35 - v * 5 + Math.sin(t * 1.2 + index) * 0.08,
      -2 - index * 1.8 - v * 8,
    )
    group.current.rotation.set(
      Math.sin(t * 0.8 + index) * 0.08,
      (isLeft ? 0.35 : -0.35) * (1 - enterT) + Math.sin(t * 0.5 + index) * 0.12,
      Math.sin(t * 0.6 + index) * 0.05,
    )
    group.current.scale.setScalar(0.55 * strength)
  })

  return (
    <group ref={group}>
      <mesh castShadow>
        <planeGeometry args={[1.6, 1.05]} />
        <meshStandardMaterial
          map={texture}
          emissive="#818cf8"
          emissiveIntensity={0.08}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.72, 1.17]} />
        <meshStandardMaterial map={blockTex} transparent opacity={0.85} />
      </mesh>
      {showBurst && <GlassBurst cardIndex={index} />}
    </group>
  )
}

function GlassBurst({ cardIndex }: { cardIndex: number }) {
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null)
  const group = useRef<Group>(null)
  const life = useRef(0)

  useEffect(() => {
    loadLusionBuf(LUSION.models.brokenGlassAnimation).then((geo) => {
      const pos = geo.getAttribute('position')
      const step = 14
      const start = cardIndex * 60
      const out = new Float32Array(Math.ceil((pos.count - start) / step) * 3)
      let j = 0
      for (let i = start; i < pos.count && j < out.length; i += step) {
        out[j++] = pos.getX(i)
        out[j++] = pos.getY(i)
        out[j++] = pos.getZ(i)
      }
      const g = new BufferGeometry()
      g.setAttribute('position', new BufferAttribute(out.subarray(0, j), 3))
      setGeometry(g)
    })
  }, [cardIndex])

  useFrame((_, delta) => {
    life.current += delta
    if (!group.current) return
    group.current.rotation.y += delta * 0.6
    group.current.scale.setScalar(0.06 + life.current * 0.04)
    group.current.position.z = life.current * 0.3
  })

  if (!geometry) return null

  return (
    <group ref={group} position={[0, 0, 0.12]}>
      <points geometry={geometry}>
        <pointsMaterial
          size={0.045}
          color="#c4b5fd"
          transparent
          opacity={Math.max(0, 0.7 - life.current * 0.35)}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
