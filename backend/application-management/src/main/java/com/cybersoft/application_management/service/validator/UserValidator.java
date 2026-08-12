package com.cybersoft.application_management.service.validator;

import org.springframework.stereotype.Component;

import com.cybersoft.application_management.entity.User;

@Component
public class UserValidator {

    public void validateDeactivation(User user) {

        if (!user.isActive()) {
            throw new IllegalStateException(
                    "User is already inactive.");
        }
    }

    public void validateActivation(User user) {

        if (user.isActive()) {
            throw new IllegalStateException(
                    "User is already active.");
        }
    }

}
