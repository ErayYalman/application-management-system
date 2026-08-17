import type {
  PageUserResponse,
  UserResponse,
  UserSearchRequest,
  UpdateUserRequest,
} from "../../../api/generated";

import userApi from "./user-api";

export async function getAllUsers(
  request: UserSearchRequest,
  page: number,
  size: number,
  sort: string[],
): Promise<PageUserResponse> {
  const response =
    await userApi.getAllUsers(
      request,
      {
        page,
        size,
        sort,
      },
    );

  return response.data;
}

export async function getUserById(
  userId: string,
): Promise<UserResponse> {
  const response =
    await userApi.getUserById(userId);

  return response.data;
}

export async function updateUser(
  userId: string,
  request: UpdateUserRequest,
): Promise<UserResponse> {
  const response =
    await userApi.updateUser(
      userId,
      request,
    );

  return response.data;
}

export async function activateUser(
  userId: string,
): Promise<void> {
  await userApi.activateUser(userId);
}

export async function deactivateUser(
  userId: string,
): Promise<void> {
  await userApi.deactivateUser(userId);
}

export async function getCurrentUser(): Promise<UserResponse> {
  const response = await userApi.getCurrentUser();
  return response.data;
}