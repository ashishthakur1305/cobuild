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

@Document(collection = "collaborations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Collaboration {

    @Id
    private String id;

    @Indexed(unique = true)
    private String applicationId;

    @Indexed
    private String postId;

    @Indexed
    private String founderId;

    @Indexed
    private String builderId;

    @Indexed
    @Builder.Default
    private CollaborationStatus status = CollaborationStatus.PENDING_SETUP;

    @Builder.Default
    private TermsChecklist termsChecklist = new TermsChecklist();

    @Builder.Default
    private Set<String> termsConfirmedBy = new HashSet<>();

    private Instant startAt;

    private Instant endAt;

    @Builder.Default
    private List<StatusHistoryEntry> statusHistory = new ArrayList<>();

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TermsChecklist {
        @Builder.Default
        private boolean scopeConfirmedByFounder = true;
        @Builder.Default
        private boolean scopeConfirmedByBuilder = true;

        @Builder.Default
        private boolean compensationConfirmedByFounder = true;
        @Builder.Default
        private boolean compensationConfirmedByBuilder = false;

        @Builder.Default
        private boolean ipConfirmedByFounder = true;
        @Builder.Default
        private boolean ipConfirmedByBuilder = false;

        @Builder.Default
        private boolean confidentialityConfirmedByFounder = true;
        @Builder.Default
        private boolean confidentialityConfirmedByBuilder = true;

        @Builder.Default
        private boolean governingLawConfirmedByFounder = true;
        @Builder.Default
        private boolean governingLawConfirmedByBuilder = true;

        public boolean isAllConfirmed() {
            return scopeConfirmedByFounder && scopeConfirmedByBuilder &&
                   compensationConfirmedByFounder && compensationConfirmedByBuilder &&
                   ipConfirmedByFounder && ipConfirmedByBuilder &&
                   confidentialityConfirmedByFounder && confidentialityConfirmedByBuilder &&
                   governingLawConfirmedByFounder && governingLawConfirmedByBuilder;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class StatusHistoryEntry {
        private CollaborationStatus fromStatus;
        private CollaborationStatus toStatus;
        private String changedByUserId;
        private String reason;
        private Instant timestamp;
    }
}
