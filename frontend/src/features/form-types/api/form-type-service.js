import formTypeApi from "./form-type-api";
export async function getFormTypes() {
    const response = await formTypeApi.getAll();
    return response.data;
}
