package com.cybersoft.application_management.service;

import java.util.List;
import java.util.UUID;

import com.cybersoft.application_management.dto.response.ApplicationAuditLogResponse;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.ApplicationStatus;

public interface ApplicationAuditLogService {

    void logCreated(UUID applicationId, User actor);

    void logUpdated(UUID applicationId, User actor, String description);

    void logStatusChanged(UUID applicationId, User actor, ApplicationStatus oldStatus, ApplicationStatus newStatus, String description);

    void logDeleted(UUID applicationId, User actor);

    List<ApplicationAuditLogResponse> getApplicationHistory(UUID applicationId, boolean includeActor);   
}
