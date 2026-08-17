import { useQuery } from "@tanstack/react-query";

import type {
  UserSearchRequest,
} from "../../../api/generated";

import {
  getAllUsers,
} from "../api/user-service";

export function useAllUsers(
  request: UserSearchRequest,
  page: number,
  size: number,
  sort: string[],
) {
  return useQuery({
    queryKey: [
      "users",
      request,
      page,
      size,
      sort,
    ],
    queryFn: () =>
      getAllUsers(
        request,
        page,
        size,
        sort,
      ),
  });
}