package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "adminAuditLogs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminAuditLog {

    @Id
    private String id;

    @Indexed
    private String actorId;

    private String actorName;

    private String action; // USER_VERIFIED, USER_SUSPENDED, POST_REMOVED, REPORT_RESOLVED, etc.

    @Indexed
    private String targetType;

    @Indexed
    private String targetId;

    private String reason;

    @CreatedDate
    @Indexed
    private Instant createdAt;
}
