import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  uploadAttachment,
} from "../api/attachment-service";

export function useUploadAttachment(
  applicationId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (file: File) =>
      uploadAttachment(
        applicationId,
        file,
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