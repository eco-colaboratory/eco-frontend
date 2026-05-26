'use client';

import { m } from 'framer-motion';
import { Package, Palette, Sparkles, Users } from 'lucide-react';

import { adminStaggerContainer, adminStaggerItem } from '@/lib/admin/motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// TODO: replace with API — placeholder KPIs for v1
const STATS = [
  { label: 'Users', value: '1,248', delta: '+12%', icon: Users },
  { label: 'Items', value: '86', delta: '+4%', icon: Package },
  { label: 'Decors', value: '42', delta: '+2%', icon: Palette },
  { label: 'Synergies', value: '18', delta: '0%', icon: Sparkles },
] as const;

export function StatCards() {
  return (
    <m.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={adminStaggerContainer}
      initial="hidden"
      animate="show"
    >
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <m.div key={stat.label} variants={adminStaggerItem}>
            <Card className="border-border transition-shadow duration-300 hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-bloom-green-deep/40" aria-hidden />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.delta} so với tháng trước</p>
              </CardContent>
            </Card>
          </m.div>
        );
      })}
    </m.div>
  );
}
