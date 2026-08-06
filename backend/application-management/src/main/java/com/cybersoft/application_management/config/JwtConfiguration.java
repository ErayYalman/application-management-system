package com.cybersoft.application_management.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import com.cybersoft.application_management.security.jwt.JwtProperties;

@Configuration
@EnableConfigurationProperties(JwtProperties.class)
public class JwtConfiguration {
    
}
