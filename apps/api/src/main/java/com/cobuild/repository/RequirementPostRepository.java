package com.cobuild.repository;

import com.cobuild.domain.PostStatus;
import com.cobuild.domain.RequirementPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequirementPostRepository extends MongoRepository<RequirementPost, String> {
    Page<RequirementPost> findByStatus(PostStatus status, Pageable pageable);
    Page<RequirementPost> findByStatusAndCategory(PostStatus status, String category, Pageable pageable);
    List<RequirementPost> findByOwnerId(String ownerId);
    Page<RequirementPost> findByOwnerId(String ownerId, Pageable pageable);
}
