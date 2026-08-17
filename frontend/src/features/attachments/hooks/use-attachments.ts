import { useQuery } from "@tanstack/react-query";

import { getAttachments } from "../api/attachment-service";

export function useAttachments(
  applicationId: string,
) {
  return useQuery({
    queryKey: [
      "attachments",
      applicationId,
    ],
    queryFn: () =>
      getAttachments(applicationId),
    enabled: Boolean(applicationId),
  });
}