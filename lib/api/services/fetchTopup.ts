import apiService from "../core";
import { unwrapApiResponse } from "../unwrapApiResponse";
import type { ApiResponse } from "@/lib/types/api/api-response";

export interface CoinPackage {
  id: string;
  priceVnd: number;
  coinAmount: number;
}

export interface CreateOrderRequest {
  packageId: string;
}

export interface CreateOrderResponse {
  orderCode: number;
  checkoutUrl: string;
  expiresAtUnix: number;
}

export interface OrderStatusResponse {
  orderCode: number;
  status: "Pending" | "Paid" | "Cancelled" | "Expired";
  currentCurrency: number | null;
}

export const fetchTopup = {
  getPackages: async (): Promise<CoinPackage[]> => {
    const response = await apiService.get<ApiResponse<CoinPackage[]>>("api/coin-packages");
    return unwrapApiResponse(response.data);
  },

  createOrder: async (packageId: string): Promise<CreateOrderResponse> => {
    const response = await apiService.post<ApiResponse<CreateOrderResponse>, CreateOrderRequest>(
      "api/payments/orders",
      { packageId }
    );
    return unwrapApiResponse(response.data);
  },

  getOrderStatus: async (orderCode: number): Promise<OrderStatusResponse> => {
    const response = await apiService.get<ApiResponse<OrderStatusResponse>>(
      `api/payments/orders/${orderCode}/status`
    );
    return unwrapApiResponse(response.data);
  },
};
