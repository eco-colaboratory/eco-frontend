import { Flower2, Sparkles } from 'lucide-react'
import { CHAM_BLOOM_CONTENT, type TierHighlight } from '@/lib/content/cham-bloom-landing'
import { GlassCard } from './glass-card'
import { MotionWrapper } from './motion-wrapper'
import { SectionHeader } from './section-header'
import { SectionShell } from './section-shell'
import { cn } from '@/lib/utils'

const BENTO_SPANS = [
  'md:col-span-2 md:row-span-2',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-2',
] as const

function tierStyles(highlight: TierHighlight) {
  return highlight === 'gold'
    ? {
        card: 'border-2 border-bloom-gold/50 bg-gradient-to-br from-white/70 via-bloom-gold/5 to-white/60',
        icon: 'text-bloom-gold',
        badge: true,
      }
    : {
        card: 'border-2 border-bloom-green-mid/35 bg-white/55',
        icon: 'text-bloom-green-mid',
        badge: false,
      }
}

export function SponsorshipSection() {
  const { tiers, fundUsage } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="sponsorship" bg="light-to-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader label="Tài trợ" title="Các gói" accent="đồng hành" />

        <div className="mx-auto mt-14 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-5">
          {tiers.map((tier, i) => {
            const styles = tierStyles(tier.highlight)
            const featured = i === 0
            return (
              <MotionWrapper
                key={tier.slug}
                delay={0.08 * i}
                className={cn(BENTO_SPANS[i], featured && 'min-h-[220px]')}
              >
                <GlassCard
                  className={cn(
                    'relative flex h-full flex-col gap-3 md:p-7',
                    styles.card,
                    featured && 'md:justify-between md:p-9',
                  )}
                >
                  {styles.badge ? (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-bloom-gold/30 bg-bloom-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bloom-green-deep">
                      <Sparkles className="h-3 w-3 text-bloom-gold" aria-hidden />
                      Nổi bật
                    </span>
                  ) : null}
                  <Flower2
                    className={cn('h-8 w-8', styles.icon, featured && 'h-10 w-10')}
                    aria-hidden
                  />
                  <h3
                    className={cn(
                      'break-words pr-12 font-display text-bloom-green-deep',
                      featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl',
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      'leading-relaxed text-gray-600',
                      featured ? 'text-base md:max-w-sm' : 'text-sm',
                    )}
                  >
                    {tier.teaser}
                  </p>
                </GlassCard>
              </MotionWrapper>
            )
          })}
        </div>

        <MotionWrapper delay={0.2} className="mx-auto mt-12 max-w-3xl md:ml-auto md:mr-0 md:max-w-xl">
          <GlassCard
            interactive={false}
            className="border-dashed border-bloom-green-mid/25 md:p-8 md:translate-x-4"
          >
            <h3 className="font-display text-xl text-bloom-green-deep md:text-2xl">{fundUsage.title}</h3>
            <ul className="mt-5 space-y-3">
              {fundUsage.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-gray-700 md:text-base">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bloom-green-mid"
                    aria-hidden
                  />
                  {b}
                </li>
              ))}
            </ul>
          </GlassCard>
        </MotionWrapper>
      </div>
    </SectionShell>
  )
}
