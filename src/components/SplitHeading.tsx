interface SplitHeadingProps {
  text: string
  className?: string
  delay?: number
}

/** Static heading — per-character Framer was a major FPS cost. */
export function SplitHeading({ text, className = '' }: SplitHeadingProps) {
  return <span className={className}>{text}</span>
}
