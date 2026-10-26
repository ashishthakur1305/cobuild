package com.cobuild.controller;

import com.cobuild.domain.Role;
import com.cobuild.domain.User;
import com.cobuild.dto.ApiResponse;
import com.cobuild.dto.UserProfileResponse;
import com.cobuild.repository.UserRepository;
import com.cobuild.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getUserProfile(
            @PathVariable String id,
            @AuthenticationPrincipal UserPrincipal principal) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + id));

        boolean isSelf = principal != null && principal.getId().equals(user.getId());

        UserProfileResponse response = UserProfileResponse.builder()
                .id(user.getId())
                .displayName(user.getDisplayName())
                .avatarUrl(user.getAvatarUrl())
                .headline(user.getHeadline())
                .bio(user.getBio())
                .timezone(user.getTimezone())
                .availabilityHoursPerWeek(user.getAvailabilityHoursPerWeek())
                .compensationPreference(user.getCompensationPreference())
                .links(user.getLinks())
                .roles(user.getRoles().stream().map(Role::name).collect(Collectors.toSet()))
                .verifiedCheckTypes(user.getVerifiedCheckTypes())
                .ratingAggregate(user.getRatingAggregate())
                .isSelf(isSelf)
                .email(isSelf ? user.getEmail() : null) // Strictly protect email from leaking!
                .build();

        return ResponseEntity.ok(ApiResponse.ok(response));
    }
}
