package com.cybersoft.application_management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cybersoft.application_management.dto.request.LoginRequest;
import com.cybersoft.application_management.dto.request.RefreshTokenRequest;
import com.cybersoft.application_management.dto.request.RegisterRequest;
import com.cybersoft.application_management.dto.response.LoginResponse;
import com.cybersoft.application_management.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication Management APIs")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    @Operation(
            summary = "Register a new user",
            description = "Registers a new user and returns the login response with access and refresh tokens."
    )
    public ResponseEntity<LoginResponse> register(@Valid @RequestBody RegisterRequest request) {
        LoginResponse loginResponse = authService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(loginResponse);
    }
 

    @PostMapping("/login")
    @Operation(
            summary = "Login a user",
            description = "Authenticates a user and returns the login response with access and refresh tokens."
    )
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) { 
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh-token")
    @Operation(
            summary = "Refresh authentication token",
            description = "Generates a new access token using the refresh token."
    )
    public ResponseEntity<LoginResponse> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @PostMapping("/logout")
    @Operation(
            summary = "Logout a user",
            description = "Logs out a user by invalidating the provided refresh token."
    )
    public ResponseEntity<Void> logout(@Valid @RequestBody RefreshTokenRequest request) {
        authService.logout(request);
        return ResponseEntity.noContent().build();
    }

}
