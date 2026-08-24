package com.cybersoft.application_management.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cybersoft.application_management.dto.response.ApplicationAuditLogResponse;
import com.cybersoft.application_management.entity.ApplicationAuditLog;

@Mapper(componentModel = "spring")
public interface ApplicationAuditLogMapper {
    
    @Mapping(source = "actor.id", target = "actorId")
    @Mapping(source = "actor.name", target = "actorName")
    @Mapping(source = "actor.surname", target = "actorSurname")
    @Mapping(source = "actor.email", target = "actorEmail")
    ApplicationAuditLogResponse toResponse(ApplicationAuditLog applicationAuditLog);


}
