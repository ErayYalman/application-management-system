package com.cybersoft.application_management.service.validator;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.enums.ApplicationStatus;

public class ApplicationValidatorTest {

    private ApplicationValidator applicationValidator;

    @BeforeEach
    void setUp() {
        applicationValidator = new ApplicationValidator();
    }

    // --- validateUpdatable Tests ---

    @Test
    void newApplicationCanBeUpdated() {
        ApplicationForm application = new ApplicationForm();
        application.setStatus(ApplicationStatus.NEW);

        assertDoesNotThrow(() -> applicationValidator.validateUpdatable(application));
    }

    @ParameterizedTest
    @EnumSource(value = ApplicationStatus.class, names = {
            "IN_REVIEW",
            "APPROVED",
            "REJECTED",
            "CANCELLED"
    })
    void nonNewApplicationsCannotBeUpdated(ApplicationStatus status) {
        ApplicationForm application = new ApplicationForm();
        application.setStatus(status);

        assertThrows(
                IllegalStateException.class,
                () -> applicationValidator.validateUpdatable(application));
    }

    // --- validateReviewable Tests ---

    @Test
    void newApplicationCanBeMovedToReview() {
        ApplicationForm application = new ApplicationForm();
        application.setStatus(ApplicationStatus.NEW);

        assertDoesNotThrow(() -> applicationValidator.validateReviewable(application));
    }

    @ParameterizedTest
    @EnumSource(value = ApplicationStatus.class, names = {
            "IN_REVIEW",
            "APPROVED",
            "REJECTED",
            "CANCELLED"
    })
    void onlyNewApplicationsCanBeMovedToReview(ApplicationStatus status) {
        ApplicationForm application = new ApplicationForm();
        application.setStatus(status);

        assertThrows(
                IllegalStateException.class,
                () -> applicationValidator.validateReviewable(application));
    }

    // --- validateApprovable Tests ---

    @Test
    void inReviewApplicationCanBeApproved() {
        ApplicationForm application = new ApplicationForm();
        application.setStatus(ApplicationStatus.IN_REVIEW);

        assertDoesNotThrow(() -> applicationValidator.validateApprovable(application));
    }

    @ParameterizedTest
    @EnumSource(value = ApplicationStatus.class, names = {
            "NEW",
            "APPROVED",
            "REJECTED",
            "CANCELLED"
    })
    void onlyInReviewApplicationsCanBeApproved(ApplicationStatus status) {
        ApplicationForm application = new ApplicationForm();
        application.setStatus(status);

        assertThrows(
                IllegalStateException.class,
                () -> applicationValidator.validateApprovable(application));
    }

    // --- validateCancellable Tests ---

    @ParameterizedTest
    @EnumSource(value = ApplicationStatus.class, names = {
            "NEW",
            "IN_REVIEW"
    })
    void newOrInReviewApplicationCanBeCancelled(ApplicationStatus status) {
        ApplicationForm application = new ApplicationForm();
        application.setStatus(status);

        assertDoesNotThrow(() -> applicationValidator.validateCancellable(application));
    }

    @ParameterizedTest
    @EnumSource(value = ApplicationStatus.class, names = {
            "APPROVED",
            "REJECTED",
            "CANCELLED"
    })
    void terminalApplicationsCannotBeCancelled(ApplicationStatus status) {
        ApplicationForm application = new ApplicationForm();
        application.setStatus(status);

        assertThrows(
                IllegalStateException.class,
                () -> applicationValidator.validateCancellable(application));
    }
}