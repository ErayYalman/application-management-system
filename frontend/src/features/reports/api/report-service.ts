import type {
  ApplicationReportResponse,
  GetApplicationReportStatusEnum,
} from "../../../api/generated";

import reportApi from "./report-api";

export async function getApplicationReport(
  startDate?: string,
  endDate?: string,
  status?: GetApplicationReportStatusEnum,
  formTypeId?: string,
): Promise<ApplicationReportResponse> {

  const response =
    await reportApi.getApplicationReport(
      startDate,
      endDate,
      status,
      formTypeId,
    );

  return response.data;
}