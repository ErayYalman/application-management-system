import { useQuery } from "@tanstack/react-query";
import { getMyApplications } from "../api/application-service";
export function useMyApplications(request, page, size, sort) {
    return useQuery({
        queryKey: [
            "applications",
            "my",
            request,
            page,
            size,
            sort,
        ],
        queryFn: () => getMyApplications(request, page, size, sort),
    });
}
