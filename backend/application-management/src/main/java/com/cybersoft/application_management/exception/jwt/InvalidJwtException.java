package com.cybersoft.application_management.exception.jwt;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class InvalidJwtException extends BusinessException {
    public InvalidJwtException(Throwable cause) {
        super(ErrorCode.INVALID_JWT,
                "Invalid JWT token.");
        initCause(cause);
    }

    public InvalidJwtException(String message) {
        super(ErrorCode.INVALID_JWT, message);
    }
    
}
