package com.cybersoft.application_management.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.response.ApplicationAuditLogResponse;
import com.cybersoft.application_management.entity.ApplicationAuditLog;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.enums.AuditAction;
import com.cybersoft.application_management.mapper.ApplicationAuditLogMapper;
import com.cybersoft.application_management.repository.ApplicationAuditLogRepository;
import com.cybersoft.application_management.service.ApplicationAuditLogService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationAuditLogServiceImpl implements ApplicationAuditLogService {
    private final ApplicationAuditLogRepository applicationAuditLogRepository;
    private final ApplicationAuditLogMapper applicationAuditLogMapper;


    private void save(UUID applicationId, User actor, AuditAction action, ApplicationStatus oldStatus, ApplicationStatus newStatus, String description) {
      ApplicationAuditLog applicationAuditLog = ApplicationAuditLog.builder()
              .applicationId(applicationId)
              .actor(actor)
              .action(action)
              .oldStatus(oldStatus)
              .newStatus(newStatus)
              .description(description)
              .build();
      applicationAuditLogRepository.save(applicationAuditLog);

    }
    
    @Override
    public void logCreated(UUID applicationId, User actor) {
        save(applicationId, actor, AuditAction.CREATED, null, ApplicationStatus.NEW, "Application created");
    }

    @Override
    public void logUpdated(UUID applicationId, User actor, String description) {
        save(applicationId, actor, AuditAction.UPDATED, null, null, description);
    }

    @Override
    public void logStatusChanged(UUID applicationId, User actor, ApplicationStatus oldStatus,
            ApplicationStatus newStatus, String description) {
        save(applicationId, actor, AuditAction.STATUS_CHANGED, oldStatus, newStatus, description);
    }

    @Override
    public void logDeleted(UUID applicationId, User actor) {
        save(applicationId, actor, AuditAction.DELETED, null, null, "Application deleted");
    }

    @Override
    public List<ApplicationAuditLogResponse> getApplicationHistory(UUID applicationId, boolean includeActor) {
        return applicationAuditLogRepository.findByApplicationIdOrderByCreatedAtDesc(applicationId)
                .stream()
                .map(applicationAuditLogMapper::toResponse)
                .peek(response -> {
                    if (!includeActor) {
                        response.setActorId(null);
                        response.setActorName(null);
                        response.setActorSurname(null);
                        response.setActorEmail(null);
                    }
                })
                .toList();
    }

}
