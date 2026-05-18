import Link from 'next/link'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'rounded-full bg-bloom-green-mid px-6 py-3 text-sm font-medium text-white transition-[transform,background-color] duration-300 hover:bg-bloom-green-deep active:scale-[0.98] sm:px-8 sm:text-base',
  outline:
    'rounded-full border border-bloom-green-mid/40 px-6 py-3 text-sm font-medium text-bloom-green-deep transition-[transform,background-color] duration-300 hover:bg-bloom-green-light active:scale-[0.98] sm:px-8 sm:text-base',
} as const

export function BloomButton({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  return (
    <Link href={href} className={cn(variants[variant], className)}>
      {children}
    </Link>
  )
}
