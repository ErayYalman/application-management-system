package com.cybersoft.application_management.exception.application;

import java.util.UUID;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class ApplicationFormNotFoundException extends BusinessException {
    public ApplicationFormNotFoundException(UUID formId) {
        super(ErrorCode.APPLICATION_FORM_NOT_FOUND, "Application form not found with ID: " + formId);
    }
    
}
