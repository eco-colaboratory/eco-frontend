'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type DailyMetric, formatCurrency } from './dashboard-data';

const tooltipStyle = { borderRadius: 8, border: '1px solid #f1dcc4', boxShadow: 'none' };

export function AnalyticsChart({ data }: { data: DailyMetric[] }) {
  const coinData = [
    { name: '200 coin', value: data.reduce((sum, item) => sum + item.coin200, 0), color: '#e3a11d' },
    { name: '500 coin', value: data.reduce((sum, item) => sum + item.coin500, 0), color: '#f58fb1' },
    { name: '1.000 coin', value: data.reduce((sum, item) => sum + item.coin1000, 0), color: '#82bf47' },
  ].filter((item) => item.value > 0);
  const packageSales = coinData.reduce((sum, item) => sum + item.value, 0);
  let accumulated = 0;
  const donutBackground = packageSales
    ? `conic-gradient(${coinData.map((item) => {
        const start = accumulated;
        accumulated += (item.value / packageSales) * 100;
        return `${item.color} ${start}% ${accumulated}%`;
      }).join(', ')})`
    : '#fdf0df';

  return (
    <section aria-label="Biểu đồ phân tích" className="grid h-full min-h-0 gap-4 xl:h-[calc(100svh-21.25rem)] xl:grid-cols-2 xl:grid-rows-2">
      <Card className="flex min-h-0 flex-col"><CardHeader className="pb-2"><CardTitle className="text-base">DAU theo ngày</CardTitle></CardHeader><CardContent className="min-h-0 flex-1 px-2 pb-3 sm:px-4"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -16 }}><CartesianGrid stroke="#f1dcc4" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} /><YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [value, 'DAU']} /><Line type="monotone" dataKey="dau" stroke="#82bf47" strokeWidth={2.5} dot={{ r: 3, fill: '#82bf47' }} activeDot={{ r: 5 }} /></LineChart></ResponsiveContainer></CardContent></Card>
      <Card className="flex min-h-0 flex-col"><CardHeader className="pb-2"><CardTitle className="text-base">Doanh thu theo ngày (VND)</CardTitle></CardHeader><CardContent className="min-h-0 flex-1 px-2 pb-3 sm:px-4"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -10 }}><CartesianGrid stroke="#f1dcc4" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} /><YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}K`} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${formatCurrency(Number(value))} VND`, 'Doanh thu']} /><Bar dataKey="revenue" fill="#e3a11d" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
      <Card className="flex min-h-0 flex-col"><CardHeader className="pb-2"><CardTitle className="text-base">Tỷ lệ chuyển đổi theo ngày (%)</CardTitle></CardHeader><CardContent className="min-h-0 flex-1 px-2 pb-3 sm:px-4"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 12, right: 12, bottom: 0, left: -16 }}><CartesianGrid stroke="#f1dcc4" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="label" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} /><YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} /><Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`, 'Tỷ lệ chuyển đổi']} /><Line type="monotone" dataKey="conversionRate" stroke="#f58fb1" strokeWidth={2.5} dot={{ r: 3, fill: '#f58fb1' }} activeDot={{ r: 5 }} /></LineChart></ResponsiveContainer></CardContent></Card>
      <Card className="flex min-h-0 flex-col"><CardHeader className="pb-2"><CardTitle className="text-base">Cơ cấu gói coin</CardTitle></CardHeader><CardContent className="flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-2 pb-3 sm:px-4"><div className="grid h-52 w-52 shrink-0 place-items-center rounded-full" style={{ background: donutBackground }}><div className="grid h-32 w-32 shrink-0 place-items-center rounded-full bg-card text-center"><div><p className="text-xl font-bold text-foreground">{packageSales}</p><p className="text-[11px] text-muted-foreground">gói đã bán</p></div></div></div><div className="flex flex-wrap justify-center gap-3 text-[11px] text-muted-foreground">{coinData.map((item) => <span key={item.name} className="flex items-center gap-1"><i className="size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</span>)}</div></CardContent></Card>
    </section>
  );
}
