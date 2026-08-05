package com.cybersoft.application_management.business;

import java.util.EnumSet;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.cybersoft.application_management.enums.ApplicationStatus;
import com.cybersoft.application_management.exception.application.ApplicationAlreadyApprovedException;
import com.cybersoft.application_management.exception.application.ApplicationAlreadyCancelledException;
import com.cybersoft.application_management.exception.application.ApplicationAlreadyRejectedException;
import com.cybersoft.application_management.exception.application.InvalidApplicationStatusTransitionException;

@Component
public class ApplicationStatusValidator {
    private static final Map<ApplicationStatus, EnumSet<ApplicationStatus>> ALLOWED_TRANSITIONS =
            Map.of(
                    ApplicationStatus.NEW,
                    EnumSet.of(
                            ApplicationStatus.IN_REVIEW,
                            ApplicationStatus.CANCELLED
                    ),

                    ApplicationStatus.IN_REVIEW,
                    EnumSet.of(
                            ApplicationStatus.APPROVED,
                            ApplicationStatus.REJECTED
                    ),

                    ApplicationStatus.APPROVED,
                    EnumSet.noneOf(ApplicationStatus.class),

                    ApplicationStatus.REJECTED,
                    EnumSet.noneOf(ApplicationStatus.class),

                    ApplicationStatus.CANCELLED,
                    EnumSet.noneOf(ApplicationStatus.class)
            );

    public void validateStatusTransition(
            UUID applicationId,
            ApplicationStatus currentStatus,
            ApplicationStatus newStatus) {

        switch (currentStatus) {

            case APPROVED ->
                    throw new ApplicationAlreadyApprovedException(applicationId);

            case REJECTED ->
                    throw new ApplicationAlreadyRejectedException(applicationId);

            case CANCELLED ->
                    throw new ApplicationAlreadyCancelledException(applicationId);

            default -> {
            }

        }

        if (!ALLOWED_TRANSITIONS
                .get(currentStatus)
                .contains(newStatus)) {

            throw new InvalidApplicationStatusTransitionException(
                    currentStatus,
                    newStatus
            );
        }

    }
}
