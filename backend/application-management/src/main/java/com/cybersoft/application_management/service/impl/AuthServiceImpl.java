package com.cybersoft.application_management.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.request.LoginRequest;
import com.cybersoft.application_management.dto.request.RefreshTokenRequest;
import com.cybersoft.application_management.dto.request.RegisterRequest;
import com.cybersoft.application_management.dto.response.LoginResponse;
import com.cybersoft.application_management.entity.RefreshToken;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.UserRole;
import com.cybersoft.application_management.exception.user.UserAlreadyExistsException;
import com.cybersoft.application_management.exception.user.UserNotFoundException;
import com.cybersoft.application_management.mapper.AuthMapper;
import com.cybersoft.application_management.repository.UserRepository;
import com.cybersoft.application_management.security.hash.HashService;
import com.cybersoft.application_management.security.jwt.GeneratedToken;
import com.cybersoft.application_management.security.jwt.JwtService;
import com.cybersoft.application_management.security.userdetails.CustomUserDetails;
import com.cybersoft.application_management.service.AuthService;
import com.cybersoft.application_management.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthMapper authMapper;
    private final HashService hashService;

    private LoginResponse createLoginResponse(User user) {

        UserDetails userDetails = CustomUserDetails.fromUser(user);

        GeneratedToken accessToken = jwtService.generateAccessToken(userDetails);

        GeneratedToken refreshToken = jwtService.generateRefreshToken(userDetails);

        refreshTokenService.create(
                user,
                hashService.hash(refreshToken.token()),
                refreshToken.expiresAt());

        return LoginResponse.builder()
                .accessToken(accessToken.token())
                .refreshToken(refreshToken.token())
                .tokenType("Bearer")
                .expiresAt(accessToken.expiresAt())
                .user(authMapper.toUserResponse(user))
                .build();
    }

    @Override
    public LoginResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException(request.getEmail());
        }

        User user = authMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(UserRole.PERSONNEL);
        user.setActive(true);
        User savedUser = userRepository.save(user);
        log.info("New user registered with email: {}", savedUser.getEmail());

        return createLoginResponse(savedUser);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException(request.getEmail()));

        log.info(
                "User logged in successfully. UserId: {}, Email: {}",
                user.getId(),
                user.getEmail());

        return createLoginResponse(user);
    }

    @Override
    public LoginResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        jwtService.validateRefreshToken(refreshToken);
        String tokenHash = hashService.hash(refreshToken);
        RefreshToken storedToken = refreshTokenService.validate(tokenHash);
        User user = storedToken.getUser();
        refreshTokenService.deleteByTokenHash(tokenHash);
        log.info(
                "Refresh token rotated for user: {}",
                user.getEmail());

        return createLoginResponse(user);
    }

    @Override
    public void logout(RefreshTokenRequest request) {
        String tokenHash = hashService.hash(request.getRefreshToken());
        refreshTokenService.deleteByTokenHash(tokenHash);
        log.info("User logged out successfully.");
    }

}
