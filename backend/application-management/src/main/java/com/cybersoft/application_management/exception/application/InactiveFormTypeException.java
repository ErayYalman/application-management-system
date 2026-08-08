package com.cybersoft.application_management.exception.application;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class InactiveFormTypeException extends BusinessException {

    public InactiveFormTypeException(String message) {
        super(ErrorCode.INACTIVE_FORM_TYPE, message);
    }
    
}
