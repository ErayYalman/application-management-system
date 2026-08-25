package com.cybersoft.application_management.exception.notification;

import java.util.UUID;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;

public class NotificationNotFoundException
        extends BusinessException {

    public NotificationNotFoundException(UUID notificationId) {
        super(ErrorCode.NOTIFICATION_NOT_FOUND,
                "Notification not found: " + notificationId);
    }
}