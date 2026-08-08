package com.cybersoft.application_management.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.cybersoft.application_management.entity.ApplicationForm;

public interface ApplicationFormRepository
        extends JpaRepository<ApplicationForm, UUID>, JpaSpecificationExecutor<ApplicationForm> {
}
