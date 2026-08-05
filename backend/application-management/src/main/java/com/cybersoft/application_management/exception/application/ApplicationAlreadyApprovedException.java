package com.cybersoft.application_management.exception.application;

import java.util.UUID;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class ApplicationAlreadyApprovedException extends BusinessException {
    public ApplicationAlreadyApprovedException(UUID applicationId) {
        super(ErrorCode.APPLICATION_ALREADY_APPROVED, "Application is already approved. Application id: " + applicationId);
    }
     
}
