package com.cybersoft.application_management.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.cybersoft.application_management.dto.response.NotificationResponse;
import com.cybersoft.application_management.security.userdetails.SecurityUtils;
import com.cybersoft.application_management.service.NotificationService;
import com.cybersoft.application_management.service.NotificationStreamService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final NotificationStreamService notificationStreamService;

    @GetMapping
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<List<NotificationResponse>> getMyNotifications() {

        return ResponseEntity.ok(
                notificationService.getMyNotifications());
    }

    @GetMapping("/unread-count")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<Long> getUnreadCount() {

        return ResponseEntity.ok(
                notificationService.getUnreadCount());
    }

    @PatchMapping("/{notificationId}/read")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<Void> markAsRead(
            @PathVariable UUID notificationId) {

        notificationService.markAsRead(notificationId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/read-all")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<Void> markAllAsRead() {

        notificationService.markAllAsRead();

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{notificationId}")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<Void> delete(
            @PathVariable UUID notificationId) {

        notificationService.delete(notificationId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<Void> deleteAll() {

        notificationService.deleteAll();

        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/stream", produces = "text/event-stream")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public SseEmitter subscribeToNotifications() {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        return notificationStreamService.subscribe(
                currentUserId);
    }
}