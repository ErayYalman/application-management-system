package com.cybersoft.application_management.exception;

public class UnauthorizedException extends BusinessException {
    public UnauthorizedException(String message) {
        super(ErrorCode.UNAUTHORIZED, message);
    }
    
}
