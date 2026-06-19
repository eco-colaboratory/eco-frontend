'use client'

import Image from 'next/image'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { BloomButton } from '../layout/bloom-button'
import { PartnersMarquee } from './partners-marquee'

function FadeIn({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: string
  className?: string
}) {
  return (
    <div
      className={cn('animate-fade-in-up', className)}
      style={{ animationDelay: delay, opacity: 0 }}
    >
      {children}
    </div>
  )
}

function BackgroundFlowers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Sun/Glow Orbs */}
      <div className="absolute -top-40 right-[-10%] h-[600px] w-[600px] rounded-full bg-bloom-gold/20 blur-[130px] mix-blend-screen scroll-parallax-glow" />
      <div className="absolute top-[20%] left-[-20%] h-[550px] w-[550px] rounded-full bg-bloom-petal-soft/40 blur-[110px] mix-blend-screen scroll-parallax-glow" />
      <div className="absolute bottom-[-10%] right-[10%] h-[600px] w-[600px] rounded-full bg-bloom-accent-mint/15 blur-[140px] mix-blend-screen" />

      {/* Rotating large flower 1 */}
      <div className="absolute -right-24 top-[15%] h-[320px] w-[320px] opacity-[0.08] lg:opacity-[0.14] animate-bloom-spin-slow scroll-rotate-cw text-bloom-petal">
        <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
          <path d="M50 35c-4-10-20-10-20 0 0 10 16 15 20 25 4-10 20-15 20-25 0-10-16-10-20 0z" />
          <path d="M50 65c-4 10-20 10-20 0 0-10 16-15 20-25 4 10 20 15 20 25 0 10-16 10-20 0z" />
          <path d="M35 50c-10-4-10-20 0-20 10 0 15 16 25 20-10 4-15 20-25 20-10 0-10-16 0-20z" />
          <path d="M65 50c10-4 10-20 0-20-10 0-15 16-25 20 10 4 15 20 25 20 10 0 10-16 0-20z" />
          <circle cx="50" cy="50" r="10" className="text-bloom-gold" />
        </svg>
      </div>

      {/* Rotating flower 2 */}
      <div className="absolute -left-20 bottom-[10%] h-[240px] w-[240px] opacity-[0.08] lg:opacity-[0.12] animate-bloom-spin-slow scroll-rotate-ccw text-bloom-gold" style={{ animationDirection: 'reverse' }}>
        <svg viewBox="0 0 100 100" fill="currentColor" className="h-full w-full">
          <path d="M50 35c-4-10-20-10-20 0 0 10 16 15 20 25 4-10 20-15 20-25 0-10-16-10-20 0z" />
          <path d="M50 65c-4 10-20 10-20 0 0-10 16-15 20-25 4 10 20 15 20 25 0 10-16 10-20 0z" />
          <path d="M35 50c-10-4-10-20 0-20 10 0 15 16 25 20-10 4-15 20-25 20-10 0-10-16 0-20z" />
          <path d="M65 50c10-4 10-20 0-20-10 0-15 16-25 20 10 4 15 20 25 20 10 0 10-16 0-20z" />
          <circle cx="50" cy="50" r="10" className="text-bloom-petal" />
        </svg>
      </div>

      {/* Floating organic leaves & sparkles */}
      <div className="absolute left-[15%] top-[12%] opacity-30 animate-bloom-float text-bloom-accent-mint h-8 w-8">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17 8C8 10 4 18 4 18S12 18 19 11C21 9 20 5 20 5S18 7 17 8Z" />
        </svg>
      </div>
      <div className="absolute right-[28%] bottom-[18%] opacity-35 animate-bloom-float text-bloom-accent-mint h-10 w-10" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M17 8C8 10 4 18 4 18S12 18 19 11C21 9 20 5 20 5S18 7 17 8Z" />
        </svg>
      </div>
      <div className="absolute right-[45%] top-[25%] opacity-20 animate-pulse text-bloom-gold h-4 w-4">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
        </svg>
      </div>
    </div>
  )
}

export function HeroSection() {
  const { hero } = CHAM_BLOOM_CONTENT

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-bloom-cream"
    >
      <BackgroundFlowers />

      {/* Soft overlay blending edges */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(255,250,242,0.85)_0%,rgba(255,250,242,0.65)_42%,rgba(255,250,242,0.3)_72%,rgba(255,250,242,0.05)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-bloom-cream to-transparent"
        aria-hidden
      />

      <div className="relative z-20 flex min-h-[100dvh] flex-col">
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-4 pb-8 pt-28 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:pt-32">
          
          {/* Left Column: Heading and copy */}
          <div className="text-left lg:col-span-7">
            <div className="max-w-3xl">
              <FadeIn delay="0.15s">
                <span className="inline-flex rounded-full border-2 border-bloom-green-deep bg-bloom-green-light px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-bloom-green-deep shadow-[2px_2px_0px_var(--bloom-green-deep)]">
                  🌸 {hero.badge}
                </span>
              </FadeIn>

              <FadeIn delay="0.25s" className="mt-5 sm:mt-6">
                <h1 className="font-hero text-pretty text-[1.75rem] font-black leading-[1.15] text-bloom-green-deep sm:text-[2.25rem] md:text-[2.65rem] lg:text-[2.85rem] bloom-text-shadow">
                  {hero.headline[0]}
                  <br />
                  <span className="bloom-headline-accent font-black tracking-tight">{hero.headline[1]}</span>
                </h1>
              </FadeIn>

              <FadeIn delay="0.4s" className="mt-5 max-w-2xl">
                <p className="font-hero text-pretty text-sm font-medium leading-relaxed text-bloom-green-deep/75 sm:text-base md:text-base">
                  {hero.tagline}
                </p>
              </FadeIn>

              <FadeIn delay="0.55s" className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                <BloomButton href="#sponsorship" variant="primary">
                  {hero.primaryCta}
                </BloomButton>
                <BloomButton href="#benefits" variant="outline">
                  {hero.secondaryCta}
                </BloomButton>
              </FadeIn>
            </div>
          </div>

          {/* Right Column: Chibi Mascot Image */}
          <FadeIn delay="0.45s" className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[28rem] sm:max-w-[32rem] aspect-square flex items-center justify-center">
              
              {/* Cute leaf background decoration and radial glows */}
              <div className="absolute inset-0 bg-gradient-to-tr from-bloom-accent-mint/35 to-bloom-gold/30 rounded-full blur-[90px] -z-10 animate-pulse" />
              
              {/* Rotating dashed layout circle behind mascot */}
              <div className="absolute w-[95%] h-[95%] opacity-15 -z-10 animate-bloom-spin-slow text-bloom-green-deep">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[0.8] stroke-dasharray-[3_3]">
                  <circle cx="50" cy="50" r="45" />
                  <circle cx="50" cy="50" r="36" />
                </svg>
              </div>

              {/* Chibi Mascot Image */}
              <div className="relative z-10 w-[78%] sm:w-[82%] aspect-square select-none animate-bloom-float scroll-parallax-mascot">
                <Image
                  src="/assets/landing/hero.png"
                  alt="Mascot CHẠM Flora"
                  width={460}
                  height={460}
                  className="object-contain w-full h-full filter drop-shadow-[0_10px_15px_rgba(79,53,22,0.12)]"
                  priority
                />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Partners Marquee Bar */}
        <FadeIn delay="0.65s" className="shrink-0 px-4 pb-6 sm:px-6 sm:pb-8">
          <div className="mx-auto max-w-7xl border-t-2 border-bloom-green-deep/15 pt-5">
            <PartnersMarquee pill={hero.partnersPill} partners={hero.partners} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
