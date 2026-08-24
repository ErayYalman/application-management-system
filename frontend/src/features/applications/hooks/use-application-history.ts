import { useQuery } from "@tanstack/react-query";

import { getApplicationHistory } from "../api/application-history-api";

export const applicationHistoryQueryKey = (
    applicationId: string,
) => ["applications", applicationId, "history"] as const;

export const useApplicationHistory = (
    applicationId: string,
) => {
    return useQuery({
        queryKey:
            applicationHistoryQueryKey(
                applicationId,
            ),
        queryFn: () =>
            getApplicationHistory(
                applicationId,
            ),
        enabled: Boolean(applicationId),
    });
};