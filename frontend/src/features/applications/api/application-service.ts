import type {
    ApplicationResponse,
    ApplicationSearchRequest,
    CreateApplicationFormRequest,
    PageApplicationResponse,
    UpdateApplicationRequest,
} from "../../../api/generated";

import applicationApi from "./application-api";

export async function getMyApplications(
    request?: ApplicationSearchRequest,
    page?: number,
    size?: number,
    sort?: string[],
): Promise<PageApplicationResponse> {
    const response = await applicationApi.getMyApplications(
        request || {}, 
        { page, size, sort }
    );

    return response.data;
}

export async function getAllApplications(
    request?: ApplicationSearchRequest,
    page?: number,
    size?: number,
    sort?: Array<string>,
): Promise<PageApplicationResponse> {
    const response = await applicationApi.getAllApplications(
        request || {},
        { page, size, sort }
    );

    return response.data;
}

export async function getApplicationById(
    applicationId: string,
): Promise<ApplicationResponse> {
    const response = await applicationApi.getById1(applicationId);

    return response.data;
}

export async function createApplication(
    request: CreateApplicationFormRequest,
): Promise<ApplicationResponse> {
    const response = await applicationApi.create1(request);

    return response.data;
}

export async function updateApplication(
    applicationId: string,
    request: UpdateApplicationRequest,
): Promise<ApplicationResponse> {
    const response = await applicationApi.update1(
        applicationId,
        request,
    );

    return response.data;
}

export async function deleteApplication(
    applicationId: string,
): Promise<void> {
    await applicationApi._delete(applicationId);
}

export async function cancelApplication(
    applicationId: string,
): Promise<ApplicationResponse> {
    const response = await applicationApi.cancel(applicationId);

    return response.data;
}

export async function moveApplicationToReview(
    applicationId: string,
): Promise<ApplicationResponse> {
    const response = await applicationApi.moveToReview(applicationId);

    return response.data;
}

export async function approveApplication(
    applicationId: string,
): Promise<ApplicationResponse> {
    const response = await applicationApi.approve(applicationId);

    return response.data;
}

export async function rejectApplication(
    applicationId: string,
): Promise<ApplicationResponse> {
    const response = await applicationApi.reject(applicationId);

    return response.data;
}