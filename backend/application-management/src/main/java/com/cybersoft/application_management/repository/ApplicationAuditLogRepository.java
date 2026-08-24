package com.cybersoft.application_management.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybersoft.application_management.entity.ApplicationAuditLog;

public interface ApplicationAuditLogRepository extends JpaRepository<ApplicationAuditLog, UUID> {

    List<ApplicationAuditLog> findByApplicationIdOrderByCreatedAtDesc(UUID applicationId);

    
}
