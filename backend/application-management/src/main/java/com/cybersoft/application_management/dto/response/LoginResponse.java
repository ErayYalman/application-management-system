package com.cybersoft.application_management.dto.response;

import java.time.Instant;

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
public class LoginResponse {
    
    private String accessToken;
    private String refreshToken;

    @Builder.Default
    private String tokenType = "Bearer";
    
    private Instant expiresAt;
    private UserResponse user;
}

