'use client'

import Image from 'next/image'
import { Gamepad2, Sparkles, Sprout, Users } from 'lucide-react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionLabel } from '../layout/section-label'
import { SectionShell } from '../layout/section-shell'
import { BloomButton } from '../layout/bloom-button'

const ABOUT_TAGS = ['Gen Z Eco', 'Gamification', 'Tác động thật'] as const

const ICONS = {
  gamepad: Gamepad2,
  sparkles: Sparkles,
  users: Users,
  sprout: Sprout,
} as const

const CARD_COLOR_SCHEMES = [
  {
    bg: 'bg-[#fde0e8]/80 hover:bg-[#fde0e8] border-[#f58fb1]',
    iconBg: 'bg-[#f58fb1]/20 text-[#f58fb1]',
    badgeBg: 'bg-[#f58fb1]/10 text-[#f58fb1]',
  },
  {
    bg: 'bg-[#fdf3c7]/80 hover:bg-[#fdf3c7] border-[#ffcb45]',
    iconBg: 'bg-[#ffcb45]/20 text-[#d9980d]',
    badgeBg: 'bg-[#ffcb45]/10 text-[#d9980d]',
  },
  {
    bg: 'bg-[#eef7e8]/80 hover:bg-[#eef7e8] border-[#82bf47]',
    iconBg: 'bg-[#82bf47]/20 text-[#548722]',
    badgeBg: 'bg-[#82bf47]/10 text-[#548722]',
  },
  {
    bg: 'bg-[#e0e4fc]/80 hover:bg-[#e0e4fc] border-[#92a1fa]',
    iconBg: 'bg-[#92a1fa]/20 text-[#4c5de6]',
    badgeBg: 'bg-[#92a1fa]/10 text-[#4c5de6]',
  },
] as const

export function AboutSection() {
  const { about, vision, mission } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="about" bg="cream" className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Top grid: Title + Vision & Mission */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <MotionWrapper className="lg:col-span-5">
            <SectionLabel variant="glass" tone="light">
              {about.label}
            </SectionLabel>
            <h2 className="mt-5 max-w-xl text-balance font-display text-4xl font-black leading-[1.15] text-bloom-green-deep md:text-5xl bloom-text-shadow">
              {about.title}
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-sm font-medium leading-relaxed text-bloom-green-deep/75">
              {about.intro}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Điểm nổi bật">
              {ABOUT_TAGS.map((tag) => (
                <li key={tag}>
                  <span className="inline-flex rounded-full border-2 border-bloom-green-deep bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-bloom-green-deep shadow-[2px_2px_0px_var(--bloom-green-deep)]">
                    🌱 {tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <BloomButton href="#sponsorship" variant="primary">
                <span>Đồng hành cùng dự án</span>
              </BloomButton>
            </div>
          </MotionWrapper>

          {/* Right side: Vision & Mission Cards */}
          <div className="lg:col-span-7">
            <div className="grid gap-6 md:grid-cols-2">
              {[vision, mission].map((item, index) => (
                <MotionWrapper
                  key={item.title}
                  delay={0.1 * (index + 1)}
                  className={cn(index === 1 && 'md:mt-10')}
                >
                  <article className="overflow-hidden rounded-[2rem] border-2 border-bloom-green-deep bg-white shadow-[4px_4px_0px_var(--bloom-green-deep)] hover:translate-y-[-3px] transition-transform duration-300">
                    <div className="relative aspect-[4/3] w-full border-b-2 border-bloom-green-deep">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bloom-dark/65 via-transparent to-transparent" />
                      <h3 className="absolute bottom-4 left-4 font-display text-2xl font-black text-white bloom-text-shadow">
                        {item.title}
                      </h3>
                    </div>
                    <p className="p-5 text-xs font-medium leading-relaxed text-bloom-green-deep/75">
                      {item.body}
                    </p>
                  </article>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom grid: 4 Game-like feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 sm:mt-16">
          {about.cards.map((card, index) => {
            const Icon = ICONS[card.icon as keyof typeof ICONS] ?? Sprout
            const scheme = CARD_COLOR_SCHEMES[index] ?? CARD_COLOR_SCHEMES[0]

            return (
              <MotionWrapper key={card.title} delay={0.08 * index}>
                <article className={cn(
                  'relative flex flex-col p-6 h-full rounded-[2rem] border-2 border-bloom-green-deep shadow-[4px_4px_0px_var(--bloom-green-deep)] transition-all duration-300 cursor-default group',
                  'hover:translate-y-[-6px] hover:rotate-[1deg] hover:shadow-[6px_6px_0px_var(--bloom-green-deep)]',
                  scheme.bg
                )}>
                  {/* Big cute index number */}
                  <span className={cn(
                    'absolute right-5 top-5 font-mono text-xs font-black px-2 py-0.5 rounded-full border-2 border-bloom-green-deep',
                    scheme.badgeBg
                  )}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon circle */}
                  <span className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-bloom-green-deep shadow-[2px_2px_0px_var(--bloom-green-deep)] group-hover:scale-105 transition-transform duration-300',
                    scheme.iconBg
                  )}>
                    <Icon className="h-6 w-6 stroke-[2]" aria-hidden />
                  </span>

                  {/* Card Title */}
                  <h3 className="mt-6 font-display text-base font-black leading-tight text-bloom-green-deep">
                    {card.title}
                  </h3>

                  {/* Card Description */}
                  <p className="mt-3 text-[12px] font-medium leading-relaxed text-bloom-green-deep/75">
                    {card.description}
                  </p>
                </article>
              </MotionWrapper>
            )
          })}
        </div>

      </div>
    </SectionShell>
  )
}
