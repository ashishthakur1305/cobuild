package com.cobuild.repository;

import com.cobuild.domain.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SkillRepository extends MongoRepository<Skill, String> {
    Optional<Skill> findByCanonicalNameIgnoreCase(String canonicalName);

    @Query("{ '$or': [ { 'canonicalName': { '$regex': ?0, '$options': 'i' } }, { 'aliases': { '$regex': ?0, '$options': 'i' } } ] }")
    Optional<Skill> findByCanonicalNameOrAlias(String nameOrAlias);
}
