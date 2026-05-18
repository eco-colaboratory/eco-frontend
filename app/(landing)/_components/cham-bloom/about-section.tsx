import { Gamepad2, Flower2, Sprout } from 'lucide-react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { GlassCard } from './glass-card'
import { IconGlass } from './icon-glass'
import { MotionWrapper } from './motion-wrapper'
import { SectionLabel } from './section-label'
import { SectionShell } from './section-shell'
import { SectionWave } from './section-wave'

const icons = {
  gamepad: Gamepad2,
  flower: Flower2,
  sprout: Sprout,
} as const

const CARD_VARIANTS = [
  'border-white/40 bg-white/65',
  'border-bloom-gold/35 bg-gradient-to-br from-white/80 via-bloom-cream/90 to-bloom-green-light/50 md:-translate-y-3 md:shadow-lg',
  'border-bloom-green-mid/25 bg-bloom-green-light/40',
] as const

const ABOUT_TAGS = ['Gen Z', 'Game hóa xanh', 'Vườn ảo → thật'] as const

export function AboutSection() {
  const { about } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="about" bg="cream" className="pb-0 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <MotionWrapper className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <SectionLabel variant="glass" tone="light">
              {about.label}
            </SectionLabel>
            <h2 className="mt-4 text-balance font-display text-4xl leading-[1.08] text-bloom-green-deep md:text-5xl lg:text-[3.25rem]">
              {about.title}
            </h2>
            <p className="mt-5 max-w-md border-l-2 border-bloom-green-mid/40 pl-5 text-pretty text-lg leading-relaxed text-gray-600">
              {about.intro}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Điểm nổi bật">
              {ABOUT_TAGS.map((tag) => (
                <li key={tag}>
                  <span className="bloom-tag-chip">{tag}</span>
                </li>
              ))}
            </ul>
          </MotionWrapper>

          <div className="relative lg:col-span-7">
            <div
              className="pointer-events-none absolute left-6 top-12 bottom-12 hidden w-px border-l border-dashed border-bloom-green-mid/25 lg:block"
              aria-hidden
            />
            <div className="flex flex-col gap-5 sm:gap-6">
              {about.cards.map((card, i) => {
                const Icon = icons[card.icon]
                return (
                  <MotionWrapper key={card.title} delay={0.12 * (i + 1)}>
                    <GlassCard
                      interactive
                      className={cn(
                        'h-full border-2 md:p-8',
                        CARD_VARIANTS[i],
                        i === 2 && 'md:ml-10',
                        i === 1 && 'md:scale-[1.02]',
                      )}
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                        <IconGlass variant={i === 1 ? 'gold' : 'default'} className="mb-0 shrink-0">
                          <Icon className="h-7 w-7 text-bloom-green-mid" aria-hidden />
                        </IconGlass>
                        <div className="min-w-0 flex-1">
                          <span className="font-sans text-xs font-semibold tabular-nums text-bloom-green-mid/80">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h3 className="mt-1 font-display text-xl text-bloom-green-deep md:text-2xl">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-pretty text-base leading-relaxed text-gray-600">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </MotionWrapper>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <SectionWave className="relative z-10 mt-16 sm:mt-20" fillClassName="text-bloom-green-mist" />
    </SectionShell>
  )
}
