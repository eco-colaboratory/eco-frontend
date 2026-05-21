"use client"

import { useState } from 'react'
import { m } from 'framer-motion'
import { CHAM_BLOOM_CONTENT, type TierHighlight } from '@/lib/content/cham-bloom-landing'
import { GlassCard } from '../layout/glass-card'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionHeader } from '../layout/section-header'
import { SectionShell } from '../layout/section-shell'
import { BloomButton } from '../layout/bloom-button'

function tierStyles(highlight: TierHighlight) {
  return highlight === 'gold'
    ? {
      card: 'border-2 border-bloom-gold bg-gradient-to-b from-white/90 via-bloom-cream/80 to-white/90 shadow-lg shadow-bloom-gold/15 scale-[1.03] z-10',
      icon: 'text-bloom-green-mid bg-bloom-gold/20',
      badge: true,
    }
    : {
      card: 'border-2 border-white/50 bg-white/60 shadow-sm',
      icon: 'text-bloom-green-deep bg-bloom-green-mist',
      badge: false,
    }
}

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
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 font-sans font-light">
              Lựa chọn vị trí đồng hành phù hợp để cùng chúng tôi ươm mầm xanh thực đầu tiên.
            </p>
          </MotionWrapper>
        </div>

        {/* 4 Pricing Cards ngang */}
        <div className="mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {tiers.map((tier, i) => {
            const styles = tierStyles(tier.highlight)
            return (
              <MotionWrapper
                key={tier.slug}
                delay={0.08 * i}
                className="flex"
              >
                <GlassCard
                  className={`relative flex w-full flex-col p-8 ${styles.card}`}
                >
                  {styles.badge ? (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-bloom-gold/45 bg-bloom-gold px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-bloom-green-deep shadow-sm">
                      ✦ Nổi bật
                    </span>
                  ) : null}

                  <div className="flex-1">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-bloom-green-mid">
                      Gói tài trợ
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-bloom-green-deep">
                      {tier.name}
                    </h3>

                    <div className="mt-3 flex items-baseline text-bloom-green-deep">
                      <span className="text-lg font-semibold tracking-tight font-display">
                        {tier.teaser}
                      </span>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-gray-500 font-sans font-light">
                      {i === 0 && 'Hỗ trợ các hoạt động cộng đồng xanh cơ bản và quyền lợi nhận diện thương hiệu truyền thông.'}
                      {i === 1 && 'Dành cho các doanh nghiệp muốn tiếp cận tệp Gen Z qua social media truyền thông và proposal chính thức.'}
                      {i === 2 && 'Mức đồng hành lý tưởng để thương hiệu tích hợp sâu sắc vào game ảo và quảng bá mạnh mẽ.'}
                      {i === 3 && 'Đối tác chiến lược cao cấp nhất, dẫn đầu chiến dịch gieo mầm xanh và xuất hiện ấn tượng nhất.'}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-bloom-green-mid/10">
                    <BloomButton
                      href="#contact"
                      variant={tier.highlight === 'gold' ? 'primary' : 'outline'}
                      className="w-full text-center py-2 text-xs font-semibold font-display"
                    >
                      {'Đăng ký đồng hành'}
                    </BloomButton>
                  </div>
                </GlassCard>
              </MotionWrapper>
            )
          })}
        </div>

        {/* Bảng hạng mục tài trợ */}
        <div className="mt-10">
          <MotionWrapper>
            <GlassCard interactive={false} className="overflow-hidden rounded-3xl border border-bloom-green-mid/20 bg-white/60 p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="bloom-tag-chip mb-3 font-display">Bảng hạng mục</span>
                  <h3 className="font-display text-xl font-semibold text-bloom-green-deep">
                    Các hạng mục đồng hành và mức đề xuất
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">
                    Từ hợp tác chuyên môn đến gói tài trợ Kim Cương, biểu đồ hạng mục này thể hiện rõ mức đề xuất và bản chất quyền lợi đồng hành.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCategoryTableOpen((open) => !open)}
                  className={isCategoryTableOpen ? 'self-start whitespace-nowrap rounded-full border border-white/50 bg-white/40 px-5 py-2 text-xs font-semibold text-bloom-green-deep backdrop-blur-md transition duration-300 hover:bg-white/60 active:scale-[0.98]' : 'self-start whitespace-nowrap rounded-full bg-bloom-green-deep px-5 py-2 text-xs font-semibold text-white shadow-md shadow-bloom-green-deep/20 transition duration-300 hover:bg-bloom-green-deep/90 active:scale-[0.98]'}
                >
                  {isCategoryTableOpen ? 'Thu gọn chi tiết' : 'Xem chi tiết'}
                </button>
              </div>

              <m.div
                initial={false}
                animate={isCategoryTableOpen ? 'open' : 'closed'}
                variants={{
                  open: { height: 'auto', opacity: 1 },
                  closed: { height: 0, opacity: 0 },
                }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="min-w-180 w-full text-sm">
                    <thead className="border-b border-bloom-green-mid/20 bg-bloom-green-mist/90 text-left">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-bloom-green-deep">Hạng mục</th>
                        <th className="px-4 py-3 font-semibold text-bloom-green-deep">Mức đóng góp đề xuất</th>
                        <th className="px-4 py-3 font-semibold text-bloom-green-deep">Thông tin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bloom-green-mid/10">
                      {sponsorshipCategories.map((item, index) => (
                        <tr key={item.title} className={index % 2 === 0 ? 'bg-white' : 'bg-bloom-green-mist/20'}>
                          <td className="px-4 py-4 font-medium text-gray-800">{item.title}</td>
                          <td className="px-4 py-4 text-gray-600">{item.contribution}</td>
                          <td className="px-4 py-4 text-gray-600">{item.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </m.div>
            </GlassCard>
          </MotionWrapper>
        </div>

        {/* Phân bổ ngân sách */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-center">
          <MotionWrapper className="lg:col-span-5">
            <div className="mb-4">
              <span className="bloom-tag-chip mb-3 font-display">Phân bổ ngân sách</span>
              <h3 className="font-display text-xl font-semibold text-bloom-green-deep">
                Quỹ tài trợ đi đâu?
              </h3>
            </div>
            <p className="text-gray-600 leading-relaxed font-sans text-sm font-light">
              Mọi sự đồng hành tài chính từ các đơn vị đều được phân bổ có định hướng và minh bạch, tối đa hóa giá trị công nghệ của game ảo và tối ưu hóa chi phí hiện thực hóa khu vườn sinh thái ngoài đời thật.
            </p>
          </MotionWrapper>

          <MotionWrapper className="lg:col-span-7">
            <GlassCard
              interactive={false}
              className="border-dashed border-bloom-green-mid/20 bg-white/40 p-8"
            >
              <h4 className="font-display text-base font-semibold text-bloom-green-deep mb-3">
                {fundUsage.title}
              </h4>
              <ul className="space-y-3">
                {fundUsage.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-relaxed text-gray-700 font-sans font-light">
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
      </div>
    </SectionShell>
  )
}
