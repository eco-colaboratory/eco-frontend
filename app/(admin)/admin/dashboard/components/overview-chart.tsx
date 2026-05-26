'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// TODO: replace with API
const PLACEHOLDER_DATA = [
  { name: 'Jan', total: 4200 },
  { name: 'Feb', total: 3800 },
  { name: 'Mar', total: 5100 },
  { name: 'Apr', total: 4600 },
  { name: 'May', total: 5400 },
  { name: 'Jun', total: 4900 },
];

export function OverviewChart() {
  return (
    <Card className="border-border lg:col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Doanh thu theo tháng (placeholder)</CardDescription>
      </CardHeader>
      <CardContent className="ps-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={PLACEHOLDER_DATA}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
