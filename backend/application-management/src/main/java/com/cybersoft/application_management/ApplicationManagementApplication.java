package com.cybersoft.application_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

import com.cybersoft.application_management.security.jwt.JwtProperties;

@SpringBootApplication
@EnableScheduling
@EnableConfigurationProperties(JwtProperties.class)
public class ApplicationManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApplicationManagementApplication.class, args);
	}

}
