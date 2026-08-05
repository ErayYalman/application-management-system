package com.cybersoft.application_management.exception.application;


import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class InvalidApplicationStatusTransitionException extends BusinessException {
    public InvalidApplicationStatusTransitionException(ApplicationStatus currentStatus, ApplicationStatus newStatus) {
        super(ErrorCode.INVALID_APPLICATION_STATUS_TRANSITION,
             "Invalid application status transition from "
                    + currentStatus + " to " + newStatus
            );
    }
    
}
