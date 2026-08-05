package com.cybersoft.application_management.exception.user;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class EmailAlreadyExistsException extends BusinessException {
    public EmailAlreadyExistsException(String email) {
        super(ErrorCode.EMAIL_ALREADY_EXISTS, "Email already exists: " + email);
    }

}
