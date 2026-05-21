import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { BloomButton } from '../layout/bloom-button'
import { HeroVideo } from '../layout/hero-video'
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

export function HeroSection() {
  const { hero } = CHAM_BLOOM_CONTENT

  return (
    <section
      id="hero"
      className="relative h-[100dvh] max-h-[100dvh] min-h-[100dvh] overflow-hidden"
    >
      <HeroVideo src={hero.videoUrl} poster={hero.posterSrc} />

      {/* Glassmorphism & Soft Gradients for Bloom Tech look */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-bloom-cream/95 via-bloom-cream/70 to-transparent md:from-bloom-cream/90 md:via-bloom-cream/50 md:to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-bloom-cream/80 to-transparent sm:h-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-bloom-green-light via-bloom-green-light/80 to-transparent sm:h-44"
        aria-hidden
      />

      {/* Glow Effects (Glow particles) */}
      <div className="pointer-events-none absolute right-[10%] top-[20%] z-10 h-72 w-72 rounded-full bg-bloom-accent-mint/10 blur-[80px] animate-pulse duration-[6000ms]" />
      <div className="pointer-events-none absolute right-[25%] bottom-[15%] z-10 h-80 w-80 rounded-full bg-bloom-green-mid/10 blur-[100px] animate-pulse duration-[8000ms]" />

      {/* Floating Leaves and Minimal Particles */}
      <div className="pointer-events-none absolute inset-0 z-15 overflow-hidden">
        {/* Leaf 1 */}
        <div 
          className="absolute right-[15%] top-[15%] animate-bounce text-2xl opacity-40 blur-[0.5px]" 
          style={{ animationDuration: '7s', transform: 'rotate(15deg)' }}
        >
          🍃
        </div>
        {/* Leaf 2 */}
        <div 
          className="absolute right-[28%] top-[55%] animate-bounce text-3xl opacity-35 blur-[1px]" 
          style={{ animationDuration: '10s', transform: 'rotate(-25deg)', animationDelay: '1s' }}
        >
          🌱
        </div>
        {/* Leaf 3 */}
        <div 
          className="absolute right-[8%] bottom-[25%] animate-bounce text-xl opacity-50" 
          style={{ animationDuration: '8s', transform: 'rotate(45deg)', animationDelay: '2s' }}
        >
          🍃
        </div>
        {/* Particles */}
        <div className="absolute right-[20%] top-[40%] h-1.5 w-1.5 rounded-full bg-bloom-accent-mint/40 blur-[0.5px] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute right-[12%] top-[65%] h-2 w-2 rounded-full bg-bloom-green-mid/30 blur-[1px] animate-ping" style={{ animationDuration: '6s', animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-20 flex h-full min-h-0 flex-col">
        <div className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col justify-center px-4 pt-[5.5rem] pb-4 sm:px-6 sm:pt-28">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="text-left lg:col-span-7 xl:col-span-6">
              <FadeIn delay="0.15s">
                <span className="font-hero inline-flex rounded-full border border-white/40 bg-white/30 px-3.5 py-1.5 text-xs font-medium uppercase tracking-widest text-bloom-green-deep backdrop-blur-md sm:px-4 sm:text-xs shadow-sm">
                  {hero.badge}
                </span>
              </FadeIn>

              <FadeIn delay="0.25s" className="mt-5 sm:mt-6">
                <h1 className="font-hero text-balance text-[2rem] font-semibold leading-[1.1] tracking-tight text-bloom-green-deep sm:text-4xl md:text-5xl lg:text-[3.5rem]">
                  {hero.headline[0]}
                  <br />
                  <span className="bloom-headline-accent font-semibold italic">{hero.headline[1]}</span>
                </h1>
              </FadeIn>

              <FadeIn delay="0.4s" className="mt-4 max-w-lg sm:mt-5">
                <p className="font-hero text-pretty text-base font-normal leading-relaxed text-bloom-green-deep/80 sm:text-lg">
                  {hero.tagline}
                </p>
              </FadeIn>

              <FadeIn delay="0.55s" className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8">
                <BloomButton href="#sponsorship" variant="primary">{hero.primaryCta}</BloomButton>
                <BloomButton href="#roadmap" variant="outline">
                  {hero.secondaryCta}
                </BloomButton>
              </FadeIn>
            </div>

            <div className="hidden lg:col-span-5 lg:block xl:col-span-6" aria-hidden />
          </div>
        </div>

        <FadeIn delay="0.65s" className="shrink-0 px-4 pb-6 sm:px-6 sm:pb-8">
          <div className="mx-auto max-w-7xl">
            <PartnersMarquee pill={hero.partnersPill} partners={hero.partners} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

