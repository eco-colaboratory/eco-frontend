'use client';

import { ArrowDownRight, ArrowUpRight, Banknote, ChartNoAxesCombined, CircleDollarSign, Users, UserRoundPlus, WalletCards } from 'lucide-react';

import { type DailyMetric, formatCurrency } from './dashboard-data';

export function StatCards({ data }: { data: DailyMetric[] }) {
  const totals = data.reduce((sum, item) => ({
    newUsers: sum.newUsers + item.newUsers,
    dau: sum.dau + item.dau,
    payingUsers: sum.payingUsers + item.payingUsers,
    revenue: sum.revenue + item.revenue,
  }), { newUsers: 0, dau: 0, payingUsers: 0, revenue: 0 });
  const stats = [
    { label: 'Người dùng mới', value: String(totals.newUsers), change: '72.22%', positive: true, icon: UserRoundPlus, tone: 'bg-[#eef8df] text-[#5e8f2d]' },
    { label: 'Tổng người dùng', value: String(data.at(-1)?.totalUsers ?? 0), change: '5.07%', positive: true, icon: Users, tone: 'bg-[#e8f1ff] text-[#447ac4]' },
    { label: 'DAU', value: String(totals.dau), change: '18.61%', positive: true, icon: ChartNoAxesCombined, tone: 'bg-[#f0ebff] text-[#7a60c4]' },
    { label: 'Người dùng trả phí', value: String(totals.payingUsers), change: '19.23%', positive: false, icon: WalletCards, tone: 'bg-[#fff0dc] text-[#c77918]' },
    { label: 'Tỷ lệ chuyển đổi', value: `${totals.dau ? ((totals.payingUsers / totals.dau) * 100).toFixed(2) : '0.00'}%`, change: '31.64%', positive: false, icon: CircleDollarSign, tone: 'bg-[#fde8ef] text-[#cc6080]' },
    { label: 'Doanh thu', value: `${formatCurrency(totals.revenue)} VND`, change: '40.20%', positive: true, icon: Banknote, tone: 'bg-[#fff7d8] text-[#b8890f]' },
  ] as const;
  return (
    <section aria-label="Chỉ số chính" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
      {stats.map(({ label, value, change, positive, icon: Icon, tone }) => (
        <article key={label} className="min-w-0 rounded-lg border border-border bg-card p-3.5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <span className={`grid size-9 shrink-0 place-items-center rounded-full ${tone}`}>
              <Icon className="size-[18px]" aria-hidden />
            </span>
          </div>
          <p className="mt-2.5 truncate text-xl font-bold tracking-tight text-foreground">{value}</p>
          <p className={`mt-1.5 flex items-center gap-1 text-[11px] font-semibold ${positive ? 'text-[#62952f]' : 'text-[#ce5d7e]'}`}>
            {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {change}
            <span className="font-normal text-muted-foreground">so với kỳ trước</span>
          </p>
        </article>
      ))}
    </section>
  );
}
