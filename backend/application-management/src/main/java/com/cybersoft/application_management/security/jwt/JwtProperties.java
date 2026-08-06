package com.cybersoft.application_management.security.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private String secret;

    private Long accessExpiration;

    private Long refreshExpiration;

    private String issuer;
    
}
