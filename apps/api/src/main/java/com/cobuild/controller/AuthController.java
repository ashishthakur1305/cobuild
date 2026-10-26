package com.cobuild.controller;

import com.cobuild.dto.ApiResponse;
import com.cobuild.dto.AuthRequest;
import com.cobuild.dto.AuthResponse;
import com.cobuild.dto.RegisterRequest;
import com.cobuild.security.UserPrincipal;
import com.cobuild.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request,
                                                              HttpServletResponse response) {
        AuthResponse authResponse = authService.register(request, response);
        return ResponseEntity.ok(ApiResponse.ok("Registration successful", authResponse));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request,
                                                           HttpServletResponse response) {
        AuthResponse authResponse = authService.login(request, response);
        return ResponseEntity.ok(ApiResponse.ok("Login successful", authResponse));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.ok(ApiResponse.ok("Logged out successfully", null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponse>> getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.ok(ApiResponse.ok(null));
        }
        AuthResponse userResponse = authService.getCurrentUser(principal.getId());
        return ResponseEntity.ok(ApiResponse.ok(userResponse));
    }
}
