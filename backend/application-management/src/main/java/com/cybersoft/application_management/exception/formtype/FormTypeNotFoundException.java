package com.cybersoft.application_management.exception.formtype;

import java.util.UUID;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class FormTypeNotFoundException extends BusinessException {
    public FormTypeNotFoundException(String name) {
        super(ErrorCode.FORM_TYPE_NOT_FOUND, "Form type not found: " + name);
    }
    
    public FormTypeNotFoundException(UUID formTypeId) {
        super(
                ErrorCode.FORM_TYPE_NOT_FOUND,
                "Form type not found with id: " + formTypeId
        );
    }

}
