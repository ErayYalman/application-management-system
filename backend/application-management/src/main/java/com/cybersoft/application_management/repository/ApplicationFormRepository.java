package com.cybersoft.application_management.repository;

import java.time.Instant;
import java.util.Collection;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.enums.ApplicationStatus;

public interface ApplicationFormRepository
                extends JpaRepository<ApplicationForm, UUID>, JpaSpecificationExecutor<ApplicationForm> {

        long countByStatus(ApplicationStatus status);

        long countByStatusIn(Collection<ApplicationStatus> statuses);

        long countByCreatedAtGreaterThanEqual(Instant startDate);
}
