import { useState } from 'react'
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { TunnelCard } from '../data/tunnelCards'
import { TiltCard } from './TiltCard'

type ScrollDetailCardProps = {
  card: TunnelCard
  scrollYProgress: MotionValue<number>
}

export function ScrollDetailCard({ card, scrollYProgress }: ScrollDetailCardProps) {
  const [enter, peak, exit] = card.scroll
  const isLeft = card.position === 'left'
  const [visible, setVisible] = useState(false)
  const [flipped, setFlipped] = useState(false)

  const opacity = useTransform(
    scrollYProgress,
    [enter, enter + 0.035, peak, exit - 0.035, exit],
    [0, 1, 1, 1, 0],
  )
  const x = useTransform(
    scrollYProgress,
    [enter, enter + 0.06, peak, exit - 0.06, exit],
    [isLeft ? -70 : 70, 0, 0, 0, isLeft ? -40 : 40],
  )
  const z = useTransform(
    scrollYProgress,
    [enter, enter + 0.08, peak, exit - 0.08, exit],
    [100, 0, 0, 0, -60],
  )
  const scale = useTransform(
    scrollYProgress,
    [enter, enter + 0.06, peak, exit - 0.06, exit],
    [0.88, 1, 1, 1, 0.88],
  )

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setVisible(v >= enter && v <= exit)
    if (v < enter || v > exit) setFlipped(false)
  })

  return (
    <motion.div
      style={{
        top: card.offsetY,
        opacity,
        x,
        z,
        scale,
        transformPerspective: 900,
      }}
      className={`absolute w-[min(92vw,360px)] md:w-[min(44vw,400px)] ${
        card.position === 'left'
          ? 'left-[4%] md:left-[6%]'
          : card.position === 'right'
            ? 'right-[4%] md:right-[6%]'
            : 'left-1/2 -translate-x-1/2'
      } ${visible ? 'z-30 pointer-events-auto' : 'z-0 pointer-events-none'}`}
    >
      <DetailCard card={card} flipped={flipped} onFlip={() => setFlipped((f) => !f)} />
    </motion.div>
  )
}

function DetailCard({
  card,
  flipped,
  onFlip,
}: {
  card: TunnelCard
  flipped: boolean
  onFlip: () => void
}) {
  return (
    <TiltCard maxTilt={flipped ? 0 : 8} className="[perspective:1200px]">
      <motion.button
        type="button"
        onClick={onFlip}
        aria-label={`${card.title} details`}
        aria-expanded={flipped}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full min-h-[300px] md:min-h-[340px] text-left [transform-style:preserve-3d] cursor-pointer group"
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-2xl bg-[#060818]/72 ring-1 ring-white/[0.1] [backface-visibility:hidden] lusion-card-led">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-[0.22]`} />
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_55%)]" />
          <div className="relative p-5 md:p-6 h-full min-h-[300px] md:min-h-[340px] flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 mb-3">
                {card.tag}
              </p>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-snug break-words">
                {card.title}
              </h3>
              <p className="text-gradient-flow text-sm mt-1.5">{card.subtitle}</p>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <p className="font-mono text-[10px] text-white/35">{card.period}</p>
              <span className="flex items-center gap-1 text-xs text-white/40 group-hover:text-white/70 transition-colors">
                Details
                <ArrowUpRight size={14} />
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 rounded-2xl bg-[#060818]/75 ring-1 ring-accent/20 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col">
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-[0.12]`} />
          <div className="relative flex-1 min-h-0 p-5 md:p-6 pt-5 overflow-y-auto overscroll-contain">
            <p className="text-sm text-white/65 leading-relaxed mb-3">{card.description}</p>
            <ul className="space-y-2 pb-2">
              {card.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-xs text-white/60 leading-relaxed">
                  <span className="text-accent-glow shrink-0 mt-0.5">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {card.github && (
              <a
                href={card.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-cyan-glow/80 hover:text-cyan-glow transition-colors"
              >
                View on GitHub
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
          <p className="relative shrink-0 px-5 md:px-6 pb-4 font-mono text-[10px] text-white/30 uppercase tracking-wider">
            Tap to flip back
          </p>
        </div>
      </motion.button>
    </TiltCard>
  )
}
