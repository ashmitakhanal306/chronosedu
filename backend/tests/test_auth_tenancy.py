"""Phase 4 Tests: Authentication, Role Guards, Cross-Tenant Isolation, and Subdomain Resolution."""
from __future__ import annotations

import os
import pytest
from httpx import ASGITransport, AsyncClient

os.environ["CHRONOS_DATABASE_URL"] = "sqlite:///./test_chronos.db"

from app.core.auth import create_access_token
from app.db.models import Base
from app.db.session import engine
from app.main import app


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.mark.anyio
async def test_cross_tenant_isolation_attack():
    """Prove that school A cannot access or mutate school B resources."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Create School A
        resp_a = await client.post("/api/schools", json={
            "name": "School Alpha",
            "subdomain": "alpha",
            "timezone": "UTC",
            "term": "Term 1",
            "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "max_teacher_periods_per_day": 5,
            "activity_day": "Friday",
            "activity_periods": [1, 2],
        })
        assert resp_a.status_code == 201
        sid_a = resp_a.json()["id"]

        # Create School B
        resp_b = await client.post("/api/schools", json={
            "name": "School Beta",
            "subdomain": "beta",
            "timezone": "UTC",
            "term": "Term 1",
            "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "max_teacher_periods_per_day": 5,
            "activity_day": "Friday",
            "activity_periods": [1, 2],
        })
        assert resp_b.status_code == 201
        sid_b = resp_b.json()["id"]

        # Token for School A Admin
        token_a = create_access_token({"sub": "admin-a", "school_id": sid_a, "role": "admin"})
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # Attack 1: School A Admin attempts to generate School B timetable
        attack_gen = await client.post(f"/api/schools/{sid_b}/generate", headers=headers_a)
        assert attack_gen.status_code == 403
        assert "Cross-tenant access forbidden" in attack_gen.json()["detail"]

        # Attack 2: School A Admin attempts to read School B timetable
        attack_read = await client.get(f"/api/schools/{sid_b}/timetable", headers=headers_a)
        assert attack_read.status_code == 403
        assert "Cross-tenant access forbidden" in attack_read.json()["detail"]

        # Attack 3: School A Admin attempts to add grades to School B
        attack_grade = await client.post(
            f"/api/schools/{sid_b}/grades",
            json={"name": "Grade 5", "tier": "primary"},
            headers=headers_a,
        )
        assert attack_grade.status_code == 403
        assert "Cross-tenant access forbidden" in attack_grade.json()["detail"]


@pytest.mark.anyio
async def test_role_guards_and_privilege_escalation():
    """Verify that teacher and student tokens cannot access admin actions."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Create School
        resp = await client.post("/api/schools", json={
            "name": "Greenwood High",
            "subdomain": "greenwood",
            "timezone": "UTC",
            "term": "Term 1",
            "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "max_teacher_periods_per_day": 5,
            "activity_day": "Wednesday",
            "activity_periods": [1, 2],
        })
        sid = resp.json()["id"]

        # Tokens
        teacher_token = create_access_token({
            "sub": "t-1",
            "school_id": sid,
            "role": "teacher",
            "teacher_id": "t-1",
        })
        student_token = create_access_token({
            "sub": "s-1",
            "school_id": sid,
            "role": "student",
            "class_id": "c-4a",
        })

        t_headers = {"Authorization": f"Bearer {teacher_token}"}
        s_headers = {"Authorization": f"Bearer {student_token}"}

        # Teacher trying to trigger generate -> 403
        resp = await client.post(f"/api/schools/{sid}/generate", headers=t_headers)
        assert resp.status_code == 403
        assert "Forbidden" in resp.json()["detail"]

        # Teacher trying to publish -> 403
        resp = await client.post(f"/api/schools/{sid}/publish", headers=t_headers)
        assert resp.status_code == 403

        # Student trying to trigger generate -> 403
        resp = await client.post(f"/api/schools/{sid}/generate", headers=s_headers)
        assert resp.status_code == 403

        # Student trying to manual override -> 403
        resp = await client.put(
            f"/api/schools/{sid}/entries/ent-1",
            json={"day": "Monday", "period": 1, "subject_id": "sub-1", "teacher_id": "t-1"},
            headers=s_headers,
        )
        assert resp.status_code == 403


