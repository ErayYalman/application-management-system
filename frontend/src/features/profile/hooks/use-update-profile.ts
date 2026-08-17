import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  UpdateUserRequest,
} from "../../../api/generated";

import {
  updateProfile,
} from "../api/profile-service";

export function useUpdateProfile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      request: UpdateUserRequest,
    ) => updateProfile(request),

    onSuccess: async (updatedUser) => {
      queryClient.setQueryData(
        ["profile"],
        updatedUser,
      );

      queryClient.setQueryData(
        ["current-user"],
        updatedUser,
      );
    },
  });
}