import { FormTypeControllerApi } from "../../../api/generated";
import apiConfiguration from "../../../api/config";

const formTypeApi = new FormTypeControllerApi(
  apiConfiguration,
);

export default formTypeApi;