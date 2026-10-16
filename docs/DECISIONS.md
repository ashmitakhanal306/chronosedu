# ChronosEdu — Architectural & Product Decisions (v1)

Settled before Phase 1 per `docs/PHASE_GUIDE.md` (Step 0).

---

## 1. Multi-Tenancy Scope (v1)
- **Decision:** Build a **multi-tenant schema from day one**, but launch and pilot with **one school** first.
- **Rationale:** Retrofitting `school_id` and PostgreSQL Row-Level Security (RLS) onto a single-tenant database is error-prone and costly. Starting with multi-tenant tables and tenant-scoped sessions (`SET LOCAL app.current_school_id = ...`) costs virtually nothing upfront and protects customer data boundaries from the start.
- **Implementation:** Defined in `database/schema.sql` and enforced via `backend/app/db/session.py`.

---

## 2. Substitute Tie-Breaker Rule
- **Decision:** When multiple candidate teachers are free during an absent teacher's period:
  1. **Primary sort:** Highest number of free periods on that day (rule H8 / S3).
  2. **Secondary sort (tie-breaker 1):** Same-subject qualification (teacher holds qualification for the slot's subject).
  3. **Tertiary sort (tie-breaker 2):** Lowest total weekly assigned teaching load (balances workload).
  4. **Quaternary sort (tie-breaker 3):** Teacher name alphabetically (deterministic).
- **Rationale:** Avoids stateful round-robin algorithms in v1 which require cross-term historical tracking, while prioritizing instructional continuity (subject expertise) and teacher fairness (weekly load).
- **Implementation:** `engine/chronos_engine/substitutes.py` and `frontend/src/engine/substitutes.ts`.

---

## 3. Activity Day & Periods
- **Decision:** Fully configurable per school rather than hard-coded.
- **Rationale:** Different schools hold co-curricular activities, clubs, or sports on different days (e.g., Wednesday vs. Friday afternoon) and for different duration (e.g., periods 1–2 vs periods 5–6).
- **Implementation:** Configured via `school.activity_day` and `school.activity_periods` in `database/schema.sql` and `chronos_engine.models.Rules`.

---

## 4. Frontend Framework
- **Decision:** Keep **React + TypeScript + Vite**.
- **Rationale:** ChronosEdu is a private portal / SaaS dashboard for admins, teachers, and students. There is no requirement for Public Search Engine Optimization (SEO) or Server-Side Rendering (SSR). Vite provides instant HMR, fast builds, and clean separation from the FastAPI backend.
