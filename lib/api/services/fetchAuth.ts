import apiService from "../core";

export interface LoginRequest {
  account: string;
  password: string;
}

export interface AuthTokenData {
  accessToken: string;
  refreshToken: string;
}

export interface AuthLoginResponse {
  isSuccess: boolean;
  message: string;
  data: AuthTokenData;
  metaData?: string;
  metadata?: unknown;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const fetchAuth = {
  login: async (data: LoginRequest): Promise<AuthLoginResponse> => {
    const response = await apiService.post<AuthLoginResponse>("api/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthLoginResponse> => {
    const response = await apiService.post<AuthLoginResponse>("api/auth/register", data);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<AuthLoginResponse> => {
    const response = await apiService.post<AuthLoginResponse>("api/auth/refresh-token", {
      refreshToken,
    });
    return response.data;
  },
};
