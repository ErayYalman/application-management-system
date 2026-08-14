import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteApplication,
} from "../api/application-service";

export function useDeleteApplication() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      applicationId: string,
    ) => deleteApplication(applicationId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });
}