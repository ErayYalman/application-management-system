package com.cybersoft.application_management.exception.user;

import java.util.UUID;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class UserNotFoundException extends BusinessException {
    public UserNotFoundException(UUID userId) {
        super(ErrorCode.USER_NOT_FOUND, "User not found with id: " + userId);
        
    }
    public UserNotFoundException(String email) {
        super(ErrorCode.USER_NOT_FOUND, "User not found with email: " + email);
    }
}
