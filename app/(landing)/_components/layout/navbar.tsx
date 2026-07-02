'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { AuthModal, UserMenuDropdown } from '@/components/widget/auth'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectIsAuthenticated, selectUser } from '@/lib/redux/slices/authSlice'
import { useLandingAuth } from '@/hooks/useLandingAuth'
import { hasAdminRole } from '@/lib/types/roles'

const SCROLL_THRESHOLD = 100

const NAV_LINKS = [
  { href: '#about', label: 'Về chúng tôi' },
  { href: '#roadmap', label: 'Lộ trình' },
  { href: '#sponsorship', label: 'Gói tài trợ' },
  { href: '/term?tab=terms', label: 'Điều khoản' },
  { href: '/download', label: 'Tải Game' },
] as const

const springTransition = { type: 'spring' as const, stiffness: 200, damping: 50 }

const pillWidth =
  'w-[95%] max-w-7xl sm:w-[90%] md:w-[88%] lg:w-[82%] xl:w-3/4'

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD,
  )
  const [open, setOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [shouldNavigateToTopup, setShouldNavigateToTopup] = useState(false)
  const reduced = useReducedMotion()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  const displayName = user?.username || user?.name || 'bạn'
  const isDarkHeader = pathname === '/download' && !isScrolled
  const isAdmin = user && user.role ? hasAdminRole(user.role) : false

  const { logout } = useLandingAuth()

  const handleLogout = async () => {
    setOpen(false)
    await logout()
  }

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD)
  })

  useEffect(() => {
    if (isAuthenticated && shouldNavigateToTopup) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldNavigateToTopup(false)
      router.push('/topup')
      toast.success('Đăng nhập thành công! Đang chuyển hướng tới trang nạp coin...')
    }
  }, [isAuthenticated, shouldNavigateToTopup, router])

  const handleTopupClick = () => {
    if (isAuthenticated) {
      router.push('/topup')
    } else {
      setShouldNavigateToTopup(true)
      setAuthOpen(true)
    }
  }

  useEffect(() => {
    const sections = ['hero', 'about', 'vision', 'sponsorship', 'contact']
    const observers = sections.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0,
        }
      )

      observer.observe(el)
      return { observer, el }
    })

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el)
        }
      })
    }
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname !== '/') {
      return
    }
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = 85
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      window.history.pushState(null, '', `#${id}`)
      setActiveSection(id)
      setOpen(false)
    }
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center">
      <m.nav
        className={cn(
          'pointer-events-auto flex items-center justify-between px-6 py-2 sm:px-6 sm:py-2.5 transition-all duration-300',
          isScrolled
            ? cn(
              pillWidth,
              'bg-bloom-cream/92 border border-bloom-green-deep/20 backdrop-blur-[12px] rounded-full mt-4',
              'shadow-[0_8px_30px_rgba(79,53,22,0.08),0_4px_12px_rgba(0,0,0,0.02)]',
            )
            : cn(
              'w-full max-w-7xl',
              'bg-transparent',
            ),
        )}
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
        animate={{
          opacity: 1,
          y: isScrolled && !reduced ? 10 : 0,
        }}
        transition={{
          opacity: {
            duration: reduced ? 0 : 0.6,
            delay: reduced ? 0 : 0.1,
            ease: 'easeOut',
          },
          y: reduced ? { duration: 0 } : springTransition,
        }}
      >
        <div className="flex-1 flex justify-start">
          <Link
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="flex items-center gap-2 font-sans text-base font-medium text-bloom-green-deep hover:scale-[1.03] transition-transform"
          >
            <Image
              src="/assets/logo/CHAM-Flora.png"
              alt="CHẠM Flora Logo"
              width={120}
              height={40}
              className="h-[32px] sm:h-[38px] w-auto shrink-0 object-contain"
            />
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-3.5 md:flex lg:gap-6 xl:gap-8 shrink-0 flex-initial">
          {NAV_LINKS.map((l) => {
            const isHash = l.href.startsWith('#')
            const sectionId = isHash ? l.href.replace('#', '') : ''
            const isActive = isHash
              ? activeSection === sectionId
              : pathname === l.href.split('?')[0]
            return (
              <Link
                key={l.href}
                href={isHash && pathname !== '/' ? `/${l.href}` : l.href}
                onClick={isHash ? (e) => scrollToSection(e, sectionId) : undefined}
                className={cn(
                  'relative py-1.5 text-[13px] xl:text-[13.5px] font-bold transition-colors font-display tracking-wide whitespace-nowrap',
                  isDarkHeader
                    ? isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActive
                      ? 'text-bloom-green-deep'
                      : 'text-bloom-green-deep/60 hover:text-bloom-green-deep',
                )}
              >
                {l.label}
                {isActive && (
                  <m.div
                    layoutId="activeTab"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-bloom-accent-mint rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex-1 flex items-center justify-end gap-2 sm:gap-3">
          <span className="hidden md:inline-flex">
            <button
              type="button"
              onClick={handleTopupClick}
              className="bloom-btn-3d bloom-btn-3d-primary px-4.5 py-1.5 text-[11px] text-bloom-green-deep cursor-pointer shadow-[0_3px_0_#4f3516] hover:translate-y-[1px] hover:shadow-[0_2px_0_#4f3516] active:translate-y-[3px] active:shadow-[0_0px_0_#4f3516]"
            >
              Nạp Coin
            </button>
          </span>

          {isAuthenticated ? (
            <UserMenuDropdown displayName={displayName} />
          ) : (
            <span className="hidden md:inline-flex">
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="bloom-btn-3d bloom-btn-3d-petal px-4.5 py-1.5 text-[11px] text-white cursor-pointer"
              >
                Đăng nhập
              </button>
            </span>
          )}

          <button
            type="button"
            className={cn(
              "md:hidden flex items-center justify-center p-1.5 rounded-full border transition-colors",
              isDarkHeader
                ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                : "border-bloom-green-deep/15 bg-white/50 text-bloom-green-deep hover:bg-white"
            )}
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </m.nav>

      <AnimatePresence>
        {open ? (
          <m.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng"
            className={cn(
              'pointer-events-auto overflow-hidden md:hidden mt-6',
              'border-b border-bloom-green-mid/15 bg-bloom-cream/95 backdrop-blur-md',
              isScrolled ? cn(pillWidth, 'rounded-2xl border-x border-b') : 'w-full',
            )}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-2.5 px-6 py-4">
              {NAV_LINKS.map((l) => {
                const isHash = l.href.startsWith('#')
                const sectionId = isHash ? l.href.replace('#', '') : ''
                const isActive = isHash
                  ? activeSection === sectionId
                  : pathname === l.href.split('?')[0]
                return (
                  <Link
                    key={l.href}
                    href={isHash && pathname !== '/' ? `/${l.href}` : l.href}
                    onClick={isHash ? (e) => scrollToSection(e, sectionId) : undefined}
                    className={cn(
                      'rounded-lg py-2 px-3 text-[13px] font-medium transition-colors font-display',
                      isActive
                        ? 'bg-bloom-green-mid/10 text-bloom-green-deep'
                        : 'text-bloom-green-deep/75 hover:bg-bloom-green-light/50 hover:text-bloom-green-deep',
                    )}
                  >
                    {l.label}
                  </Link>
                )
              })}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  if (isAuthenticated) {
                    router.push('/topup')
                  } else {
                    setShouldNavigateToTopup(true)
                    setAuthOpen(true)
                  }
                }}
                className={cn(
                  'w-full text-left rounded-lg py-2 px-3 text-[13px] font-medium transition-colors font-display cursor-pointer',
                  pathname === '/topup'
                    ? 'bg-bloom-green-mid/10 text-bloom-green-deep'
                    : 'text-bloom-green-deep/75 hover:bg-bloom-green-light/50 hover:text-bloom-green-deep',
                )}
              >
                Nạp Coin
              </button>
              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block w-full text-left rounded-lg py-2 px-3 text-[13px] font-medium transition-colors font-display cursor-pointer',
                    pathname.startsWith('/admin')
                      ? 'bg-bloom-green-mid/10 text-bloom-green-deep'
                      : 'text-bloom-green-deep/75 hover:bg-bloom-green-light/50 hover:text-bloom-green-deep',
                  )}
                >
                  Dashboard
                </Link>
              )}
              <div className="border-t border-bloom-green-mid/10 pt-3 flex flex-col gap-2">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-center text-[12px] text-bloom-green-deep/70 font-semibold font-display">
                      Xin chào, <span className="text-bloom-green-deep font-bold">{displayName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full rounded-full bg-bloom-green-mid/10 border border-bloom-green-mid/25 py-2 text-center text-xs font-black text-bloom-green-deep transition-colors hover:bg-bloom-green-deep hover:text-white font-display cursor-pointer"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="block w-full rounded-full bg-bloom-green-mid py-2 text-center text-xs font-black text-bloom-green-deep transition-colors hover:bg-bloom-green-deep hover:text-white font-display cursor-pointer"
                    onClick={() => {
                      setOpen(false)
                      setAuthOpen(true)
                    }}
                  >
                    Đăng nhập
                  </button>
                )}
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  )
}
