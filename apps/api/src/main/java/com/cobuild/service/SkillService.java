package com.cobuild.service;

import com.cobuild.domain.Skill;
import com.cobuild.repository.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkillService {

    private final SkillRepository skillRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Skill getOrCreateSkill(String name, String category) {
        String cleanName = name.trim();
        Optional<Skill> existing = skillRepository.findByCanonicalNameOrAlias(cleanName);
        if (existing.isPresent()) {
            return existing.get();
        }

        Skill newSkill = Skill.builder()
                .canonicalName(cleanName)
                .category(category != null ? category : "Engineering")
                .status("ACTIVE")
                .build();

        return skillRepository.save(newSkill);
    }

    public String resolveCanonicalName(String input) {
        if (input == null || input.isBlank()) return input;
        return skillRepository.findByCanonicalNameOrAlias(input.trim())
                .map(Skill::getCanonicalName)
                .orElse(input.trim());
    }
}
