package com.cybersoft.application_management.mapper;

import org.mapstruct.Mapper;

import com.cybersoft.application_management.dto.response.AttachmentResponse;
import com.cybersoft.application_management.entity.Attachment;

@Mapper(componentModel = "spring")
public interface AttachmentMapper {

    AttachmentResponse toResponse(Attachment attachment);

}
