package com.cybersoft.application_management.service;

import com.cybersoft.application_management.dto.request.ApplicationReportRequest;
import com.cybersoft.application_management.dto.response.ApplicationReportResponse;

public interface ApplicationReportService {
    ApplicationReportResponse getApplicationReport(
            ApplicationReportRequest request);
}
