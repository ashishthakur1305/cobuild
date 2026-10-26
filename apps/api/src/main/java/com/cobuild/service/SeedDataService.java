package com.cobuild.service;

import com.cobuild.domain.*;
import com.cobuild.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class SeedDataService implements CommandLineRunner {

    private final UserRepository userRepository;
    private final SkillRepository skillRepository;
    private final RequirementPostRepository postRepository;
    private final ApplicationRepository applicationRepository;
    private final CollaborationRepository collaborationRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Database already seeded. Skipping initial seeding.");
            return;
        }

        log.info("Seeding initial CoBuild platform taxonomy and default users...");

        // 1. Seed Skills with Aliases
        Skill react = skillRepository.save(Skill.builder().canonicalName("React").aliases(Set.of("reactjs", "react.js")).category("Engineering").build());
        Skill node = skillRepository.save(Skill.builder().canonicalName("Node.js").aliases(Set.of("nodejs", "node")).category("Engineering").build());
        Skill ts = skillRepository.save(Skill.builder().canonicalName("TypeScript").aliases(Set.of("ts")).category("Engineering").build());
        Skill pg = skillRepository.save(Skill.builder().canonicalName("PostgreSQL").aliases(Set.of("postgres", "psql")).category("Engineering").build());
        Skill docker = skillRepository.save(Skill.builder().canonicalName("Docker").aliases(Set.of("containerization")).category("Engineering").build());
        Skill figma = skillRepository.save(Skill.builder().canonicalName("Figma").aliases(Set.of("ui-ux", "wireframing")).category("Design").build());
        Skill stripe = skillRepository.save(Skill.builder().canonicalName("Stripe Billing").aliases(Set.of("stripe", "payment-api")).category("Engineering").build());

        // 2. Seed Super Admin
        User superAdmin = userRepository.save(User.builder()
                .displayName("Platform SuperAdmin")
                .email("admin@cobuild.network")
                .passwordHash(passwordEncoder.encode("AdminPass123!"))
                .roles(Set.of(Role.ROLE_SUPER_ADMIN, Role.ROLE_ADMIN))
                .status(UserStatus.ACTIVE)
                .emailVerified(true)
                .verifiedCheckTypes(Set.of("EMAIL", "IDENTITY"))
                .build());

        // 3. Seed Founder Elena Vance (Synthetix / Kestrel Flow)
        User elena = userRepository.save(User.builder()
                .displayName("Elena Vance")
                .email("elena.vance@kestrel.flow")
                .passwordHash(passwordEncoder.encode("ElenaPass123!"))
                .roles(Set.of(Role.ROLE_FOUNDER))
                .headline("Founder @ Kestrel Flow • B2B Treasury Tech")
                .bio("Building next-generation liquidity and treasury management automation for mid-market commercial firms.")
                .avatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80")
                .status(UserStatus.ACTIVE)
                .emailVerified(true)
                .verifiedCheckTypes(Set.of("IDENTITY", "COMPANY")) // Dual-verified!
                .ratingAggregate(new User.RatingAggregate(4.9, 8))
                .build());

        // 4. Seed Builder Alex Rivera (Current User Persona)
        User alex = userRepository.save(User.builder()
                .displayName("Alex Rivera")
                .email("alex.rivera@cobuild.network")
                .passwordHash(passwordEncoder.encode("AlexPass123!"))
                .roles(Set.of(Role.ROLE_BUILDER))
                .headline("Senior Cloud Architect & Full-Stack Systems Engineer")
                .bio("10+ years architecting high-throughput distributed architectures, zero-trust PostgreSQL multi-tenancy, and resilient billing pipelines.")
                .avatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80")
                .status(UserStatus.ACTIVE)
                .emailVerified(true)
                .verifiedCheckTypes(Set.of("IDENTITY", "PORTFOLIO")) // Dual-verified!
                .ratingAggregate(new User.RatingAggregate(5.0, 14))
                .skillIds(Set.of(react.getId(), node.getId(), ts.getId(), pg.getId(), docker.getId()))
                .build());

        // 5. Seed Requirement Post from Elena
        RequirementPost post = postRepository.save(RequirementPost.builder()
                .ownerId(elena.getId())
                .companyName("Kestrel Flow")
                .ventureStage("Pre-seed")
                .title("Senior Backend Engineer for Early-Stage Real Estate B2B SaaS MVP")
                .businessContext("We have secured letters of intent from 6 mid-market commercial property managers. The architecture demands a scalable multi-tenant Postgres database with row-level security and high-throughput real-time ingest pipelines.")
                .scope("Design, implement, and deploy production-grade multi-tenant backend architecture.")
                .deliverables(List.of(
                        "Production-grade RESTful API and multi-tenant PostgreSQL schema with Supabase Auth",
                        "Stripe webhook handling for subscription tier upgrades, prorated billing, and dunning",
                        "Containerized Docker deployment configuration with CI/CD GitHub Actions pipeline on AWS ECS"
                ))
                .acceptanceCriteria(List.of(
                        "90%+ integration test coverage for authentication and billing endpoints",
                        "Row-level security audit verification report",
                        "Zero unhandled webhook failure alerts in staging load test"
                ))
                .category("Engineering")
                .requiredSkillIds(Set.of(pg.getId(), node.getId(), docker.getId()))
                .preferredSkillIds(Set.of(ts.getId(), stripe.getId()))
                .experienceLevel("Senior")
                .timeCommitment(new RequirementPost.TimeCommitment("part_time", 25))
                .workMode(WorkMode.REMOTE)
                .location("Americas / EMEA")
                .timezone("UTC-5 to UTC+1")
                .compensation(new RequirementPost.PostCompensation(
                        CompensationPreference.BOTH,
                        "$6,000 – $8,000 USD / mo",
                        "USD",
                        "1.5% - 2.5%",
                        "4-year linear vesting, 1-year cliff"
                ))
                .status(PostStatus.OPEN)
                .applicantCount(1)
                .build());

        // 6. Seed Application from Alex
        Application app = applicationRepository.save(Application.builder()
                .postId(post.getId())
                .builderId(alex.getId())
                .proposal("Hi Elena, I reviewed the technical scope. I have built three multi-tenant PostgreSQL systems on Supabase and AWS ECS. Ready to execute Milestones 1 through 3 with automated test coverage.")
                .proposedCash("$7,000 USD upon Milestone 2 approval")
                .proposedEquity("1.5% stock grant")
                .links(List.of("https://github.com/alexrivera/distributed-ratelimiter", "https://external-doc.com/rfc-draft"))
                .status(ApplicationStatus.ACCEPTED)
                .build());

        // 7. Seed Collaboration with 5-Clause Written Terms
        Collaboration.TermsChecklist terms = Collaboration.TermsChecklist.builder()
                .scopeConfirmedByFounder(true)
                .scopeConfirmedByBuilder(true)
                .compensationConfirmedByFounder(true)
                .compensationConfirmedByBuilder(false) // Builder action required!
                .ipConfirmedByFounder(true)
                .ipConfirmedByBuilder(false)           // Builder action required!
                .confidentialityConfirmedByFounder(true)
                .confidentialityConfirmedByBuilder(true)
                .governingLawConfirmedByFounder(true)
                .governingLawConfirmedByBuilder(true)
                .build();

        Collaboration collab = collaborationRepository.save(Collaboration.builder()
                .applicationId(app.getId())
                .postId(post.getId())
                .founderId(elena.getId())
                .builderId(alex.getId())
                .status(CollaborationStatus.PENDING_SETUP)
                .termsChecklist(terms)
                .termsConfirmedBy(Set.of(elena.getId()))
                .build());

        // 8. Seed Conversation & Messages
        Conversation conv = conversationRepository.save(Conversation.builder()
                .collaborationId(collab.getId())
                .applicationId(app.getId())
                .participantIds(List.of(elena.getId(), alex.getId()))
                .lastMessageAt(Instant.now())
                .build());

        messageRepository.save(Message.builder()
                .conversationId(conv.getId())
                .senderId(elena.getId())
                .senderName("Elena Vance")
                .senderAvatar(elena.getAvatarUrl())
                .body("Hi Alex, loved your GitHub repo on distributed rate limiters. Are you open to discussing the architecture this Thursday at 3 PM UTC?")
                .type("TEXT")
                .status("READ")
                .build());

        messageRepository.save(Message.builder()
                .conversationId(conv.getId())
                .senderId(alex.getId())
                .senderName("Alex Rivera")
                .senderAvatar(alex.getAvatarUrl())
                .body("Hi Elena! Yes, that works for me. Here is our architecture draft: external-doc.com/rfc-draft. Looking forward to walking through the sharding mechanisms and caching strategy.")
                .type("EXTERNAL_LINK")
                .containsExternalLink(true)
                .detectedExternalUrl("https://external-doc.com/rfc-draft")
                .status("READ")
                .build());

        messageRepository.save(Message.builder()
                .conversationId(conv.getId())
                .senderId(elena.getId())
                .senderName("Elena Vance")
                .senderAvatar(elena.getAvatarUrl())
                .body("Reviewed the initial diagram. The data isolation boundaries match our compliance targets perfectly. Let's make sure Term #2 and Term #3 are confirmed in our workspace checklist!")
                .type("TEXT")
                .status("DELIVERED")
                .build());

        log.info("CoBuild platform seed completed successfully!");
    }
}
