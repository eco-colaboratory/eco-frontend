export interface DailyTask {
  id: string;
  title: string;
  description: string;
  type: string; // GARDEN_CARE / HARVEST / FOCUS_SESSION / ONLINE_TIME
  actionSubtype: string | null;
  target: number;
  cycle: 'DAILY' | 'WEEKLY' | string;
  isActive: boolean;
  rewardCurrency: number;
  rewardItemId: string | null;
  rewardItemQty: number;
  rewardXP: number;
}

export interface UpdateDailyTaskConfigRequest {
  target: number;
  rewardCurrency: number;
  rewardXP: number;
  rewardItemId: string | null;
  rewardItemQty: number;
}
