package com.cybersoft.application_management.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybersoft.application_management.entity.Attachment;

public interface AttachmentRepository extends JpaRepository<Attachment, UUID> {
    List<Attachment> findByApplicationForm_Id(UUID applicationFormId);
}
