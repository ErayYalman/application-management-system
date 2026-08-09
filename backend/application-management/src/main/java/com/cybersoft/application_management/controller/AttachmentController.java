package com.cybersoft.application_management.controller;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cybersoft.application_management.dto.response.AttachmentDownloadResponse;
import com.cybersoft.application_management.dto.response.AttachmentResponse;
import com.cybersoft.application_management.service.AttachmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/attachments")
@RequiredArgsConstructor
public class AttachmentController {
    private final AttachmentService attachmentService;

    @PostMapping(value = "/applications/{applicationId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<AttachmentResponse> upload(
            @PathVariable UUID applicationId,
            @RequestParam("file") MultipartFile file) {

        AttachmentResponse response = attachmentService.upload(
                applicationId,
                file);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/applications/{applicationId}")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<List<AttachmentResponse>> getAttachments(
            @PathVariable UUID applicationId) {

        return ResponseEntity.ok(
                attachmentService.getAttachments(
                        applicationId));
    }

    @GetMapping("/{attachmentId}/download")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    public ResponseEntity<Resource> download(
            @PathVariable UUID attachmentId) {

        AttachmentDownloadResponse response = attachmentService.download(
                attachmentId);

        MediaType mediaType;
        try {
            mediaType = MediaType.parseMediaType(
                    response.getContentType());
        } catch (InvalidMediaTypeException e) {
            mediaType = MediaType.APPLICATION_OCTET_STREAM;
        }

        return ResponseEntity.ok()
                .contentType(mediaType)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment()
                                .filename(
                                        response.getOriginalName(),
                                        StandardCharsets.UTF_8)
                                .build()
                                .toString())
                .body(response.getResource());
    }

    @DeleteMapping("/{attachmentId}")
    @PreAuthorize("hasAnyRole('PERSONNEL', 'ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable UUID attachmentId) {

        attachmentService.delete(
                attachmentId);
    }

}
