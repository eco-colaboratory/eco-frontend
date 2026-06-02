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
        'bloom-card-3d p-6',
        interactive && 'bloom-card-3d-interactive',
        className,
      )}
    >
      {children}
    </article>
  )
}
