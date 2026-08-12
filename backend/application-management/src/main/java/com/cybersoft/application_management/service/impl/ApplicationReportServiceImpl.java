package com.cybersoft.application_management.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.request.ApplicationReportRequest;
import com.cybersoft.application_management.dto.response.ApplicationFormTypeReport;
import com.cybersoft.application_management.dto.response.ApplicationReportResponse;
import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.repository.ApplicationReportRepository;
import com.cybersoft.application_management.service.ApplicationReportService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ApplicationReportServiceImpl implements ApplicationReportService {

    private final ApplicationReportRepository reportRepository;

    @Override
    public ApplicationReportResponse getApplicationReport(
            ApplicationReportRequest request) {

        long total = reportRepository.countApplications(request);

        long newApplications = reportRepository.countApplicationsByStatus(
                ApplicationStatus.NEW,
                request);

        long inReviewApplications = reportRepository.countApplicationsByStatus(
                ApplicationStatus.IN_REVIEW,
                request);

        long approvedApplications = reportRepository.countApplicationsByStatus(
                ApplicationStatus.APPROVED,
                request);

        long rejectedApplications = reportRepository.countApplicationsByStatus(
                ApplicationStatus.REJECTED,
                request);

        long cancelledApplications = reportRepository.countApplicationsByStatus(
                ApplicationStatus.CANCELLED,
                request);

        List<ApplicationFormTypeReport> byFormType = reportRepository
                .countApplicationsByFormType(request);

        return ApplicationReportResponse.builder()
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .totalApplications(total)
                .newApplications(newApplications)
                .inReviewApplications(inReviewApplications)
                .approvedApplications(approvedApplications)
                .rejectedApplications(rejectedApplications)
                .cancelledApplications(cancelledApplications)
                .applicationsByFormType(byFormType)
                .build();
    }

}
