import {
    ApplicationFormControllerApi,
    type ApplicationAuditLogResponse,
} from "../../../api/generated";

import apiConfiguration from "../../../api/config";

const applicationFormApi =
    new ApplicationFormControllerApi(apiConfiguration);

export const getApplicationHistory = async (
    applicationId: string,
): Promise<ApplicationAuditLogResponse[]> => {
    const response =
        await applicationFormApi.getHistory(
            applicationId,
        );

    return response.data;
};