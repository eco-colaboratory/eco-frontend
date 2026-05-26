export interface Decor {
  id: string;
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface CreateDecorRequest {
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
}

export type UpdateDecorRequest = Partial<CreateDecorRequest>;
