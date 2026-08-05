package com.cybersoft.application_management.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    USER_NOT_FOUND("USER_NOT_FOUND"),
    USER_ALREADY_EXISTS("USER_ALREADY_EXISTS"),
    INVALID_CREDENTIALS("INVALID_CREDENTIALS"),
    FORM_TYPE_NOT_FOUND("FORM_TYPE_NOT_FOUND"),
    ATTACHMENT_NOT_FOUND("ATTACHMENT_NOT_FOUND"),
    APPLICATION_FORM_NOT_FOUND("APPLICATION_FORM_NOT_FOUND"),
    INVALID_FILE_TYPE("INVALID_FILE_TYPE"),
    FILE_SIZE_EXCEEDED("FILE_SIZE_EXCEEDED"),
    INTERNAL_SERVER_ERROR("INTERNAL_SERVER_ERROR");
    

    private final String code;
    
}
