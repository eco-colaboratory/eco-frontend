import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { cn } from '@/lib/utils'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionLabel } from '../layout/section-label'
import { SectionShell } from '../layout/section-shell'
import { SectionWave } from '../layout/section-wave'

export function RoadmapSection() {
  const { roadmap } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="roadmap" bg="mist" className="pb-0 md:pb-0 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-20">
        <div className="text-center max-w-3xl mx-auto">
          <MotionWrapper>
            <SectionLabel variant="glass" tone="light">
              {roadmap.label}
            </SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-black text-bloom-green-deep sm:text-5xl bloom-text-shadow">
              {roadmap.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-bloom-green-deep/75 font-semibold leading-relaxed">
              Lộ trình hiện thực hóa mầm xanh thực từ thế giới game số của Gen Z.
            </p>
          </MotionWrapper>
        </div>

        {/* Game Pathway Alternating Timeline */}
        <div className="relative mt-12 md:mt-16 space-y-10 pb-16">
          {/* Vertical Vine Line */}
          <div 
            className="absolute left-8 top-4 bottom-4 w-[6px] rounded-full bg-gradient-to-b from-bloom-gold via-bloom-accent-mint to-bloom-petal pointer-events-none md:left-1/2 md:-translate-x-1/2" 
            aria-hidden 
          />
          
          {roadmap.items.map((item, i) => {
            const emojis = ['🌱', '🌿', '🌸', '🌻']
            const isLeft = i % 2 === 0
            
            return (
              <div 
                key={item.month} 
                className="relative flex flex-col md:flex-row items-start md:justify-between"
              >
                {/* Node marker on the vine */}
                <div 
                  className="absolute left-[20px] top-6 w-7 h-7 rounded-full border-2 border-bloom-green-deep bg-white flex items-center justify-center z-20 shadow-[2px_2px_0px_var(--bloom-green-deep)] md:left-1/2 md:-translate-x-1/2 md:top-8 md:w-9 md:h-9 text-xs md:text-sm select-none"
                  aria-hidden
                >
                  {emojis[i] || '🌸'}
                </div>
                
                {/* Content Card */}
                <div className={cn(
                  "w-[calc(100%-4rem)] ml-14 md:w-[44%] md:ml-0",
                  isLeft ? "md:mr-auto" : "md:ml-auto"
                )}>
                  <MotionWrapper direction={isLeft ? "left" : "right"}>
                    <div className="bloom-card-3d p-6 relative overflow-hidden bg-white/95 group hover:-translate-y-1 transition-all duration-300">
                      
                      {/* Month badge inside card */}
                      <span className="inline-flex font-display text-[9.5px] font-black uppercase tracking-wider text-bloom-green-deep bg-bloom-green-light border-2 border-bloom-green-deep px-3 py-1 rounded-full shadow-[2px_2px_0px_var(--bloom-green-deep)]">
                        📆 {item.month}
                      </span>
                      
                      <h3 className="mt-4 font-display text-base font-black text-bloom-green-deep leading-tight">
                        {item.title}
                      </h3>
                      
                      <p className="mt-3 text-xs font-semibold leading-relaxed text-bloom-green-deep/70">
                        {item.description}
                      </p>
                    </div>
                  </MotionWrapper>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <SectionWave className="relative z-10 mt-8 sm:mt-12" fillClassName="text-white" />
    </SectionShell>
  )
}
