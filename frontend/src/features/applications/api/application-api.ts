import {
    ApplicationFormControllerApi,
} from "../../../api/generated";

import apiConfiguration from "../../../api/config";

const applicationApi = new ApplicationFormControllerApi(apiConfiguration);

export default applicationApi;