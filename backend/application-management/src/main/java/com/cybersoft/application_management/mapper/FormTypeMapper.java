package com.cybersoft.application_management.mapper;

import org.mapstruct.Mapper;

import com.cybersoft.application_management.dto.response.FormTypeResponse;
import com.cybersoft.application_management.entity.FormType;

@Mapper(componentModel = "spring")
public interface FormTypeMapper {

    FormTypeResponse toResponse(FormType formType);
    
}
