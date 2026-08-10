package com.cybersoft.application_management.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private long totalApplications;

    private long pendingApplications;

    private long approvedApplications;

    private long rejectedApplications;

    private long todayApplications;

    private List<ApplicationResponse> latestApplications;

}
