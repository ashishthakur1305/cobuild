package com.cobuild.repository;

import com.cobuild.domain.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends MongoRepository<Review, String> {
    Optional<Review> findByCollaborationIdAndReviewerId(String collaborationId, String reviewerId);
    List<Review> findByRevieweeIdAndStatus(String revieweeId, String status);
    List<Review> findByCollaborationId(String collaborationId);
}
