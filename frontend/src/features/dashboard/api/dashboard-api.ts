import {
    DashboardControllerApi,
} from "../../../api/generated";

import apiConfiguration
    from "../../../api/config";

import apiClient
    from "../../../api/client";

const dashboardApi =
    new DashboardControllerApi(
        apiConfiguration,
        undefined,
        apiClient,
    );

export default dashboardApi;