package com.cybersoft.application_management.service;

import java.util.List;
import java.util.UUID;

import com.cybersoft.application_management.dto.request.UpdateUserRequest;
import com.cybersoft.application_management.dto.response.UserResponse;

public interface UserService {
    
    UserResponse getCurrentUser();

    UserResponse getUserById(UUID userId);

    List<UserResponse> getAllUsers();

    UserResponse updateCurrentUser(UpdateUserRequest request);

    UserResponse updateUser(UUID userId, UpdateUserRequest request);

    void deactivateUser(UUID userId);

    void activateUser(UUID userId);
    

}
