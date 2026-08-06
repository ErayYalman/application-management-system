package com.cybersoft.application_management.exception.refresh;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class InvalidRefreshTokenException extends BusinessException {
    public InvalidRefreshTokenException() {
        super(ErrorCode.INVALID_REFRESH_TOKEN, "Invalid refresh token");
    }
    public InvalidRefreshTokenException(String message) {
        super(ErrorCode.INVALID_REFRESH_TOKEN, message);
    }
    
}
