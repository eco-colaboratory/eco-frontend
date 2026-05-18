import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { BloomButton } from './bloom-button'
import { MotionWrapper } from './motion-wrapper'
import { SectionLabel } from './section-label'
import { SectionShell } from './section-shell'

export function ContactSection() {
  const { contact } = CHAM_BLOOM_CONTENT
  const bgImage = CHAM_BLOOM_CONTENT.vision.imageSrc

  return (
    <SectionShell id="contact" bg="deep" ambient={false} className="relative overflow-hidden">
      <Image
        src={bgImage}
        alt=""
        fill
        className="object-cover opacity-20"
        sizes="100vw"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bloom-green-deep/85 via-bloom-green-deep/92 to-bloom-green-deep"
        aria-hidden
      />
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <MotionWrapper className="text-left lg:col-span-7">
          <SectionLabel variant="glass" tone="dark">
            Liên hệ
          </SectionLabel>
          <h2 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] md:text-5xl lg:text-[3.25rem]">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">{contact.body}</p>
          <div className="mt-10">
            <BloomButton
              href={`mailto:${contact.email}`}
              className="shadow-lg shadow-black/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {contact.cta}
            </BloomButton>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.15} className="lg:col-span-5">
          <div className="space-y-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-6 text-sm text-white/75 backdrop-blur-md md:translate-y-4">
            <p className="font-medium text-white/90">{contact.representative}</p>
            <p>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                {contact.email}
              </a>
            </p>
            <p>
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-white"
                aria-label={`Facebook: ${contact.facebookLabel}`}
              >
                {contact.facebookLabel}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </p>
          </div>
        </MotionWrapper>
      </div>
      <footer className="relative z-10 mx-auto mt-20 max-w-7xl border-t border-white/10 px-4 pt-8 text-left text-xs text-white/45 sm:px-6 lg:text-center">
        {contact.copyright}
      </footer>
    </SectionShell>
  )
}
