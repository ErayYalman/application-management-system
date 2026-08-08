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
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationSearchRequest {

    private ApplicationStatus status;

    private UUID formTypeId;

    private Instant startDate;

    private Instant endDate;

    private String keyword;

}
