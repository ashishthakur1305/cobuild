package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "requirementPosts")
@CompoundIndexes({
    @CompoundIndex(name = "status_category_created_idx", def = "{'status': 1, 'category': 1, 'createdAt': -1}"),
    @CompoundIndex(name = "owner_status_idx", def = "{'ownerId': 1, 'status': 1}")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequirementPost {

    @Id
    private String id;

    @Indexed
    private String ownerId;

    private String companyId;

    private String companyName;

    private String ventureStage; // Pre-seed, Seed, Series A, Bootstrap

    @TextIndexed(weight = 3)
    private String title;

    @TextIndexed(weight = 2)
    private String businessContext;

    private String scope;

    @Builder.Default
    private List<String> deliverables = new ArrayList<>();

    @Builder.Default
    private List<String> acceptanceCriteria = new ArrayList<>();

    @Indexed
    private String category; // Engineering, Design, Product, Marketing, Sales, Operations, Finance

    @Indexed
    @Builder.Default
    private Set<String> requiredSkillIds = new HashSet<>();

    @Builder.Default
    private Set<String> preferredSkillIds = new HashSet<>();

    private String experienceLevel; // Junior, Mid, Senior, Lead/Principal

    @Builder.Default
    private TimeCommitment timeCommitment = new TimeCommitment();

    @Builder.Default
    private WorkMode workMode = WorkMode.REMOTE;

    private String location;

    private String timezone;

    @Builder.Default
    private PostCompensation compensation = new PostCompensation();

    @Indexed
    @Builder.Default
    private PostStatus status = PostStatus.OPEN;

    @Builder.Default
    private int applicantCount = 0;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TimeCommitment {
        private String type; // part_time, full_time, milestone
        private Integer hoursPerWeek;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostCompensation {
        private CompensationPreference type = CompensationPreference.BOTH;
        private String cashAmount;
        private String currency = "USD";
        private String equityRange; // e.g. "1.5% - 2.5%"
        private String vestingDetails;
    }
}
