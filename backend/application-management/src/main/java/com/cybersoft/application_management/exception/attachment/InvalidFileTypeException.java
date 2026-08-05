package com.cybersoft.application_management.exception.attachment;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class InvalidFileTypeException extends BusinessException {
    public InvalidFileTypeException(String contentType) {
        super(ErrorCode.INVALID_FILE_TYPE, "Unsupported file type: " + contentType);
    }
    
}
