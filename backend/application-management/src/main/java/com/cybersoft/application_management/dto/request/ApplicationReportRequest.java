package com.cybersoft.application_management.dto.request;

import java.time.Instant;
import java.util.UUID;

import com.cybersoft.application_management.enums.ApplicationStatus;

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
public class ApplicationReportRequest {

    private Instant startDate;

    private Instant endDate;

    private ApplicationStatus status;

    private UUID formTypeId;

}
