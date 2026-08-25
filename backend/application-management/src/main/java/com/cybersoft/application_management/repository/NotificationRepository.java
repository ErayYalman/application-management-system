package com.cybersoft.application_management.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.cybersoft.application_management.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {

    List<Notification> findAllByUser_IdOrderByCreatedAtDesc(
            UUID userId);

    List<Notification> findAllByUser_IdAndReadFalseOrderByCreatedAtDesc(
            UUID userId);

    long countByUser_IdAndReadFalse(
            UUID userId);

    Optional<Notification> findByIdAndUser_Id(
            UUID notificationId,
            UUID userId);

    void deleteByIdAndUser_Id(
            UUID notificationId,
            UUID userId);

    void deleteAllByUser_Id(UUID userId);
}