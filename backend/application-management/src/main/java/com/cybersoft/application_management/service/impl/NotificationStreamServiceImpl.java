package com.cybersoft.application_management.service.impl;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.cybersoft.application_management.dto.response.NotificationResponse;
import com.cybersoft.application_management.service.NotificationStreamService;

@Service
public class NotificationStreamServiceImpl implements NotificationStreamService {

    private static final long SSE_TIMEOUT = 30 * 60 * 1000L;

    private final ConcurrentMap<UUID, SseEmitter> emitters = new ConcurrentHashMap<>();

    

    @Override
    public SseEmitter subscribe(UUID userId) {

        SseEmitter emitter = new SseEmitter(SSE_TIMEOUT);

        SseEmitter previousEmitter = emitters.put(userId, emitter);

        if (previousEmitter != null) {
            previousEmitter.complete();
        }

        emitter.onCompletion(
                () -> removeEmitter(userId, emitter));

        emitter.onTimeout(
                () -> removeEmitter(userId, emitter));

        emitter.onError(
                error -> removeEmitter(userId, emitter));

        try {
            emitter.send(
                    SseEmitter.event()
                            .name("connected")
                            .data("Notification stream connected"));
        } catch (IOException exception) {
            removeEmitter(userId, emitter);
            emitter.completeWithError(exception);
        }

        return emitter;
    }

    @Override
    public void publish(
            UUID userId,
            NotificationResponse notification) {

        SseEmitter emitter = emitters.get(userId);

        if (emitter == null) {
            return;
        }

        try {
            emitter.send(
                    SseEmitter.event()
                            .name("notification")
                            .id(notification.getId().toString())
                            .data(notification));

        } catch (IOException exception) {
            removeEmitter(userId, emitter);
            emitter.completeWithError(exception);
        }
    }

    private void removeEmitter(
            UUID userId,
            SseEmitter emitter) {

        emitters.remove(userId, emitter);
    }
}