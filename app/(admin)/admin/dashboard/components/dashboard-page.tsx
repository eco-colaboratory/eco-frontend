'use client';

import { useState } from 'react';

import { AdminRouteShell } from '@/components/layout/admin-route-shell';
import { TopNav } from '@/components/layout/top-nav';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AnalyticsChart } from './analytics-chart';
import { OverviewChart } from './overview-chart';
import { StatCards } from './stat-cards';

export function DashboardPage() {
  const [tab, setTab] = useState('overview');

  return (
    <AdminRouteShell headerStart={<TopNav value={tab} onValueChange={setTab} />}>
      <div className="flex flex-1 flex-col gap-4 sm:gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Tổng quan admin — dữ liệu placeholder cho tới khi có API dashboard.
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="space-y-4">
          <TabsContent value="overview" className="mt-0 space-y-4">
            <StatCards />
            <div className="grid gap-4 lg:grid-cols-7">
              <OverviewChart />
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="mt-0">
            <AnalyticsChart />
          </TabsContent>
        </Tabs>
      </div>
    </AdminRouteShell>
  );
}
