/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { deleteCookie } from "cookies-next";
import { store } from "@/lib/redux/store";
import { getStoredAccessToken, getStoredRefreshToken } from "@/lib/auth/token-storage";
import { applyRefreshedSession } from "@/lib/auth/persist-session";
import { refreshAccessToken } from "@/lib/auth/refresh-session";

export interface ApiError {
  code?: number;
  message: string;
  status: boolean;
  data?: unknown;
}

export interface RequestParams {
  [key: string]: string | number | boolean | undefined | null | string[];
}

class ApiService {
  private client: AxiosInstance;
  private authToken: string | null = null;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
  }> = [];

  constructor(baseURL: string, timeout = 60000) {
    this.client = axios.create({
      baseURL,
      timeout,
      headers: { "Content-Type": "application/json" },
    });
    this.setupInterceptors();
  }

  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) prom.reject(error);
      else prom.resolve(token!);
    });
    this.failedQueue = [];
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = getStoredAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        if (config.data instanceof FormData) delete config.headers["Content-Type"];
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        const isRefreshEndpoint =
          typeof originalRequest.url === "string" &&
          originalRequest.url.includes("refresh-token");

        if (error.response?.status === 401 && !originalRequest._retry && !isRefreshEndpoint) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                return this.client(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = getStoredRefreshToken();
            if (!refreshToken) throw new Error("No refresh token");

            const tokens = await refreshAccessToken(refreshToken);
            await applyRefreshedSession(tokens);

            this.processQueue(null, tokens.accessToken);
            this.isRefreshing = false;

            originalRequest.headers["Authorization"] = "Bearer " + tokens.accessToken;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.isRefreshing = false;
            this.processQueue(refreshError, null);

            deleteCookie("authToken", { path: "/" });
            deleteCookie("refreshToken", { path: "/" });
            const { logout } = await import("@/lib/redux/slices/authSlice");
            store.dispatch(logout());

            if (typeof window !== "undefined") {
              window.dispatchEvent(new Event("logout"));
            }

            return Promise.reject({
              code: 401,
              message: "Session expired. Please login again.",
              status: false,
            } as ApiError);
          }
        }

        const apiError: ApiError = {
          code: error.response?.status,
          message: error.response?.data?.message || error.message || "Có lỗi xảy ra",
          status: false,
          data: error.response?.data,
        };

        return Promise.reject(apiError);
      }
    );
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  async request<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.request<T>(config);
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "GET", url, params });
  }

  async post<T, D = any>(url: string, data?: D): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "POST", url, data });
  }

  async put<T, D = any>(url: string, data?: D): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "PUT", url, data });
  }

  async patch<T, D = any>(url: string, data?: D): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "PATCH", url, data });
  }

  async delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.request<T>({ method: "DELETE", url });
  }

  async upload<T>(
    url: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<AxiosResponse<T>> {
    return this.request<T>({
      method: "POST",
      url,
      data: formData,
      onUploadProgress: (e) => {
        if (onProgress && e.total) {
          onProgress(Math.round((e.loaded * 100) / e.total));
        }
      },
    });
  }
}

const apiService = new ApiService(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/");

export default apiService;