@pytest.mark.anyio
async def test_horizontal_role_isolation():
    """Verify students cannot spy on other classes, teachers cannot spy on other teachers."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.post("/api/schools", json={
            "name": "Riverdale",
            "subdomain": "riverdale",
            "timezone": "UTC",
            "term": "Term 1",
            "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "max_teacher_periods_per_day": 5,
            "activity_day": "Wednesday",
            "activity_periods": [1, 2],
        })
        sid = resp.json()["id"]

        student_token = create_access_token({
            "sub": "student-alice",
            "school_id": sid,
            "role": "student",
            "class_id": "class-primary-4a",
        })
        s_headers = {"Authorization": f"Bearer {student_token}"}

        # Student querying another class (10A) -> 403
        resp = await client.get(f"/api/schools/{sid}/timetable?class_id=class-senior-10a", headers=s_headers)
        assert resp.status_code == 403
        assert "Students may only view their own class" in resp.json()["detail"]

        # Teacher querying another teacher -> 403
        teacher_token = create_access_token({
            "sub": "t-euler",
            "school_id": sid,
            "role": "teacher",
            "teacher_id": "t-euler",
        })
        t_headers = {"Authorization": f"Bearer {teacher_token}"}

        resp = await client.get(f"/api/schools/{sid}/timetable?teacher_id=t-curie", headers=t_headers)
        assert resp.status_code == 403
        assert "Teachers may only view their own timetable" in resp.json()["detail"]


@pytest.mark.anyio
async def test_unauthenticated_requests_rejected():
    """Verify that missing token returns 401."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.get("/api/schools/sch-123/timetable")
        assert resp.status_code == 401
        assert "missing Bearer token" in resp.json()["detail"]


