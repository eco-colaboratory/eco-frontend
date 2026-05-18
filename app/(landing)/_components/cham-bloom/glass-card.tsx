import { cn } from '@/lib/utils'

/** Frosted card surface aligned with hero glass material on light sections. */
export function GlassCard({
  children,
  className,
  interactive = true,
}: {
  children: React.ReactNode
  className?: string
  /** Subtle lift on hover — disable for static panels. */
  interactive?: boolean
}) {
  return (
    <article
      className={cn(
        'rounded-2xl border border-white/40 bg-white/65 p-6 shadow-sm shadow-bloom-green-deep/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md',
        interactive &&
          'transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white/60 hover:shadow-lg hover:shadow-bloom-green-deep/10',
        className,
      )}
    >
      {children}
    </article>
  )
}
