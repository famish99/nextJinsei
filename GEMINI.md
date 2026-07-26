# GEMINI.md - System Context & Development Rules

---

## 💻 Tech Stack Specification

### Frontend & UI
- **Framework:** Next.js 16 / 15 (App Router) & React 19 (TypeScript)
- **Styling & Components:** Mantine v9 (`@mantine/core`) + PostCSS
- **Authentication UI:** AWS Amplify UI for React (`@aws-amplify/ui-react`)

### Backend & Cloud Infrastructure (AWS Amplify Gen 2)
- **Configuration:** Defined in TypeScript via `amplify/`
- **Auth:** Amazon Cognito (`amplify/auth/resource.ts`)
- **Data Layer:** AWS AppSync (GraphQL) with PostgreSQL / DynamoDB (`amplify/data/resource.ts`)
- **Serverless Compute:** AWS Lambda functions in TypeScript/Node.js

### Quality Assurance & Tooling
- **Linting/Types:** ESLint & strict TypeScript type-checking

---

## 🚫 Absolute Rules & "NEVER" Directives

1. **NEVER use third-party libraries when native capabilities exist:**
   - Always prefer built-in Node.js runtime APIs or native database primitives over adding new NPM packages.
2. **NEVER use Regex for string parsing or matching:**
   - Avoid regex patterns entirely—they are error-prone and hard to maintain. 
   - Use simple native string methods (`startsWith`, `indexOf`, `slice`, `split`) or simple utility loops instead.
3. **NEVER rewrite entire files:**
   - Never output full-file replacements unless explicitly instructed. Provide minimal, targeted code modifications.
4. **NEVER introduce boilerplate or verbose code:**
   - Code is a liability. Keep all functions, types, and logic concise.

---

## 🛠️ Refactoring & Code Quality Principles

- **Prioritize Big Refactoring Wins:** The highest-value output is removing unneeded code while keeping functionality identical.
- **Minimal Code Liability:** Write as little code as possible. Keep comments minimal, high-signal, and strictly necessary.
- **Surgical Modifications:** Keep existing project patterns, naming conventions, and file structures intact.

---

## 🚀 Performance & Security Directives

### 1. Performance First
- Default to the most performant patterns (non-blocking async queues, indexed database lookups, efficient memory handling).
- **Readability Trade-off Rule:** Prefer performance over micro-abstractions unless code readability becomes severely degraded. If a performance optimization creates significant complexity, **flag the trade-off explicitly for discussion.**

### 2. Mandatory Security Checks
Proactively audit and point out security risks in every proposed solution:
- **Multi-Tenant Isolation:** Verify that owner/tenant filters are strictly enforced so users can only access their own data/emails.
- **Input & Execution Security:** Protect against injection, unauthorized GraphQL mutations, and unauthenticated Lambda invocations.
- **File Upload Security:** Ensure S3 uploads validate file types and payload sizes.

---

## 📝 Code Output Format (GitHub-Style Diffs Only)

All code modifications **must** be formatted as GitHub-style Unified Diff blocks using the `diff` language tag.

---

## 🏛️ Infrastructure Memory
- **Database Architecture:** We use AWS Aurora Serverless V2 (PostgreSQL 17.1) scaling down to 0 ACU to eliminate idle costs.
- **Networking:** We strictly use the **AWS RDS Data API** (`enableDataApi: true`) to communicate with the database. This eliminates the need for expensive VPC Interface Endpoints, NAT Gateways, and complex Lambda VPC networking.
- **ORM & Migrations:** We use **Drizzle ORM** with the `drizzle-orm/aws-data-api/pg` driver. Schema migrations are completely automated using a custom CDK `TriggerFunction` (`amplify/database/migrator.ts`) which runs upon CloudFormation deployment.
- **Email Processing (Phase 2):** Incoming SES emails are parsed by the `email-processor` Lambda using `mailparser` and inserted via Drizzle directly into PostgreSQL. It automatically creates a user row if the recipient email is unknown. Forwarding has been entirely removed.
