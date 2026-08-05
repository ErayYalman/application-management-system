package com.cybersoft.application_management.dto.response;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private UUID id;

    private String name;

    private String surname;

    private String email;

}
