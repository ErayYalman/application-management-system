import {
    ApplicationAuditLogResponseActionEnum,
    ApplicationAuditLogResponseOldStatusEnum,
    type ApplicationAuditLogResponse,
} from "../../../api/generated";

export const applicationStatusLabels: Record<
    string,
    string
> = {
    [ApplicationAuditLogResponseOldStatusEnum.New]: "Yeni",
    [ApplicationAuditLogResponseOldStatusEnum.InReview]: "İncelemede",
    [ApplicationAuditLogResponseOldStatusEnum.Approved]: "Onaylandı",
    [ApplicationAuditLogResponseOldStatusEnum.Rejected]: "Reddedildi",
    [ApplicationAuditLogResponseOldStatusEnum.Cancelled]: "İptal Edildi",
};

export const applicationActionLabels: Record<
    string,
    string
> = {
    [ApplicationAuditLogResponseActionEnum.Created]:
        "Başvuru oluşturuldu",

    [ApplicationAuditLogResponseActionEnum.Updated]:
        "Başvuru bilgileri güncellendi",

    [ApplicationAuditLogResponseActionEnum.StatusChanged]:
        "Başvuru durumu değiştirildi",

    [ApplicationAuditLogResponseActionEnum.Deleted]:
        "Başvuru silindi",
};

export const getApplicationStatusLabel = (
    status?: string,
): string => {
    if (!status) {
        return "-";
    }

    return applicationStatusLabels[status] ?? status;
};

export const getApplicationActionLabel = (
    action?: string,
): string => {
    if (!action) {
        return "Başvuru üzerinde işlem yapıldı";
    }

    return applicationActionLabels[action] ?? action;
};

export const getApplicationHistoryTransition = (
    item: ApplicationAuditLogResponse,
): string | null => {
    if (
        item.action !==
        ApplicationAuditLogResponseActionEnum.StatusChanged
    ) {
        return null;
    }

    if (!item.oldStatus || !item.newStatus) {
        return null;
    }

    return `${getApplicationStatusLabel(
        item.oldStatus,
    )} → ${getApplicationStatusLabel(item.newStatus)}`;
};

export const getApplicationHistoryActorName = (
    item: ApplicationAuditLogResponse,
): string => {
    const fullName = [
        item.actorName,
        item.actorSurname,
    ]
        .filter(Boolean)
        .join(" ")
        .trim();

    return (
        fullName ||
        item.actorEmail ||
        "Bilinmeyen kullanıcı"
    );
};

export const formatApplicationHistoryDate = (
    date?: string,
): string => {
    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return "-";
    }

    return parsedDate.toLocaleString("tr-TR");
};