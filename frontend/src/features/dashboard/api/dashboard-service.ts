import type {
  DashboardResponse,
} from "../../../api/generated";

import dashboardApi from "./dashboard-api";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await dashboardApi.getDashboard();

  return response.data;
}