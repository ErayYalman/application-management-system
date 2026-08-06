package com.cybersoft.application_management.security.jwt;

import java.time.Instant;

public record GeneratedToken(String token, Instant expiresAt) {
    
}
