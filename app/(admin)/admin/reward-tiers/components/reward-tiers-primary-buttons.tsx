'use client';

import { Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRewardTiersPage } from './reward-tiers-provider';

export function RewardTiersPrimaryButtons() {
  const { openCreate } = useRewardTiersPage();

  return (
    <Button type="button" className="h-9 shadow-none" onClick={openCreate}>
      <Trophy className="mr-2 h-4 w-4" />
      Thêm mốc thưởng
    </Button>
  );
}
