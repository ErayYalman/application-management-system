package com.cybersoft.application_management.service;

import java.util.UUID;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import com.cybersoft.application_management.dto.response.NotificationResponse;

public interface NotificationStreamService {

    SseEmitter subscribe(UUID userId);

    void publish(
            UUID userId,
            NotificationResponse notification);
}