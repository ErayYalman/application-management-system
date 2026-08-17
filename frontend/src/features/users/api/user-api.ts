import {
    UserControllerApi,
} from "../../../api/generated";

import apiConfiguration
    from "../../../api/config";

import apiClient
    from "../../../api/client";

const userApi =
    new UserControllerApi(
        apiConfiguration,
        undefined,
        apiClient,
    );

export default userApi;