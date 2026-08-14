import type { UserResponse } from "../../../api/generated";
import userApi from "./user-api";

export async function getCurrentUser(): Promise<UserResponse> {
  const response = await userApi.getCurrentUser();

  return response.data;
}