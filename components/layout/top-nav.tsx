'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TopNav({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="me-auto">
      <TabsList className="h-9 bg-muted">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
