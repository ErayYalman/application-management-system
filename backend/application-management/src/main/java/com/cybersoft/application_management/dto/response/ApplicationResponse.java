package com.cybersoft.application_management.dto.response;

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
public class ApplicationResponse {
    private UUID id;

    private String title;

    private String description;

    private ApplicationStatus status;

    private UUID formTypeId;

    private String formTypeName;

    private Instant createdAt;
}
