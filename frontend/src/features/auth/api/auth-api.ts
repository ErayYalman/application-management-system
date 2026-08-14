import { AuthenticationApi } from "../../../api/generated";
import  apiConfiguration  from "../../../api/config";


const authenticationApi = new AuthenticationApi(apiConfiguration);

export default authenticationApi;   