import { Flower2, Gamepad2, Sprout } from 'lucide-react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { MotionWrapper } from './motion-wrapper'
import { SectionHeader } from './section-header'
import { SectionShell } from './section-shell'

const STEP_ICONS = [Gamepad2, Flower2, Sprout] as const

const STEP_OFFSETS = [
  'md:pr-[18%]',
  'md:pl-[18%] md:-mt-6',
  'md:pr-[10%] md:-mt-4',
] as const

export function CoreIdeaSection() {
  const { coreIdea } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="core-idea" bg="light-to-cream">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="bloom-section-band relative">
          <BloomAmbientInline />
          <SectionHeader
            label="Ý tưởng cốt lõi"
            title={coreIdea.headline}
            align="left"
            className="!mt-0"
          />
          <MotionWrapper delay={0.1}>
            <p className="mt-2 max-w-xl text-balance font-display text-3xl text-bloom-gold md:text-4xl">
              {coreIdea.headlineGold}
            </p>
          </MotionWrapper>

          <ol className="relative mt-14 space-y-0">
            <div className="bloom-timeline-rail" aria-hidden />
            {coreIdea.steps.map((step, i) => {
              const Icon = STEP_ICONS[i] ?? Sprout
              const alignRight = i % 2 === 1
              return (
                <li
                  key={step}
                  className={cn(
                    'relative pb-12 last:pb-0 md:pb-16',
                    STEP_OFFSETS[i],
                  )}
                >
                  <MotionWrapper delay={0.12 * (i + 1)}>
                    <div
                      className={cn(
                        'flex items-start gap-5',
                        alignRight ? 'md:flex-row-reverse md:text-right' : 'md:flex-row',
                      )}
                    >
                      <div
                        className={cn(
                          'bloom-journey-node shrink-0',
                          i === 1 && 'ring-2 ring-bloom-gold/30',
                        )}
                      >
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <span className="font-sans text-xs font-semibold tabular-nums tracking-widest text-bloom-green-mid/80">
                          Bước {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="mt-1 font-display text-2xl text-bloom-green-deep md:text-3xl">
                          {step}
                        </p>
                      </div>
                    </div>
                  </MotionWrapper>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </SectionShell>
  )
}

function BloomAmbientInline() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
      <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-bloom-green-mid/10 blur-3xl" />
      <div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-bloom-gold/15 blur-3xl" />
    </div>
  )
}
