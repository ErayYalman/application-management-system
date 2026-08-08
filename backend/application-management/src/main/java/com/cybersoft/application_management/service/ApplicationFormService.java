package com.cybersoft.application_management.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cybersoft.application_management.dto.request.ApplicationSearchRequest;
import com.cybersoft.application_management.dto.request.CreateApplicationFormRequest;
import com.cybersoft.application_management.dto.request.UpdateApplicationRequest;
import com.cybersoft.application_management.dto.response.ApplicationResponse;

public interface ApplicationFormService {

    ApplicationResponse create(CreateApplicationFormRequest request);

    ApplicationResponse getById(UUID applicationId);

    Page<ApplicationResponse> getMyApplications(ApplicationSearchRequest request, Pageable pageable);

    Page<ApplicationResponse> getAllApplications(ApplicationSearchRequest request, Pageable pageable);

    ApplicationResponse updateApplicationForm(UUID applicationFormId, UpdateApplicationRequest request);

    void deleteApplicationForm(UUID applicationFormId);

}
