package com.cobuild.repository;

import com.cobuild.domain.Collaboration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollaborationRepository extends MongoRepository<Collaboration, String> {
    Optional<Collaboration> findByApplicationId(String applicationId);
    List<Collaboration> findByFounderIdOrBuilderId(String founderId, String builderId);
    Page<Collaboration> findByFounderIdOrBuilderId(String founderId, String builderId, Pageable pageable);
}
