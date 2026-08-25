package com.cybersoft.application_management.service;

import java.util.List;
import java.util.UUID;

import com.cybersoft.application_management.dto.response.NotificationResponse;
import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.NotificationType;

public interface NotificationService {

    void create(
            User user,
            ApplicationForm application,
            NotificationType type,
            String title,
            String message);

    List<NotificationResponse> getMyNotifications();

    long getUnreadCount();

    void markAsRead(UUID notificationId);

    void markAllAsRead();

    void delete(UUID notificationId);

    void deleteAll();
}