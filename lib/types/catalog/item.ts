export interface Item {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export type UpdateItemRequest = Partial<CreateItemRequest>;
