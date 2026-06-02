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
          'inline-flex rounded-md border border-white/25 bg-white/20 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-widest backdrop-blur-md',
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
        'font-sans text-[11px] font-semibold uppercase tracking-widest text-bloom-green-mid',
        className,
      )}
    >
      {children}
    </p>
  )
}
