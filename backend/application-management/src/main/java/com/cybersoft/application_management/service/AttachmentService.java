package com.cybersoft.application_management.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.cybersoft.application_management.dto.response.AttachmentDownloadResponse;
import com.cybersoft.application_management.dto.response.AttachmentResponse;

public interface AttachmentService {

    AttachmentResponse upload(UUID applicationId, MultipartFile file);

    List<AttachmentResponse> getAttachments(UUID applicationId);

    AttachmentDownloadResponse download(UUID attachmentId);

    void delete(UUID attachmentId);
}