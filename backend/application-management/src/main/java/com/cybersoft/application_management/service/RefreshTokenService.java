package com.cybersoft.application_management.service;

import java.time.Instant;
import java.util.Optional;

import com.cybersoft.application_management.entity.RefreshToken;
import com.cybersoft.application_management.entity.User;

public interface RefreshTokenService {
    RefreshToken create( User user, String token, Instant expiresAt);

    RefreshToken validate(String tokenHash);

    Optional<RefreshToken> findByTokenHash(String tokenHash);

    void deleteByTokenHash(String tokenHash);

    void deleteByUser(User user);

}
