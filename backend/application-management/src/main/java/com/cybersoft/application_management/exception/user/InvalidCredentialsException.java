package com.cybersoft.application_management.exception.user;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class InvalidCredentialsException extends BusinessException {
    public InvalidCredentialsException() {
        super(ErrorCode.INVALID_CREDENTIALS, "Invalid email or password.");
    }
    
}
