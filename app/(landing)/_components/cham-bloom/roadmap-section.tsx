import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionLabel } from '../layout/section-label'
import { SectionShell } from '../layout/section-shell'
import { SectionWave } from '../layout/section-wave'

const CAPSULE_STYLES = [
  {
    bg: 'bg-[#FCDFD7] text-[#5C2B1D] shadow-[0_2px_8px_rgba(252,223,215,0.8)]',
  },
  {
    bg: 'bg-[#FDF3C7] text-[#5C4D1D] shadow-[0_2px_8px_rgba(253,243,199,0.8)]',
  },
  {
    bg: 'bg-[#D1EBE9] text-[#1D5C58] shadow-[0_2px_8px_rgba(209,235,233,0.8)]',
  },
  {
    bg: 'bg-[#E0E4FC] text-[#222E7A] shadow-[0_2px_8px_rgba(224,228,252,0.8)]',
  },
]

export function RoadmapSection() {
  const { roadmap } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="roadmap" bg="mist" className="pb-0 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <MotionWrapper>
            <SectionLabel variant="glass" tone="light">
              {roadmap.label}
            </SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-bloom-green-deep sm:text-5xl">
              {roadmap.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 font-sans leading-relaxed">
              Lộ trình hiện thực hóa mầm xanh thực từ thế giới game số của Gen Z.
            </p>
          </MotionWrapper>
        </div>

        {/* Responsive Grid with Elegant Cross Border */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 md:mt-10 border-t border-b md:border-t-0 md:border-b-0 border-gray-300/70">
          {roadmap.items.map((item, i) => {
            const style = CAPSULE_STYLES[i] || CAPSULE_STYLES[0]
            return (
              <MotionWrapper
                key={item.month}
                delay={0.12 * (i + 1)}
                className={cn(
                  "flex items-start gap-5 lg:gap-8 py-6 px-4 md:py-8 md:px-10 lg:py-10 lg:px-12 border-gray-300",
                  // Mobile vertical list dividers
                  i < 3 ? "border-b" : "",
                  // Desktop 2x2 grid cross dividers
                  i === 0 ? "md:border-r" : "",
                  i === 1 ? "md:border-r-0" : "",
                  i === 2 ? "md:border-r md:border-b-0" : "",
                  i === 3 ? "md:border-none" : ""
                )}
              >
                {/* Colored Number Capsule */}
                <div className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-full font-display font-bold text-sm shrink-0 select-none transition-all duration-300",
                  style.bg
                )}>
                  {i + 1}
                </div>

                {/* Text content */}
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 lg:mb-2">
                    {item.month}
                  </span>
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-bloom-green-deep tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm lg:text-base leading-relaxed text-gray-500 font-sans font-light">
                    {item.description}
                  </p>
                </div>
              </MotionWrapper>
            )
          })}
        </div>
      </div>

      <SectionWave className="relative z-10 mt-8 sm:mt-12" fillClassName="text-white" />
    </SectionShell>
  )
}
