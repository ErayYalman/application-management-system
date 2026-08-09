package com.cybersoft.application_management.dto.response;

import org.springframework.core.io.Resource;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AttachmentDownloadResponse {
    private final Resource resource;
    private final String originalName;
    private final String contentType;
}
