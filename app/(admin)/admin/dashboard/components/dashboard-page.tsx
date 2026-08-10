'use client';

import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { CalendarDays, Download, RefreshCw } from 'lucide-react';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dailyMetrics } from './dashboard-data';
import { DailyMetricsTable } from './daily-metrics-table';
import { AnalyticsChart } from './analytics-chart';
import { StatCards } from './stat-cards';

const csvHeaders = ['Ngày', 'Người dùng mới', 'Tổng người dùng', 'DAU', 'Người dùng trả phí', 'Tỷ lệ chuyển đổi', '200 coin', '500 coin', '1.000 coin', '2.000 coin', 'Doanh thu'];
const currentMonthRange: DateRange = { from: new Date(2026, 7, 1), to: new Date(2026, 7, 10) };
const previousMonthRange: DateRange = { from: new Date(2026, 6, 3), to: new Date(2026, 6, 31) };
const currentYearRange: DateRange = { from: new Date(2026, 6, 3), to: new Date(2026, 7, 10) };
const firstAvailableDate = new Date(2026, 6, 3);
const lastAvailableDate = new Date(2026, 7, 10);

function formatRange(range: DateRange | undefined) {
  if (!range?.from) return 'Chọn khoảng ngày';
  const from = format(range.from, 'dd/MM/yyyy');
  return range.to ? `${from} - ${format(range.to, 'dd/MM/yyyy')}` : from;
}

export function DashboardPage() {
  const [exported, setExported] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeRange, setActiveRange] = useState<DateRange>(currentMonthRange);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(currentMonthRange);
  const updatedAt = useMemo(() => new Intl.DateTimeFormat('vi-VN', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(2026, 7, 10, 23, 59)), []);
  const filteredMetrics = useMemo(() => {
    const start = activeRange.from?.getTime() ?? firstAvailableDate.getTime();
    const end = activeRange.to?.getTime() ?? activeRange.from?.getTime() ?? lastAvailableDate.getTime();
    return dailyMetrics.filter((item) => {
      const timestamp = parseISO(item.date).getTime();
      return timestamp >= start && timestamp <= end;
    });
  }, [activeRange]);
  const rangeLabel = formatRange(activeRange);
  const applyRange = (range: DateRange) => {
    setActiveRange(range);
    setDraftRange(range);
    setFilterOpen(false);
  };

  const exportCsv = () => {
    const rows = filteredMetrics.map((item) => [item.date, item.newUsers, item.totalUsers, item.dau, item.payingUsers, `${item.conversionRate}%`, item.coin200, item.coin500, item.coin1000, item.coin2000, item.revenue]);
    const blob = new Blob([[csvHeaders, ...rows].map((row) => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href = url; link.download = 'cham-flora-user-analytics-2026-08-01-10.csv'; link.click(); URL.revokeObjectURL(url);
    setExported(true); window.setTimeout(() => setExported(false), 1800);
  };

  return (
    <AdminRouteShell className="min-h-0 overflow-hidden pt-2 md:pt-3 max-xl:overflow-auto" headerStart={<div className="min-w-0"><p className="text-sm font-semibold text-foreground">Phân tích người dùng</p><p className="hidden text-xs text-muted-foreground sm:block">Theo dõi tăng trưởng và chuyển đổi</p></div>}>
      <div className="flex min-h-0 flex-1 flex-col gap-3 xl:gap-4">
        <Tabs defaultValue="overview" className="contents">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <TabsList className="shrink-0 bg-muted/70">
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="daily-data">Dữ liệu theo ngày</TabsTrigger>
            </TabsList>
            <div className="flex flex-wrap items-center gap-2">
              <p className="flex whitespace-nowrap gap-1.5 text-xs text-muted-foreground"><RefreshCw className="size-3" aria-hidden />Cập nhật lúc: {updatedAt}</p>
              <Popover open={filterOpen} onOpenChange={(open) => { setFilterOpen(open); if (open) setDraftRange(activeRange); }}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-10 bg-card shadow-none"><CalendarDays className="size-4" />{rangeLabel}</Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto p-0">
                  <div className="border-b border-border px-4 py-3"><p className="text-sm font-semibold">Lọc theo khoảng ngày</p><p className="mt-0.5 text-xs text-muted-foreground">Dữ liệu khả dụng: 03/07 - 10/08/2026</p></div>
                  <div className="flex flex-wrap gap-2 px-4 pt-3"><Button variant="secondary" size="sm" onClick={() => applyRange(currentMonthRange)}>Tháng này</Button><Button variant="secondary" size="sm" onClick={() => applyRange(previousMonthRange)}>Tháng trước</Button><Button variant="secondary" size="sm" onClick={() => applyRange(currentYearRange)}>Năm nay</Button></div>
                  <Calendar mode="range" selected={draftRange} onSelect={setDraftRange} defaultMonth={activeRange.from} disabled={{ before: firstAvailableDate, after: lastAvailableDate }} numberOfMonths={1} />
                  <div className="flex items-center justify-between border-t border-border p-3"><Button variant="ghost" size="sm" onClick={() => setDraftRange(currentMonthRange)}>Đặt lại</Button><Button size="sm" onClick={() => { if (draftRange?.from) { applyRange({ from: draftRange.from, to: draftRange.to ?? draftRange.from }); } }}>Áp dụng</Button></div>
                </PopoverContent>
              </Popover>
              <Button onClick={exportCsv} className="h-10 bg-primary text-primary-foreground hover:bg-primary/90"><Download className="size-4" />{exported ? 'Đã xuất file' : 'Xuất dữ liệu'}</Button>
            </div>
          </div>
          <StatCards data={filteredMetrics} />
          <TabsContent value="overview" className="min-h-0 flex-1 overflow-auto xl:overflow-hidden">
            <AnalyticsChart data={filteredMetrics} />
          </TabsContent>
          <TabsContent value="daily-data" className="min-h-0 flex-1 overflow-auto">
            <DailyMetricsTable data={filteredMetrics} dateLabel={rangeLabel} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminRouteShell>
  );
}
