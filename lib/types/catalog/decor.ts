export interface Decor {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
  isDeleted?: boolean;
  description?: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDecorRequest {
  name: string;
  price?: number;
  imageUrl?: string;
}

export type UpdateDecorRequest = Partial<CreateDecorRequest>;

