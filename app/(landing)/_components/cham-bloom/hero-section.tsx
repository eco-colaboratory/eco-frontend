import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { BloomButton } from './bloom-button'
import { HeroVideo } from './hero-video'
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

      <div
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-bloom-cream/92 via-bloom-cream/55 to-transparent md:from-bloom-cream/88 md:via-bloom-cream/40 md:to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-bloom-cream/75 to-transparent sm:h-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36 bg-gradient-to-t from-bloom-cream via-bloom-cream/80 to-transparent sm:h-44"
        aria-hidden
      />

      <div className="relative z-20 flex h-full min-h-0 flex-col">
        <div className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col justify-center px-4 pt-[5.5rem] pb-4 sm:px-6 sm:pt-28">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="text-left lg:col-span-6 xl:col-span-5">
              <FadeIn delay="0.15s">
                <span className="font-hero inline-flex rounded-full border border-white/25 bg-white/20 px-4 py-2 text-sm font-medium uppercase tracking-widest text-bloom-green-deep backdrop-blur-md sm:px-5 sm:text-base">
                  {hero.badge}
                </span>
              </FadeIn>

              <FadeIn delay="0.25s" className="mt-5 sm:mt-6">
                <h1 className="font-hero text-balance text-[2.35rem] font-medium leading-[1.06] tracking-tight text-bloom-green-deep sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                  {hero.headline[0]}
                  <br />
                  <span className="bloom-headline-accent font-semibold italic">{hero.headline[1]}</span>
                </h1>
              </FadeIn>

              <FadeIn delay="0.4s" className="mt-3 max-w-lg sm:mt-4">
                <p className="font-hero text-pretty text-lg font-normal italic leading-relaxed text-bloom-green-deep/80 sm:text-xl">
                  {hero.tagline}
                </p>
              </FadeIn>

              <FadeIn delay="0.55s" className="mt-5 flex flex-wrap items-center gap-3 sm:mt-6">
                <BloomButton href="#sponsorship">{hero.primaryCta}</BloomButton>
                <BloomButton href="#vision" variant="outline">
                  {hero.secondaryCta}
                </BloomButton>
              </FadeIn>
            </div>

            <div className="hidden lg:col-span-6 lg:block xl:col-span-7" aria-hidden />
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
