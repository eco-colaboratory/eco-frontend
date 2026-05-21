import { cn } from '@/lib/utils'
import { MotionWrapper } from './motion-wrapper'
import { SectionLabel } from './section-label'

export function SectionHeader({
  label,
  title,
  accent,
  description,
  align = 'left',
  className,
}: {
  label: string
  title: React.ReactNode
  accent?: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  className?: string
}) {
  const centered = align === 'center'

  return (
    <MotionWrapper className={cn(centered && 'text-center', className)}>
      <SectionLabel variant="glass" tone="light" className={cn(centered && 'mx-auto')}>
        {label}
      </SectionLabel>
      <h2
        className={cn(
          'mt-4 font-display text-3xl font-semibold leading-[1.15] text-bloom-green-deep md:text-4xl lg:text-[2.75rem]',
          centered && 'mx-auto max-w-3xl',
        )}
      >
        {accent ? (
          <>
            {title}
            {' '}
            <span className="bloom-headline-accent font-semibold">{accent}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 max-w-3xl text-base leading-relaxed text-gray-600 font-light',
            centered && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </MotionWrapper>
  )
}
