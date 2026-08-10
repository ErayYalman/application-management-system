package com.cybersoft.application_management.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.admin")
public class AdminProperties {
    
    private String email;
    private String password;
    private String name;
    private String surname;


}
