package com.cybersoft.application_management.repository;

import java.util.List;

import com.cybersoft.application_management.dto.request.ApplicationReportRequest;
import com.cybersoft.application_management.dto.response.ApplicationFormTypeReport;
import com.cybersoft.application_management.enums.ApplicationStatus;

public interface ApplicationReportRepository {
    long countApplications(
            ApplicationReportRequest request);

    long countApplicationsByStatus(
            ApplicationStatus status,
            ApplicationReportRequest request);

    List<ApplicationFormTypeReport> countApplicationsByFormType(
            ApplicationReportRequest request);
}
