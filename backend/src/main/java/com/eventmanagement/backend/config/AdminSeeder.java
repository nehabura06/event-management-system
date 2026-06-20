package com.eventmanagement.backend.config;

import com.eventmanagement.backend.entity.User;
import com.eventmanagement.backend.enums.Role;
import com.eventmanagement.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class AdminSeeder {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository =
                userRepository;

        this.passwordEncoder =
                passwordEncoder;
    }

    @PostConstruct
    public void createAdmin() {

        if (!userRepository.existsByEmail(
                "admin@eventsphere.com")) {

            User admin =
                    User.builder()
                            .name("Admin")
                            .email("admin@eventsphere.com")
                            .password(
                                    passwordEncoder.encode(
                                            "admin123"))
                            .role(Role.ADMIN)
                            .createdAt(
                                    LocalDateTime.now())
                            .build();

            userRepository.save(admin);
        }
    }
}