import {
    UserControllerApi,

} from "../../../api/generated";

import apiConfiguration from "../../../api/config";

const userApi = new UserControllerApi(apiConfiguration);

export default userApi;