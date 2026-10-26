package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "applications")
@CompoundIndex(name = "unique_active_builder_post_idx", def = "{'postId': 1, 'builderId': 1}")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Application {

    @Id
    private String id;

    @Indexed
    private String postId;

    @Indexed
    private String builderId;

    private String proposal;

    private String proposedCash;

    private String proposedEquity;

    @Builder.Default
    private List<String> links = new ArrayList<>();

    @Indexed
    @Builder.Default
    private ApplicationStatus status = ApplicationStatus.PENDING;

    private String founderPrivateNotes;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
