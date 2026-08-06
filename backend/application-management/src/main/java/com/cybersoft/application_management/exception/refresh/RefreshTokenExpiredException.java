package com.cybersoft.application_management.exception.refresh;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class RefreshTokenExpiredException extends BusinessException {
    public RefreshTokenExpiredException() {
        super(ErrorCode.REFRESH_TOKEN_EXPIRED, "Refresh token has expired");
    }
    public RefreshTokenExpiredException(String message) {
        super(ErrorCode.REFRESH_TOKEN_EXPIRED, message);
    }
    
}
