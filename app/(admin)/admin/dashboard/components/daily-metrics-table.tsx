import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type DailyMetric, formatCurrency } from './dashboard-data';

const number = (value: number) => new Intl.NumberFormat('vi-VN').format(value);

export function DailyMetricsTable({ data, dateLabel }: { data: DailyMetric[]; dateLabel: string }) {
  const totals = data.reduce((sum, item) => ({
    newUsers: sum.newUsers + item.newUsers, dau: sum.dau + item.dau, payingUsers: sum.payingUsers + item.payingUsers,
    coin200: sum.coin200 + item.coin200, coin500: sum.coin500 + item.coin500, coin1000: sum.coin1000 + item.coin1000,
    coin2000: sum.coin2000 + item.coin2000, revenue: sum.revenue + item.revenue,
  }), { newUsers: 0, dau: 0, payingUsers: 0, coin200: 0, coin500: 0, coin1000: 0, coin2000: 0, revenue: 0 });
  const totalUsers = data.at(-1)?.totalUsers ?? 0;
  const conversion = totals.dau ? (totals.payingUsers / totals.dau) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
        <div><CardTitle className="text-base">Chỉ số người dùng theo ngày</CardTitle><p className="mt-1 text-sm text-muted-foreground">{dateLabel}</p></div>
        <span className="hidden rounded-full bg-[#eef8df] px-3 py-1 text-xs font-semibold text-[#5e8f2d] sm:block">Dữ liệu đã đồng bộ</span>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table className="min-w-[1220px] text-xs">
          <TableHeader className="bg-muted/45"><TableRow>
            {['Ngày', 'Người dùng mới', 'Tổng người dùng', 'DAU', 'Người dùng trả phí', 'Tỷ lệ chuyển đổi', '200 coin', '500 coin', '1.000 coin', '2.000 coin', 'Doanh thu (VND)'].map((label) => <TableHead key={label} className="h-auto whitespace-nowrap px-3 py-3 text-center text-xs font-semibold text-foreground">{label}</TableHead>)}
          </TableRow></TableHeader>
          <TableBody>{data.map((item) => <TableRow key={item.date}>
            <TableCell className="sticky left-0 bg-card px-3 text-center font-medium">{item.label}/2026</TableCell><TableCell className="px-3 text-center">{item.newUsers}</TableCell><TableCell className="px-3 text-center">{item.totalUsers}</TableCell><TableCell className="px-3 text-center">{item.dau}</TableCell><TableCell className="px-3 text-center">{item.payingUsers}</TableCell><TableCell className={`px-3 text-center font-medium ${item.conversionRate ? 'text-[#a24b6c]' : 'text-muted-foreground'}`}>{item.conversionRate.toFixed(2)}%</TableCell><TableCell className="px-3 text-center">{item.coin200}</TableCell><TableCell className="px-3 text-center">{item.coin500}</TableCell><TableCell className="px-3 text-center">{item.coin1000}</TableCell><TableCell className="px-3 text-center">{item.coin2000}</TableCell><TableCell className="px-3 text-right font-medium">{formatCurrency(item.revenue)}</TableCell>
          </TableRow>)}</TableBody>
          <TableFooter><TableRow className="bg-[#fff8e3] hover:bg-[#fff8e3]"><TableCell className="sticky left-0 bg-[#fff8e3] px-3 font-bold">TỔNG</TableCell><TableCell className="px-3 text-center font-bold text-[#5e8f2d]">{totals.newUsers}</TableCell><TableCell className="px-3 text-center font-bold text-[#447ac4]">{totalUsers}</TableCell><TableCell className="px-3 text-center font-bold text-[#5e8f2d]">{totals.dau}</TableCell><TableCell className="px-3 text-center font-bold text-[#c77918]">{totals.payingUsers}</TableCell><TableCell className="px-3 text-center font-bold text-[#a24b6c]">{conversion.toFixed(2)}%</TableCell><TableCell className="px-3 text-center">{number(totals.coin200)}</TableCell><TableCell className="px-3 text-center">{number(totals.coin500)}</TableCell><TableCell className="px-3 text-center">{number(totals.coin1000)}</TableCell><TableCell className="px-3 text-center">{number(totals.coin2000)}</TableCell><TableCell className="px-3 text-right font-bold text-[#b8890f]">{formatCurrency(totals.revenue)}</TableCell></TableRow></TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
