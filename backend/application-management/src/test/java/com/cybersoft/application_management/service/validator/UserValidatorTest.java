package com.cybersoft.application_management.service.validator;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.cybersoft.application_management.entity.User;

class UserValidatorTest {

    private UserValidator userValidator;

    @BeforeEach
    void setUp() {
        userValidator = new UserValidator();
    }

    @Test
    void activeUserCannotBeActivatedAgain() {

        User user = new User();
        user.setActive(true);

        assertThrows(
                IllegalStateException.class,
                () -> userValidator.validateActivation(user));
    }

    @Test
    void inactiveUserCanBeActivated() {

        User user = new User();
        user.setActive(false);

        assertDoesNotThrow(() -> userValidator.validateActivation(user));
    }

    @Test
    void inactiveUserCannotBeDeactivatedAgain() {

        User user = new User();
        user.setActive(false);

        assertThrows(
                IllegalStateException.class,
                () -> userValidator.validateDeactivation(user));
    }

    @Test
    void activeUserCanBeDeactivated() {

        User user = new User();
        user.setActive(true);

        assertDoesNotThrow(() -> userValidator.validateDeactivation(user));
    }
}