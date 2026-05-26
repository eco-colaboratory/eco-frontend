export interface SynergyFlowerTemplate {
  id: string;
  name: string;
  basePrice: number;
  imageUrl?: string;
  synergyId?: string;
  isDeleted: boolean;
}

export interface Synergy {
  id: string;
  name: string;
  xpPlus: number;
  cooldownMinus: number;
  isDeleted?: boolean;
  flowerTemplates?: SynergyFlowerTemplate[];
}

export interface CreateSynergyRequest {
  name: string;
  xpPlus: number;
  cooldownMinus: number;
  flowerTemplateIds: string[];
}

export type UpdateSynergyRequest = CreateSynergyRequest;
