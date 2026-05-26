'use client';

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// TODO: replace with API
const PLACEHOLDER_DATA = [
  { name: 'Mon', clicks: 120, uniques: 80 },
  { name: 'Tue', clicks: 180, uniques: 110 },
  { name: 'Wed', clicks: 150, uniques: 95 },
  { name: 'Thu', clicks: 220, uniques: 140 },
  { name: 'Fri', clicks: 190, uniques: 125 },
  { name: 'Sat', clicks: 90, uniques: 60 },
  { name: 'Sun', clicks: 70, uniques: 45 },
];

export function AnalyticsChart() {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Clicks và uniques (placeholder)</CardDescription>
      </CardHeader>
      <CardContent className="ps-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={PLACEHOLDER_DATA}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="currentColor"
              className="text-primary"
              fill="currentColor"
              fillOpacity={0.15}
            />
            <Area
              type="monotone"
              dataKey="uniques"
              stroke="currentColor"
              className="text-muted-foreground"
              fill="currentColor"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
