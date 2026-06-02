import { Gamepad2, Share2, Sprout } from 'lucide-react'
import Image from 'next/image'
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
    circleClass: 'bg-bloom-petal-soft text-bloom-green-deep',
    badgeClass: 'text-bloom-green-deep bg-bloom-petal-soft/50 border-bloom-green-deep/15',
  },
  {
    icon: Share2,
    badge: 'Tương tác & kết nối',
    description: 'Kết nối nỗ lực cùng cộng đồng và đồng hành cùng các thương hiệu xanh uy tín.',
    circleClass: 'bg-[#fdf3c7] text-bloom-green-deep',
    badgeClass: 'text-[#bd850b] bg-[#fdf3c7]/60 border-bloom-green-deep/15',
  },
  {
    icon: Sprout,
    badge: 'Mầm xanh thực tế',
    description: 'Hiện thực hóa vườn hoa thật ngoài đời từ kết quả chăm sóc và tài trợ hữu hình.',
    circleClass: 'bg-[#eef7e8] text-bloom-green-deep',
    badgeClass: 'text-[#4c781e] bg-[#eef7e8]/60 border-bloom-green-deep/15',
  },
] as const

export function CoreIdeaSection() {
  const { coreIdea } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="core-idea" bg="light-to-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="bloom-section-band relative border-2 border-bloom-green-deep shadow-[4px_4px_0px_var(--bloom-green-deep)] bg-white/90">
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
            <div className="pointer-events-none absolute inset-x-0 hidden xl:px-32 top-3 md:block md:px-16 lg:px-24 z-0 opacity-40" aria-hidden>
              <Image
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                alt="Curved line connecting steps"
                width={800}
                height={80}
                unoptimized
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
                        'relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-bloom-green-deep transition-all duration-300 z-20 hover:scale-110 group font-display font-black text-2xl shadow-[4px_4px_0px_var(--bloom-green-deep)]',
                        details.circleClass
                      )}>
                        <span>
                          {i + 1}
                        </span>
                      </div>

                      {/* Thông tin chi tiết bên dưới */}
                      <div className="mt-6 md:mt-10 px-4 flex flex-col items-center">
                        <span className={cn(
                          'inline-flex items-center gap-1.5 font-display text-[10.5px] font-black uppercase tracking-wider px-3 py-1 rounded-full border-2 border-bloom-green-deep shadow-[2px_2px_0px_var(--bloom-green-deep)]',
                          details.badgeClass
                        )}>
                          <IconComponent className="h-3.5 w-3.5 stroke-[2.5]" />
                          {details.badge}
                        </span>

                        <h3 className="mt-4 font-display text-xl font-black text-bloom-green-deep md:text-2xl">
                          {step}
                        </h3>

                        <p className="mt-3 text-pretty text-xs font-semibold leading-relaxed text-bloom-green-deep/70 max-w-xs mx-auto">
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
