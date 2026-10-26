package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "reviews")
@CompoundIndex(name = "collab_reviewer_unique_idx", def = "{'collaborationId': 1, 'reviewerId': 1}", unique = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    private String id;

    @Indexed
    private String collaborationId;

    @Indexed
    private String reviewerId;

    @Indexed
    private String revieweeId;

    private int rating; // 1-5

    private String text;

    @Builder.Default
    private String status = "VISIBLE"; // VISIBLE, FLAGGED, REMOVED

    @CreatedDate
    private Instant createdAt;
}
