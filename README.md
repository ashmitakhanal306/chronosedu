# ChronosEdu — Intelligent Multi-Tenant School Timetable SaaS

ChronosEdu is an enterprise-grade multi-tenant school timetable generation and automated substitute management SaaS platform. It solves complex NP-hard school scheduling problems using Google OR-Tools CP-SAT constraint programming, enforced with PostgreSQL kernel-level Row-Level Security (RLS).

---

## 🏗️ Architecture

The project strictly follows clean architectural layer boundaries:

```
chronosedu/
├── frontend/   CLIENT LAYER   React 18 + TS + Vite + Tailwind CSS (Admin, Teacher & Student Portals)
├── backend/    API LAYER      FastAPI — Argon2id Auth, JWT, Rate Limiting, Notifications, DB tenancy
├── engine/     ENGINE LAYER   Python constraint solver (Google OR-Tools CP-SAT) — pure mathematical engine
├── database/   DATA LAYER     PostgreSQL 16 schema + migrations + Row-Level Security (RLS) policies
├── deploy/     DEVOPS         Docker Compose & environment-driven initialization
└── docs/       DOCS           Architecture specifications, design decisions & phase guides
```

### Architectural Guardrails
- **Dependency Flow**: `frontend` &rarr; (HTTP/JSON) &rarr; `backend` &rarr; `engine`, `backend` &rarr; `database`.
- **Pure Constraint Engine**: The solver never touches I/O, database sessions, or HTTP networks.
- **Physical RLS Tenant Isolation**: All tenant-owned tables enforce PostgreSQL kernel-level `ROW LEVEL SECURITY` queried exclusively through a dedicated non-superuser role (`chronos_app`).

---

## 🚀 Key Features

1. **Google OR-Tools CP-SAT Timetable Engine**:
   - Hard constraints: No teacher double-booking, room capacity/type matching, teacher 5-period daily caps, fixed activity block synchronization.
   - Soft constraints: Fair weekly subject distribution, balanced teacher workload.
   - Pre-check diagnostics: Instant detection (<1ms) of structural shortages (e.g., specialist teacher shortages) before solving.

2. **Automated Substitute Ranking & Background Notifications**:
   - Multi-tier scoring heuristic: qualified subject matches &rarr; free period availability &rarr; lowest period load.
   - BackgroundTasks dispatch via email provider (Resend API) with graceful degradation.

3. **Multi-Tenant Security & Compliance**:
   - PostgreSQL kernel-level RLS policies on all 12 tenant-owned tables.
   - Non-superuser application database role (`chronos_app`, `NOSUPERUSER NOBYPASSRLS`).
   - Argon2id password hashing with constant-time verification.
   - Sliding-window login rate limiting (5 attempts / 60 seconds) with `429 Too Many Requests`.
   - Subdomain multi-tenancy resolution (`school.chronosedu.com`).

4. **Modern Responsive Web Application**:
   - Role-based views: Organization Administrator, Faculty Teacher, and Student.
   - Live grid visualizer with manual override validation, conflict alerts, and multi-format exports (CSV, Excel, Printable Timetables).

---

## 🛠️ Quickstart & Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+ and npm
- PostgreSQL 16 (or Docker)

### 1. Backend & Constraint Engine
```bash
# Set environment secrets
export CHRONOS_JWT_SECRET="your-secure-random-jwt-secret-at-least-32-chars"
export CHRONOS_DATABASE_URL="postgresql+psycopg://chronos_app:your_pwd@localhost:5432/chronos"

# Install backend & engine packages
cd backend
pip install -r requirements.txt
pip install -e ../engine

# Run API server
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend Web Application
```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### 3. Docker Compose Deployment
```bash
export CHRONOS_JWT_SECRET="your-secure-random-jwt-secret"
export CHRONOS_APP_PASSWORD="your-secure-db-password"

docker compose -f deploy/docker-compose.yml up --build
```

---

## 🧪 Testing & Verification

The test suite validates constraint solving, security isolation, RLS enforcement, and API functionality:

```bash
# Run all backend & solver engine tests (26 passing tests)
pytest backend/tests engine/tests -v

# Run frontend type-check & production bundle build
cd frontend && npm run build
```

---

## 📄 License
Proprietary & Confidential — ChronosEdu Platform.
