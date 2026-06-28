import { ArrowUpRight } from 'lucide-react'

interface LusionCTAProps {
  label: string
  href: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

export function LusionCTA({ label, href, onClick, className = '' }: LusionCTAProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      data-cursor="hover"
      className={`group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-surface shadow-[0_6px_10px_rgba(0,0,0,0.04)] transition-colors duration-300 hover:bg-[#1a2ffb] hover:text-white ${className}`}
    >
      <span className="relative z-10 h-2 w-2 rounded-full bg-surface transition-transform duration-300 group-hover:scale-[20] group-hover:bg-[#1a2ffb]" />
      <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-3">
        {label}
      </span>
      <span className="absolute right-4 z-10 flex h-5 w-5 translate-x-8 items-center justify-center rounded-full bg-white text-[#1a2ffb] transition-transform duration-300 group-hover:translate-x-0">
        <ArrowUpRight size={14} />
      </span>
    </a>
  )
}
