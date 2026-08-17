import type {
  UpdateUserRequest,
  UserResponse,
} from "../../../api/generated";

import userApi from "../../users/api/user-api";

export async function getProfile(): Promise<UserResponse> {
  const response =
    await userApi.getCurrentUser();

  return response.data;
}

export async function updateProfile(
  request: UpdateUserRequest,
): Promise<UserResponse> {
  const response =
    await userApi.updateCurrentUser(
      request,
    );

  return response.data;
}