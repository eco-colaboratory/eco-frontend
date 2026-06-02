'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type AuthBrandProps = {
  className?: string
}

/** Compact brand lockup for auth surfaces */
export function AuthBrand({ className }: AuthBrandProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <Image
        src="/assets/logo/CHAM-Flora.png"
        alt="CHẠM Flora"
        width={150}
        height={50}
        className="h-12 w-auto object-contain"
        priority
      />
    </div>
  )
}
