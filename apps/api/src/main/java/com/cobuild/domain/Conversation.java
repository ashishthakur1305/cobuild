package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "conversations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Conversation {

    @Id
    private String id;

    @Indexed
    private String collaborationId;

    private String applicationId;

    @Builder.Default
    private List<String> participantIds = new ArrayList<>(); // exactly 2 participants

    @CreatedDate
    private Instant createdAt;

    private Instant lastMessageAt;
}
