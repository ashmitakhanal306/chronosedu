# Phase-by-Phase Build Guide (for use with Antigravity)

How to use: do the phases **in order**. Paste the prompt of one phase into Antigravity, review the diff,
run the "Done when" checks yourself, commit, then move on. Never batch two phases in one prompt.

General rules for every prompt:
- Tell Antigravity to **read `README.md` and `docs/ARCHITECTURE.md` first** and respect the layer dependency rules.
- Constraint logic (Phase 1) and tenant isolation (Phase 4) are **hand-verified**: you read and test them, not just the agent.
- One branch per phase: `git checkout -b phase-1-solver`.

---

## Step 0 — Decisions & real data (do FIRST, ~1 day)

These change the schema/solver, so settle them before coding.

| Decision | Recommendation | Where it lands |
|---|---|---|
| v1 scope | Build **multi-tenant schema from day one**, but pilot with **one school**. Cheap now, painful to retrofit. | already in `database/schema.sql` |
| Substitute tie-breaker | Rank by free periods (rule), then **same-subject/department first**, then **lowest weekly load**, then name (deterministic). Avoid round-robin in v1 (needs stored history). | `engine/chronos_engine/substitutes.py` + `frontend/src/engine/substitutes.ts` |
| Activity day | Configurable per school (already modelled). | `school.activity_day` |
| Frontend framework | Keep React + Vite (already built). Only move to Next.js if you need SSR/SEO. | — |

Pilot data to collect from 1–2 schools (spreadsheet): classes per grade, subject × weekly frequency per grade,
teacher list with qualified subjects, part-time/visiting teachers (days available), shared rooms
(art, music, lab, playground) and their capacity, existing timetable (for comparison).
**Done when:** decisions written in `docs/DECISIONS.md`; one real staffing sheet in hand.

---

## Phase 1 — Solver engine (OR-Tools CP-SAT)  → `engine/`

Goal: standalone Python solver, tested before any API/UI work.

Steps
1. `cd engine && python -m venv .venv && source .venv/bin/activate && pip install -e ".[dev]"`
2. Implement `solve()` in `chronos_engine/solver.py` following the rule list (H1–H8, S1–S3) in its docstring.
3. Write tests in `engine/tests/` using the demo data (port from `frontend/src/data/demoSchools.ts`) plus nasty cases:
   too few teachers for a subject, one specialist for 6 classes, teacher with `unavailable_days`, primary over-scheduled.
4. Compare against the JS solver output on the demo school.

Antigravity prompt
```
Read README.md, docs/ARCHITECTURE.md and engine/chronos_engine/solver.py (docstring lists the rules).
Implement solve() with Google OR-Tools CP-SAT in engine/chronos_engine/solver.py.
Boolean var x[class, subject, teacher, day, period] only for qualified teachers and valid periods
(primary 1..4, senior 1..6). Hard constraints H1-H7 exactly as listed. Soft S1/S2 as a minimised penalty.
On INFEASIBLE, return Diagnostic entries naming the offending class/subject/teacher (use assumptions or
a pre-check) instead of raising. Keep the engine free of DB/HTTP imports.
Add pytest tests in engine/tests covering: demo school feasible, understaffed subject -> infeasible with
a clear diagnostic, teacher never >5 periods/day, no double booking, activity block locked.
```
Done when: `pytest` green; **you** read the constraints once against the Section 5 rules table; the demo
school solves in < a few seconds; large synthetic case (40 classes / 100 teachers) solves within the time limit.

> Note: the demo school currently has a real shortage (4 classes, 3 specialists on Wednesday P1–P2). A correct
> solver should report it. Use that as your first infeasibility test.

---

## Phase 2 — Backend API + database  → `backend/`, `database/`

Steps
1. Start Postgres: `docker compose -f deploy/docker-compose.yml up db` (loads `database/schema.sql`).
   **Check it loaded without errors** (not yet verified): `docker compose logs db`.
2. Move schema to migrations (Alembic) so changes are versioned.
3. Add SQLAlchemy models + CRUD for school setup (grades, classes, subjects, requirements, teachers, rooms, period slots).
4. Endpoints (names are guidance): `POST /api/schools/{id}/generate`, `GET .../timetable`,
   `PUT .../entries/{entry_id}` (override, rejects clashes), `POST .../publish`,
   `POST .../absences`, `GET .../absences/{id}/substitutes`, `POST .../substitutions` (assign).
