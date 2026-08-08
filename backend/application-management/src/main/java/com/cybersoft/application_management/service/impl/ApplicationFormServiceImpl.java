package com.cybersoft.application_management.service.impl;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.request.ApplicationSearchRequest;
import com.cybersoft.application_management.dto.request.CreateApplicationFormRequest;
import com.cybersoft.application_management.dto.request.UpdateApplicationRequest;
import com.cybersoft.application_management.dto.response.ApplicationResponse;
import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.entity.FormType;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.exception.application.ApplicationFormNotFoundException;
import com.cybersoft.application_management.exception.application.InactiveFormTypeException;
import com.cybersoft.application_management.exception.formtype.FormTypeNotFoundException;
import com.cybersoft.application_management.exception.user.UserNotFoundException;
import com.cybersoft.application_management.mapper.ApplicationFormMapper;
import com.cybersoft.application_management.repository.ApplicationFormRepository;
import com.cybersoft.application_management.repository.FormTypeRepository;
import com.cybersoft.application_management.repository.UserRepository;
import com.cybersoft.application_management.repository.specification.ApplicationFormSpecification;
import com.cybersoft.application_management.security.userdetails.SecurityUtils;
import com.cybersoft.application_management.service.ApplicationFormService;
import com.cybersoft.application_management.service.validator.ApplicationValidator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ApplicationFormServiceImpl implements ApplicationFormService {
    private final ApplicationFormRepository applicationFormRepository;
    private final UserRepository userRepository;
    private final FormTypeRepository formTypeRepository;
    private final ApplicationFormMapper applicationFormMapper;
    private final ApplicationValidator applicationValidator;

    private User getCurrentUser() {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        return userRepository.findById(currentUserId)
                .orElseThrow(() -> new UserNotFoundException(currentUserId));
    }

    private FormType getFormTypeOrThrow(UUID formTypeId) {

        return formTypeRepository.findById(formTypeId)
                .orElseThrow(() -> new FormTypeNotFoundException(formTypeId));
    }

    private ApplicationForm getApplicationOrThrow(UUID applicationId) {

        return applicationFormRepository.findOne(
                Specification.allOf(
                        ApplicationFormSpecification.fetchDetails(),
                        ApplicationFormSpecification.hasId(applicationId)))
                .orElseThrow(() -> new ApplicationFormNotFoundException(applicationId));
    }

    private void initializeNewApplication(
            ApplicationForm application,
            User user,
            FormType formType) {

        application.setUser(user);
        application.setFormType(formType);
        application.setStatus(ApplicationStatus.NEW);
    }

    @Override
    public ApplicationResponse create(CreateApplicationFormRequest request) {

        User user = getCurrentUser();

        FormType formType = getFormTypeOrThrow(request.getFormTypeId());

        if (!formType.isActive()) {
            throw new InactiveFormTypeException("Form type with ID " + formType.getId() + " is inactive.");
        }

        ApplicationForm application = applicationFormMapper.toEntity(request);
        initializeNewApplication(application, user, formType);

        ApplicationForm savedApplication = applicationFormRepository.save(application);

        log.info(
                "Application created. Id: {}, UserId: {}, FormTypeId: {}",
                savedApplication.getId(),
                user.getId(),
                formType.getId());

        return applicationFormMapper.toResponse(savedApplication);
    }

    @Override
    @Transactional(readOnly = true)
    public ApplicationResponse getById(UUID applicationId) {

        ApplicationForm application = getApplicationOrThrow(applicationId);

        applicationValidator.validateAccess(application);

        return applicationFormMapper.toResponse(application);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getMyApplications(
            ApplicationSearchRequest request,
            Pageable pageable) {

        UUID currentUserId = SecurityUtils.getCurrentUserId();

        Specification<ApplicationForm> specification = ApplicationFormSpecification.build(
                request,
                currentUserId);

        Page<ApplicationForm> applications = applicationFormRepository.findAll(
                specification,
                pageable);

        return applications.map(
                applicationFormMapper::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getAllApplications(
            ApplicationSearchRequest request,
            Pageable pageable) {

        Specification<ApplicationForm> specification = ApplicationFormSpecification.build(request);

        Page<ApplicationForm> applications = applicationFormRepository.findAll(
                specification,
                pageable);

        return applications.map(
                applicationFormMapper::toResponse);
    }

    @Override
    public ApplicationResponse updateApplicationForm(UUID applicationFormId, UpdateApplicationRequest request) {
        ApplicationForm applicationForm = getApplicationOrThrow(applicationFormId);

        applicationValidator.validateAccess(applicationForm);

        applicationValidator.validateUpdatable(applicationForm);

        FormType formType = getFormTypeOrThrow(request.getFormTypeId());

        if (!formType.isActive()) {
            throw new InactiveFormTypeException(
                    "Form type is inactive");
        }

        applicationFormMapper.updateEntity(
                request,
                applicationForm);

        applicationForm.setFormType(formType);

        ApplicationForm updatedApplicationForm = applicationFormRepository.save(applicationForm);

        log.info(
                "Application updated. Id: {}, UserId: {}, FormTypeId: {}",
                updatedApplicationForm.getId(),
                updatedApplicationForm.getUser().getId(),
                formType.getId());

        return applicationFormMapper.toResponse(
                updatedApplicationForm);
    }

    @Override
    public void deleteApplicationForm(UUID applicationFormId) {
        ApplicationForm applicationForm = getApplicationOrThrow(applicationFormId);

        applicationValidator.validateAccess(applicationForm);

        applicationValidator.validateDeletable(applicationForm);

        applicationFormRepository.delete(applicationForm);

        log.info(
                "Application deleted. Id: {}, UserId: {}, FormTypeId: {}",
                applicationForm.getId(),
                applicationForm.getUser().getId(),
                applicationForm.getFormType().getId());
    }

    @Override
    public ApplicationResponse approveApplication(UUID applicationId) {
        ApplicationForm applicationForm = getApplicationOrThrow(applicationId);
        applicationValidator.validateApprovable(applicationForm);
        applicationForm.setStatus(ApplicationStatus.APPROVED);
        ApplicationForm savedApplicationForm = applicationFormRepository.save(applicationForm);

        log.info(
                "Application approved. Id: {}, UserId: {}",
                savedApplicationForm.getId(),
                savedApplicationForm.getUser().getId());

        return applicationFormMapper.toResponse(
                savedApplicationForm);
    }

    @Override
    public ApplicationResponse rejectApplication(UUID applicationId) {
        ApplicationForm applicationForm = getApplicationOrThrow(applicationId);
        applicationValidator.validateRejectable(applicationForm);
        applicationForm.setStatus(ApplicationStatus.REJECTED);
        ApplicationForm savedApplicationForm = applicationFormRepository.save(applicationForm);

        log.info(
                "Application rejected. Id: {}, UserId: {}",
                savedApplicationForm.getId(),
                savedApplicationForm.getUser().getId());

        return applicationFormMapper.toResponse(
                savedApplicationForm);
    }

    @Override
    public ApplicationResponse cancelApplication(UUID applicationId) {
        ApplicationForm applicationForm = getApplicationOrThrow(applicationId);
        applicationValidator.validateAccess(applicationForm);
        applicationValidator.validateCancellable(applicationForm);
        applicationForm.setStatus(ApplicationStatus.CANCELLED);
        ApplicationForm savedApplicationForm = applicationFormRepository.save(applicationForm);
        log.info(
                "Application cancelled. Id: {}, UserId: {}",
                savedApplicationForm.getId(),
                savedApplicationForm.getUser().getId());

        return applicationFormMapper.toResponse(
                savedApplicationForm);
    }

    @Override
    public ApplicationResponse moveToReview(UUID applicationId) {
        ApplicationForm applicationForm = getApplicationOrThrow(applicationId);
        applicationValidator.validateReviewable(applicationForm);
        applicationForm.setStatus(ApplicationStatus.IN_REVIEW);
        ApplicationForm savedApplicationForm = applicationFormRepository.save(applicationForm);
        log.info(
                "Application moved to review. Id: {}, UserId: {}",
                savedApplicationForm.getId(),
                savedApplicationForm.getUser().getId());

        return applicationFormMapper.toResponse(
                savedApplicationForm);
    }

}
