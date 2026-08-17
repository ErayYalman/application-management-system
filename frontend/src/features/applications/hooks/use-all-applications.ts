import { useQuery } from "@tanstack/react-query";

import {
  getAllApplications,
} from "../api/application-service";

import type {
  ApplicationSearchRequest,
} from "../../../api/generated";

export function useAllApplications(
  request?: ApplicationSearchRequest,
  page?: number,
  size?: number,
  sort?: string[],
  enabled = true,
) {
  return useQuery({
    queryKey: [
      "applications",
      "all",
      request,
      page,
      size,
      sort,
    ],
    queryFn: () =>
      getAllApplications(
        request,
        page,
        size,
        sort,
      ),
    enabled,
  });
}