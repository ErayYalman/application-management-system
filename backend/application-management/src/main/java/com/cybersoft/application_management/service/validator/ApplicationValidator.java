package com.cybersoft.application_management.service.validator;

import org.springframework.stereotype.Component;

import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.exception.ForbiddenException;
import com.cybersoft.application_management.security.userdetails.CustomUserDetails;
import com.cybersoft.application_management.security.userdetails.SecurityUtils;

@Component
public class ApplicationValidator {

    public void validateAccess(ApplicationForm applicationForm) {

        CustomUserDetails currentUser = SecurityUtils.getCurrentUser();

        boolean isAdmin = currentUser.getAuthorities()
                .stream()
                .anyMatch(authority -> authority.getAuthority().equals("ROLE_ADMIN"));

        if (isAdmin) {
            return;
        }

        if (!applicationForm.getUser().getId()
                .equals(currentUser.getId())) {

            throw new ForbiddenException(
                    "You are not allowed to access this application.");
        }
    }

    public void validateUpdatable(ApplicationForm applicationForm) {
        if (applicationForm.getStatus() != ApplicationStatus.NEW) {
            throw new IllegalStateException(
                    "Only new applications can be updated.");
        }
    }

    public void validateDeletable(ApplicationForm applicationForm) {
        if (applicationForm.getStatus() != ApplicationStatus.NEW) {
            throw new IllegalStateException(
                    "Only new applications can be deleted.");
        }
    }

    public void validateApprovable(ApplicationForm applicationForm) {

        if (applicationForm.getStatus() != ApplicationStatus.IN_REVIEW) {

            throw new IllegalStateException(
                    "Only applications in review can be approved.");
        }
    }

    public void validateRejectable(ApplicationForm applicationForm) {

        if (applicationForm.getStatus() != ApplicationStatus.IN_REVIEW) {

            throw new IllegalStateException(
                    "Only applications in review can be rejected.");
        }
    }

    public void validateCancellable(ApplicationForm applicationForm) {
        ApplicationStatus status = applicationForm.getStatus();
        if (status != ApplicationStatus.NEW
                && status != ApplicationStatus.IN_REVIEW) {
            throw new IllegalStateException(
                    "Only new or in-review applications can be cancelled.");
        }
    }

    public void validateReviewable(ApplicationForm applicationForm) {
        if (applicationForm.getStatus() != ApplicationStatus.NEW) {
            throw new IllegalStateException(
                    "Only new applications can be moved to review.");
        }
    }
}