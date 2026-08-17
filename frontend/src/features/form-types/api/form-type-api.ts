import {
    FormTypeControllerApi,
} from "../../../api/generated";

import apiConfiguration
    from "../../../api/config";

import apiClient
    from "../../../api/client";

const formTypeApi =
    new FormTypeControllerApi(
        apiConfiguration,
        undefined,
        apiClient,
    );

export default formTypeApi;