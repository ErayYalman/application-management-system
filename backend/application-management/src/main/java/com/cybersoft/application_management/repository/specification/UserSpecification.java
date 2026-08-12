package com.cybersoft.application_management.repository.specification;

import org.springframework.data.jpa.domain.Specification;

import com.cybersoft.application_management.dto.request.UserSearchRequest;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.UserRole;

public final class UserSpecification {

    private UserSpecification() {
    }

    public static Specification<User> containsKeyword(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.isBlank()) {
                return criteriaBuilder.conjunction();
            }

            String pattern = "%" + keyword.trim().toLowerCase() + "%";

            return criteriaBuilder.or(

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("name")),
                            pattern),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("surname")),
                            pattern),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("email")),
                            pattern));
        };
    }

    public static Specification<User> hasRole(UserRole role) {

        return (root, query, criteriaBuilder) -> {

            if (role == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("role"),
                    role);
        };
    }

    public static Specification<User> hasActive(Boolean active) {

        return (root, query, criteriaBuilder) -> {

            if (active == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(
                    root.get("active"),
                    active);
        };
    }

    public static Specification<User> build(
            UserSearchRequest request) {

        return Specification.allOf(
                containsKeyword(request.getKeyword()),
                hasRole(request.getRole()),
                hasActive(request.getActive()));
    }

}
