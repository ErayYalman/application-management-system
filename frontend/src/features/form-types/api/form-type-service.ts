import type {
  FormTypeResponse,
} from "../../../api/generated";

import formTypeApi from "./form-type-api";

export async function getFormTypes(): Promise<FormTypeResponse[]> {
  const response = await formTypeApi.getAll();

  return response.data;
}