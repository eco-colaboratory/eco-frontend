import { cn } from '@/lib/utils'
import { BloomAmbient, type BloomAmbientTone } from './bloom-ambient'

const BG_CLASSES = {
  cream: 'bg-bloom-cream',
  mist: 'bg-bloom-green-mist',
  'light-to-cream': 'bg-gradient-to-b from-bloom-green-light to-bloom-cream',
  deep: 'bg-bloom-green-deep text-white',
} as const

export type SectionShellBg = keyof typeof BG_CLASSES

const AMBIENT_BY_BG: Partial<Record<SectionShellBg, BloomAmbientTone>> = {
  cream: 'cream',
  mist: 'mist',
  'light-to-cream': 'gold',
}

/** Shared section wrapper: consistent vertical rhythm and background tokens. */
export function SectionShell({
  id,
  bg,
  ambient,
  className,
  children,
}: {
  id: string
  bg: SectionShellBg
  /** Show soft gradient orbs (default: on for light backgrounds). */
  ambient?: boolean
  className?: string
  children: React.ReactNode
}) {
  const showAmbient = ambient ?? bg in AMBIENT_BY_BG
  const ambientTone = AMBIENT_BY_BG[bg]

  return (
    <section
      id={id}
      className={cn('relative py-14 md:py-20', BG_CLASSES[bg], className)}
    >
      {showAmbient && ambientTone ? <BloomAmbient tone={ambientTone} /> : null}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
