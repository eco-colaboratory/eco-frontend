export interface FlowerTemplate {
  id: string;
  name: string;
  description?: string;
  petalCount?: number;
  colorPalette?: string[];
  imageUrl?: string;
  createdAt?: string;
}

export interface CreateFlowerTemplateRequest {
  name: string;
  description?: string;
  petalCount?: number;
  colorPalette?: string[];
  imageUrl?: string;
}

export type UpdateFlowerTemplateRequest = Partial<CreateFlowerTemplateRequest>;
