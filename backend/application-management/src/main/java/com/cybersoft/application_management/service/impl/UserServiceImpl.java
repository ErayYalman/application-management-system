package com.cybersoft.application_management.service.impl;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.request.UpdateUserRequest;
import com.cybersoft.application_management.dto.request.UserSearchRequest;
import com.cybersoft.application_management.dto.response.UserResponse;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.UserRole;
import com.cybersoft.application_management.exception.user.UserNotFoundException;
import com.cybersoft.application_management.mapper.UserMapper;
import com.cybersoft.application_management.repository.UserRepository;
import com.cybersoft.application_management.repository.specification.UserSpecification;
import com.cybersoft.application_management.security.userdetails.SecurityUtils;
import com.cybersoft.application_management.service.UserService;
import com.cybersoft.application_management.service.validator.UserValidator;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final UserValidator userValidator;

    private User getUserOrThrow(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + userId));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        return userMapper.toResponse(getUserOrThrow(currentUserId));
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(UUID userId) {
        return userMapper.toResponse(getUserOrThrow(userId));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserResponse> getAllUsers(UserSearchRequest request, Pageable pageable) {
        Specification<User> specification = UserSpecification.build(request);
        Page<User> users = userRepository.findAll(specification, pageable);
        return users.map(userMapper::toResponse);
    }

    @Override
    public UserResponse updateCurrentUser(UpdateUserRequest request) {
        UUID currentUserId = SecurityUtils.getCurrentUserId();
        User user = getUserOrThrow(currentUserId);
        userMapper.update(request, user);
        User updatedUser = userRepository.save(user);
        log.info("Current user updated. Id: {}", updatedUser.getId());
        return userMapper.toResponse(updatedUser);
    }

    @Override
    public UserResponse updateUser(UUID userId, UpdateUserRequest request) {
        User user = getUserOrThrow(userId);
        userMapper.update(request, user);
        User updatedUser = userRepository.save(user);
        log.info("User updated by admin. Id: {}", updatedUser.getId());
        return userMapper.toResponse(updatedUser);
    }

    @Override
    public void deactivateUser(UUID userId) {
        User user = getUserOrThrow(userId);
        userValidator.validateDeactivation(user);
        if (user.getRole() == UserRole.ADMIN) {

            long activeAdminCount = userRepository.countByRoleAndActive(
                    UserRole.ADMIN,
                    true);

            if (activeAdminCount <= 1) {
                throw new IllegalStateException(
                        "The last active admin cannot be deactivated.");
            }
        }
        user.setActive(false);
        log.info(
                "User deactivated. Id: {}",
                user.getId());
    }

    @Override
    public void activateUser(UUID userId) {
        User user = getUserOrThrow(userId);
        userValidator.validateActivation(user);
        user.setActive(true);
        log.info(
                "User activated. Id: {}",
                user.getId());
    }

}
