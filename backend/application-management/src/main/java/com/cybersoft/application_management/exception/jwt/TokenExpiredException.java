package com.cybersoft.application_management.exception.jwt;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class TokenExpiredException extends BusinessException {
    public TokenExpiredException(Throwable cause) {
        super(ErrorCode.TOKEN_EXPIRED,
                "JWT token has expired.");
        initCause(cause);
    }

    public TokenExpiredException(String message) {
        super(ErrorCode.TOKEN_EXPIRED, message);
    }
    
}
