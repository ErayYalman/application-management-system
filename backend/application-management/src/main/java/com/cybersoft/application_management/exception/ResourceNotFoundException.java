package com.cybersoft.application_management.exception;

public class ResourceNotFoundException extends BusinessException {
    public ResourceNotFoundException(String message) {
        super(ErrorCode.RESOURCE_NOT_FOUND, message);
    }
    
}
