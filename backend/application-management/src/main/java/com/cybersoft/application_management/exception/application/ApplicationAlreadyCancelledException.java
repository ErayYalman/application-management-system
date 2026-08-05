package com.cybersoft.application_management.exception.application;

import java.util.UUID;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class ApplicationAlreadyCancelledException extends BusinessException {
    public ApplicationAlreadyCancelledException(UUID applicationId) {
        super(ErrorCode.APPLICATION_ALREADY_CANCELLED, "Application is already cancelled. Application id: " + applicationId);
    }
    
}
