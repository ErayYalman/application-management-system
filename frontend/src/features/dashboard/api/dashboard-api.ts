import {
  DashboardControllerApi,
} from "../../../api/generated";

import apiConfiguration from "../../../api/config";

const dashboardApi =
  new DashboardControllerApi(apiConfiguration);

export default dashboardApi;