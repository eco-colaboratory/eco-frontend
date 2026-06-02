import Link from 'next/link'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bloom-btn-3d bloom-btn-3d-primary px-6 py-3 text-sm font-extrabold sm:px-8 sm:text-base',
  outline:
    'bloom-btn-3d bloom-btn-3d-outline px-6 py-3 text-sm font-extrabold sm:px-8 sm:text-base',
  petal:
    'bloom-btn-3d bloom-btn-3d-petal px-6 py-3 text-sm font-extrabold sm:px-8 sm:text-base',
  mint:
    'bloom-btn-3d bloom-btn-3d-mint px-6 py-3 text-sm font-extrabold sm:px-8 sm:text-base',
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
