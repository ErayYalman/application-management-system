package com.cybersoft.application_management.service;

import java.util.List;
import java.util.UUID;

import com.cybersoft.application_management.dto.request.CreateFormTypeRequest;
import com.cybersoft.application_management.dto.request.UpdateFormTypeRequest;
import com.cybersoft.application_management.dto.response.FormTypeResponse;

public interface FormTypeService {
    List<FormTypeResponse> getAll();

    FormTypeResponse getById(UUID formTypeId);

    FormTypeResponse create(CreateFormTypeRequest request);

    FormTypeResponse update(UUID formTypeId, UpdateFormTypeRequest request);

    void activate(UUID formTypeId);

    void deactivate(UUID formTypeId);
}
