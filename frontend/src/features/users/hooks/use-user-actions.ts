import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  activateUser,
  deactivateUser,
  updateUser,
} from "../api/user-service";

import type {
  UpdateUserRequest,
} from "../../../api/generated";

export function useUserActions(
  userId: string,
) {
  const queryClient = useQueryClient();

  const invalidateUsers = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["users"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["user", userId],
    });
  };

  const update = useMutation({
    mutationFn: (
      request: UpdateUserRequest,
    ) =>
      updateUser(
        userId,
        request,
      ),

    onSuccess: invalidateUsers,
  });

  const activate = useMutation({
    mutationFn: () =>
      activateUser(userId),

    onSuccess: invalidateUsers,
  });

  const deactivate = useMutation({
    mutationFn: () =>
      deactivateUser(userId),

    onSuccess: invalidateUsers,
  });

  return {
    update,
    activate,
    deactivate,
  };
}