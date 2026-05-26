export type ItemType = 0 | 1 | 2 | 'WATER' | 'FERTILIZER' | 'PESTICIDE';

export interface Item {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  cooldownTime?: number;
  type?: ItemType;
  receivedExp?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  cooldownTime?: number;
  type?: ItemType;
  receivedExp?: number;
}

export type UpdateItemRequest = Partial<CreateItemRequest>;

