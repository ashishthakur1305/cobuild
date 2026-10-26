package com.cobuild.controller;

import com.cobuild.domain.Skill;
import com.cobuild.dto.ApiResponse;
import com.cobuild.service.SkillService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Skill>>> getAllSkills() {
        return ResponseEntity.ok(ApiResponse.ok(skillService.getAllSkills()));
    }

    @PostMapping("/normalize")
    public ResponseEntity<ApiResponse<String>> normalizeSkill(@RequestBody Map<String, String> payload) {
        String input = payload.get("skill");
        String canonical = skillService.resolveCanonicalName(input);
        return ResponseEntity.ok(ApiResponse.ok("Skill normalized", canonical));
    }
}
