package com.cybersoft.application_management.config;

import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.cybersoft.application_management.entity.User;
import com.cybersoft.application_management.enums.UserRole;
import com.cybersoft.application_management.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class AdminInitializer implements CommandLineRunner {

    private final AdminProperties adminProperties;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {

        Optional<User> existingUser = userRepository.findByEmail(adminProperties.getEmail());
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (user.getRole() == UserRole.ADMIN) {
                log.info("Admin user already exists. Skipping admin initialization.");
                return;
            }
            throw new IllegalStateException(
                    "Configured admin email already belongs to a non-admin user.");
        }

        User adminUser = new User();
        adminUser.setEmail(adminProperties.getEmail());
        adminUser.setPassword(passwordEncoder.encode(adminProperties.getPassword()));
        adminUser.setName(adminProperties.getName());
        adminUser.setSurname(adminProperties.getSurname());
        adminUser.setRole(UserRole.ADMIN);
        adminUser.setActive(true);
        userRepository.save(adminUser);
        log.info("Initial admin user created successfully. Email: {}", adminUser.getEmail());
    }

}
