'use client'

import { m, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type Direction = 'up' | 'left' | 'right'

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
}

export function MotionWrapper({
  children,
  delay = 0,
  direction = 'up',
  className,
}: {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduced = useReducedMotion()
  const offset = offsets[direction]

  return (
    <m.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : offset.x, y: reduced ? 0 : offset.y }}
      animate={
        inView || reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }
      }
      transition={
        reduced
          ? { duration: 0 }
          : {
              type: 'spring',
              stiffness: 100,
              damping: 20,
              delay,
            }
      }
    >
      {children}
    </m.div>
  )
}
