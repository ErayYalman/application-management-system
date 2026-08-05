package com.cybersoft.application_management.exception.attachment;

import java.util.UUID;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class AttachmentNotFoundException extends BusinessException {
    public AttachmentNotFoundException(UUID attachmentId) {
        super(ErrorCode.ATTACHMENT_NOT_FOUND, "Attachment not found with ID: " + attachmentId);
    }
    
}
