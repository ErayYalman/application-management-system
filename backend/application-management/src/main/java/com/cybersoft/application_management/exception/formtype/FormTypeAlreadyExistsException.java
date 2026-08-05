package com.cybersoft.application_management.exception.formtype;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class FormTypeAlreadyExistsException extends BusinessException {
    public FormTypeAlreadyExistsException(String name) {
        super(ErrorCode.FORM_TYPE_ALREADY_EXISTS, "Form type already exists: " + name);
    }
    
}
