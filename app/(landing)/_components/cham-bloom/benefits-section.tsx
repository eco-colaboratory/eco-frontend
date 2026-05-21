'use client'

import { useState } from 'react'
import { CHAM_BLOOM_CONTENT } from '@/lib/content/cham-bloom-landing'
import { GlassCard } from '../layout/glass-card'
import { SectionHeader } from '../layout/section-header'
import { SectionShell } from '../layout/section-shell'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const summaryBenefits = [
    {
        tag: 'TẦM NHÌN',
        title: 'Brand Visibility',
        desc: 'Logo thương hiệu xuất hiện trang trọng trên website chính thức, proposal đối ngoại, key visuals và toàn bộ ấn phẩm offline.',
    },
    {
        tag: 'LAN TỎA',
        title: 'Viral Social Media',
        desc: 'Tăng lượng tương tác thương hiệu thông qua các bài đăng giới thiệu riêng, bài đăng cảm ơn kết hợp hashtag chiến dịch trên Fanpage.',
    },
    {
        tag: 'SẢN PHẨM',
        title: 'TVC & Video Launch',
        desc: 'Được ghi nhận danh vị rõ ràng trong TVC quảng bá launching và chuỗi video recap chiến dịch truyền thông.',
    },
    {
        tag: 'TƯƠNG TÁC',
        title: 'Gamification Decor',
        desc: 'Thiết kế độc quyền các vật phẩm ảo mang dấu ấn thương hiệu, xây dựng sự kiện / chuỗi thử thách vệ tinh tích hợp trong game.',
    },
]

