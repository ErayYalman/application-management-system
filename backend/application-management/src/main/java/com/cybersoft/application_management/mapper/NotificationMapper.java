package com.cybersoft.application_management.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cybersoft.application_management.dto.response.NotificationResponse;
import com.cybersoft.application_management.entity.Notification;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    
     @Mapping(
            target = "applicationId",
            source = "application.id")
    NotificationResponse toResponse(Notification notification);
    
}
