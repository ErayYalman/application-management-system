import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  CreateApplicationFormRequest,
} from "../../../api/generated";

import {
  createApplication,
} from "../api/application-service";

export function useCreateApplication() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      request: CreateApplicationFormRequest,
    ) => createApplication(request),

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