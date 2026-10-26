package com.cobuild.repository;

import com.cobuild.domain.Application;
import com.cobuild.domain.ApplicationStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends MongoRepository<Application, String> {
    List<Application> findByPostId(String postId);
    Page<Application> findByPostId(String postId, Pageable pageable);
    List<Application> findByBuilderId(String builderId);
    Page<Application> findByBuilderId(String builderId, Pageable pageable);
    Optional<Application> findByPostIdAndBuilderId(String postId, String builderId);
    boolean existsByPostIdAndBuilderIdAndStatusIn(String postId, String builderId, List<ApplicationStatus> activeStatuses);
}
