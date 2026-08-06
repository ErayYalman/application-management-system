package com.cybersoft.application_management.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.cybersoft.application_management.dto.request.RegisterRequest;
import com.cybersoft.application_management.dto.response.UserResponse;
import com.cybersoft.application_management.entity.User;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "active", ignore = true)
    @Mapping(target = "applicationForms", ignore = true)
    User toUser(RegisterRequest request);

    UserResponse toUserResponse(User user);
}
