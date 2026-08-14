import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RegisterRequest,
} from "../../../api/generated";

import authenticationApi from "./auth-api";

export async function login(
  request: LoginRequest,
): Promise<LoginResponse> {
  const response = await authenticationApi.login(request);

  return response.data;
}

export async function register(
  request: RegisterRequest,
): Promise<LoginResponse> {
  const response = await authenticationApi.register(request);

  return response.data;
}

export async function refreshToken(
  request: RefreshTokenRequest,
): Promise<LoginResponse> {
  const response =
      await authenticationApi.refreshToken(request);

  return response.data;
}

export async function logout(
  request: RefreshTokenRequest,
): Promise<void> {
  await authenticationApi.logout(request);
}