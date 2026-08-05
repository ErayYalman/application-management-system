package com.cybersoft.application_management.exception.attachment;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class FileSizeExceededException extends BusinessException {
    public FileSizeExceededException(long maxSize) {
        super(ErrorCode.FILE_SIZE_EXCEEDED, "Maximum allowed file size is " + maxSize + " MB.");
    }
    
}
