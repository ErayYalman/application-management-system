package com.cybersoft.application_management.dto.response;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttachmentResponse {
    private UUID id;

    private String originalName;

    private String contentType;

    private Long fileSize;
}
