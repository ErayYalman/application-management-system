package com.cybersoft.application_management.validation.validator;

import java.util.regex.Pattern;

import com.cybersoft.application_management.validation.annotation.ValidPassword;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    private static final Pattern PASSWORD_PATTERN = Pattern
            .compile("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,255}$");

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {

        if (password == null) {
            return false;
        }

        boolean isValid = PASSWORD_PATTERN.matcher(password).matches();

        if (!isValid) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.")
                    .addConstraintViolation();
        }

        return isValid;
    }

}
