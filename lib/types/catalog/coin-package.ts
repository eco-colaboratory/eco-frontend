export interface AdminCoinPackageDto {
  id: string;
  priceVnd: number;
  coinAmount: number;
  isActive: boolean;
}

export interface CreateCoinPackageRequest {
  priceVnd: number;
  coinAmount: number;
}

export type UpdateCoinPackageRequest = CreateCoinPackageRequest;

export interface UpdateCoinPackageStatusRequest {
  isActive: boolean;
}
