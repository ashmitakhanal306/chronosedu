# Production Deployment Guide: ChronosEdu SaaS

ChronosEdu is an enterprise multi-tenant school timetable generation and substitute teacher management platform built with FastAPI, Google OR-Tools CP-SAT, PostgreSQL with kernel-level Row Level Security (RLS), and React/TypeScript.

This guide provides step-by-step instructions for deploying ChronosEdu to production environments using **Render** (Backend API & Solver Engine), **Vercel** (Frontend Web SPA), and **Managed PostgreSQL** (Supabase, Neon, or Render Postgres).

---

## 1. Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │          Vercel Edge Network           │
                      │     (React / TypeScript Vite SPA)      │
                      └──────────────────┬─────────────────────┘
                                         │
                 /api/* rewritten via    │ Direct browser traffic
                 vercel.json             │ /index.html SPA fallback
                                         ▼
                      ┌────────────────────────────────────────┐
                      │          Render Web Service            │
                      │     (Docker: FastAPI + CP-SAT)         │
                      │   Runs uvicorn on ${PORT:-8000}        │
                      └──────────────────┬─────────────────────┘
                                         │
             Connects via non-superuser  │ SET LOCAL app.current_school_id = '<uuid>';
             app role: chronos_app       │
                                         ▼
                      ┌────────────────────────────────────────┐
                      │          PostgreSQL Database           │
                      │     Row Level Security (FORCE RLS)     │
                      │     anon / authenticated revoked       │
                      └────────────────────────────────────────┘
```

---

## 2. PostgreSQL Database Setup

### 2.1 Role & Security Architecture
In PostgreSQL, database superusers bypass Row-Level Security checks. To guarantee kernel-level multi-tenant isolation:
1. Migration and DDL operations are executed by the administrative database owner.
2. The application service connects strictly using the non-superuser role: `chronos_app` (`NOSUPERUSER`, `NOBYPASSRLS`).

### 2.2 Schema Initialization
Run the idempotent schema script [`database/schema.sql`](../database/schema.sql) on your production PostgreSQL instance:
```bash
psql -h <POSTGRES_HOST> -U postgres -d chronos -f database/schema.sql
```
Set the application password for `chronos_app`:
```sql
ALTER ROLE chronos_app WITH PASSWORD '<STRONG_SECURE_PASSWORD>';
```

### 2.3 Run Alembic Migrations
Apply all schema revisions up to `head`:
```bash
alembic upgrade head
```
This ensures:
- `0001_initial_schema`: Core tables, indexes, and RLS policies
- `0002_add_teacher_contact`: Teacher email and phone fields
- `0003_add_user_password`: Password hashing column
- `0004_revoke_anon_authenticated`: Revokes all permissions on public tables from `anon` and `authenticated` roles (Supabase / PostgREST defense-in-depth) and sets `ALTER DEFAULT PRIVILEGES`.

---

## 3. Backend Deployment (Render)

### 3.1 Service Configuration
1. In Render, select **New Web Service** and connect your GitHub repository.
2. Set the service type to **Docker**.
3. **Dockerfile Path**: `backend/Dockerfile`.
4. **Docker Build Context**: `.` (Repository root &mdash; required because the build copies both `engine/` and `backend/`).

### 3.2 Environment Variables
Configure the following environment variables in the Render dashboard:

| Variable | Description | Example / Note |
| :--- | :--- | :--- |
| `CHRONOS_DATABASE_URL` | SQLAlchemy PostgreSQL connection URI using psycopg driver | `postgresql+psycopg://chronos_app:<PASSWORD>@<HOST>:5432/chronos` |
| `CHRONOS_JWT_SECRET` | 256-bit cryptographic secret for signing JWTs | Generate via `openssl rand -hex 32` |
| `CHRONOS_JWT_ALGORITHM` | JWT signing algorithm | `HS256` |
| `CHRONOS_JWT_EXPIRATION_MINUTES` | Lifetime of issued tokens | `10080` (7 days) |
| `CHRONOS_PLATFORM_TOKEN` | Secret master token required for onboarding schools | Generate via `openssl rand -hex 24` |
| `CHRONOS_CORS_ORIGINS` | JSON list of allowed origins | `["https://chronosedu.vercel.app","https://*.chronosedu.com"]` |
| `CHRONOS_SOLVER_TIME_LIMIT_S` | CP-SAT solver timeout budget per solve run | `30.0` |
| `RESEND_API_KEY` | Resend API key for substitute alert emails | `re_123456789...` |
| `CHRONOS_NOTIFICATION_FROM_EMAIL` | Sender address for substitute notifications | `alerts@chronosedu.com` |

> [!IMPORTANT]
> The backend application automatically aborts startup if `CHRONOS_JWT_SECRET` is unset or matches any known development placeholder.

### 3.3 Dynamic Port & Proxy Binding
`backend/Dockerfile` dynamically binds to `${PORT:-8000}` assigned by Render:
```dockerfile
CMD ["sh", "-c", "exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000} --proxy-headers --forwarded-allow-ips='*'"]
```
Healthcheck probe endpoint:
- **Path**: `/health`
- **Expected response**: `{"status": "ok"}` (HTTP 200)

---

## 4. Frontend Deployment (Vercel)

### 4.1 Project Import
1. In Vercel, import the repository.
2. Set **Framework Preset** to `Vite`.
3. Set **Root Directory** to `frontend`.
4. Build and Output settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 4.2 Configure Proxy Rewrites
Open [`frontend/vercel.json`](../frontend/vercel.json) and replace `REPLACE-ME` with your actual Render service domain:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://<YOUR-RENDER-SERVICE>.onrender.com/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This architecture ensures:
1. Zero CORS issues between web client and backend API.
2. Full Single Page Application (SPA) HTML5 browser history fallback.

---

## 5. Security & Verification Checklist

- [x] **Secret Audit**: No `.env`, `.venv`, private keys, or credentials committed in git history.
- [x] **RLS Tenant Isolation**: Table queries enforce `SET LOCAL app.current_school_id = '<uuid>'` on role `chronos_app` (`NOBYPASSRLS`).
- [x] **Onboarding Race Closed**: `POST /api/schools` strictly requires `X-Chronos-Platform-Token` matching `CHRONOS_PLATFORM_TOKEN`.
- [x] **Setup Admin Closed**: `POST /api/auth/setup-admin` permanently disables once an initial administrator is registered.
- [x] **Brute-Force Protection**: Login endpoint (`/api/auth/token`) enforces sliding rate-limiting (maximum 5 failed attempts per IP/account window).
- [x] **Password Storage**: Passwords hashed with high-memory Argon2id (`m=65536, t=3, p=4`).
