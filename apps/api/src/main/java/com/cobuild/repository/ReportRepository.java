package com.cobuild.repository;

import com.cobuild.domain.Report;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {
    Page<Report> findByStatus(String status, Pageable pageable);
    List<Report> findByTargetTypeAndTargetId(String targetType, String targetId);
    long countByStatus(String status);
}
