package com.cybersoft.application_management.dto.response;

import java.time.Instant;
import java.util.UUID;

import com.cybersoft.application_management.enums.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private UUID id;

    private String name;

    private String surname;

    private String email;

    private UserRole role;

    private boolean active;

    private Instant createdAt;

    private Instant updatedAt;

}
