package com.cybersoft.application_management.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.response.NotificationResponse;
import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.entity.Notification;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.NotificationType;
import com.cybersoft.application_management.exception.notification.NotificationNotFoundException;
import com.cybersoft.application_management.mapper.NotificationMapper;
import com.cybersoft.application_management.repository.NotificationRepository;
import com.cybersoft.application_management.security.userdetails.SecurityUtils;
import com.cybersoft.application_management.service.NotificationService;
import com.cybersoft.application_management.service.NotificationStreamService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final NotificationStreamService notificationStreamService;

    @Override
    public void create(
            User user,
            ApplicationForm application,
            NotificationType type,
            String title,
            String message) {

        Notification notification = Notification.builder()
                .user(user)
                .application(application)
                .type(type)
                .title(title)
                .message(message)
                .read(false)
                .build();

        Notification savedNotification = notificationRepository.save(notification);

        NotificationResponse response = notificationMapper.toResponse(savedNotification);

        notificationStreamService.publish(
                user.getId(),
                response);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponse> getMyNotifications() {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        return notificationRepository
                .findAllByUser_IdOrderByCreatedAtDesc(currentUserId)
                .stream()
                .map(notificationMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public long getUnreadCount() {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        return notificationRepository
                .countByUser_IdAndReadFalse(currentUserId);
    }

    @Override
    public void markAsRead(UUID notificationId) {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        Notification notification = notificationRepository
                .findByIdAndUser_Id(
                        notificationId,
                        currentUserId)
                .orElseThrow(
                        () -> new NotificationNotFoundException(
                                notificationId));

        if (!notification.isRead()) {
            notification.setRead(true);
        }
    }

    @Override
    public void markAllAsRead() {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        List<Notification> notifications = notificationRepository
                .findAllByUser_IdAndReadFalseOrderByCreatedAtDesc(
                        currentUserId);

        notifications.forEach(notification -> notification.setRead(true));
    }

    @Override
    public void delete(UUID notificationId) {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        Notification notification = notificationRepository
                .findByIdAndUser_Id(
                        notificationId,
                        currentUserId)
                .orElseThrow(
                        () -> new NotificationNotFoundException(
                                notificationId));

        notificationRepository.delete(notification);
    }

    @Override
    public void deleteAll() {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        notificationRepository.deleteAllByUser_Id(currentUserId);
    }
}