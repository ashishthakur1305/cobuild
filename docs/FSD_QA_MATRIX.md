# CoBuild Functional Specification & QA Verification Matrix (FR-001 to FR-032)

| Requirement ID | Module | Description | Backend Implementation | Frontend Implementation |
|---|---|---|---|---|
| **FR-001** | Auth | User Registration with role selection (`FOUNDER`, `BUILDER`, `BOTH`) | `AuthController.register()` | `RootLayout` & `/auth` |
| **FR-002** | Auth | Login / Logout with HTTP-only, SameSite Secure JWT cookie | `AuthService.login()`, `logout()` | Header Session Manager |
| **FR-003** | Auth | Email verification token & cooldown handling | `User.emailVerified` | `/trust` |
| **FR-004** | Security | IDOR Prevention on all sensitive entities (posts, apps, collabs, chats) | `PermissionService` | Route Protection |
| **FR-005** | Security | Staff Role-Based Access Control (`MODERATOR`, `ADMIN`, `SUPER_ADMIN`) | `SecurityConfig`, `Role` | `/admin` |
| **FR-006** | Profile | Public vs Private fields enforcement (email never leaked) | `UserController.getUserProfile()` | Profile View |
| **FR-007** | Profile | Skills taxonomy normalization and alias resolution | `SkillService.resolveCanonicalName()` | `/create` Skill Tagger |
| **FR-008** | Profile | Admin-awarded verification badges with "Means / Does not mean" | `User.verifiedCheckTypes` | Verification Dossier (`/trust`) |
| **FR-009** | Posts | Create Requirement Post with scope, deliverables, acceptance criteria | `RequirementPostRepository` | Founder Studio (`/create`) |
| **FR-010** | Posts | Post moderation states (`OPEN`, `PAUSED`, `CLOSED`, `REMOVED`) | `PostStatus` | `/admin` Post Management |
| **FR-011** | Posts | HTML Sanitization & XSS prevention on user posts | DTO validation & escaping | Next.js Auto-escaping |
| **FR-012** | Matching | Weighted Matching Algorithm with required skill coverage & timezone fit | `RequirementPost` compound query | Match Signals Bar on Cards |
| **FR-013** | Feed | Filter by Category, Compensation Model, Time Commitment, Trust Level | MongoDB Compound Indexes | Feed Sidebar (`/`) |
| **FR-014** | Feed | Strict Statutory Equity Warning banner and callouts | Platform Legal Policy | Feed Disclaimer Box |
| **FR-015** | Applications | Builder apply to requirement with proposal and proposed terms | `Application` entity & service | Quick Apply Modal |
| **FR-016** | Applications | Single active application per builder/post constraint | MongoDB Unique Partial Index | Application Submit validation |
| **FR-017** | Applications | Application State Machine (`PENDING` -> `SHORTLISTED` -> `ACCEPTED`) | `ApplicationStatus` | My Posts & Apps (`/my-posts`) |
| **FR-018** | Collaborations | Idempotent collaboration creation on application acceptance | `CollaborationRepository` | Acceptance Flow |
| **FR-019** | Collaborations | 5-Clause Mutual Written-Terms Agreement | `Collaboration.TermsChecklist` | Workspace (`/workspace`) |
| **FR-020** | Collaborations | Dual-confirmation Stage Gate to unlock `ACTIVE` collaboration status | `TermsChecklist.isAllConfirmed()` | Stage Gate Locking Bar |
| **FR-021** | Collaborations | Milestone deliverables review & acceptance | `Collaboration` milestone status | Milestones Tracker |
| **FR-022** | Chat | Private 1:1 STOMP WebSocket encrypted messaging | `Conversation`, `Message` | Messages Thread (`/messages`) |
| **FR-023** | Chat | External link detection with safety warning modal | `Message.containsExternalLink` | External Link Modal |
| **FR-024** | Chat | Anti-solicitation notice & routine admin browsing prohibition | Session Security & Privacy Rules | Security Banner |
| **FR-025** | Safety | Reporting engine (`USER`, `POST`, `MESSAGE`, `REVIEW`) | `ReportRepository` | Report Action Modal |
| **FR-026** | Safety | User blocking and communication freeze | User relationship model | Chat Thread Actions |
| **FR-027** | Reviews | Double-blind review submission after collaboration completion | `ReviewRepository` (unique index) | Review Submission Flow |
| **FR-028** | Admin | Executive KPI Dashboard (GMV volume, active collabs, reports) | Admin Aggregation Services | Admin Console (`/admin`) |
| **FR-029** | Admin | Moderation and User Audit Queue with reason logging | `AdminAuditLog` (append-only) | Admin User Table |
| **FR-030** | Data Rights | User data export & deletion/anonymization requests | `UserService` | Account Settings |
| **FR-031** | Phase 2 | In-app WebRTC audio/video call room with screen sharing | RTC Provider Interface Stub | Phase 2 Coming Soon Banner |
| **FR-032** | Infra | Single `docker compose up` orchestration for Mongo, API, Web, MailHog | `docker-compose.yml` | Full Monorepo |
