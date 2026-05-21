'use client'

import Image from 'next/image'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionLabel } from '../layout/section-label'
import { SectionShell } from '../layout/section-shell'
import { SectionWave } from '../layout/section-wave'
import { ArrowRight } from 'lucide-react'

const ABOUT_TAGS = ['Gen Z Eco', 'Gamification', 'Tác động thật'] as const

// Định nghĩa màu nền, màu chữ và shadow cho 4 card pastel ở dưới
const CARD_STYLES = [
  {
    bg: 'bg-[#FCDFD7]/50 border-[#FCDFD7]/30 text-[#5C2B1D] hover:bg-[#FCDFD7]/70 hover:border-[#FCDFD7]/60 hover:shadow-[#FCDFD7]/20',
    numberColor: 'text-[#5C2B1D]/15',
  },
  {
    bg: 'bg-[#FDF3C7]/50 border-[#FDF3C7]/30 text-[#5C4D1D] hover:bg-[#FDF3C7]/70 hover:border-[#FDF3C7]/60 hover:shadow-[#FDF3C7]/20',
    numberColor: 'text-[#5C4D1D]/15',
  },
  {
    bg: 'bg-[#D1EBE9]/50 border-[#D1EBE9]/30 text-[#1D5C58] hover:bg-[#D1EBE9]/70 hover:border-[#D1EBE9]/60 hover:shadow-[#D1EBE9]/20',
    numberColor: 'text-[#1D5C58]/15',
  },
  {
    bg: 'bg-[#E0E4FC]/50 border-[#E0E4FC]/30 text-[#222E7A] hover:bg-[#E0E4FC]/70 hover:border-[#E0E4FC]/60 hover:shadow-[#E0E4FC]/20',
    numberColor: 'text-[#222E7A]/15',
  },
]

export function AboutSection() {
  const { about, vision, mission } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="about" bg="cream" className="py-10 md:py-14 pb-0 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Phần trên: Chia đôi cột Trái (Giới thiệu) & cột Phải (Tầm nhìn & Sứ mệnh) */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">

          {/* Cột trái: Thông tin giới thiệu và CTA */}
          <MotionWrapper className="lg:col-span-5 flex flex-col items-start">
            <SectionLabel variant="glass" tone="light">
              {about.label}
            </SectionLabel>
            <h2 className="mt-2 text-balance font-display text-3xl font-extrabold leading-[1.15] text-bloom-green-deep md:text-4xl lg:text-[2.75rem]">
              {about.title}
            </h2>
            <p className="mt-3.5 max-w-md border-l-2 border-bloom-green-mid/40 pl-5 text-pretty text-base font-light leading-relaxed text-gray-600">
              {about.intro}
            </p>

            {/* Danh sách tag nổi bật */}
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Điểm nổi bật">
              {ABOUT_TAGS.map((tag) => (
                <li key={tag}>
                  <span className="bloom-tag-chip bg-white/60 text-bloom-green-deep border border-bloom-green-mid/10 text-xs font-semibold py-1 px-3.5 rounded-full shadow-sm">
                    {tag}
                  </span>
                </li>
              ))}
            </ul>

            {/* Nút hành động cuốn hút */}
            <div className="mt-5">
              <a
                href="#sponsorship"
                className="inline-flex items-center gap-2 rounded-full bg-bloom-dark hover:bg-bloom-green-deep text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md shadow-bloom-green-deep/10 hover:shadow-lg group cursor-pointer"
              >
                Đồng hành cùng dự án
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </MotionWrapper>

          {/* Cột phải: Khối Tầm nhìn & Sứ mệnh (Hiển thị song song / so le 3D cực xịn) */}
          <div className="lg:col-span-7 relative">
            {/* Hiệu ứng Ambient Glow mờ phía sau */}
            <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-bloom-accent-mint/10 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full bg-bloom-green-mid/5 blur-[80px] pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:py-4">

              {/* Card Tầm nhìn */}
              <MotionWrapper
                delay={0.1}
                className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/30 p-5 shadow-md backdrop-blur-md transition-all duration-500 hover:shadow-lg sm:-translate-y-2"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-bloom-green-deep border-b border-bloom-green-mid/20 pb-0.5">
                    {vision.title}
                  </h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-gray-600 mb-3 min-h-[72px]">
                  {vision.body}
                </p>
                {/* Hình ảnh nghệ thuật thu nhỏ phía dưới card */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/50 shadow-sm">
                  <Image
                    src={vision.imageSrc}
                    alt={vision.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                </div>
              </MotionWrapper>

              {/* Card Sứ mệnh */}
              <MotionWrapper
                delay={0.2}
                className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/30 p-4 shadow-md backdrop-blur-md transition-all duration-500 hover:shadow-lg sm:translate-y-2"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <h3 className="font-display text-sm font-extrabold uppercase tracking-wider text-bloom-green-deep border-b border-bloom-green-mid/20 pb-0.5">
                    {mission.title}
                  </h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-gray-600 mb-3 min-h-[72px]">
                  {mission.body}
                </p>
                {/* Hình ảnh nghệ thuật thu nhỏ phía dưới card */}
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/50 shadow-sm">
                  <Image
                    src={mission.imageSrc}
                    alt={mission.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 250px"
                  />
                </div>
              </MotionWrapper>

            </div>
          </div>

        </div>

        {/* Phần dưới: 4 card nằm ngang theo phong cách thiết kế mẫu */}
        <div className="mt-10 md:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {about.cards.map((card, i) => {
              const style = CARD_STYLES[i] || CARD_STYLES[0]
              return (
                <MotionWrapper
                  key={card.title}
                  delay={0.1 * (i + 1)}
                  className={cn(
                    'relative overflow-hidden rounded-[2rem] border p-6 md:p-7 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-md',
                    style.bg
                  )}
                >
                  <div className="flex justify-between items-start">
                    {/* Số thứ tự siêu lớn ở góc trái */}
                    <span className={cn('font-display text-3xl md:text-6xl font-extrabold tracking-tight select-none leading-none', style.numberColor)}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Nội dung card */}
                  <h3 className="font-display text-base md:text-lg font-extrabold mt-6 md:mt-7 mb-1.5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-[13px] font-light leading-relaxed opacity-85">
                    {card.description}
                  </p>
                </MotionWrapper>
              )
            })}
          </div>
        </div>

      </div>

      <SectionWave className="relative z-10 mt-6 sm:mt-8" fillClassName="text-bloom-green-mist" />
    </SectionShell>
  )
}
