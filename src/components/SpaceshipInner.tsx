import { useCallback } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

const RIVE_SRC = '/spaceship.riv'
const STATE_MACHINE = 'Motion'
const ARTBOARD = 'Button'

export interface SpaceshipInnerProps {
  label: string
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

export function SpaceshipInner({ label, href, onClick, className = '' }: SpaceshipInnerProps) {
  const { rive, RiveComponent } = useRive({
    src: RIVE_SRC,
    artboard: ARTBOARD,
    stateMachines: STATE_MACHINE,
    autoplay: true,
  })

  const isHover = useStateMachineInput(rive, STATE_MACHINE, 'isHover', false)

  const handleEnter = useCallback(() => {
    if (isHover) isHover.value = true
  }, [isHover])

  const handleLeave = useCallback(() => {
    if (isHover) isHover.value = false
  }, [isHover])

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      className={`group relative inline-flex flex-col items-center ${className}`}
    >
      <div className="relative w-[220px] h-[140px] sm:w-[260px] sm:h-[160px] pointer-events-none">
        <RiveComponent className="w-full h-full" />
      </div>

      <span className="relative -mt-2 px-8 py-3.5 rounded-lg bg-white/90 text-surface font-mono text-sm font-semibold tracking-wide shadow-[0_0_30px_rgba(99,102,241,0.25)] group-hover:bg-white group-hover:shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all duration-300">
        {label}
      </span>
    </a>
  )
}
