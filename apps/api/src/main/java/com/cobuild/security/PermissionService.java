package com.cobuild.security;

import com.cobuild.domain.Application;
import com.cobuild.domain.Collaboration;
import com.cobuild.domain.Conversation;
import com.cobuild.domain.RequirementPost;
import com.cobuild.repository.ApplicationRepository;
import com.cobuild.repository.CollaborationRepository;
import com.cobuild.repository.ConversationRepository;
import com.cobuild.repository.RequirementPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service("permissionService")
@RequiredArgsConstructor
public class PermissionService {

    private final RequirementPostRepository postRepository;
    private final ApplicationRepository applicationRepository;
    private final CollaborationRepository collaborationRepository;
    private final ConversationRepository conversationRepository;

    public String getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof UserPrincipal)) {
            return null;
        }
        return ((UserPrincipal) auth.getPrincipal()).getId();
    }

    public boolean isPostOwner(String postId) {
        String userId = getCurrentUserId();
        if (userId == null) return false;
        return postRepository.findById(postId)
                .map(post -> userId.equals(post.getOwnerId()))
                .orElse(false);
    }

    public boolean canAccessApplication(String applicationId) {
        String userId = getCurrentUserId();
        if (userId == null) return false;

        return applicationRepository.findById(applicationId)
                .map(app -> {
                    if (userId.equals(app.getBuilderId())) return true;
                    return postRepository.findById(app.getPostId())
                            .map(post -> userId.equals(post.getOwnerId()))
                            .orElse(false);
                })
                .orElse(false);
    }

    public boolean canAccessCollaboration(String collaborationId) {
        String userId = getCurrentUserId();
        if (userId == null) return false;

        return collaborationRepository.findById(collaborationId)
                .map(collab -> userId.equals(collab.getFounderId()) || userId.equals(collab.getBuilderId()))
                .orElse(false);
    }

    public boolean canAccessConversation(String conversationId) {
        String userId = getCurrentUserId();
        if (userId == null) return false;

        return conversationRepository.findById(conversationId)
                .map(conv -> conv.getParticipantIds().contains(userId))
                .orElse(false);
    }
}
