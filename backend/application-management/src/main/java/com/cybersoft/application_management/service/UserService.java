package com.cybersoft.application_management.service;

import java.util.UUID;

import com.cybersoft.application_management.dto.response.UserResponse;

public interface UserService {
    
    UserResponse getUserById(UUID userId);

}
