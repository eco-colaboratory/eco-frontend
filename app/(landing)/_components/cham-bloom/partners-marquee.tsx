'use client'

import { useSyncExternalStore } from 'react'
import { cn } from '@/lib/utils'

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getReducedMotionServer() {
  return false
}

export function PartnersMarquee({
  pill,
  partners,
  className,
}: {
  pill: string
  partners: string[]
  className?: string
}) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer,
  )
  const track = [...partners, ...partners]

  return (
    <div className={cn('w-full', className)}>
      <p className="mb-4 text-left md:mb-5">
        <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-bloom-green-deep backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
          {pill}
        </span>
      </p>
      <div
        className={cn(
          'relative overflow-hidden',
          'before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-16 before:bg-gradient-to-r before:from-bloom-cream/95 before:to-transparent',
          'after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-16 after:bg-gradient-to-l after:from-bloom-cream/95 after:to-transparent',
        )}
      >
        <ul
          className={cn(
            'flex w-max items-center gap-10 sm:gap-16 md:gap-20',
            reduced ? 'flex-wrap justify-start gap-5' : 'bloom-marquee-track',
          )}
          aria-label="Đối tác và hành trình"
        >
          {track.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="shrink-0 font-hero text-xl italic tracking-tight text-bloom-green-deep/90 sm:text-2xl md:text-3xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
