export interface GiftCodeReward {
  rewardType: number; // 0=Currency, 1=Item, 2=FlowerSeed, 3=Decor
  refId?: string | null; // UUID, bắt buộc cho Item, FlowerSeed, Decor; null cho Currency
  quantity: number;
}

export interface GiftCode {
  id: string;
  code: string;
  expiryDate: string; // ISO datetime
  usageLimit: number | null; // null = không giới hạn
  timesUsed: number;
  isActive: boolean;
  rewards: GiftCodeReward[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateGiftCodeRequest {
  code: string;
  expiryDate: string;
  usageLimit: number | null;
  rewards: GiftCodeReward[];
}

export interface UpdateGiftCodeRequest {
  code: string;
  expiryDate: string;
  usageLimit: number | null;
  rewards: GiftCodeReward[];
}
