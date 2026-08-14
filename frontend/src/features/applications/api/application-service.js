import applicationApi from "./application-api";
export async function getMyApplications(request, page, size, sort) {
    const response = await applicationApi.getMyApplications(request || {}, { page, size, sort });
    return response.data;
}
export async function getAllApplications(request, page, size, sort) {
    const response = await applicationApi.getAllApplications(request || {}, { page, size, sort });
    return response.data;
}
export async function getApplicationById(applicationId) {
    const response = await applicationApi.getById1(applicationId);
    return response.data;
}
export async function createApplication(request) {
    const response = await applicationApi.create1(request);
    return response.data;
}
export async function updateApplication(applicationId, request) {
    const response = await applicationApi.update1(applicationId, request);
    return response.data;
}
export async function deleteApplication(applicationId) {
    await applicationApi._delete(applicationId);
}
export async function cancelApplication(applicationId) {
    const response = await applicationApi.cancel(applicationId);
    return response.data;
}
export async function moveApplicationToReview(applicationId) {
    const response = await applicationApi.moveToReview(applicationId);
    return response.data;
}
export async function approveApplication(applicationId) {
    const response = await applicationApi.approve(applicationId);
    return response.data;
}
export async function rejectApplication(applicationId) {
    const response = await applicationApi.reject(applicationId);
    return response.data;
}
