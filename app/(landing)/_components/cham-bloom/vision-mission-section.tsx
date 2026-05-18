import Image from 'next/image'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { EditorialImage } from './editorial-image'
import { MotionWrapper } from './motion-wrapper'
import { SectionDivider } from './section-divider'
import { SectionLabel } from './section-label'
import { SectionShell } from './section-shell'

function VisionOverlayBlock({
  chapter,
  title,
  body,
  imageSrc,
  imageAlt,
}: {
  chapter: string
  title: string
  body: string
  imageSrc: string
  imageAlt: string
}) {
  return (
    <MotionWrapper direction="up">
      <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/40 ring-inset shadow-xl shadow-bloom-green-deep/15">
        <div className="relative min-h-[360px] md:min-h-[520px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bloom-green-deep/90 via-bloom-green-deep/35 to-bloom-green-deep/10"
            aria-hidden
          />
          <div className="relative z-10 flex flex-col justify-end p-6 sm:p-8 md:absolute md:inset-x-0 md:bottom-0 md:p-10 lg:max-w-xl">
            <span className="font-sans text-xs font-semibold tabular-nums tracking-widest text-bloom-gold/90">
              {chapter}
            </span>
            <h2 className="mt-2 text-balance font-display text-4xl leading-[1.08] text-white md:text-5xl">
              {title}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/85 md:text-lg">{body}</p>
          </div>
        </div>
      </div>
    </MotionWrapper>
  )
}

function MissionSplitBlock({
  chapter,
  title,
  body,
  imageSrc,
  imageAlt,
}: {
  chapter: string
  title: string
  body: string
  imageSrc: string
  imageAlt: string
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-16">
      <MotionWrapper direction="left" className="min-w-0 md:col-span-7 md:order-1">
        <EditorialImage src={imageSrc} alt={imageAlt} className="md:h-[440px]" />
      </MotionWrapper>
      <MotionWrapper direction="right" className="min-w-0 md:col-span-5 md:order-2">
        <div className="bloom-pull-accent rounded-2xl border border-bloom-green-mid/20 bg-bloom-green-light/55 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <span className="font-sans text-xs font-semibold tabular-nums tracking-widest text-bloom-green-mid">
            {chapter}
          </span>
          <h2 className="mt-2 text-balance font-display text-4xl leading-[1.08] text-bloom-green-deep md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-gray-700 md:text-lg">{body}</p>
        </div>
      </MotionWrapper>
    </div>
  )
}

export function VisionMissionSection() {
  const { vision, mission } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="vision" bg="mist" className="pt-20 md:pt-24">
      <div className="mx-auto max-w-7xl space-y-20 px-4 sm:px-6 md:space-y-24">
        <MotionWrapper className="max-w-2xl">
          <SectionLabel variant="glass" tone="light">
            Tầm nhìn & Sứ mệnh
          </SectionLabel>
          <p className="mt-4 text-balance font-display text-2xl leading-snug text-bloom-green-deep/90 md:text-4xl">
            Từ khu vườn ảo đến <span className="bloom-headline-accent">tác động thật</span>
          </p>
        </MotionWrapper>

        <VisionOverlayBlock
          chapter="01 · Tầm nhìn"
          title={vision.title}
          body={vision.body}
          imageSrc={vision.imageSrc}
          imageAlt={vision.imageAlt}
        />

        <SectionDivider variant="leaf" />

        <MissionSplitBlock
          chapter="02 · Sứ mệnh"
          title={mission.title}
          body={mission.body}
          imageSrc={mission.imageSrc}
          imageAlt={mission.imageAlt}
        />
      </div>
    </SectionShell>
  )
}
