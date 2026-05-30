'use client'

import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { BloomButton } from '../layout/bloom-button'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionLabel } from '../layout/section-label'
import { SectionShell } from '../layout/section-shell'

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  )
}


function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export function ContactSection() {
  const { contact } = CHAM_BLOOM_CONTENT
  const bgImage = CHAM_BLOOM_CONTENT.vision.imageSrc

  return (
    <SectionShell id="contact" bg="deep" ambient={false} className="relative overflow-hidden !py-0">
      {/* Background elements */}
      <Image
        src={bgImage}
        alt=""
        fill
        className="object-cover opacity-5 mix-blend-luminosity pointer-events-none"
        sizes="100vw"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-bloom-dark via-[#051A0C] to-bloom-dark"
        aria-hidden
      />

      {/* Dreamy Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-bloom-green-mid/10 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-bloom-gold/5 blur-[150px]" aria-hidden />
      <div className="pointer-events-none absolute top-1/2 left-1/3 h-[300px] w-[300px] rounded-full bg-bloom-accent-mint/5 blur-[100px]" aria-hidden />

      {/* Sparks particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/5 animate-pulse h-1 w-1 rounded-full bg-bloom-gold" />
        <div className="absolute top-2/3 left-1/3 animate-bounce h-1.5 w-1.5 rounded-full bg-bloom-green-mid/70" />
        <div className="absolute top-1/3 left-2/3 animate-pulse h-2 w-2 rounded-full bg-bloom-accent-mint/50" />
        <div className="absolute top-3/4 left-3/4 animate-bounce h-1 w-1 rounded-full bg-white" />
      </div>

      <div className="py-8 md:py-12">
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          <MotionWrapper className="text-left lg:col-span-7">
            <SectionLabel variant="glass" tone="dark" className="inline-flex items-center gap-1.5">
              Đồng hành cùng dự án
            </SectionLabel>

            <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold tracking-tight text-white leading-[1.2] md:text-3xl lg:text-4xl">
              {contact.title}
            </h2>

            <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/80">
              {contact.body}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 items-center">
              {/* Primary Button with Eco Green Gradient */}
              <BloomButton
                href={`mailto:${contact.email}`}
                className="bg-gradient-to-r from-bloom-green-mid to-bloom-accent-mint text-white hover:opacity-95 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] text-sm font-semibold shadow-lg transition-all duration-300 transform active:scale-95 border-0"
              >
                <span className="flex items-center gap-2">
                  {contact.cta}
                  <span className="transition-transform group-hover:translate-x-1 font-mono">→</span>
                </span>
              </BloomButton>
            </div>
          </MotionWrapper>

          {/* Representative Glass Card */}
          <MotionWrapper delay={0.15} className="lg:col-span-5">
            <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10">
              {/* Ambient card glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-bloom-green-mid/20 via-transparent to-bloom-accent-mint/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
                  <Image
                    src="/assets/logo/logoLogin.png"
                    alt="E.C.O Project Logo"
                    width={80}
                    height={80}
                    className="object-contain rounded-lg -mb-4"
                  />
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-white text-sm leading-tight tracking-wide">E.C.O Project</p>
                    <p className="text-[11px] text-bloom-accent-mint font-medium mt-0.5">Hành động xanh · Giải pháp số</p>
                  </div>
                </div>

                <div className="space-y-3 text-white/80 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider font-medium">Đại diện</span>
                    <span className="font-semibold text-white text-xs">{contact.representative}</span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(contact.email)
                        toast.success('Đã sao chép email', {
                          description: contact.email,
                        })
                      }}
                      className="flex w-full items-center gap-2.5 py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all group/link border border-white/5 text-[11px]"
                    >
                      <MailIcon className="h-3.5 w-3.5 text-bloom-accent-mint group-hover/link:scale-110 transition-transform" />
                      <span className="truncate">{contact.email}</span>
                    </button>

                    <a
                      href={contact.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all group/link border border-white/5 text-[11px]"
                      aria-label={`Facebook: ${contact.facebookLabel}`}
                    >
                      <FacebookIcon className="h-3.5 w-3.5 text-bloom-accent-mint group-hover/link:scale-110 transition-transform" />
                      <span className="truncate">{contact.facebookLabel}</span>
                    </a>

                    <a
                      href={contact.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all group/link border border-white/5 text-[11px]"
                      aria-label={`TikTok: ${contact.tiktokLabel}`}
                    >
                      <TikTokIcon className="h-3.5 w-3.5 text-bloom-accent-mint group-hover/link:scale-110 transition-transform" />
                      <span className="truncate">{contact.tiktokLabel}</span>
                    </a>

                    <a
                      href={contact.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all group/link border border-white/5 text-[11px]"
                      aria-label={`YouTube: ${contact.youtubeLabel}`}
                    >
                      <YoutubeIcon className="h-3.5 w-3.5 text-bloom-accent-mint group-hover/link:scale-110 transition-transform" />
                      <span className="truncate">{contact.youtubeLabel}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>

        {/* Footer link navigation for professional startup feeling */}
        <footer className="relative z-10 mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-8 text-left text-white/50 sm:px-6">
          <div className="grid grid-cols-3 gap-6 pb-6">
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-xs tracking-wide font-display">Khám phá</h4>
              <ul className="space-y-1.5 text-[11px] font-light">
                <li><Link href="#about" className="hover:text-bloom-green-mid transition-colors">Về dự án</Link></li>
                <li><Link href="#value-prop" className="hover:text-bloom-green-mid transition-colors">Giá trị đồng hành</Link></li>
                <li><Link href="#roadmap" className="hover:text-bloom-green-mid transition-colors">Lộ trình 2026</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-xs tracking-wide font-display">Tài trợ</h4>
              <ul className="space-y-1.5 text-[11px] font-light">
                <li><Link href="#sponsorship" className="hover:text-bloom-green-mid transition-colors">Gói tài trợ</Link></li>
                <li><Link href="#benefits" className="hover:text-bloom-green-mid transition-colors">Bảng so sánh quyền lợi</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-white font-semibold text-xs tracking-wide font-display">Tài nguyên</h4>
              <ul className="space-y-1.5 text-[11px] font-light">
                <li><a href="#sponsorship" className="hover:text-bloom-accent-mint transition-colors">Proposal (PDF)</a></li>
                <li><a href={`mailto:${contact.email}`} className="hover:text-bloom-accent-mint transition-colors">Media Kit & Logo</a></li>
                <li><a href={`mailto:${contact.email}`} className="hover:text-bloom-accent-mint transition-colors">Đăng ký đối tác</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>{contact.copyright}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
              <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
            </div>
          </div>
        </footer>
      </div>
    </SectionShell>
  )
}
