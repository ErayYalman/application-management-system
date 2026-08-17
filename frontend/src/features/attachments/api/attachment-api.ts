import {
  AttachmentControllerApi,
} from "../../../api/generated";

import apiConfiguration from "../../../api/config";

const attachmentApi =
  new AttachmentControllerApi(apiConfiguration);

export default attachmentApi;