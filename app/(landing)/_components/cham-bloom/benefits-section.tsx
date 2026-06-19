'use client'

import { useState } from 'react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { SectionHeader } from '../layout/section-header'
import { SectionShell } from '../layout/section-shell'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const summaryBenefits = [
  {
    tag: 'TẦM NHÌN',
    emoji: '👁️',
    title: 'Brand Visibility',
    desc: 'Logo thương hiệu xuất hiện trang trọng trên website chính thức, proposal đối ngoại, key visuals và toàn bộ ấn phẩm offline.',
  },
  {
    tag: 'LAN TỎA',
    emoji: '📣',
    title: 'Viral Social Media',
    desc: 'Tăng lượng tương tác thương hiệu thông qua các bài đăng giới thiệu riêng, bài đăng cảm ơn kết hợp hashtag chiến dịch trên Fanpage.',
  },
  {
    tag: 'SẢN PHẨM',
    emoji: '🎬',
    title: 'TVC & Video Launch',
    desc: 'Được ghi nhận danh vị rõ ràng trong TVC quảng bá launching và chuỗi video recap chiến dịch truyền thông.',
  },
  {
    tag: 'TƯƠNG TÁC',
    emoji: '🎮',
    title: 'Gamification Decor',
    desc: 'Thiết kế độc quyền các vật phẩm ảo mang dấu ấn thương hiệu, xây dựng sự kiện / chuỗi thử thách vệ tinh tích hợp trong game.',
  },
]

