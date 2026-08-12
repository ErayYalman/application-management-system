package com.cybersoft.application_management.service;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.cybersoft.application_management.dto.request.UpdateUserRequest;
import com.cybersoft.application_management.dto.request.UserSearchRequest;
import com.cybersoft.application_management.dto.response.UserResponse;

public interface UserService {
    
    UserResponse getCurrentUser();

    UserResponse getUserById(UUID userId);

    Page<UserResponse> getAllUsers(UserSearchRequest request, Pageable pageable);

    UserResponse updateCurrentUser(UpdateUserRequest request);

    UserResponse updateUser(UUID userId, UpdateUserRequest request);

    void deactivateUser(UUID userId);

    void activateUser(UUID userId);
    

}
