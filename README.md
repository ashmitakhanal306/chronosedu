# ChronosEdu — School Timetable Platform

Multi-tenant SaaS that generates conflict-free weekly timetables per the project blueprint
(`docs/BLUEPRINT.md` summarises it). This repo is split into the four blueprint layers.

```
chronosedu/
├── frontend/   CLIENT LAYER   React + TS + Vite + Tailwind — admin / teacher / student portals
├── backend/    API LAYER      FastAPI — auth, validation, the only code touching DB + engine
├── engine/     ENGINE LAYER   Python constraint solver (OR-Tools CP-SAT) — pure, no DB/HTTP
├── database/   DATA LAYER     PostgreSQL schema, school_id on every table + Row-Level Security
├── deploy/     docker-compose for local / MVP
└── docs/       architecture, layer rules, PHASE_GUIDE.md (build order + Antigravity prompts)
```

## Status

| Layer    | State |
|----------|-------|
| frontend | **Working.** Full prototype (3 portals, solver, substitutes, overrides, CSV) refactored into layers; runs on in-memory demo data. |
| engine   | Interface + data contracts + substitute ranking done. **CP-SAT solver not yet implemented** (the greedy JS solver in `frontend/src/engine` is the reference). |
| backend  | Skeleton: app wiring, config, tenant-scoped DB session, `/health`. Endpoints return 501. |
| database | Full schema + RLS policies written; **not yet run against a live Postgres** — verify via `docker compose up`. |

## Run

```bash
# Frontend (works today)
cd frontend && npm install && npm run dev        # http://localhost:5173

# Full stack skeleton
docker compose -f deploy/docker-compose.yml up --build
```

## Dependency rule (never break)

`frontend → (HTTP) → backend → engine`, `backend → database`.
The frontend never touches the DB; the engine never touches the DB or HTTP.
Inside the frontend: `domain ← engine ← hooks ← components/features ← App`.
