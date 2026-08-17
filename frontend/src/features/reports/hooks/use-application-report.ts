import { useQuery } from "@tanstack/react-query";

import type {
  GetApplicationReportStatusEnum,
} from "../../../api/generated";

import {
  getApplicationReport,
} from "../api/report-service";

export function useApplicationReport(
  startDate?: string,
  endDate?: string,
  status?: GetApplicationReportStatusEnum,
  formTypeId?: string,
) {
  return useQuery({
    queryKey: [
      "application-report",
      startDate,
      endDate,
      status,
      formTypeId,
    ],

    queryFn: () =>
      getApplicationReport(
        startDate,
        endDate,
        status,
        formTypeId,
      ),
  });
}