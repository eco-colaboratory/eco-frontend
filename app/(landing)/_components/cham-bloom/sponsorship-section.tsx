"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionHeader } from '../layout/section-header'
import { SectionShell } from '../layout/section-shell'
import { BloomButton } from '../layout/bloom-button'
import { cn } from '@/lib/utils'

const TIER_CARDS = [
  {
    slug: 'dong',
    cardClass: 'bg-white border-2 border-bloom-green-deep shadow-[4px_4px_0px_var(--bloom-green-deep)] hover:shadow-[6px_6px_0px_var(--bloom-green-deep)] hover:translate-y-[-4px]',
    badge: null,
    btnVariant: 'outline' as const,
    description: 'Hỗ trợ các hoạt động cộng đồng xanh cơ bản và quyền lợi nhận diện thương hiệu truyền thông.',
    features: [
      'Logo 1/2 trên Landing Page',
      'Bài đăng cảm ơn chung',
      'Tặng quà tặng tại Workshop'
    ],
  },
  {
    slug: 'bac',
    cardClass: 'bg-bloom-accent-mint/10 border-2 border-bloom-green-deep shadow-[4px_4px_0px_var(--bloom-green-deep)] hover:shadow-[6px_6px_0px_var(--bloom-green-deep)] hover:translate-y-[-4px]',
    badge: null,
    btnVariant: 'outline' as const,
    description: 'Dành cho các doanh nghiệp muốn tiếp cận tệp Gen Z qua social media truyền thông và proposal chính thức.',
    features: [
      'Logo 1/2 trên Proposal',
      'Bài viết cảm ơn riêng',
      'Xuất hiện trong TVC Launch'
    ],
  },
  {
    slug: 'vang',
    cardClass: 'bg-bloom-green-mist border-2 border-bloom-green-deep shadow-[6px_6px_0px_var(--bloom-green-deep)] hover:shadow-[8px_8px_0px_var(--bloom-green-deep)] hover:translate-y-[-4px] scale-[1.02] z-10',
    badge: '👑 Phổ biến',
    btnVariant: 'primary' as const,
    description: 'Mức đồng hành lý tưởng để thương hiệu tích hợp sâu sắc vào game ảo và quảng bá mạnh mẽ.',
    features: [
      'Logo chuẩn trên Landing Page',
      'Tên xuất hiện trong game',
      'Đặt 1 standee tại Workshop',
      'Thiết kế hoa/decor thương hiệu'
    ],
  },
  {
    slug: 'kim-cuong',
    cardClass: 'bg-bloom-petal-soft border-2 border-bloom-green-deep shadow-[6px_6px_0px_var(--bloom-green-deep)] hover:shadow-[8px_8px_0px_var(--bloom-green-deep)] hover:translate-y-[-4px] scale-[1.02] z-10',
    badge: '💎 Đặc quyền',
    btnVariant: 'petal' as const,
    description: 'Đối tác chiến lược cao cấp nhất, dẫn đầu chiến dịch gieo mầm xanh và xuất hiện ấn tượng nhất.',
    features: [
      'Đặc quyền NTT Kim Cương',
      'Nhiệm vụ riêng trong game',
      'Đặt gian hàng trải nghiệm',
      'Đại diện phát biểu Workshop',
      'Logo nổi bật nhất dự án'
    ],
  },
] as const

