# Architecture & layer rules

## System layers (blueprint section 7)
| Layer | Folder | Responsibility | May depend on |
|---|---|---|---|
| Client apps | `frontend/` | Role-specific views | backend (HTTP only) |
| Backend API | `backend/` | Requests, auth, validation; sole gateway to DB + engine | engine, database |
| Timetable engine | `engine/` | Generate + validate conflict-free schedules | nothing (pure Python) |
| Database | `database/` | Multi-tenant PostgreSQL, `school_id` on every table, RLS | — |

## Frontend internal layers (`frontend/src`)
| Folder | Role | Rule |
|---|---|---|
| `domain/` | Types mirroring the data model (blueprint §6) | imports nothing |
| `data/` | Demo tenants (replaced by API calls later) | domain only |
| `engine/` | Solver, substitute ranking, clash checks — pure functions | domain only |
| `services/` | Side effects: CSV export, future `api.ts` client | domain |
| `hooks/` | `useTimetableApp` — state + actions | engine, services, data |
| `components/` | Reusable UI (layout, timetable grids, modal) | props only |
| `features/` | Role portals: admin, teacher, student | hooks, components |
| `App.tsx` | Composition root | everything above |

## Backend internal layers (`backend/app`)
`api/` (HTTP) → `services/` (use-cases) → `db/` (tenant-scoped sessions) and `chronos_engine` (solver).
`schemas/` = Pydantic contracts, `core/` = config.

## Multi-tenancy
Each request: authenticate → resolve `school_id` → `set_config('app.current_school_id', …)` inside the
transaction → RLS policies filter every table. Application bugs cannot leak across schools.

## Roadmap status (blueprint §9)
- Phase 0 data model — **done** (`database/schema.sql`, `domain/types.ts`)
- Phase 1 solver — prototype in JS; **CP-SAT pending** (`engine/chronos_engine/solver.py` docstring lists the model)
- Phase 2 backend API — skeleton
- Phase 3 frontend — prototype done; needs real API + auth
- Phase 4 multi-tenancy — schema/RLS written; needs auth + tenant middleware
- Phase 5 deploy — Dockerfiles + compose provided

## Open decisions (blueprint §10)
v1 scope (single school vs multi-tenant), frontend framework (React/Vite chosen here),
activity day configurable per school (modelled as configurable), substitute tie-breaker (undecided).
