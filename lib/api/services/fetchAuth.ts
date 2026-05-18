import apiService from "../core";

export interface LoginRequest {
  email: string;
  password: string;
}

// Type definition specifically for fetchAuth if not in types/api.ts
export interface AuthLoginResponse {
  isSuccess: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    tokenType: string;
  };
  metadata: unknown;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  [key: string]: unknown;
}

export const fetchAuth = {
  login: async (data: LoginRequest): Promise<AuthLoginResponse> => {
    const response = await apiService.post<AuthLoginResponse>("api/v1/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthLoginResponse> => {
    const response = await apiService.post<AuthLoginResponse>("api/v1/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiService.post("api/v1/auth/logout");
  },
};
