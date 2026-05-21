import { cn } from '@/lib/utils'

/** Organic transition between section background colors. */
export function SectionWave({
  className,
  fillClassName = 'text-bloom-green-mist',
}: {
  className?: string
  /** Tailwind text-* color — SVG uses currentColor as fill. */
  fillClassName?: string
}) {
  return (
    <div
      className={cn('pointer-events-none -mt-px w-full overflow-hidden leading-[0]', className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className={cn('block h-10 w-full sm:h-14', fillClassName)}
        fill="currentColor"
      >
        <path d="M0,40 C320,8 640,52 960,28 C1200,12 1320,44 1440,32 L1440,56 L0,56 Z" />
      </svg>
    </div>
  )
}
