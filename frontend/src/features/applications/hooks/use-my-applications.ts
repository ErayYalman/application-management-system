import { useQuery } from "@tanstack/react-query";
import type { ApplicationSearchRequest } from "../../../api/generated";

import { getMyApplications } from "../api/application-service";

export function useMyApplications(
    request: ApplicationSearchRequest,
    page: number,
    size: number,
    sort: string[],
) {
    return useQuery({
        queryKey: [
            "applications",
            "my",
            request,
            page,
            size,
            sort,
        ],
        queryFn: () =>
            getMyApplications(
                request,
                page,
                size,
                sort,
            ),
    });
}