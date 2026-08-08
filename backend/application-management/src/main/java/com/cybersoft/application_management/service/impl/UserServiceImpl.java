package com.cybersoft.application_management.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.dto.request.UpdateUserRequest;
import com.cybersoft.application_management.dto.response.UserResponse;
import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.exception.user.UserNotFoundException;
import com.cybersoft.application_management.mapper.UserMapper;
import com.cybersoft.application_management.repository.UserRepository;
import com.cybersoft.application_management.security.userdetails.SecurityUtils;
import com.cybersoft.application_management.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

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
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toResponse)
                .toList();
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
        user.setActive(false);
        userRepository.save(user);
        log.info("User deactivated. Id: {}", user.getId());
    }

    @Override
    public void activateUser(UUID userId) {
        User user = getUserOrThrow(userId);
        user.setActive(true);
        userRepository.save(user);
        log.info("User activated. Id: {}", user.getId());
    }

}
