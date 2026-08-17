package com.cybersoft.application_management.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cybersoft.application_management.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Background scheduled job for periodic housekeeping of expired and revoked refresh tokens.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RefreshTokenCleanupScheduler {

    private final RefreshTokenService refreshTokenService;

    /**
     * Cleans up expired and revoked refresh tokens from the database.
     * Runs every day at 03:30 AM by default, or as configured via application properties.
     */
    @Scheduled(cron = "${app.jwt.refresh-token-cleanup-cron:0 30 3 * * *}")
    public void cleanupExpiredTokens() {
        log.info("Starting scheduled cleanup for expired and revoked refresh tokens...");
        int count = refreshTokenService.purgeExpiredTokens();
        log.info("Completed scheduled cleanup for refresh tokens. Total deleted: {}", count);
    }
}
