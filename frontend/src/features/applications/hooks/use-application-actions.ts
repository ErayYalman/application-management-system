import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  approveApplication,
  rejectApplication,
  moveApplicationToReview,
  cancelApplication,
  deleteApplication,
} from "../api/application-service";

export function useApplicationActions(
  applicationId: string,
) {
  const queryClient = useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["application", applicationId],
    });

    await queryClient.invalidateQueries({
      queryKey: ["applications"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["dashboard"],
    });
  };

  const review = useMutation({
    mutationFn: () =>
      moveApplicationToReview(applicationId),
    onSuccess: invalidate,
  });

  const approve = useMutation({
    mutationFn: () =>
      approveApplication(applicationId),
    onSuccess: invalidate,
  });

  const reject = useMutation({
    mutationFn: () =>
      rejectApplication(applicationId),
    onSuccess: invalidate,
  });

  const cancel = useMutation({
    mutationFn: () =>
      cancelApplication(applicationId),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: () =>
      deleteApplication(applicationId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },
  });

  return {
    review,
    approve,
    reject,
    cancel,
    remove,
  };
}