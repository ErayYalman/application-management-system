import { useQuery } from "@tanstack/react-query";

import {
  getApplicationById,
} from "../api/application-service";

export function useApplication(
  applicationId: string,
) {
  return useQuery({
    queryKey: [
      "application",
      applicationId,
    ],
    queryFn: () =>
      getApplicationById(
        applicationId,
      ),
    enabled: Boolean(applicationId),
  });
}