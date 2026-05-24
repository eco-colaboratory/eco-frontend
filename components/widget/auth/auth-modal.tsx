'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LoginForm } from './login-form'
import { RegisterForm } from './register-form'
import { AnimatedAuthDialog } from './animated-auth-dialog'
import { AuthBrand } from './auth-brand'

export type AuthTab = 'login' | 'register'

type AuthModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultTab?: AuthTab
}

const TAB_HINT: Record<AuthTab, string> = {
  login: 'Nhập tài khoản để tiếp tục trên CHẠM Flora.',
  register: 'Tạo tài khoản để tham gia CHẠM Flora.',
}

const TABS: { id: AuthTab; label: string }[] = [
  { id: 'login', label: 'Đăng nhập' },
  { id: 'register', label: 'Đăng ký' },
]

export function AuthModal({ open, onOpenChange, defaultTab = 'login' }: AuthModalProps) {
  const [tab, setTab] = useState<AuthTab>(defaultTab)
  const reduced = useReducedMotion()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!open) setTab(defaultTab)
  }, [open, defaultTab])

  const activeTab = TABS.find((t) => t.id === tab) ?? TABS[0]

  return (
    <AnimatedAuthDialog
      open={open}
      onOpenChange={onOpenChange}
      contentClassName={cn(
        'overflow-hidden rounded-3xl bg-white',
        'shadow-[0_24px_64px_rgba(13,62,29,0.18)] ring-1 ring-bloom-green-mid/10',
      )}
    >
      <DialogPrimitive.Title className="sr-only">{activeTab.label}</DialogPrimitive.Title>
      <DialogPrimitive.Description className="sr-only">{TAB_HINT[tab]}</DialogPrimitive.Description>

      {/* Header */}
      <div className="relative bg-gradient-to-b from-bloom-green-mist via-bloom-green-light/80 to-white px-6 pb-5 pt-6">
        <DialogPrimitive.Close
          className="absolute right-3 top-3 rounded-full p-2 text-bloom-green-deep/50 transition-colors hover:bg-white/60 hover:text-bloom-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bloom-green-mid"
          aria-label="Đóng"
        >
          <X className="h-4 w-4" />
        </DialogPrimitive.Close>

        <AuthBrand className="pt-1" />

        <div
          className="mt-5 flex rounded-2xl bg-white/70 p-1.5 shadow-sm ring-1 ring-bloom-green-mid/10 backdrop-blur-sm"
          role="tablist"
          aria-label="Loại tài khoản"
        >
          {TABS.map((item) => {
            const isActive = tab === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={cn(
                  'relative flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors font-display',
                  isActive ? 'text-white' : 'text-bloom-green-deep/70 hover:text-bloom-green-deep',
                )}
                onClick={() => setTab(item.id)}
              >
                {isActive ? (
                  <m.span
                    layoutId="auth-tab-indicator"
                    className="absolute inset-0 rounded-xl bg-bloom-green-mid shadow-[0_2px_8px_rgba(27,138,66,0.35)]"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 420, damping: 34 }
                    }
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 pb-6 pt-4" role="tabpanel">
        <p className="mb-4 text-center font-sans text-xs leading-relaxed text-gray-500">
          {TAB_HINT[tab]}
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={tab}
            initial={{ opacity: 0, y: reduced ? 0 : 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -4 }}
            transition={{ duration: reduced ? 0 : 0.16, ease: 'easeOut' }}
          >
            {tab === 'login' ? (
              <LoginForm onSuccess={() => onOpenChange(false)} />
            ) : (
              <RegisterForm onSuccess={() => onOpenChange(false)} />
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </AnimatedAuthDialog>
  )
}
