import type {
  CreateFormTypeRequest,
  FormTypeResponse,
  UpdateFormTypeRequest,
} from "../../../api/generated";

import formTypeApi from "./form-type-api";

export async function getFormTypes(): Promise<FormTypeResponse[]> {
  const response = await formTypeApi.getAll();

  return response.data;
}

export async function getFormTypeById(
  formTypeId: string,
): Promise<FormTypeResponse> {
  const response =
    await formTypeApi.getById(formTypeId);

  return response.data;
}

export async function createFormType(
  request: CreateFormTypeRequest,
): Promise<FormTypeResponse> {
  const response =
    await formTypeApi.create(request);

  return response.data;
}

export async function updateFormType(
  formTypeId: string,
  request: UpdateFormTypeRequest,
): Promise<FormTypeResponse> {
  const response =
    await formTypeApi.update(
      formTypeId,
      request,
    );

  return response.data;
}

export async function activateFormType(
  formTypeId: string,
): Promise<void> {
  await formTypeApi.activate(formTypeId);
}

export async function deactivateFormType(
  formTypeId: string,
): Promise<void> {
  await formTypeApi.deactivate(formTypeId);
}