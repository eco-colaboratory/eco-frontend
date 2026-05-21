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
import { cn } from '@/lib/utils'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'

const SCROLL_THRESHOLD = 100

const NAV_LINKS = [
  { href: '#about', label: 'Về chúng tôi' },
  { href: '#roadmap', label: 'Lộ trình' },
  { href: '#sponsorship', label: 'Gói tài trợ' },
  { href: '#contact', label: 'Liên hệ' },
] as const

const springTransition = { type: 'spring' as const, stiffness: 200, damping: 50 }

const pillWidth =
  'w-[92%] max-w-7xl sm:w-[85%] md:w-3/4'

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
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD,
  )
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')
  const reduced = useReducedMotion()
  const { email, cta } = CHAM_BLOOM_CONTENT.contact

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD)
  })

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
          'pointer-events-auto grid grid-cols-2 sm:grid-cols-3 items-center px-6 py-0 sm:px-6 sm:py-1',
          isScrolled
            ? cn(
              pillWidth,
              'bg-bloom-cream/80 backdrop-blur-[10px] rounded-full',
              'shadow-[0_4px_30px_rgba(26,60,40,0.08),0_2px_8px_rgba(0,0,0,0.04)]',
            )
            : cn(
              'w-full max-w-7xl',
              'bg-transparent',
            ),
        )}
        initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 10 }}
        animate={{
          opacity: 1,
          y: isScrolled && !reduced ? 20 : 0,
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
        <div className="flex justify-start">
          <Link
            href="#hero"
            onClick={(e) => scrollToSection(e, 'hero')}
            className="flex items-center gap-2 font-sans text-base font-medium text-bloom-green-deep hover:opacity-90 transition-opacity"
          >
            <Image
              src="/assets/logo/logo_xanh.png"
              alt="CHẠM Flora Logo"
              width={54}
              height={54}
              className="shrink-0 object-contain"
            />
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((l) => {
            const sectionId = l.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => scrollToSection(e, sectionId)}
                className={cn(
                  'relative py-1.5 text-[13px] font-medium transition-colors font-display',
                  isActive
                    ? 'text-bloom-green-deep'
                    : 'text-gray-600 hover:text-bloom-green-deep',
                )}
              >
                {l.label}
                {isActive && (
                  <m.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-bloom-green-mid rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Link
            href={`mailto:${email}`}
            className="hidden rounded-full bg-bloom-green-mid px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-bloom-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bloom-green-mid sm:inline-flex font-display"
          >
            {cta}
          </Link>

          <button
            type="button"
            className="sm:hidden"
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6 text-bloom-green-deep" /> : <MenuIcon className="h-6 w-6 text-bloom-green-deep" />}
          </button>
        </div>
      </m.nav>

      <AnimatePresence>
        {open ? (
          <m.div
            key="mobile-menu"
            className={cn(
              'pointer-events-auto overflow-hidden sm:hidden mt-6',
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
                const sectionId = l.href.replace('#', '')
                const isActive = activeSection === sectionId
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={(e) => scrollToSection(e, sectionId)}
                    className={cn(
                      'rounded-lg py-2 px-3 text-[13px] font-medium transition-colors font-display',
                      isActive
                        ? 'bg-bloom-green-mid/10 text-bloom-green-deep'
                        : 'text-gray-600 hover:bg-bloom-green-light/50 hover:text-bloom-green-deep',
                    )}
                  >
                    {l.label}
                  </Link>
                )
              })}
              <div className="border-t border-bloom-green-mid/10 pt-3">
                <Link
                  href={`mailto:${email}`}
                  className="block w-full rounded-full bg-bloom-green-mid py-2 text-center text-xs font-medium text-white transition-colors hover:bg-bloom-green-deep font-display"
                  onClick={() => setOpen(false)}
                >
                  {cta}
                </Link>
              </div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
