package com.cobuild.repository;

import com.cobuild.domain.AdminAuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminAuditLogRepository extends MongoRepository<AdminAuditLog, String> {
    Page<AdminAuditLog> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
