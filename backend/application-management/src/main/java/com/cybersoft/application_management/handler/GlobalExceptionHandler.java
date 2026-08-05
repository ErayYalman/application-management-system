package com.cybersoft.application_management.handler;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.cybersoft.application_management.exception.BusinessException;
import com.cybersoft.application_management.exception.ErrorCode;
import com.cybersoft.application_management.exception.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Order(value = 1)
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    private ErrorResponse buildErrorResponse(HttpStatus status, ErrorCode errorCode, String message, HttpServletRequest request) {
        return buildErrorResponse(status, errorCode, message, request, null);
    }

    private ErrorResponse buildErrorResponse(HttpStatus status, ErrorCode errorCode, String message, HttpServletRequest request, Map<String, String> validationErrors) {
        return ErrorResponse.builder()
                .timestamp(Instant.now())
                .status(status.value())
                .error(status.getReasonPhrase())
                .errorCode(errorCode.name())
                .message(message)
                .path(request.getRequestURI())
                .validationErrors(validationErrors)
                .build();
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(BusinessException ex, HttpServletRequest request) {
        log.warn("{} - {} - Path: {}", ex.getErrorCode(), ex.getMessage(), request.getRequestURI());
        
        HttpStatus status = ex.getErrorCode().getHttpStatus();
        return ResponseEntity
                .status(status.value())
                .body(buildErrorResponse(status, ex.getErrorCode(), ex.getMessage(), request));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        log.warn("Validation failed for request: {}", request.getRequestURI());
        
        Map<String, String> validationErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        FieldError::getDefaultMessage,
                        (existing, replacement) -> existing,
                        LinkedHashMap::new
                ));

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(buildErrorResponse(HttpStatus.BAD_REQUEST, ErrorCode.VALIDATION_ERROR, "Validation failed", request, validationErrors));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex, HttpServletRequest request) {
        log.warn("Access denied. Path: {}", request.getRequestURI());
        
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(buildErrorResponse(HttpStatus.FORBIDDEN, ErrorCode.FORBIDDEN, "Access denied.", request));
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex, HttpServletRequest request) {
        log.warn("Authentication failed. Path: {}", request.getRequestURI());
        
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(buildErrorResponse(HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, "Authentication failed.", request));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, HttpServletRequest request) {
        log.error(
                "Unexpected exception occurred. Path: {}, Message: {}",
                request.getRequestURI(),
                ex.getMessage(),
                ex
        );
        
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_SERVER_ERROR, "An unexpected error occurred.", request));
    }
}