'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ChevronDown, LogOut, LayoutDashboard, Coins } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLandingAuth } from '@/hooks/useLandingAuth'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectUser } from '@/lib/redux/slices/authSlice'
import { hasAdminRole } from '@/lib/types/roles'

type UserMenuDropdownProps = {
  displayName: string
  className?: string
  /** full-width trigger (mobile drawer) */
  variant?: 'pill' | 'block'
  onLogout?: () => void
}

export function UserMenuDropdown({
  displayName,
  className,
  variant = 'pill',
  onLogout,
}: UserMenuDropdownProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const { logout, isLoading } = useLandingAuth()
  const reduced = useReducedMotion()
  const user = useAppSelector(selectUser)
  const isAdmin = user && user.role ? hasAdminRole(user.role) : false

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return
      setOpen(false)
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  const handleLogout = async () => {
    setOpen(false)
    onLogout?.()
    await logout()
  }

  const triggerClassName =
    variant === 'block'
      ? 'flex w-full items-center justify-center gap-1.5 rounded-full border border-bloom-green-mid/20 bg-bloom-green-mid/5 py-2 text-xs font-medium text-bloom-green-deep transition-colors hover:bg-bloom-green-mid/10 font-display'
      : 'hidden max-w-[160px] items-center gap-1 rounded-full border border-bloom-green-mid/20 bg-bloom-green-mid/5 px-4 py-2 text-xs font-medium text-bloom-green-deep transition-colors hover:bg-bloom-green-mid/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bloom-green-mid sm:inline-flex font-display'

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        className={triggerClassName}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="truncate">Xin chào {displayName}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 shrink-0 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open ? (
          <m.div
            id={menuId}
            role="menu"
            aria-label="Tài khoản"
            className={cn(
              'absolute z-[60] min-w-[168px] overflow-hidden rounded-xl border border-bloom-green-mid/15 bg-bloom-cream py-1 shadow-[0_8px_28px_rgba(26,60,40,0.12)]',
              variant === 'block' ? 'left-0 right-0 top-full mt-2' : 'right-0 top-full mt-2',
            )}
            initial={{ opacity: 0, scale: 0.94, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <Link
              href="/topup"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-bloom-green-deep transition-colors hover:bg-bloom-green-mid/10 font-display border-b border-bloom-green-mid/10"
            >
              <Coins className="h-3.5 w-3.5 text-bloom-gold" aria-hidden />
              Nạp Coin
            </Link>

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-bloom-green-deep transition-colors hover:bg-bloom-green-mid/10 font-display border-b border-bloom-green-mid/10"
              >
                <LayoutDashboard className="h-3.5 w-3.5" aria-hidden />
                Dashboard
              </Link>
            )}

            <button
              type="button"
              role="menuitem"
              disabled={isLoading}
              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-bloom-green-deep transition-colors hover:bg-bloom-green-mid/10 disabled:opacity-50 font-display"
              onClick={() => void handleLogout()}
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Đăng xuất
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
