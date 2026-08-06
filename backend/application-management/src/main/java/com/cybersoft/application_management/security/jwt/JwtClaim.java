package com.cybersoft.application_management.security.jwt;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class JwtClaim {
    public static final String ROLE = "role";
    public static final String TYPE = "type";
}
