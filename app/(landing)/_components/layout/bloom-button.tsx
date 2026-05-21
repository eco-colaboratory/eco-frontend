import Link from 'next/link'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'rounded-full bg-bloom-green-deep px-6 py-3 text-sm font-semibold text-white shadow-md shadow-bloom-green-deep/20 transition-[transform,box-shadow,background-color] duration-300 hover:bg-bloom-green-deep/90 hover:shadow-[0_0_20px_rgba(167,139,250,0.5)] active:scale-[0.98] sm:px-8 sm:text-base',
  outline:
    'rounded-full border border-white/50 bg-white/40 px-6 py-3 text-sm font-semibold text-bloom-green-deep backdrop-blur-md transition-[transform,background-color] duration-300 hover:bg-white/60 hover:border-white/60 active:scale-[0.98] sm:px-8 sm:text-base',
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
