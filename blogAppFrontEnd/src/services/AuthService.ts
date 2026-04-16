import type { LoginRequest, LoginResponse } from "../types/login.type";
import type { SignupRequest } from "../types/SignupRequest.type";
import type { ErrorResponse } from "../types/error.type";

const BASE_URL = import.meta.env.VITE_API_URL;

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw error;
  }
  if (response.status === 204) {
    return undefined as T;
  }
  return response.json();
};

export const signIn = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(credentials),
  });

  return handleResponse<LoginResponse>(response);
};

export const signUp = async (data: SignupRequest): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<LoginResponse>(response);
};
