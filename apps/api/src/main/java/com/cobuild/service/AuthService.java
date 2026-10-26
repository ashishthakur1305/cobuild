package com.cobuild.service;

import com.cobuild.domain.Role;
import com.cobuild.domain.User;
import com.cobuild.domain.UserStatus;
import com.cobuild.dto.AuthRequest;
import com.cobuild.dto.AuthResponse;
import com.cobuild.dto.RegisterRequest;
import com.cobuild.repository.UserRepository;
import com.cobuild.security.JwtTokenProvider;
import com.cobuild.security.UserPrincipal;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    @Value("${app.jwt.cookie-name:cobuild_jwt}")
    private String cookieName;

    @Value("${app.jwt.expiration-ms:86400000}")
    private long jwtExpirationMs;

    public AuthResponse register(RegisterRequest request, HttpServletResponse response) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered: " + request.getEmail());
        }

        Set<Role> roles = new HashSet<>();
        if ("FOUNDER".equalsIgnoreCase(request.getPrimaryRole())) {
            roles.add(Role.ROLE_FOUNDER);
        } else if ("BOTH".equalsIgnoreCase(request.getPrimaryRole())) {
            roles.add(Role.ROLE_BOTH);
            roles.add(Role.ROLE_FOUNDER);
            roles.add(Role.ROLE_BUILDER);
        } else {
            roles.add(Role.ROLE_BUILDER);
        }

        User user = User.builder()
                .displayName(request.getDisplayName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .roles(roles)
                .headline(request.getHeadline() != null ? request.getHeadline() : "Collaborative Innovator")
                .status(UserStatus.ACTIVE)
                .emailVerified(true) // Auto-verified in development
                .build();

        User savedUser = userRepository.save(user);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(savedUser.getId());

        addAuthCookie(response, token);

        return buildAuthResponse(savedUser, token, refreshToken);
    }

    public AuthResponse login(AuthRequest request, HttpServletResponse response) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(principal.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        String token = tokenProvider.generateAccessToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(user.getId());

        addAuthCookie(response, token);

        return buildAuthResponse(user, token, refreshToken);
    }

    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public AuthResponse getCurrentUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return buildAuthResponse(user, null, null);
    }

    private void addAuthCookie(HttpServletResponse response, String token) {
        Cookie cookie = new Cookie(cookieName, token);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge((int) (jwtExpirationMs / 1000));
        // cookie.setSecure(true); // enabled in production with HTTPS
        response.addCookie(cookie);
    }

    private AuthResponse buildAuthResponse(User user, String token, String refreshToken) {
        Set<String> roleNames = user.getRoles().stream()
                .map(Role::name)
                .collect(Collectors.toSet());

        return AuthResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .displayName(user.getDisplayName())
                .avatarUrl(user.getAvatarUrl())
                .roles(roleNames)
                .verifiedCheckTypes(user.getVerifiedCheckTypes())
                .token(token)
                .refreshToken(refreshToken)
                .build();
    }
}