export function BenefitsSection() {
  const { benefits } = CHAM_BLOOM_CONTENT
  const [isTableExpanded, setIsTableExpanded] = useState(false)
  const [activeMobileTab, setActiveMobileTab] = useState(0) // Index of active tier

  return (
    <SectionShell id="benefits" bg="mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <SectionHeader
            label={benefits.label}
            title="Quyền lợi"
            accent="chi tiết"
            align="center"
          />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-bloom-green-deep/75 font-semibold">
            Xem tóm tắt các giá trị truyền thông và so sánh chi tiết quyền lợi của từng gói tài trợ.
          </p>
        </div>

        {/* BƯỚC 1 — Tóm tắt Quyền lợi (Summary Benefits) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {summaryBenefits.map((item) => {
            return (
              <div
                key={item.title}
                className="rounded-[2rem] border-2 border-bloom-green-deep bg-white/95 p-6 shadow-[4px_4px_0px_var(--bloom-green-deep)]"
              >
                <span className="inline-flex items-center gap-1 rounded-full border-2 border-bloom-green-deep bg-bloom-green-light px-3 py-0.5 text-[9px] font-black uppercase tracking-wider text-bloom-green-deep shadow-[2px_2px_0px_var(--bloom-green-deep)]">
                  {item.emoji} {item.tag}
                </span>
                <h4 className="mt-4 font-display text-base font-black text-bloom-green-deep">
                  {item.title}
                </h4>
                <p className="mt-2 text-[12px] font-semibold text-bloom-green-deep/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Nút bấm Đóng/Mở bảng chi tiết */}
        <div className="flex justify-center mb-10">
          <button
            id="benefits-expand-btn"
            type="button"
            onClick={() => setIsTableExpanded(!isTableExpanded)}
            aria-expanded={isTableExpanded}
            aria-controls="benefits-detail-table"
            className="bloom-btn-3d bloom-btn-3d-primary px-6 py-2.5 text-xs text-bloom-green-deep border-2 border-bloom-green-deep cursor-pointer select-none"
          >
            {isTableExpanded ? (
              <>
                Thu gọn bảng quyền lợi <span className="ml-1 text-[10px] select-none">▲</span>
              </>
            ) : (
              <>
                Xem so sánh quyền lợi đầy đủ <span className="ml-1 text-[10px] select-none">▼</span>
              </>
            )}
          </button>
        </div>

        {/* BƯỚC 2 — Bảng Quyền lợi chi tiết (Expandable Table) */}
        {isTableExpanded && (
          <div id="benefits-detail-table" role="region" aria-labelledby="benefits-expand-btn" className="animate-fade-in-up duration-500">
            {/* Desktop Version */}
            <div className="hidden md:block rounded-[2rem] border-2 border-bloom-green-deep bg-white/95 shadow-[6px_6px_0px_var(--bloom-green-deep)] relative overflow-hidden">
              <div className="overflow-auto max-h-[65vh]">
                <table className="w-full min-w-[768px] border-collapse text-xs">
                  <thead className="sticky top-0 z-10">
                    <tr className="border-b-2 border-bloom-green-deep bg-bloom-green-mist shadow-sm">
                      <th className="px-6 py-4.5 text-left font-display text-sm font-black text-bloom-green-deep w-[36%]">
                        Quyền lợi đồng hành
                      </th>
                      {benefits.tierNames.map((name, i) => (
                        <th
                          key={name}
                          className={cn(
                            'px-4 py-4.5 text-center font-display text-xs font-black uppercase tracking-wider border-l border-bloom-green-deep/15',
                            i === 2 || i === 3 ? 'text-bloom-green-deep bg-bloom-gold/15' : 'text-bloom-green-deep/80'
                          )}
                        >
                          {i === 2 && '👑 '}
                          {i === 3 && '💎 '}
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {benefits.rows.map((row, rowIndex) =>
                      row.kind === 'section' ? (
                        <tr key={`section-${row.label}`} className="bg-bloom-green-deep text-white">
                          <td
                            colSpan={benefits.tierNames.length + 1}
                            className="px-6 py-2.5 font-display text-[10px] font-black uppercase tracking-wider border-b border-bloom-green-deep"
                          >
                            🌸 {row.label}
                          </td>
                        </tr>
                      ) : (
                        <tr
                          key={row.label}
                          className={cn(
                            'border-b border-bloom-green-deep/10 transition-colors hover:bg-bloom-green-light/30',
                            rowIndex % 2 === 1 && 'bg-bloom-green-light/10'
                          )}
                        >
                          <td className="px-6 py-3.5 font-bold text-bloom-green-deep leading-snug font-sans">{row.label}</td>
                          {row.cells.map((cell, i) => {
                            const isCheck = cell === '✓'
                            return (
                              <td
                                key={`${row.label}-${i}`}
                                className="px-4 py-3.5 text-center font-semibold border-l border-bloom-green-deep/10"
                              >
                                {isCheck ? (
                                  <span className="text-sm select-none" title="Có">🌸</span>
                                ) : cell === '-' ? (
                                  <span className="text-bloom-green-deep/30 select-none">—</span>
                                ) : (
                                  <span className="inline-flex rounded-full border border-bloom-green-deep/30 bg-bloom-green-light px-2.5 py-0.5 text-[10px] font-black text-bloom-green-deep shadow-[1px_1px_0px_var(--bloom-green-deep)]">
                                    {cell}
                                  </span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Version (Tab-based) */}
            <div className="block md:hidden">
              <div className="flex gap-2.5 overflow-x-auto pb-4 scrollbar-none">
                {benefits.tierNames.map((name, index) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setActiveMobileTab(index)}
                    className={cn(
                      'shrink-0 bloom-btn-3d text-[11px] px-5 py-2 border-2 border-bloom-green-deep select-none cursor-pointer',
                      activeMobileTab === index
                        ? 'bloom-btn-3d-primary'
                        : 'bloom-btn-3d-outline bg-white/70'
                    )}
                  >
                    {index === 2 && '👑 '}
                    {index === 3 && '💎 '}
                    Gói {name}
                  </button>
                ))}
              </div>

              <div className="rounded-[2rem] border-2 border-bloom-green-deep bg-white p-6 mt-2 shadow-[4px_4px_0px_var(--bloom-green-deep)]">
                <div className="pb-3 mb-5 border-b-2 border-bloom-green-deep/10 flex items-center justify-between">
                  <h4 className="font-display text-sm font-black text-bloom-green-deep">
                    Quyền lợi gói {benefits.tierNames[activeMobileTab]}
                  </h4>
                  <span className="text-xs">
                    {activeMobileTab === 2 && '👑'}
                    {activeMobileTab === 3 && '💎'}
                  </span>
                </div>

                <ul className="space-y-4">
                  {benefits.rows.map((row) => {
                    if (row.kind === 'section') {
                      return (
                        <li
                          key={`section-${row.label}`}
                          className="pt-3 first:pt-0 list-none"
                        >
                          <p className="font-display text-[10px] font-black uppercase tracking-wider text-bloom-green-deep border-b border-bloom-green-deep/15 pb-1">
                            🌱 {row.label}
                          </p>
                        </li>
                      )
                    }
                    const cellValue = row.cells[activeMobileTab]
                    if (cellValue === '-') return null
                    return (
                      <li key={row.label} className="flex items-start gap-2.5">
                        <span className="text-[10px] select-none mt-0.5">🌸</span>
                        <div className="text-xs font-semibold text-bloom-green-deep leading-snug">
                          <span>{row.label}</span>
                          {cellValue !== '✓' && (
                            <span className="inline-flex mt-1 rounded-full border border-bloom-green-deep/30 bg-bloom-green-light px-2 py-0.5 text-[9px] font-black text-bloom-green-deep ml-1">
                              {cellValue}
                            </span>
                          )}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            {/* Note below comparison table */}
            <div className="mt-8 text-center">
              <Link href="#contact" className="inline-flex items-center gap-1.5 underline text-xs font-black text-bloom-green-deep hover:text-bloom-petal transition-colors">
                <span>Bảng chi tiết quyền lợi và đăng ký đồng hành</span>
                <span className="font-mono">→</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  )
}
