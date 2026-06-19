'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionShell } from '../layout/section-shell'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BloomAmbientInline } from './core-idea-section'
import { SectionHeader } from '../layout'
import { cn } from '@/lib/utils'

const SLIDES = [
  {
    id: 1,
    value: 'Top 5',
    label: 'Đại sứ Gen G 2025',
    description:
      'CHẠM lọt vào Top 5 nhóm dự án được tài trợ bởi Panasonic Việt Nam thông qua chương trình Đại sứ Gen G 2025.',
    image: '/assets/landing/gen-g-2025-1.jpg',
  },
  {
    id: 2,
    value: 'Top 5',
    label: 'Đại sứ Gen G 2025',
    description:
      'CHẠM lọt vào Top 5 nhóm dự án được tài trợ bởi Panasonic Việt Nam thông qua chương trình Đại sứ Gen G 2025.',
    image: '/assets/landing/gen-g-2025-2.jpg',
  },
  {
    id: 3,
    value: 'Á quân',
    label: 'FIP – Youth Startup',
    description:
      'Dự án đạt danh hiệu Á quân tại cuộc thi FIP – Youth Startup, ghi nhận tiềm năng của mô hình game hóa hành động xanh và tác động cộng đồng.',
    image: '/assets/landing/fip-youth-startup.jpg',
  },
] as const

export function AchievementsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    duration: 28,
  })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setActiveIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  const handlePrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const handleNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi],
  )

  const activeSlide = SLIDES[activeIndex]

  return (
    <SectionShell id="achievements" bg="cream" ambient>
      <BloomAmbientInline />

      <SectionHeader
        label="Thành quả đã đạt được"
        title={'Trước khi phát triển thành CHẠM Flora'}
        accent={'Dự án CHẠM đã có một số cột mốc nổi bật'}
        align="center"
        className="!mb-4 !mt-0"
      />

      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 md:py-4 lg:px-8">
        <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
          <div className="col-span-12 flex min-h-[340px] flex-col justify-center md:col-span-5 md:pr-4 lg:col-span-4">
            <MotionWrapper>
              <div className="mb-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-bloom-green-deep/30 text-bloom-green-deep transition-all duration-300 hover:bg-bloom-green-deep hover:text-white motion-reduce:transition-none"
                  aria-label="Slide trước"
                >
                  <ArrowLeft className="h-5 w-5 stroke-[1.5]" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-bloom-green-deep/30 text-bloom-green-deep transition-all duration-300 hover:bg-bloom-green-deep hover:text-white motion-reduce:transition-none"
                  aria-label="Slide tiếp theo"
                >
                  <ArrowRight className="h-5 w-5 stroke-[1.5]" />
                </button>
                <span className="ml-1 text-xs font-medium tabular-nums text-bloom-green-deep/60">
                  {activeIndex + 1} / {SLIDES.length}
                </span>
              </div>

              <p className="sr-only" aria-live="polite" aria-atomic="true">
                {activeSlide.label}
              </p>

              <div key={activeIndex} className="animate-fade-in-up flex flex-col items-start">
                <span className="inline-flex items-center rounded-full border border-bloom-accent-mint/25 bg-bloom-accent-mint/15 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-bloom-green-deep shadow-sm backdrop-blur-sm">
                  {activeSlide.value}
                </span>

                <h2 className="mt-5 max-w-md font-display text-3xl font-extrabold leading-[1.2] tracking-tight text-bloom-green-deep sm:text-4xl lg:text-4xl.5">
                  {activeSlide.label}
                </h2>

                <p className="mt-5 min-h-[80px] max-w-md text-sm font-light leading-relaxed text-bloom-green-deep/75 sm:text-base">
                  {activeSlide.description}
                </p>
              </div>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full bg-bloom-dark px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-bloom-green-deep/15 transition-all duration-300 hover:bg-bloom-green-mid hover:text-bloom-green-deep focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-bloom-green-deep focus-visible:outline-offset-2 motion-reduce:transition-none"
                >
                  Đồng hành ngay
                </a>
              </div>
            </MotionWrapper>
          </div>

          <div className="relative z-20 col-span-12 md:col-span-7 lg:col-span-8">
            <MotionWrapper delay={0.2}>
              <div
                role="region"
                aria-roledescription="carousel"
                aria-label="Thành tích nổi bật"
                className="w-full"
              >
                <div className="overflow-hidden rounded-[2rem]" ref={emblaRef}>
                  <div className="flex touch-pan-y">
                    {SLIDES.map((slide, index) => (
                      <div
                        key={slide.id}
                        className="min-w-0 shrink-0 grow-0 basis-full pl-0"
                      >
                        <div
                          className={cn(
                            'relative aspect-[16/10] w-full overflow-hidden rounded-[2rem] border bg-white/40 shadow-lg shadow-bloom-green-deep/15 transition-opacity duration-500 motion-reduce:transition-none',
                            index === activeIndex
                              ? 'border-bloom-green-mid/20 opacity-100'
                              : 'border-white/30 opacity-90',
                          )}
                        >
                          <Image
                            src={slide.image}
                            alt={slide.label}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 720px"
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-bloom-dark/70 via-bloom-dark/15 to-transparent" />
                          <div className="absolute bottom-5 left-5 right-5 text-white">
                            <p className="text-xs font-semibold uppercase tracking-wider text-bloom-accent-mint">
                              {slide.value}
                            </p>
                            <p className="mt-0.5 font-display text-base font-bold sm:text-lg">
                              {slide.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2">
                  {SLIDES.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => scrollTo(index)}
                      aria-label={`Chuyển tới slide ${index + 1}: ${slide.label}`}
                      aria-current={index === activeIndex ? 'true' : undefined}
                      className={cn(
                        'relative h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-dashed focus-visible:outline-bloom-green-deep focus-visible:outline-offset-2 motion-reduce:transition-none after:absolute after:inset-[-8px] after:content-[""]',
                        index === activeIndex
                          ? 'w-8 bg-bloom-green-deep'
                          : 'w-2 bg-bloom-green-deep/25 hover:bg-bloom-green-deep/50',
                      )}
                    />
                  ))}
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
