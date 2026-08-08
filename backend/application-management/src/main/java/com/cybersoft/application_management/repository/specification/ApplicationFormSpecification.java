package com.cybersoft.application_management.repository.specification;

import java.time.Instant;
import java.util.UUID;

import org.springframework.data.jpa.domain.Specification;

import com.cybersoft.application_management.dto.request.ApplicationSearchRequest;
import com.cybersoft.application_management.entity.ApplicationForm;
import com.cybersoft.application_management.enums.ApplicationStatus;

import jakarta.persistence.criteria.JoinType;

public final class ApplicationFormSpecification {
    private ApplicationFormSpecification() {
    }

    public static Specification<ApplicationForm> hasStatus(ApplicationStatus status) {

        return (root, query, criteriaBuilder) -> {

            if (status == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(root.get("status"), status);
        };
    }

    public static Specification<ApplicationForm> hasFormType(UUID formTypeId) {

        return (root, query, criteriaBuilder) -> {

            if (formTypeId == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("formType").get("id"),
                    formTypeId);
        };
    }

    public static Specification<ApplicationForm> fetchDetails() {
        return (root, query, criteriaBuilder) -> {

            if (query.getResultType() != Long.class && query.getResultType() != long.class) {

                root.fetch("user", JoinType.LEFT);
                root.fetch("formType", JoinType.LEFT);
                query.distinct(true);
            }
            return criteriaBuilder.conjunction();
        };
    }

    public static Specification<ApplicationForm> containsKeyword(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            String pattern = "%" + keyword.trim().toLowerCase() + "%";

            return criteriaBuilder.or(

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("title")),
                            pattern),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("description")),
                            pattern));
        };
    }

    public static Specification<ApplicationForm> createdBetween(
            Instant startDate,
            Instant endDate) {

        return (root, query, criteriaBuilder) -> {

            if (startDate == null && endDate == null) {
                return criteriaBuilder.conjunction();
            }

            if (startDate != null && endDate != null) {
                return criteriaBuilder.between(
                        root.get("createdAt"),
                        startDate,
                        endDate);
            }

            if (startDate != null) {
                return criteriaBuilder.greaterThanOrEqualTo(
                        root.get("createdAt"),
                        startDate);
            }

            return criteriaBuilder.lessThanOrEqualTo(
                    root.get("createdAt"),
                    endDate);
        };
    }

    public static Specification<ApplicationForm> build(
            ApplicationSearchRequest request) {

        return build(request, null);
    }

    public static Specification<ApplicationForm> build(
            ApplicationSearchRequest request, UUID userId) {

        return Specification.allOf(
                fetchDetails(),
                hasUser(userId),
                hasStatus(request.getStatus()),
                hasFormType(request.getFormTypeId()),
                containsKeyword(request.getKeyword()),
                createdBetween(
                        request.getStartDate(),
                        request.getEndDate()));
    }

    public static Specification<ApplicationForm> hasUser(UUID userId) {

        return (root, query, criteriaBuilder) -> {

            if (userId == null) {
                return null;
            }

            return criteriaBuilder.equal(
                    root.get("user").get("id"),
                    userId);
        };
    }

    public static Specification<ApplicationForm> hasId(UUID applicationId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(
                root.get("id"),
                applicationId);
    }

}
