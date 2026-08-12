package com.cybersoft.application_management.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.request.CreateFormTypeRequest;
import com.cybersoft.application_management.dto.request.UpdateFormTypeRequest;
import com.cybersoft.application_management.dto.response.FormTypeResponse;
import com.cybersoft.application_management.entity.FormType;
import com.cybersoft.application_management.exception.formtype.FormTypeAlreadyExistsException;
import com.cybersoft.application_management.exception.formtype.FormTypeNotFoundException;
import com.cybersoft.application_management.mapper.FormTypeMapper;
import com.cybersoft.application_management.repository.FormTypeRepository;
import com.cybersoft.application_management.service.FormTypeService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class FormTypeServiceImpl implements FormTypeService {

    private final FormTypeRepository formTypeRepository;
    private final FormTypeMapper formTypeMapper;

    private FormType getFormTypeOrThrow(UUID formTypeId) {

        return formTypeRepository.findById(formTypeId)
                .orElseThrow(() -> new FormTypeNotFoundException(formTypeId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<FormTypeResponse> getAll() {

        return formTypeRepository.findAll()
                .stream()
                .map(formTypeMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public FormTypeResponse getById(UUID formTypeId) {

        return formTypeMapper.toResponse(
                getFormTypeOrThrow(formTypeId));
    }

    @Override
    public FormTypeResponse create(CreateFormTypeRequest request) {

        if (formTypeRepository.existsByNameIgnoreCase(
                request.getName().trim())) {

            throw new FormTypeAlreadyExistsException(
                    request.getName());
        }

        FormType formType = new FormType();

        formType.setName(request.getName().trim());
        formType.setDescription(request.getDescription());
        formType.setActive(true);

        FormType savedFormType = formTypeRepository.save(formType);

        log.info(
                "Form type created. Id: {}, Name: {}",
                savedFormType.getId(),
                savedFormType.getName());

        return formTypeMapper.toResponse(savedFormType);
    }

    @Override
    public FormTypeResponse update(
            UUID formTypeId,
            UpdateFormTypeRequest request) {

        FormType formType = getFormTypeOrThrow(formTypeId);

        String name = request.getName().trim();

        if (formTypeRepository.existsByNameIgnoreCaseAndIdNot(
                name,
                formTypeId)) {

            throw new FormTypeAlreadyExistsException(name);
        }

        formType.setName(name);
        formType.setDescription(request.getDescription());

        log.info(
                "Form type updated. Id: {}",
                formType.getId());

        return formTypeMapper.toResponse(formType);
    }

    @Override
    public void activate(UUID formTypeId) {

        FormType formType = getFormTypeOrThrow(formTypeId);

        if (formType.isActive()) {
            throw new IllegalStateException(
                    "Form type is already active.");
        }

        formType.setActive(true);

        log.info(
                "Form type activated. Id: {}",
                formType.getId());
    }

    @Override
    public void deactivate(UUID formTypeId) {

        FormType formType = getFormTypeOrThrow(formTypeId);

        if (!formType.isActive()) {
            throw new IllegalStateException(
                    "Form type is already inactive.");
        }

        formType.setActive(false);

        log.info(
                "Form type deactivated. Id: {}",
                formType.getId());
    }

}
