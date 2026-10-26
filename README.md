# CoBuild - High-Trust Global Startup Collaboration Marketplace

> **Important Notice:** CoBuild is a connection service only. It never holds custodial funds, issues equity, brokers securities, or provides legal advice. Compensation and equity agreements are negotiated and signed privately between parties.

---

## 1. Quick Start with Docker (Single Command)

To run the entire platform (MongoDB Replica Set `rs0`, MailHog, Spring Boot 3 API, and Next.js Web App):

```bash
cd cobuild/docker
docker compose up --build -d
```

### Platform Endpoints:
- **Web App (Next.js):** [http://localhost:3000](http://localhost:3000)
- **Backend API (Spring Boot):** [http://localhost:8080](http://localhost:8080)
- **OpenAPI Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
- **MailHog (SMTP Web UI):** [http://localhost:8025](http://localhost:8025)

---

## 2. Seed Accounts & Credentials

The database automatically seeds on first launch:

| Role | Name | Email | Password | Trust Badges |
|---|---|---|---|---|
| **Super Admin** | Platform SuperAdmin | `admin@cobuild.network` | `AdminPass123!` | Email, Identity |
| **Founder** | Elena Vance (Kestrel Flow) | `elena.vance@kestrel.flow` | `ElenaPass123!` | Identity Checked, Company Checked |
| **Builder** | Alex Rivera | `alex.rivera@cobuild.network` | `AlexPass123!` | Identity Checked, Portfolio Checked |

---

## 3. Local Development (Without Docker)

### Prerequisites:
- Java 21 LTS
- Node.js 20+ & npm
- MongoDB 7.0 running locally on port 27017 as a replica set `rs0`

### Step 1: Run Backend API
```bash
cd cobuild/apps/api
./mvnw.cmd spring-boot:run
```

### Step 2: Run Frontend Web
```bash
cd cobuild/apps/web
npm.cmd install
npm.cmd run dev
```

---

## 4. Architecture & Key Features

1. **Stitch Design Token Integration:** Complete typography (Plus Jakarta Sans & Inter), elevation, radius, and curated color palettes (Primary Indigo `#1a146b`, Secondary Teal `#006a61`, Tertiary Amber `#3b1c00`).
2. **Mutual Written-Terms Agreement (5 Clauses):**
   - 1. Scope & Acceptance Criteria
   - 2. Agreed Private Compensation
   - 3. IP Ownership & Work-for-Hire Clause
   - 4. Mutual NDA
   - 5. Governing Law & Jurisdiction (Delaware, USA)
   - *Dual-Confirmation Stage Gate:* Active execution is locked until both parties confirm all clauses.
3. **Encrypted Private Messaging:**
   - Real-time STOMP WebSocket messaging.
   - External link scanner with safety caution modal.
   - Anti-solicitation notice preventing unvetted off-platform wire transfers.
4. **Radical Transparency Trust Dossier:**
   - Clear delineation of what badges guarantee ("Means") and what they do not guarantee ("Does Not Mean").
5. **Audited Admin Operations Console:**
   - Real-time platform connection GMV, active collaborations, and reason-mandated audit logs.
