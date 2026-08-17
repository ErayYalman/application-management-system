import {
  ApplicationReportControllerApi,
} from "../../../api/generated";

import apiConfiguration from "../../../api/config";

const reportApi =
  new ApplicationReportControllerApi(
    apiConfiguration,
  );

export default reportApi;