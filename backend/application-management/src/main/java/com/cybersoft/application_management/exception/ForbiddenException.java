package com.cybersoft.application_management.exception;

public class ForbiddenException extends BusinessException {
    public ForbiddenException(String message) {
        super(ErrorCode.FORBIDDEN, message);
    }
    
}
