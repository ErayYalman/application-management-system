package com.cybersoft.application_management.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;

import com.cybersoft.application_management.dto.request.CreateApplicationFormRequest;
import com.cybersoft.application_management.dto.request.UpdateApplicationRequest;
import com.cybersoft.application_management.dto.response.ApplicationResponse;
import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.entity.User;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface ApplicationFormMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "formType", ignore = true)
    @Mapping(target = "attachments", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    ApplicationForm toEntity(CreateApplicationFormRequest request);

    @Mapping(target = "formTypeId", source = "formType.id")
    @Mapping(target = "formTypeName", source = "formType.name")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "applicantFullName", source = "user", qualifiedByName = "buildApplicantFullName")
    ApplicationResponse toResponse(ApplicationForm applicationForm);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "formType", ignore = true)
    @Mapping(target = "attachments", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(UpdateApplicationRequest request, @MappingTarget ApplicationForm applicationForm);

    @Named("buildApplicantFullName")
    default String buildApplicantFullName(User user) {
        return user.getName() + " " + user.getSurname();
    }

}
