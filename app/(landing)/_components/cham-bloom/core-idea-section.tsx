import { Gamepad2, Share2, Sprout } from 'lucide-react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionHeader } from '../layout/section-header'
import { SectionShell } from '../layout/section-shell'

const STEP_DETAILS = [
  {
    icon: Gamepad2,
    badge: 'Trải nghiệm ảo',
    description: 'Chăm sóc vườn hoa ảo trên ứng dụng để tích lũy điểm xanh qua Focus Mode hàng ngày.',
    circleClass: 'border-purple-200 text-purple-600 bg-white hover:border-purple-400 hover:bg-purple-50 shadow-sm hover:shadow-purple-100/30',
    badgeClass: 'text-purple-600 bg-purple-50/50 border-purple-100/30',
  },
  {
    icon: Share2,
    badge: 'Tương tác & kết nối',
    description: 'Kết nối nỗ lực cùng cộng đồng và đồng hành cùng các thương hiệu xanh uy tín.',
    circleClass: 'border-pink-200 text-pink-600 bg-white hover:border-pink-400 hover:bg-pink-50 shadow-sm hover:shadow-pink-100/30',
    badgeClass: 'text-pink-600 bg-pink-50/50 border-pink-100/30',
  },
  {
    icon: Sprout,
    badge: 'Mầm xanh thực tế',
    description: 'Hiện thực hóa vườn hoa thật ngoài đời từ kết quả chăm sóc và tài trợ hữu hình.',
    circleClass: 'border-emerald-200 text-emerald-600 bg-white hover:border-emerald-400 hover:bg-emerald-50 shadow-sm hover:shadow-emerald-100/30',
    badgeClass: 'text-emerald-600 bg-emerald-50/50 border-emerald-100/30',
  },
] as const

export function CoreIdeaSection() {
  const { coreIdea } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="core-idea" bg="light-to-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bloom-section-band relative">
          <BloomAmbientInline />

          <SectionHeader
            label="Ý tưởng cốt lõi"
            title={coreIdea.headline}
            accent={coreIdea.headlineGold}
            align="center"
            className="!mt-0"
          />

          <div className="relative mt-8 lg:mt-12">
            {/* Đường uốn lượn uốn quanh các bước (Chỉ hiển thị từ màn hình md trở lên) */}
            <div className="pointer-events-none absolute inset-x-0 hidden xl:px-32 top-3 md:block md:px-16 lg:px-24 z-0" aria-hidden>
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                alt="Curved line connecting steps"
              />
            </div>

            {/* Danh sách 3 bước nằm ngang */}
            <ol className="relative grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-12 text-center z-10">
              {coreIdea.steps.map((step, i) => {
                const details = STEP_DETAILS[i]
                const IconComponent = details.icon

                return (
                  <li key={step} className="relative flex flex-col items-center">
                    <MotionWrapper delay={0.12 * (i + 1)} className="w-full flex flex-col items-center">
                      {/* Vòng tròn số bước với hiệu ứng hover mượt mà */}
                      <div className={cn(
                        'relative flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 z-20 hover:scale-105 group',
                        details.circleClass
                      )}>
                        <span className="font-display text-xl font-bold">
                          {i + 1}
                        </span>
                      </div>

                      {/* Thông tin chi tiết bên dưới */}
                      <div className="mt-6 md:mt-10 px-4 flex flex-col items-center">
                        <span className={cn(
                          'inline-flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border',
                          details.badgeClass
                        )}>
                          <IconComponent className="h-3.5 w-3.5" />
                          {details.badge}
                        </span>

                        <h3 className="mt-4 font-display text-xl font-bold text-bloom-green-deep md:text-2xl">
                          {step}
                        </h3>

                        <p className="mt-3 text-pretty text-[13.5px] font-light leading-relaxed text-gray-500 max-w-xs mx-auto">
                          {details.description}
                        </p>
                      </div>
                    </MotionWrapper>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

export function BloomAmbientInline() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
      <div className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-bloom-green-mid/10 blur-3xl" />
      <div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-bloom-gold/5 blur-3xl" />
    </div>
  )
}
