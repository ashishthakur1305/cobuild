package com.cobuild.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "messages")
@CompoundIndex(name = "conv_created_idx", def = "{'conversationId': 1, 'createdAt': -1}")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    private String id;

    @Indexed
    private String conversationId;

    @Indexed
    private String senderId;

    private String senderName;

    private String senderAvatar;

    private String body;

    @Builder.Default
    private String type = "TEXT"; // TEXT, SYSTEM_HANDSHAKE, EXTERNAL_LINK, PROPOSAL

    private boolean containsExternalLink;

    private String detectedExternalUrl;

    @Builder.Default
    private String status = "SENT"; // SENT, DELIVERED, READ

    private Instant readAt;

    @CreatedDate
    private Instant createdAt;
}
