export interface Synergy {
  id: string;
  name: string;
  description?: string;
  itemIds?: string[];
  bonusMultiplier?: number;
  createdAt?: string;
}

export interface CreateSynergyRequest {
  name: string;
  description?: string;
  itemIds?: string[];
  bonusMultiplier?: number;
}

export type UpdateSynergyRequest = Partial<CreateSynergyRequest>;
