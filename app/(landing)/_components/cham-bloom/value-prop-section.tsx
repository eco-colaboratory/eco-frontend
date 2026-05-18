import { CheckCircle } from 'lucide-react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { MotionWrapper } from './motion-wrapper'
import { SectionHeader } from './section-header'
import { SectionShell } from './section-shell'
import { cn } from '@/lib/utils'

export function ValuePropSection() {
  const { valueProp } = CHAM_BLOOM_CONTENT

  return (
    <SectionShell id="value" bg="cream" ambient>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeader
            label="Tại sao đồng hành?"
            title={
              <>
                Tại sao <span className="bloom-headline-accent">đồng hành</span> cùng CHẠM Bloom?
              </>
            }
            description={valueProp.intro}
            className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start"
          />

          <ol className="flex flex-col gap-0 lg:col-span-7">
            {valueProp.bullets.map((bullet, i) => {
              const alignRight = i % 2 === 1
              return (
                <MotionWrapper key={bullet} delay={0.1 * i}>
                  <li
                    className={cn(
                      'bloom-zigzag-item',
                      alignRight && 'md:pl-[12%]',
                      !alignRight && 'md:pr-[8%]',
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-start gap-5',
                        alignRight && 'md:flex-row-reverse md:text-right',
                      )}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/35 bg-bloom-green-light/90 shadow-sm">
                        <CheckCircle className="h-5 w-5 text-bloom-green-mid" aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="font-sans text-xs font-semibold tabular-nums text-bloom-gold">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="mt-1 text-base leading-relaxed text-gray-700 md:text-lg">
                          {bullet}
                        </p>
                      </div>
                    </div>
                  </li>
                </MotionWrapper>
              )
            })}
          </ol>
        </div>
      </div>
    </SectionShell>
  )
}
