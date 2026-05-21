import { cn } from '@/lib/utils'

/** Icon container matching hero badge glass material. */
export function IconGlass({
  children,
  className,
  variant = 'default',
}: {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'gold'
}) {
  return (
    <div
      className={cn(
        'mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl',
        'border border-white/30 bg-white/20 shadow-sm backdrop-blur-md',
        variant === 'gold' && 'border-bloom-gold/40 bg-bloom-gold/10',
        className,
      )}
    >
      {children}
    </div>
  )
}
