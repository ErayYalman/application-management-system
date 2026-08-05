package com.cybersoft.application_management.exception.security;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class TokenExpiredException extends BusinessException {
    public TokenExpiredException() {
        super(ErrorCode.TOKEN_EXPIRED, "JWT token has expired.");
    }
    
}