5. `timetable_service.generate()` maps DB rows → `ProblemInput` → `solve()` → persists `timetable_entry`.

Antigravity prompt
```
Read README.md and docs/ARCHITECTURE.md. Respect layers: api -> services -> db / chronos_engine.
1) Add Alembic using database/schema.sql as the initial migration.
2) Add SQLAlchemy models for every table and Pydantic schemas in backend/app/schemas.
3) Implement CRUD routers for school setup, and the timetable endpoints currently returning 501 in
   backend/app/api/timetable.py. generate() loads the school's data through db.session.tenant_session(),
   builds chronos_engine.ProblemInput, calls solve(), stores entries and diagnostics.
4) Override endpoint must re-validate H1/H2/H7 and return 409 with the clash message.
5) Add pytest + httpx tests using a test Postgres.
Do not put SQL in api/ and do not import FastAPI in the engine.
```
Done when: you can generate, override (with a deliberate clash → 409) and publish via Swagger at `/docs`.

---

## Phase 3 — Connect the frontend  → `frontend/`

Steps
1. Add `src/services/api.ts` (fetch wrapper, base `/api`, already proxied in `vite.config.ts`).
2. In `hooks/useTimetableApp.ts`, replace in-memory `setState` actions with API calls (that file is the only place to change).
3. Keep `src/engine/` only for instant client-side clash hints (override modal); the server is the source of truth.
4. Add PDF/Excel export (backend-rendered) next to the existing CSV.

Prompt
```
Read docs/ARCHITECTURE.md (frontend layers). Create src/services/api.ts and refactor
src/hooks/useTimetableApp.ts to load/save through the backend API instead of INITIAL_SCHOOLS.
Components and features must not change except for loading/error states. Add react-query or simple
loading/error handling. Keep domain/types.ts in sync with backend/app/schemas.
```
Done when: refresh the page and your override/substitution is still there.

---

## Phase 4 — Auth, roles, tenancy, subdomains

Steps
1. Pick an auth provider (Clerk / Auth0 / Supabase Auth). Backend verifies the JWT; token carries `school_id` and `role`
   (admin / teacher / student).
2. Middleware: verify token → `school_id` → `tenant_session()` (RLS). Role guards on every route:
   teachers read only their own schedule, students only their class.
3. Remove the header "Switch Role View" toggle; show the portal for the logged-in role.
4. Subdomains (optional for v1): wildcard DNS `*.yourdomain.com` → your host; resolve `greenwood.yourdomain.com` → school by `school.subdomain`.
5. **Test isolation yourself:** create two schools, log in as school A, try to read school B ids → must return nothing/403.
   Also test that a query without `app.current_school_id` returns zero rows.

Prompt
```
Add JWT auth to the FastAPI backend (provider: <Clerk|Auth0|Supabase>). Middleware extracts school_id and role,
opens tenant_session(school_id), and role-guards each route (admin: all; teacher: own entries; student: own class).
Resolve school by subdomain from the Host header as a fallback. Add tests proving cross-tenant access returns
403/empty. Replace the frontend role switcher with real login; keep the three portals unchanged.
```
Done when: the cross-tenant tests pass and you've attempted the attack manually.

---

## Phase 5 — Notifications, deploy, pilot

Steps
1. Notifications: on substitution assign, enqueue a message (email via Resend/SendGrid first; SMS/WhatsApp via Twilio later).
   Use a background task/queue so a failed send never blocks the assignment. Store teacher email/phone.
2. Deploy: Docker images → Render/Railway (managed Postgres, set `CHRONOS_DATABASE_URL`, CORS origins).
   Use `deploy/docker-compose.yml` locally first.
3. Pilot with 1–2 schools using their real staffing sheet; log every case the solver can't handle
   (part-time teachers, shared labs) and turn each into a new constraint + test.

Prompt
```
Add a notifications service in backend/app/services/notifications.py with a provider interface and a Resend
email implementation. Trigger it from the substitution-assign use-case via FastAPI BackgroundTasks; failures
are logged and retried, never raised to the caller. Add teacher email/phone columns via an Alembic migration.
```
Done when: assigning a substitute emails the teacher; a pilot school's real data produces a timetable their
staff accept, or a clear diagnostic explaining why not.

---

## Suggested order summary
Step 0 decisions → 1 solver → 2 API+DB → 3 wire frontend → 4 auth/tenancy → 5 notifications/deploy/pilot.

Later (blueprint 4.6): room/resource booking as a solver constraint, analytics, PWA, conflict-resolution UI.
