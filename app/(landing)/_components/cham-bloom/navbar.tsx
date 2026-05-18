'use client'

import { useState } from 'react'
import {
  AnimatePresence,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { Menu, X, Leaf } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'

const SCROLL_THRESHOLD = 100

const NAV_LINKS = [
  { href: '#about', label: 'Về chúng tôi' },
  { href: '#vision', label: 'Tầm nhìn' },
  { href: '#sponsorship', label: 'Gói tài trợ' },
  { href: '#contact', label: 'Liên hệ' },
] as const

const springTransition = { type: 'spring' as const, stiffness: 200, damping: 50 }

const pillWidth =
  'w-[92%] max-w-7xl sm:w-[85%] md:w-3/4'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD,
  )
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const { email, cta } = CHAM_BLOOM_CONTENT.contact

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD)
  })

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center">
      <m.nav
        className={cn(
          'pointer-events-auto grid grid-cols-3 items-center px-4 py-3 sm:px-6 sm:py-4',
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
            className="flex items-center gap-2 font-display text-lg font-semibold text-bloom-green-deep"
          >
            <Leaf className="h-5 w-5 shrink-0 text-bloom-green-mid" aria-hidden />
            <span className="truncate text-base sm:text-lg">CHẠM Bloom</span>
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-700 transition-colors hover:text-bloom-green-deep"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Link
            href={`mailto:${email}`}
            className="hidden rounded-full bg-bloom-green-mid px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-bloom-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bloom-green-mid sm:inline-flex"
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
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </m.nav>

      <AnimatePresence>
        {open ? (
          <m.div
            key="mobile-menu"
            className={cn(
              'pointer-events-auto overflow-hidden sm:hidden',
              'border-b border-bloom-green-mid/15 bg-bloom-cream/95 backdrop-blur-md',
              isScrolled ? cn(pillWidth, 'rounded-b-2xl border-x border-b') : 'w-full',
            )}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: 'easeOut' }}
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-sm text-gray-700 transition-colors hover:text-bloom-green-deep"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <Link
                  href={`mailto:${email}`}
                  className="block w-full rounded-full bg-bloom-green-mid py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-bloom-green-deep"
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
