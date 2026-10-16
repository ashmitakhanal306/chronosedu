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
        # Create school with unique subdomain
        await client.post("/api/schools", json={
            "name": "Oxford Prep",
            "subdomain": "oxford",
            "timezone": "UTC",
            "term": "Term 1",
            "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "max_teacher_periods_per_day": 5,
            "activity_day": "Wednesday",
            "activity_periods": [1, 2],
        })

        # Resolve subdomain via Host header
        resp = await client.get("/api/auth/resolve-school", headers={"Host": "oxford.chronosedu.com"})
        assert resp.status_code == 200
        school_info = resp.json()
        assert school_info["subdomain"] == "oxford"
        assert school_info["name"] == "Oxford Prep"
        sid = school_info["id"]

        # Login endpoint to obtain token
        login_resp = await client.post("/api/auth/token", json={
            "school_id": sid,
            "role": "admin",
            "email": "headmaster@oxford.edu",
        })
        assert login_resp.status_code == 200
        token_data = login_resp.json()
        assert "access_token" in token_data
        assert token_data["user"]["role"] == "admin"
        assert token_data["user"]["school_id"] == sid

        # Call /api/auth/me
        me_resp = await client.get(
            "/api/auth/me",
            headers={"Authorization": f"Bearer {token_data['access_token']}"},
        )
        assert me_resp.status_code == 200
        assert me_resp.json()["email"] == "headmaster@oxford.edu"
