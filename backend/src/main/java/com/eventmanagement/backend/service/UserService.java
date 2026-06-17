    package com.eventmanagement.backend.service;

    import com.eventmanagement.backend.dto.AuthResponse;
    import com.eventmanagement.backend.dto.RegisterRequest;
    import com.eventmanagement.backend.dto.LoginRequest;
    import com.eventmanagement.backend.entity.User;
    import com.eventmanagement.backend.repository.UserRepository;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.stereotype.Service;
    import com.eventmanagement.backend.security.JwtService;

    import java.time.LocalDateTime;

    @Service
    public class UserService {

        private final UserRepository userRepository;
        private final BCryptPasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        public UserService(UserRepository userRepository,
                           BCryptPasswordEncoder passwordEncoder,
                           JwtService jwtService) {

            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
            this.jwtService = jwtService;
        }

        public AuthResponse register(RegisterRequest request) {

            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already exists");
            }

            User user = User.builder()
                    .name(request.getName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .role(request.getRole())
                    .createdAt(LocalDateTime.now())
                    .build();

            userRepository.save(user);

            String token = jwtService.generateToken(
                    user.getEmail(),
                    user.getRole().name()
            );

            return new AuthResponse(
                    "User registered successfully",
                    token
            );
        }
        public String login(LoginRequest request) {

            System.out.println("Email: " + request.getEmail());

            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid email or password"));

            System.out.println("DB Password: " + user.getPassword());

            System.out.println(
                    passwordEncoder.matches(
                            request.getPassword(),
                            user.getPassword()
                    )
            );

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid email or password");
            }

    //        return "Login successful";
            return jwtService.generateToken(
                    user.getEmail(),
                    user.getRole().name()
            );
        }
    }