import {
    ApplicationReportControllerApi,
} from "../../../api/generated";

import apiConfiguration
    from "../../../api/config";

import apiClient
    from "../../../api/client";

const reportApi =
    new ApplicationReportControllerApi(
        apiConfiguration,
        undefined,
        apiClient,
    );

export default reportApi;