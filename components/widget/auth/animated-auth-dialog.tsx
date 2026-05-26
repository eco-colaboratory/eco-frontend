'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimatedAuthDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  contentClassName?: string
}

export function AnimatedAuthDialog({
  open,
  onOpenChange,
  children,
  contentClassName,
}: AnimatedAuthDialogProps) {
  const reduced = useReducedMotion()

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-50 bg-bloom-green-deep/25 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.22, ease: 'easeOut' }}
              />
            </DialogPrimitive.Overlay>

            <DialogPrimitive.Content asChild forceMount>
              <m.div
                className={cn(
                  'fixed left-1/2 top-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[440px] -translate-x-1/2 -translate-y-1/2 outline-none',
                  contentClassName,
                )}
                initial={{
                  opacity: 0,
                  scale: reduced ? 1 : 0.94,
                  y: reduced ? 0 : 16,
                }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: reduced ? 1 : 0.97,
                  y: reduced ? 0 : 8,
                }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 380, damping: 30, mass: 0.85 }
                }
              >
                {children}
              </m.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Root>
  )
}