@pytest.mark.anyio
async def test_subdomain_resolution_and_auth_flow():
    """Test subdomain resolution and JWT login endpoint."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Create school with unique subdomain and custom admin credentials
        await client.post("/api/schools", json={
            "name": "Oxford Prep",
            "subdomain": "oxford",
            "timezone": "UTC",
            "term": "Term 1",
            "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "max_teacher_periods_per_day": 5,
            "activity_day": "Wednesday",
            "activity_periods": [1, 2],
            "admin_email": "headmaster@oxford.edu",
            "admin_password": "OxfordHeadmaster123!",
        })

        # Resolve subdomain via Host header
        resp = await client.get("/api/auth/resolve-school", headers={"Host": "oxford.chronosedu.com"})
        assert resp.status_code == 200
        school_info = resp.json()
        assert school_info["subdomain"] == "oxford"
        assert school_info["name"] == "Oxford Prep"
        sid = school_info["id"]

        # Attack: Attempt password-less / incorrect password login -> 401 Unauthorized
        bad_login = await client.post("/api/auth/token", json={
            "school_id": sid,
            "email": "headmaster@oxford.edu",
            "password": "WrongPassword!",
        })
        assert bad_login.status_code == 401
        assert "Invalid school, email, or password" in bad_login.json()["detail"]

        # Real credentials login -> 200 OK with signed JWT
        login_resp = await client.post("/api/auth/token", json={
            "school_id": sid,
            "email": "headmaster@oxford.edu",
            "password": "OxfordHeadmaster123!",
        })
        assert login_resp.status_code == 200
        token_data = login_resp.json()
        assert "access_token" in token_data
        assert token_data["user"]["role"] == "admin"
        assert token_data["user"]["school_id"] == sid
        assert token_data["user"]["email"] == "headmaster@oxford.edu"

        # Call /api/auth/me
        me_resp = await client.get(
            "/api/auth/me",
            headers={"Authorization": f"Bearer {token_data['access_token']}"},
        )
        assert me_resp.status_code == 200
        assert me_resp.json()["email"] == "headmaster@oxford.edu"


@pytest.mark.anyio
async def test_startup_fails_if_jwt_secret_is_default():
    """Verify application startup raises RuntimeError immediately if CHRONOS_JWT_SECRET is default or insecure."""
    from app.core.config import settings
    from app.main import lifespan

    original_secret = settings.jwt_secret
    try:
        # Test with known default
        settings.jwt_secret = "chronos-super-secret-jwt-key-for-saas-timetable"
        with pytest.raises(RuntimeError) as exc_info:
            async with lifespan(app):
                pass
        assert "FATAL SECURITY FAILURE" in str(exc_info.value)
        assert "CHRONOS_JWT_SECRET" in str(exc_info.value)

        # Test with empty secret
        settings.jwt_secret = ""
        with pytest.raises(RuntimeError) as exc_info_empty:
            async with lifespan(app):
                pass
        assert "FATAL SECURITY FAILURE" in str(exc_info_empty.value)
    finally:
        settings.jwt_secret = original_secret


@pytest.mark.anyio
async def test_register_is_admin_only_and_tenancy_guarded():
    """Prove that /api/auth/register is strictly admin-only and blocks cross-tenant user creation."""
    from app.api.auth import reset_login_rate_limits
    reset_login_rate_limits()

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Create School A with first admin password
        res_a = await client.post("/api/schools", json={
            "name": "School A",
            "subdomain": "school-a",
            "admin_email": "admin@school-a.edu",
            "admin_password": "AdminSecurePassword123!",
        })
        assert res_a.status_code == 201
        sid_a = res_a.json()["id"]

        # Create School B without initial admin
        res_b = await client.post("/api/schools", json={
            "name": "School B",
            "subdomain": "school-b",
        })
        assert res_b.status_code == 201
        sid_b = res_b.json()["id"]

        # First admin sets password on School B via setup-admin
        setup_b = await client.post(f"/api/auth/setup-admin?school_id={sid_b}", json={
            "email": "admin@school-b.edu",
            "password": "AdminBPassword123!",
            "role": "admin",
        })
        assert setup_b.status_code == 201
        assert setup_b.json()["email"] == "admin@school-b.edu"

        # Attempting second setup-admin on School B -> 403 Forbidden
        setup_b_again = await client.post(f"/api/auth/setup-admin?school_id={sid_b}", json={
            "email": "attacker@school-b.edu",
            "password": "AttackerPassword123!",
            "role": "admin",
        })
        assert setup_b_again.status_code == 403
        assert "Initial administrator already exists" in setup_b_again.json()["detail"]

        # Log in as School A Admin
        login_a = await client.post("/api/auth/token", json={
            "school_id": sid_a,
            "email": "admin@school-a.edu",
            "password": "AdminSecurePassword123!",
        })
        assert login_a.status_code == 200
        token_a = login_a.json()["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # 1. Unauthenticated request to /api/auth/register -> 401 Unauthorized
        unauth_reg = await client.post(f"/api/auth/register?school_id={sid_a}", json={
            "email": "teacher1@school-a.edu",
            "password": "TeacherPass123!",
            "role": "teacher",
        })
        assert unauth_reg.status_code == 401

        # 2. Cross-tenant registration attempt: School A admin tries to register user into School B -> 403 Forbidden
        cross_reg = await client.post(
            f"/api/auth/register?school_id={sid_b}",
            json={"email": "spy@school-b.edu", "password": "SpyPassword123!", "role": "teacher"},
            headers=headers_a,
        )
        assert cross_reg.status_code == 403
        assert "Cross-tenant access forbidden" in cross_reg.json()["detail"]

        # 3. Legitimate registration by School A admin -> 201 Created
        valid_reg = await client.post(
            f"/api/auth/register?school_id={sid_a}",
            json={"email": "teacher1@school-a.edu", "password": "TeacherPass123!", "role": "teacher"},
            headers=headers_a,
        )
        assert valid_reg.status_code == 201
        assert valid_reg.json()["email"] == "teacher1@school-a.edu"
        assert valid_reg.json()["role"] == "teacher"

        # Log in as newly registered teacher
        t_login = await client.post("/api/auth/token", json={
            "school_id": sid_a,
            "email": "teacher1@school-a.edu",
            "password": "TeacherPass123!",
        })
        assert t_login.status_code == 200
        t_token = t_login.json()["access_token"]

        # 4. Teacher tries to call /api/auth/register -> 403 Forbidden (Admin only)
        teacher_reg = await client.post(
            f"/api/auth/register?school_id={sid_a}",
            json={"email": "student1@school-a.edu", "password": "StudentPass123!", "role": "student"},
            headers={"Authorization": f"Bearer {t_token}"},
        )
        assert teacher_reg.status_code == 403


@pytest.mark.anyio
async def test_login_rate_limiting():
    """Verify that exceeding 5 failed login attempts triggers 429 Too Many Requests."""
    from app.api.auth import reset_login_rate_limits
    reset_login_rate_limits()

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Create School with admin
        res = await client.post("/api/schools", json={
            "name": "Rate Limit School",
            "subdomain": "ratelimit-sch",
            "admin_email": "admin@ratelimit.edu",
            "admin_password": "CorrectPassword123!",
        })
        sid = res.json()["id"]

        # 5 failed login attempts
        for i in range(5):
            bad_resp = await client.post("/api/auth/token", json={
                "school_id": sid,
                "email": "admin@ratelimit.edu",
                "password": f"BadPassword{i}!",
            })
            assert bad_resp.status_code == 401

        # 6th attempt should be blocked with 429 Too Many Requests
        rate_limited_resp = await client.post("/api/auth/token", json={
            "school_id": sid,
            "email": "admin@ratelimit.edu",
            "password": "CorrectPassword123!",
        })
        assert rate_limited_resp.status_code == 429
        assert "Too many failed login attempts" in rate_limited_resp.json()["detail"]
        assert "Retry-After" in rate_limited_resp.headers
