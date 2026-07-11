interface ProfilePhotoProps {
  src: string
  alt: string
  size?: 'md' | 'lg'
}

export function ProfilePhoto({ src, alt, size = 'lg' }: ProfilePhotoProps) {
  const dim = size === 'lg' ? 'w-64 h-64 md:w-80 md:h-80' : 'w-48 h-48'

  return (
    <div className="relative mx-auto">
      <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-accent/50 via-cyan-glow/40 to-accent/50 opacity-70" />

      <div className={`relative ${dim} rounded-full overflow-hidden ring-2 ring-white/10`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="eager" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/40 via-transparent to-accent/10 pointer-events-none" />
      </div>

      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass font-mono text-[10px] text-accent-glow whitespace-nowrap">
        vaibhav@iit-goa ~ $
      </div>

      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-400 status-pulse" />
    </div>
  )
}
