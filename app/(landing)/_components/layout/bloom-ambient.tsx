import { cn } from '@/lib/utils'

export type BloomAmbientTone = 'cream' | 'mist' | 'gold'

const ORB_CLASSES: Record<BloomAmbientTone, { a: string; b: string }> = {
  cream: {
    a: 'bg-bloom-green-mid/8',
    b: 'bg-bloom-gold/10',
  },
  mist: {
    a: 'bg-bloom-green-mid/12',
    b: 'bg-bloom-green-light/80',
  },
  gold: {
    a: 'bg-bloom-gold/15',
    b: 'bg-bloom-green-mid/10',
  },
}

/** Soft gradient orbs — echoes hero atmosphere without competing with content. */
export function BloomAmbient({
  tone = 'cream',
  className,
}: {
  tone?: BloomAmbientTone
  className?: string
}) {
  const colors = ORB_CLASSES[tone]

  return (
    <div
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      aria-hidden
    >
      <div
        className={cn(
          'absolute -left-24 top-8 h-72 w-72 rounded-full blur-3xl md:-left-16 md:h-96 md:w-96',
          colors.a,
        )}
      />
      <div
        className={cn(
          'absolute -right-20 bottom-0 h-64 w-64 rounded-full blur-3xl md:-right-8 md:h-80 md:w-80',
          colors.b,
        )}
      />
    </div>
  )
}
