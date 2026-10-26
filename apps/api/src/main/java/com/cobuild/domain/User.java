package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String passwordHash;

    private String displayName;

    @Builder.Default
    private Set<Role> roles = new HashSet<>();

    private String avatarUrl;

    private String headline;

    private String bio;

    private String timezone;

    private Integer availabilityHoursPerWeek;

    private String workPreferences;

    @Builder.Default
    private CompensationPreference compensationPreference = CompensationPreference.NOT_SPECIFIED;

    @Builder.Default
    private List<String> links = new ArrayList<>();

    @Builder.Default
    private Set<String> skillIds = new HashSet<>();

    @Builder.Default
    private UserStatus status = UserStatus.ACTIVE;

    @Builder.Default
    private boolean emailVerified = false;

    @Builder.Default
    private boolean mfaEnabled = false;

    private String mfaSecret;

    @Builder.Default
    private RatingAggregate ratingAggregate = new RatingAggregate(0.0, 0);

    @Builder.Default
    private Set<String> verifiedCheckTypes = new HashSet<>(); // EMAIL, IDENTITY, COMPANY, PORTFOLIO

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RatingAggregate {
        private double averageRating = 0.0;
        private int totalReviews = 0;
    }
}
