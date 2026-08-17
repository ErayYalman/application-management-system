import {
    ApplicationFormControllerApi,
} from "../../../api/generated";

import apiConfiguration
    from "../../../api/config";

import apiClient
    from "../../../api/client";

const applicationApi =
    new ApplicationFormControllerApi(
        apiConfiguration,
        undefined,
        apiClient,
    );

export default applicationApi;