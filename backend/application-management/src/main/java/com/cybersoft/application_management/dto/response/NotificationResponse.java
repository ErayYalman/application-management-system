package com.cybersoft.application_management.dto.response;

import java.time.Instant;
import java.util.UUID;

import com.cybersoft.application_management.enums.NotificationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {

    private UUID id;
    private UUID applicationId;
    private NotificationType type;
    private String title;
    private String message;
    private boolean read;
    private Instant createdAt;

}