export function SponsorshipSection() {
  const { tiers, fundUsage, sponsorshipCategories } = CHAM_BLOOM_CONTENT
  const [isCategoryTableOpen, setIsCategoryTableOpen] = useState(false)

  return (
    <SectionShell id="sponsorship" bg="light-to-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <MotionWrapper>
            <SectionHeader
              label="Gói tài trợ"
              title="Các gói"
              accent="đồng hành"
              align="center"
            />
            <p className="mx-auto mt-4 max-w-2xl text-sm text-bloom-green-deep/75 font-semibold leading-relaxed">
              Lựa chọn vị trí đồng hành phù hợp để cùng chúng tôi ươm mầm xanh thực đầu tiên.
            </p>
          </MotionWrapper>
        </div>

        {/* 4 Pricing Cards ngang */}
        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch pt-4">
          {tiers.map((tier, i) => {
            const config = TIER_CARDS[i] || TIER_CARDS[0]
            return (
              <MotionWrapper
                key={tier.slug}
                delay={0.08 * i}
                className="flex"
              >
                <div className={cn(
                  'relative flex w-full flex-col p-8 rounded-[2rem] transition-all duration-300',
                  config.cardClass
                )}>
                  {config.badge ? (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border-2 border-bloom-green-deep bg-white px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-bloom-green-deep shadow-[2px_2px_0px_var(--bloom-green-deep)]">
                      {config.badge}
                    </span>
                  ) : null}

                  <div className="flex-1">
                    <span className="font-display text-[9px] font-black uppercase tracking-widest text-bloom-green-deep/60">
                      Gói tài trợ
                    </span>
                    <h3 className="mt-1 font-display text-xl font-black text-bloom-green-deep">
                      {tier.name}
                    </h3>

                    <div className="mt-3 flex items-baseline text-bloom-green-deep">
                      <span className="text-lg font-black tracking-tight font-display bg-white/70 border border-bloom-green-deep/15 px-3 py-1 rounded-lg">
                        {tier.teaser}
                      </span>
                    </div>

                    <p className="mt-5 text-[11.5px] leading-relaxed text-bloom-green-deep/70 font-semibold">
                      {config.description}
                    </p>

                    {/* Features list to enhance visual rhythm & hierarchy */}
                    <ul className="mt-6 space-y-2.5 border-t border-bloom-green-deep/10 pt-5" aria-label={`Quyền lợi nổi bật của gói ${tier.name}`}>
                      {config.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-[10.5px] text-bloom-green-deep/85 font-semibold">
                          <span className="text-bloom-green-mid shrink-0 font-sans text-xs select-none" aria-hidden>✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-5 border-t-2 border-bloom-green-deep/10">
                    <BloomButton
                      href="#contact"
                      variant={config.btnVariant}
                      className="w-full text-center py-2 text-xs font-black font-display cursor-pointer"
                    >
                      Đăng ký đồng hành
                    </BloomButton>
                  </div>
                </div>
              </MotionWrapper>
            )
          })}
        </div>

        {/* Bảng hạng mục tài trợ */}
        <div className="mt-12">
          <MotionWrapper>
            <div className="overflow-hidden rounded-[2rem] border-2 border-bloom-green-deep bg-white p-6 shadow-[4px_4px_0px_var(--bloom-green-deep)]">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex rounded-full border-2 border-bloom-green-deep bg-bloom-green-light px-3.5 py-1 text-[9px] font-black uppercase tracking-widest text-bloom-green-deep shadow-[2px_2px_0px_var(--bloom-green-deep)] mb-3">
                    📊 Bảng hạng mục
                  </span>
                  <h3 className="font-display text-lg font-black text-bloom-green-deep">
                    Các hạng mục đồng hành và mức đề xuất
                  </h3>
                  <p className="mt-2 max-w-3xl text-xs leading-relaxed text-bloom-green-deep/70 font-medium">
                    Từ hợp tác chuyên môn đến gói tài trợ Kim Cương, biểu đồ hạng mục này thể hiện rõ mức đề xuất và bản chất quyền lợi đồng hành.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCategoryTableOpen((open) => !open)}
                  aria-expanded={isCategoryTableOpen}
                  aria-controls="sponsorship-detail-table"
                  className={cn(
                    'self-start whitespace-nowrap bloom-btn-3d text-xs px-5 py-2 border-2 border-bloom-green-deep cursor-pointer select-none',
                    isCategoryTableOpen ? 'bloom-btn-3d-outline' : 'bloom-btn-3d-primary'
                  )}
                >
                  {isCategoryTableOpen ? 'Thu gọn chi tiết' : 'Xem chi tiết'}
                </button>
              </div>

              <m.div
                id="sponsorship-detail-table"
                aria-hidden={!isCategoryTableOpen}
                initial={false}
                animate={isCategoryTableOpen ? 'open' : 'closed'}
                variants={{
                  open: { 
                    height: 'auto', 
                    opacity: 1,
                    transition: {
                      height: { duration: 0.38, ease: [0.22, 1, 0.36, 1] }, // ease-out-quint
                      opacity: { duration: 0.25, ease: 'linear' }
                    }
                  },
                  closed: { 
                    height: 0, 
                    opacity: 0,
                    transition: {
                      height: { duration: 0.28, ease: [0.25, 1, 0.5, 1] }, // ease-out-quad-like
                      opacity: { duration: 0.18, ease: 'linear' }
                    }
                  },
                }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto rounded-2xl border-2 border-bloom-green-deep mt-4">
                  <table className="min-w-180 w-full text-xs">
                    <thead className="border-b-2 border-bloom-green-deep bg-bloom-green-mist text-left">
                      <tr>
                        <th className="px-4 py-3.5 font-black text-bloom-green-deep w-[25%]">Hạng mục</th>
                        <th className="px-4 py-3.5 font-black text-bloom-green-deep w-[25%]">Mức đóng góp đề xuất</th>
                        <th className="px-4 py-3.5 font-black text-bloom-green-deep w-[50%]">Thông tin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-t border-bloom-green-deep/15 divide-bloom-green-deep/15">
                      {sponsorshipCategories.map((item, index) => (
                        <tr key={item.title} className={cn(
                          'transition-colors hover:bg-bloom-green-light/40 font-medium text-bloom-green-deep/85',
                          index % 2 === 0 ? 'bg-white' : 'bg-bloom-green-light/20'
                        )}>
                          <td className="px-4 py-4 font-black">{item.title}</td>
                          <td className="px-4 py-4 font-bold text-bloom-green-deep">{item.contribution}</td>
                          <td className="px-4 py-4 leading-relaxed font-sans">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </m.div>
            </div>
          </MotionWrapper>
        </div>

        {/* Phân bổ ngân sách */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 items-center">
          <MotionWrapper className="lg:col-span-5">
            <div className="mb-4">
              <span className="inline-flex rounded-full border-2 border-bloom-green-deep bg-bloom-petal-soft px-3 py-1 text-[9px] font-black uppercase tracking-widest text-bloom-green-deep shadow-[2px_2px_0px_var(--bloom-green-deep)] mb-3">
                💰 Phân bổ ngân sách
              </span>
              <h3 className="font-display text-xl font-black text-bloom-green-deep bloom-text-shadow">
                Quỹ tài trợ đi đâu?
              </h3>
            </div>
            <p className="text-bloom-green-deep/75 leading-relaxed font-sans text-xs font-semibold">
              Mọi sự đồng hành tài chính từ các đơn vị đều được phân bổ có định hướng và minh bạch, tối đa hóa giá trị công nghệ của game ảo và tối ưu hóa chi phí hiện thực hóa khu vườn sinh thái ngoài đời thật.
            </p>
          </MotionWrapper>

          <MotionWrapper className="lg:col-span-7">
            <div className="rounded-[2rem] border-2 border-bloom-green-deep bg-white p-6 sm:p-8 shadow-[4px_4px_0px_var(--bloom-green-deep)] relative overflow-hidden">
              {/* Floral element decoration */}
              <span className="absolute right-4 top-4 text-3xl opacity-15 pointer-events-none select-none">🌱</span>
              
              <h4 className="font-display text-sm font-black text-bloom-green-deep mb-4 border-b-2 border-bloom-green-deep/10 pb-2">
                {fundUsage.title}
              </h4>
              <ul className="space-y-3.5">
                {fundUsage.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-xs leading-relaxed text-bloom-green-deep/80 font-sans font-semibold">
                    <span
                      className="mt-1 text-xs shrink-0 select-none"
                      aria-hidden
                    >
                      🌱
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </SectionShell>
  )
}
