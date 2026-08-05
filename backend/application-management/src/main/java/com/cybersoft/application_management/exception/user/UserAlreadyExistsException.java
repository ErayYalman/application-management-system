package com.cybersoft.application_management.exception.user;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class UserAlreadyExistsException extends BusinessException {
    public UserAlreadyExistsException(String email) {
        super(ErrorCode.USER_ALREADY_EXISTS, "User already exists with email: " + email    );
    }
    
}
