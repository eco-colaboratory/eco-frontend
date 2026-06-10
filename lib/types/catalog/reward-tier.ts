export interface RewardTier {
  id: string;
  minMinutes: number;
  wateringCanQty: number;
  fertilizerQty: number;
}

export interface CreateRewardTierRequest {
  minMinutes: number;
  wateringCanQty: number;
  fertilizerQty: number;
}

export type UpdateRewardTierRequest = Partial<CreateRewardTierRequest>;
