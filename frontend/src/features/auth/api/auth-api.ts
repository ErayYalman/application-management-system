import {
    AuthenticationApi,
} from "../../../api/generated";

import apiConfiguration
    from "../../../api/config";

import apiClient
    from "../../../api/client";

const authenticationApi =
    new AuthenticationApi(
        apiConfiguration,
        undefined,
        apiClient,
    );

export default authenticationApi;