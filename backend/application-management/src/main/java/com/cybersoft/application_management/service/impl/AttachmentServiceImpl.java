package com.cybersoft.application_management.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.cybersoft.application_management.dto.response.AttachmentDownloadResponse;
import com.cybersoft.application_management.dto.response.AttachmentResponse;
import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.entity.Attachment;
import com.cybersoft.application_management.exception.application.ApplicationFormNotFoundException;
import com.cybersoft.application_management.exception.attachment.AttachmentNotFoundException;
import com.cybersoft.application_management.mapper.AttachmentMapper;
import com.cybersoft.application_management.repository.ApplicationFormRepository;
import com.cybersoft.application_management.repository.AttachmentRepository;
import com.cybersoft.application_management.repository.specification.ApplicationFormSpecification;
import com.cybersoft.application_management.service.AttachmentService;
import com.cybersoft.application_management.service.validator.ApplicationValidator;
import com.cybersoft.application_management.storage.FileStorageService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AttachmentServiceImpl implements AttachmentService {

    private final AttachmentRepository attachmentRepository;
    private final ApplicationFormRepository applicationFormRepository;
    private final FileStorageService fileStorageService;
    private final ApplicationValidator applicationValidator;
    private final AttachmentMapper attachmentMapper;

    private ApplicationForm getApplicationOrThrow(
            UUID applicationId) {

        return applicationFormRepository.findOne(
                Specification.allOf(
                        ApplicationFormSpecification.fetchDetails(),
                        ApplicationFormSpecification.hasId(applicationId)))
                .orElseThrow(() -> new ApplicationFormNotFoundException(
                        applicationId));
    }

    private Attachment getAttachmentOrThrow(
            UUID attachmentId) {

        return attachmentRepository.findById(attachmentId)
                .orElseThrow(() -> new AttachmentNotFoundException(
                        attachmentId));
    }

    @Override
    public AttachmentResponse upload(
            UUID applicationId,
            MultipartFile file) {

        validateFile(file); // performans açısından önce dosya doğrulama yapılır, sonra uygulama doğrulaması
                            // yapılır. Çünkü dosya doğrulaması daha hızlıdır ve gereksiz yere uygulama
                            // doğrulaması yapılmaz.

        ApplicationForm application = getApplicationOrThrow(applicationId);

        applicationValidator.validateAccess(application);

        String filePath = fileStorageService.store(
                file,
                applicationId);

        Attachment attachment = new Attachment();

        attachment.setApplicationForm(application);
        attachment.setOriginalName(
                file.getOriginalFilename());
        attachment.setStoredName(
                extractFileName(filePath));
        attachment.setFilePath(filePath);
        attachment.setContentType(
                file.getContentType());
        attachment.setFileSize(
                file.getSize());

        Attachment savedAttachment = attachmentRepository.save(attachment);

        log.info(
                "Attachment uploaded. Id: {}, ApplicationId: {}",
                savedAttachment.getId(),
                applicationId);

        return attachmentMapper.toResponse(
                savedAttachment);
    }

    @Override
    public List<AttachmentResponse> getAttachments(
            UUID applicationId) {

        ApplicationForm application = getApplicationOrThrow(applicationId);

        applicationValidator.validateAccess(application);

        return attachmentRepository
                .findByApplicationForm_Id(applicationId)
                .stream()
                .map(attachmentMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public AttachmentDownloadResponse download(UUID attachmentId) {

        Attachment attachment = getAttachmentOrThrow(attachmentId);

        applicationValidator.validateAccess(
                attachment.getApplicationForm());

        Resource resource = fileStorageService.load(
                attachment.getFilePath());

        return new AttachmentDownloadResponse(
                resource,
                attachment.getOriginalName(),
                attachment.getContentType());
    }

    @Override
    public void delete(UUID attachmentId) {

        Attachment attachment = getAttachmentOrThrow(attachmentId);

        applicationValidator.validateAccess(
                attachment.getApplicationForm());

        attachmentRepository.delete(attachment);
        attachmentRepository.flush(); // Veri tabanında hata alırsa işlemi geri almak için flush() kullanılır. Bu,
                                      // veritabanına yapılan değişiklikleri
                                      // hemen uygular ve eğer bir hata oluşursa, işlemi geri alır.

        fileStorageService.delete(attachment.getFilePath());

        log.info(
                "Attachment deleted. Id: {}",
                attachmentId);
    }

    private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "File cannot be empty.");
        }

        if (file.getOriginalFilename() == null ||
                file.getOriginalFilename().isBlank()) {

            throw new IllegalArgumentException(
                    "File name cannot be empty.");
        }
    }

    private String extractFileName(String filePath) {

        int lastSlash = filePath.lastIndexOf('/');

        if (lastSlash == -1) {
            return filePath;
        }

        return filePath.substring(
                lastSlash + 1);
    }

}
