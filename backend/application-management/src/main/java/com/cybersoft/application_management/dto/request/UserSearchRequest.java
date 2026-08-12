package com.cybersoft.application_management.dto.request;

import com.cybersoft.application_management.enums.UserRole;

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
public class UserSearchRequest {
    private String keyword;

    private UserRole role;

    private Boolean active;
}
