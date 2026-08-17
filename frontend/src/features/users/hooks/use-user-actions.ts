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
  const queryClient =
    useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["users"],
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
    onSuccess: invalidate,
  });

  const activate = useMutation({
    mutationFn: () =>
      activateUser(userId),
    onSuccess: invalidate,
  });

  const deactivate = useMutation({
    mutationFn: () =>
      deactivateUser(userId),
    onSuccess: invalidate,
  });

  return {
    update,
    activate,
    deactivate,
  };
}