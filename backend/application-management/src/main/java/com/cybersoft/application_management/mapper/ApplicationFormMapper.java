package com.cybersoft.application_management.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cybersoft.application_management.dto.request.CreateApplicationRequest;
import com.cybersoft.application_management.dto.response.ApplicationResponse;
import com.cybersoft.application_management.entity.ApplicationForm;

@Mapper(componentModel = "spring")
public interface ApplicationFormMapper {
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "formType", ignore = true)
    @Mapping(target = "attachments", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    ApplicationForm toEntity(CreateApplicationRequest request);

    @Mapping(target = "formTypeId", source = "formType.id")
    @Mapping(target = "formTypeName", source = "formType.name")
    ApplicationResponse toResponse(ApplicationForm applicationForm);

}
