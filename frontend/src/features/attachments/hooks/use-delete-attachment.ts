import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteAttachment,
} from "../api/attachment-service";

export function useDeleteAttachment(
  applicationId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      attachmentId: string,
    ) =>
      deleteAttachment(
        attachmentId,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "attachments",
          applicationId,
        ],
      });
    },
  });
}