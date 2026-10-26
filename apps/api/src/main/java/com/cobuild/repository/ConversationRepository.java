package com.cobuild.repository;

import com.cobuild.domain.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends MongoRepository<Conversation, String> {
    Optional<Conversation> findByCollaborationId(String collaborationId);
    List<Conversation> findByParticipantIdsContaining(String userId);
}
