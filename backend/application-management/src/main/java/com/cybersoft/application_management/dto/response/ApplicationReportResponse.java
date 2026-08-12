package com.cybersoft.application_management.dto.response;

import java.time.Instant;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicationReportResponse {

    private Instant startDate;

    private Instant endDate;

    private long totalApplications;

    private long newApplications;

    private long inReviewApplications;

    private long approvedApplications;

    private long rejectedApplications;

    private long cancelledApplications;

    private List<ApplicationFormTypeReport> applicationsByFormType;
}
