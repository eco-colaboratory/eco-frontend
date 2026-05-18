import Link from 'next/link'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { GlassCard } from './glass-card'
import { SectionHeader } from './section-header'
import { SectionShell } from './section-shell'
import { cn } from '@/lib/utils'

export function BenefitsSection() {
  const { benefits, benefitsNote } = CHAM_BLOOM_CONTENT
  const showOverlay = Boolean(benefitsNote?.trim())

  return (
    <SectionShell id="benefits" bg="mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader label={benefits.label} title={benefits.title} />

        <div className="relative mt-12">
          <div
            className={cn(
              'overflow-x-auto rounded-2xl border border-white/40 bg-white/70 shadow-lg shadow-bloom-green-deep/5 backdrop-blur-md',
              showOverlay && 'select-none blur-[2px]',
            )}
          >
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-bloom-green-mid/20 bg-bloom-green-light/60">
                  <th className="px-4 py-4 text-left font-display text-base font-normal text-bloom-green-deep">
                    Quyền lợi
                  </th>
                  {benefits.tierNames.map((name) => (
                    <th
                      key={name}
                      className="px-3 py-4 text-center text-xs font-medium uppercase tracking-wide text-bloom-green-mid"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benefits.rows.map((row, rowIndex) => (
                  <tr
                    key={row.label}
                    className={cn(
                      'border-b border-bloom-green-mid/10 transition-colors hover:bg-white/40',
                      rowIndex % 2 === 1 && 'bg-bloom-green-mist/50',
                    )}
                  >
                    <td className="px-4 py-3.5 font-medium text-gray-800">{row.label}</td>
                    {row.cells.map((cell, i) => (
                      <td
                        key={`${row.label}-${i}`}
                        className={cn(
                          'px-3 py-3.5 text-center tabular-nums',
                          cell === '✓' ? 'font-semibold text-bloom-green-mid' : 'text-gray-400',
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showOverlay ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
              <GlassCard className="pointer-events-auto max-w-md border-dashed border-bloom-gold/30 bg-white/85 text-center shadow-xl">
                <p className="text-sm leading-relaxed text-gray-700">{benefitsNote}</p>
                <Link
                  href="#contact"
                  className="mt-4 inline-block text-sm font-medium text-bloom-green-mid transition-colors hover:text-bloom-green-deep hover:underline"
                >
                  Liên hệ ngay →
                </Link>
              </GlassCard>
            </div>
          ) : null}
        </div>
      </div>
    </SectionShell>
  )
}
