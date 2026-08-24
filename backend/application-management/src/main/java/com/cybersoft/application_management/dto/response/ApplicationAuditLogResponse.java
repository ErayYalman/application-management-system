package com.cybersoft.application_management.dto.response;

import java.time.Instant;
import java.util.UUID;

import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.enums.AuditAction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationAuditLogResponse {
    
    private UUID id;
    private UUID applicationId;
    private UUID actorId;
    private String actorName;
    private String actorSurname;
    private String actorEmail;
    private AuditAction action;
    private ApplicationStatus oldStatus;
    private ApplicationStatus newStatus;
    private String description;
    private Instant createdAt;

}
