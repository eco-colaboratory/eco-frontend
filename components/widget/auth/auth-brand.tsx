'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

type AuthBrandProps = {
  className?: string
}

/** Compact brand lockup for auth surfaces */
export function AuthBrand({ className }: AuthBrandProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="flex h-[76px] w-[76px] items-center justify-center rounded-3xl bg-white/90 shadow-[0_4px_20px_rgba(13,62,29,0.08)] ring-1 ring-white/70">
        <Image
          src="/assets/logo/logo_xanh.png"
          alt="CHẠM Flora"
          width={56}
          height={56}
          className="h-14 w-14 object-contain"
          priority
        />
      </div>
      <div className="text-center">
        <p className="font-display text-base font-semibold tracking-tight text-bloom-green-deep">
          CHẠM Flora
        </p>
        <p className="mt-0.5 font-sans text-[11px] text-bloom-green-deep/55">
          Hành trình xanh — bắt đầu từ đây
        </p>
      </div>
    </div>
  )
}
