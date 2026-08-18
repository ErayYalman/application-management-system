package com.cybersoft.application_management.service.impl;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.response.ApplicationResponse;
import com.cybersoft.application_management.dto.response.DashboardResponse;
import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.mapper.ApplicationFormMapper;
import com.cybersoft.application_management.repository.ApplicationFormRepository;
import com.cybersoft.application_management.repository.specification.ApplicationFormSpecification;
import com.cybersoft.application_management.service.DashboardService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class DashboardServiceImpl implements DashboardService {

    private final ApplicationFormRepository applicationFormRepository;
    private final ApplicationFormMapper applicationFormMapper;

    @Override
    public DashboardResponse getDashboard() {
        long totalApplications = applicationFormRepository.count();

        long pendingApplications = applicationFormRepository.countByStatusIn(
                List.of(
                        ApplicationStatus.NEW,
                        ApplicationStatus.IN_REVIEW));

        long approvedApplications = applicationFormRepository.countByStatus(
                ApplicationStatus.APPROVED);

        long rejectedApplications = applicationFormRepository.countByStatus(
                ApplicationStatus.REJECTED);

        long cancelledApplications = applicationFormRepository.countByStatus(
                ApplicationStatus.CANCELLED);

        Instant startOfToday = LocalDate.now(ZoneId.of("Europe/Istanbul"))
                .atStartOfDay(ZoneId.of("Europe/Istanbul"))
                .toInstant();

        long todayApplications = applicationFormRepository
                .countByCreatedAtGreaterThanEqual(
                        startOfToday);

        Pageable latestPage = PageRequest.of(
                0, 10,
                Sort.by(
                        Sort.Direction.DESC, "createdAt"));

        Page<ApplicationForm> latestApplications = applicationFormRepository
                .findAll(ApplicationFormSpecification.fetchDetails(), latestPage);

        List<ApplicationResponse> latesResponses = latestApplications
                .getContent()
                .stream()
                .map(applicationFormMapper::toResponse)
                .toList();

        return DashboardResponse.builder()
                .totalApplications(totalApplications)
                .pendingApplications(pendingApplications)
                .approvedApplications(approvedApplications)
                .rejectedApplications(rejectedApplications)
                .cancelledApplications(cancelledApplications)
                .todayApplications(todayApplications)
                .latestApplications(latesResponses)
                .build();
    }
}
