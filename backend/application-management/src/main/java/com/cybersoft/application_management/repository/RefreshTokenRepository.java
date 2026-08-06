package com.cybersoft.application_management.repository;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cybersoft.application_management.entity.RefreshToken;
import com.cybersoft.application_management.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByTokenHash(String tokenHash);
    void deleteByTokenHash(String tokenHash);
    void deleteByUser(User user);
    void deleteAllByUser_Id(UUID userId);
    void deleteAllByExpiresAtBefore(Instant instant);
    
}
