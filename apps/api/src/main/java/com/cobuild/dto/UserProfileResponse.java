package com.cobuild.dto;

import com.cobuild.domain.CompensationPreference;
import com.cobuild.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResponse {
    private String id;
    private String displayName;
    private String avatarUrl;
    private String headline;
    private String bio;
    private String timezone;
    private Integer availabilityHoursPerWeek;
    private CompensationPreference compensationPreference;
    private List<String> links;
    private Set<String> roles;
    private Set<String> verifiedCheckTypes;
    private User.RatingAggregate ratingAggregate;
    private boolean isSelf;
    private String email; // Only populated when isSelf == true!
}
