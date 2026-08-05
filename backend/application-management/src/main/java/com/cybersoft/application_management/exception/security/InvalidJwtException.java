package com.cybersoft.application_management.exception.security;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class InvalidJwtException extends BusinessException {
    public InvalidJwtException() {
        super(ErrorCode.INVALID_JWT, "Invalid JWT token.");
    }
    
}