export function BenefitsSection() {
    const { benefits, benefitsNote } = CHAM_BLOOM_CONTENT
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
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                        Xem tóm tắt các giá trị truyền thông và so sánh chi tiết quyền lợi của từng gói tài trợ.
                    </p>
                </div>

                {/* BƯỚC 1 — Tóm tắt Quyền lợi (Summary Benefits) */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                    {summaryBenefits.map((item) => {
                        return (
                            <GlassCard
                                key={item.title}
                                interactive={false}
                                className="border border-bloom-green-mid/10 bg-white/70 p-6 shadow-sm"
                            >
                                <span className="inline-flex rounded-md bg-bloom-green-mist px-2.5 py-1 text-[10px] font-bold tracking-wider text-bloom-green-mid shadow-sm border border-bloom-green-mid/15">
                                    {item.tag}
                                </span>
                                <h4 className="mt-4 font-display text-lg font-bold text-bloom-green-deep">
                                    {item.title}
                                </h4>
                                <p className="mt-2 text-pretty text-sm text-gray-500 leading-relaxed">
                                    {item.desc}
                                </p>
                            </GlassCard>
                        )
                    })}
                </div>

                {/* Nút bấm Đóng/Mở bảng chi tiết */}
                <div className="flex justify-center mb-10">
                    <button
                        onClick={() => setIsTableExpanded(!isTableExpanded)}
                        className="inline-flex items-center gap-2 rounded-full bg-bloom-green-deep px-6 py-3 text-sm font-bold text-white shadow-md shadow-bloom-green-deep/20 transition-all duration-300 hover:bg-bloom-green-deep/90 hover:shadow-[0_0_15px_rgba(27,138,66,0.3)] active:scale-[0.98] cursor-pointer"
                    >
                        {isTableExpanded ? (
                            <>
                                Thu gọn bảng quyền lợi <span className="ml-1 text-xs select-none">▲</span>
                            </>
                        ) : (
                            <>
                                Xem so sánh quyền lợi đầy đủ <span className="ml-1 text-xs select-none">▼</span>
                            </>
                        )}
                    </button>
                </div>

                {/* BƯỚC 2 — Bảng Quyền lợi chi tiết (Expandable Table) */}
                {isTableExpanded && (
                    <div className="animate-fade-in-up duration-500">
                        {/* Phiên bản Desktop (Table Ngang) */}
                        <div className="hidden md:block rounded-3xl border border-white/50 bg-white/70 shadow-lg shadow-bloom-green-deep/5 backdrop-blur-md relative overflow-hidden">
                            <div className="overflow-auto max-h-[65vh]">
                                <table className="w-full min-w-[768px] border-collapse text-sm">
                                    <thead className="sticky top-0 z-10">
                                        <tr className="border-b border-bloom-green-mid/20 bg-bloom-green-mist/95 backdrop-blur-md shadow-sm">
                                            <th className="px-6 py-5 text-left font-display text-base font-bold text-bloom-green-deep w-[40%]">
                                                Quyền lợi đồng hành
                                            </th>
                                            {benefits.tierNames.map((name, i) => (
                                                <th
                                                    key={name}
                                                    className={cn(
                                                        'px-4 py-5 text-center text-sm font-bold uppercase tracking-wider',
                                                        i === 2 || i === 3 ? 'text-bloom-green-mid' : 'text-bloom-green-deep/80'
                                                    )}
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
                                                    rowIndex % 2 === 1 && 'bg-bloom-green-mist/30'
                                                )}
                                            >
                                                <td className="px-6 py-4 font-semibold text-gray-700 leading-snug">{row.label}</td>
                                                {row.cells.map((cell, i) => {
                                                    const isCheck = cell === '✓'
                                                    return (
                                                        <td
                                                            key={`${row.label}-${i}`}
                                                            className={cn(
                                                                'px-4 py-4 text-center font-medium',
                                                                isCheck ? 'text-bloom-green-mid' : 'text-gray-500 text-xs'
                                                            )}
                                                        >
                                                            {isCheck ? (
                                                                <span className="text-bloom-green-mid text-lg font-extrabold select-none">✓</span>
                                                            ) : cell === '-' ? (
                                                                <span className="text-gray-300 select-none">—</span>
                                                            ) : (
                                                                cell
                                                            )}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Phiên bản Mobile (Tab & Accordion Quyền lợi) */}
                        <div className="block md:hidden">
                            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none">
                                {benefits.tierNames.map((name, index) => (
                                    <button
                                        key={name}
                                        onClick={() => setActiveMobileTab(index)}
                                        className={cn(
                                            'shrink-0 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 shadow-sm border',
                                            activeMobileTab === index
                                                ? 'bg-bloom-green-deep border-bloom-green-deep text-white shadow-bloom-green-deep/15'
                                                : 'bg-white/70 border-white/40 text-bloom-green-deep hover:bg-white'
                                        )}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>

                            <GlassCard className="border border-white/50 bg-white/70 mt-3 p-6 shadow-sm">
                                <div className="pb-4 mb-5 border-b border-bloom-green-mid/15">
                                    <h4 className="font-display text-lg font-bold text-bloom-green-deep">
                                        Quyền lợi gói {benefits.tierNames[activeMobileTab]}
                                    </h4>
                                </div>

                                <ul className="space-y-4">
                                    {benefits.rows
                                        .map((row) => {
                                            const cellValue = row.cells[activeMobileTab]
                                            return { label: row.label, value: cellValue }
                                        })
                                        .filter((item) => item.value !== '-')
                                        .map((item) => (
                                            <li key={item.label} className="flex items-start gap-3">
                                                <span className="text-bloom-green-mid font-black select-none mt-0.5">•</span>
                                                <div className="text-sm">
                                                    <span className="font-medium text-gray-700 block leading-snug">{item.label}</span>
                                                    {item.value !== '✓' && (
                                                        <span className="text-xs font-bold text-bloom-green-mid mt-0.5 block bg-bloom-green-mist/50 rounded px-2 py-0.5 w-fit">
                                                            {item.value}
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </GlassCard>
                        </div>

                        {/* Note dưới bảng */}
                        <div className="mt-8 text-center">
                            <Link href="#contact" className="inline-flex items-center gap-2 underline text-sm font-semibold text-bloom-green-deep hover:text-bloom-green-deep/80 transition-colors">
                                Bảng chi tiết quyền lợi và đăng ký đồng hành
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </SectionShell>
    )
}
