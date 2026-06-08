export interface FlowerTemplate {
  id: string;
  name: string;
  basePrice: number;
  imageUrl?: string;
  synergyId?: string;
  isDeleted: boolean;
}

export interface CreateFlowerTemplateRequest {
  name: string;
  basePrice: number;
  imageUrl?: string;
}

export type UpdateFlowerTemplateRequest = CreateFlowerTemplateRequest;
