import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  UpdateApplicationRequest,
} from "../../../api/generated";

import {
  updateApplication,
} from "../api/application-service";

export function useUpdateApplication(
  applicationId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      request: UpdateApplicationRequest,
    ) =>
      updateApplication(
        applicationId,
        request,
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "application",
          applicationId,
        ],
      });

      await queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
}