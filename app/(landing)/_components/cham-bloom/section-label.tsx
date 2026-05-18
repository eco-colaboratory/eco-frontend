import { cn } from '@/lib/utils'

type SectionLabelVariant = 'plain' | 'glass'
type SectionLabelTone = 'light' | 'dark'

export function SectionLabel({
  children,
  className,
  variant = 'plain',
  tone = 'light',
}: {
  children: React.ReactNode
  className?: string
  variant?: SectionLabelVariant
  tone?: SectionLabelTone
}) {
  if (variant === 'glass') {
    return (
      <p
        className={cn(
          'inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-2 text-xs font-medium uppercase tracking-widest backdrop-blur-md',
          tone === 'dark' ? 'text-white' : 'text-bloom-green-deep',
          className,
        )}
      >
        {children}
      </p>
    )
  }

  return (
    <p
      className={cn(
        'font-sans text-xs font-medium uppercase tracking-widest text-bloom-green-mid',
        className,
      )}
    >
      {children}
    </p>
  )
}
