import { cn } from '@/lib/utils'

/** Organic break between stacked editorial blocks. */
export function SectionDivider({
  className,
  variant = 'dot',
}: {
  className?: string
  variant?: 'dot' | 'leaf'
}) {
  if (variant === 'leaf') {
    return (
      <div className={cn('mx-auto flex max-w-lg items-center gap-3 px-4', className)} aria-hidden>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-bloom-green-mid/30 to-bloom-gold/40" />
        <svg
          viewBox="0 0 24 24"
          className="size-5 shrink-0 text-bloom-green-mid/60"
          fill="currentColor"
        >
          <path d="M12 2C9 8 4 10 4 14c0 3.3 2.7 6 6 6 1.5 0 2.9-.6 4-1.5 1.1.9 2.5 1.5 4 1.5 3.3 0 6-2.7 6-6 0-4-5-6-8-12z" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-bloom-green-mid/30 to-bloom-gold/40" />
      </div>
    )
  }

  return (
    <div className={cn('mx-auto flex max-w-md items-center gap-4', className)} aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-bloom-green-mid/35" />
      <span className="size-2 rounded-full bg-bloom-gold/70 ring-4 ring-bloom-gold/15" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-bloom-green-mid/35" />
    </div>
  )
}
