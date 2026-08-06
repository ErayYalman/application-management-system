package com.cybersoft.application_management.service;

import com.cybersoft.application_management.dto.request.LoginRequest;
import com.cybersoft.application_management.dto.request.RefreshTokenRequest;
import com.cybersoft.application_management.dto.request.RegisterRequest;
import com.cybersoft.application_management.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
    LoginResponse refreshToken(RefreshTokenRequest request);
    void logout(RefreshTokenRequest request);

}
