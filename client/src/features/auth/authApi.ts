import api from "../../api/axios";
import type { User } from "./authTypes";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export const registerUser = async (
  data: RegisterData,
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", data);

  return response.data;
};

export interface CurrentUserResponse {
  success: boolean;
  data: {
    user: User;
  };
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<CurrentUserResponse>("/auth/me");

  return response.data.data.user;
};
