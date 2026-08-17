package com.cybersoft.application_management.service.impl;

import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.entity.RefreshToken;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.exception.refresh.InvalidRefreshTokenException;
import com.cybersoft.application_management.exception.refresh.RefreshTokenExpiredException;
import com.cybersoft.application_management.repository.RefreshTokenRepository;
import com.cybersoft.application_management.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public RefreshToken create(User user, String token, Instant expiresAt) {
        RefreshToken savedToken = refreshTokenRepository.save(
                        RefreshToken.builder()
                                .user(user)
                                .tokenHash(token)
                                .expiresAt(expiresAt)
                                .build());

        log.info("Created refresh token for user: {}", user.getEmail());
        return savedToken;
    }

    @Override
    public RefreshToken validate(String tokenHash) {
        RefreshToken refreshToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(InvalidRefreshTokenException::new);
        if (Boolean.TRUE.equals(refreshToken.getRevoked())) {
            throw new InvalidRefreshTokenException(
                    "Refresh token has been revoked.");
        }
        if (refreshToken.getExpiresAt().isBefore(Instant.now())) {
            throw new RefreshTokenExpiredException();
        }
        return refreshToken;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<RefreshToken> findByTokenHash(String tokenHash) {
        return refreshTokenRepository.findByTokenHash(tokenHash);
    }

    @Override
    public void deleteByTokenHash(String tokenHash) {
        refreshTokenRepository.findByTokenHash(tokenHash)
                .ifPresent(refreshToken -> {
                    refreshTokenRepository.delete(refreshToken);
                    log.info(
                            "Refresh token deleted for user: {}",
                            refreshToken.getUser().getEmail());
                });
    }

    @Override
    public void deleteByUser(User user) {
        refreshTokenRepository.deleteAllByUser_Id(user.getId());
        log.info("All refresh tokens deleted for user: {}", user.getEmail());
    }

    @Override
    public int purgeExpiredTokens() {
        int deletedCount = refreshTokenRepository.deleteExpiredOrRevokedTokens(Instant.now());
        if (deletedCount > 0) {
            log.info("Cleaned up {} expired or revoked refresh tokens from database.", deletedCount);
        }
        return deletedCount;
    }

}
