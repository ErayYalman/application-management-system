package com.cybersoft.application_management.exception.application;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class ForbiddenOperationException extends BusinessException {
    public ForbiddenOperationException(String message) {
        super(ErrorCode.FORBIDEN_OPERATION, message);
    }
    
}
