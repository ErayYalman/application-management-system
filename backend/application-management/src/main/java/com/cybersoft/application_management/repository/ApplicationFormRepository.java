package com.cybersoft.application_management.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.enums.ApplicationStatus;

public interface ApplicationFormRepository extends JpaRepository<ApplicationForm, UUID> {
    List<ApplicationForm> findByUser_Id(UUID userId);

    List<ApplicationForm> findByStatus(ApplicationStatus status);

    List<ApplicationForm> findByUser_IdAndStatus(UUID userId, ApplicationStatus status);

}
