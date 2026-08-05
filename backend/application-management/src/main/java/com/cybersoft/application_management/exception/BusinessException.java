package com.cybersoft.application_management.exception;

import lombok.Getter;

@Getter
public abstract class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;

    protected BusinessException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    
}
