package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Report {

    @Id
    private String id;

    @Indexed
    private String reporterId;

    @Indexed
    private String targetType; // USER, POST, MESSAGE, REVIEW

    @Indexed
    private String targetId;

    private String reason; // scam/fraud, impersonation, misleading_compensation, harassment, spam, ip_copyright, unsafe_content, other

    private String description;

    @Builder.Default
    private List<String> evidenceRefs = new ArrayList<>();

    @Builder.Default
    private String priority = "MEDIUM"; // LOW, MEDIUM, HIGH, URGENT

    @Indexed
    @Builder.Default
    private String status = "NEW"; // NEW, TRIAGED, IN_REVIEW, WAITING_FOR_INFO, RESOLVED, DISMISSED, APPEALED

    private String assigneeId;

    private String internalNotes;

    private String resolution;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
