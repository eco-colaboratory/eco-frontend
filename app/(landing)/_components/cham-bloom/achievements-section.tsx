import { Award, Medal } from 'lucide-react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { GlassCard } from './glass-card'
import { IconGlass } from './icon-glass'
import { MotionWrapper } from './motion-wrapper'
import { SectionHeader } from './section-header'
import { SectionShell } from './section-shell'

const icons = [Award, Medal]

export function AchievementsSection() {
  const { achievements } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="achievements" bg="cream" ambient>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeader
            label={achievements.label}
            title="Được"
            accent="công nhận"
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          />

          <div className="flex flex-col gap-6 lg:col-span-8 lg:gap-8">
            {achievements.items.map((item, i) => {
              const Icon = icons[i] ?? Award
              const featured = i === 0
              return (
                <MotionWrapper key={item.title} delay={0.15 * (i + 1)}>
                  <GlassCard
                    interactive
                    className={cn(
                      'border-2 text-left',
                      featured
                        ? 'border-bloom-gold/40 bg-gradient-to-br from-white/85 to-bloom-cream/90 p-8 md:p-12'
                        : 'ml-auto max-w-lg border-bloom-green-mid/25 bg-bloom-green-light/45 p-7 md:mr-8 md:p-9',
                    )}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                      <IconGlass variant="gold" className="mb-0 shrink-0">
                        <Icon
                          className={cn('text-bloom-gold', featured ? 'h-9 w-9' : 'h-7 w-7')}
                          aria-hidden
                        />
                      </IconGlass>
                      <div className="min-w-0 flex-1">
                        <span className="inline-flex w-fit rounded-full border border-white/25 bg-white/20 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-bloom-green-deep backdrop-blur-md">
                          {item.badge}
                        </span>
                        <h3
                          className={cn(
                            'mt-3 font-display text-bloom-green-deep',
                            featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl',
                          )}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-base leading-relaxed text-gray-600">
                          {item.subtitle}
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
    </SectionShell>
  )
}
