package com.cybersoft.application_management.exception.application;

import java.util.UUID;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class ApplicationAlreadyRejectedException extends BusinessException {
    public ApplicationAlreadyRejectedException(UUID applicationId) {
        super(ErrorCode.APPLICATION_ALREADY_REJECTED, "Application is already rejected. Application id: " + applicationId);
    }
    
}
