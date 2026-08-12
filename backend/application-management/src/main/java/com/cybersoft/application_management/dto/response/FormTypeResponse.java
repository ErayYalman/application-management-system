package com.cybersoft.application_management.dto.response;

import java.time.Instant;
import java.util.UUID;

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
public class FormTypeResponse {

    private UUID id;

    private String name;

    private String description;

    private boolean active;

    private Instant createdAt;

    private Instant updatedAt;

}
