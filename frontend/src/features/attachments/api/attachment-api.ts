import {
    AttachmentControllerApi,
} from "../../../api/generated";

import apiConfiguration
    from "../../../api/config";

import apiClient
    from "../../../api/client";

const attachmentApi =
    new AttachmentControllerApi(
        apiConfiguration,
        undefined,
        apiClient,
    );

export default attachmentApi;