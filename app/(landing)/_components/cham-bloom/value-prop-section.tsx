'use client'

import Image from 'next/image'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionLabel } from '../layout/section-label'
import { SectionShell } from '../layout/section-shell'

const unsplash = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

const PROP_IMAGES = [
  '/assets/landing/genz.jpg', // Lớp học Gen Z
  '/assets/landing/mountain.jpg', // Đồi núi xanh mát
  '/assets/landing/about-1.jpg', // Trồng cây/vườn hoa thật
] as const

export function ValuePropSection() {
  const { valueProp } = CHAM_BLOOM_CONTENT

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SectionShell id="value" bg="cream" ambient>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Bên trái: Grid 3 ảnh phi đối xứng, nghệ thuật bo góc viền kính sáng */}
          <div className="lg:col-span-5">
            <MotionWrapper direction="left">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-8">
                    <div className="relative h-[200px] w-full overflow-hidden rounded-3xl border-2 border-white/60 shadow-lg shadow-bloom-green-deep/5 transition-transform duration-300 hover:scale-[1.02]">
                      <Image
                        src={PROP_IMAGES[0]}
                        alt="Green natural environment"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>
                  <div className="col-span-4 self-end">
                    <div className="relative h-[130px] w-full overflow-hidden rounded-2xl border-2 border-white/60 shadow-lg shadow-bloom-green-deep/5 translate-y-4 transition-transform duration-300 hover:scale-[1.02]">
                      <Image
                        src={PROP_IMAGES[1]}
                        alt="Gen Z community green meeting"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 200px"
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="relative h-[180px] w-[92%] overflow-hidden rounded-3xl border-2 border-white/60 shadow-lg shadow-bloom-green-deep/5 -translate-y-2 transition-transform duration-300 hover:scale-[1.02]">
                      <Image
                        src={PROP_IMAGES[2]}
                        alt="Ecosystem reforestation sprouts"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  </div>
                </div>

                {/* Các họa tiết trang trí xung quanh ảnh */}
                <div className="absolute -left-4 -bottom-4 -z-10 h-24 w-24 rounded-full bg-bloom-accent-mint/10 blur-xl" aria-hidden />
                <div className="absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full bg-bloom-green-mid/10 blur-xl" aria-hidden />
              </div>
            </MotionWrapper>
          </div>

          {/* Bên phải: Nội dung chính & checklist 4 điểm giá trị 2x2 */}
          <div className="lg:col-span-7">
            <MotionWrapper direction="right">
              <div className="flex flex-col items-start">
                <SectionLabel variant="glass" tone="light">
                  {valueProp.label}
                </SectionLabel>
                
                <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.15] text-bloom-green-deep md:text-4xl">
                  Vì sao nhà tài trợ nên{' '}
                  <span className="bloom-headline-accent font-semibold">đồng hành cùng dự án?</span>
                </h2>
                
                <p className="mt-5 text-pretty text-[14px] font-light leading-relaxed text-gray-600 border-l-2 border-bloom-green-mid/30 pl-5">
                  {valueProp.intro}
                </p>

                {/* Checklist 2x2 cực kỳ gọn gàng */}
                <div className="mt-8 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
                  {valueProp.cards.map((card, i) => (
                    <div
                      key={card.title}
                      className="group rounded-2xl border border-bloom-green-mid/10 bg-white/40 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/70"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-bloom-accent-mint transition-transform duration-300 group-hover:scale-110" />
                        <h3 className="font-display text-base font-semibold text-bloom-green-deep">
                          {card.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-pretty text-sm font-light leading-relaxed text-gray-500">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA lớn màu xanh rêu đậm sang trọng */}
                <button
                  onClick={handleScrollToContact}
                  className="mt-8 inline-flex items-center justify-center gap-2.5 rounded-full bg-bloom-green-deep px-7 py-3.5 font-display text-[13px] font-semibold text-white shadow-md shadow-bloom-green-deep/15 transition-all duration-300 hover:bg-bloom-green-mid hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bloom-green-deep"
                >
                  Liên hệ tài trợ ngay
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </MotionWrapper>
          </div>

        </div>
      </div>
    </SectionShell>
  )
}
