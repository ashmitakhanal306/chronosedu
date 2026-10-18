"""API and database tests for ChronosEdu backend (FastAPI + SQLAlchemy + SQLite/Postgres)."""
from __future__ import annotations

import os
import pytest
from httpx import ASGITransport, AsyncClient

# Configure test in-memory SQLite database
os.environ["CHRONOS_DATABASE_URL"] = "sqlite:///./test_chronos.db"

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
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.get("/health")
        assert resp.status_code == 200
        assert resp.json() == {"status": "ok"}


@pytest.mark.anyio
async def test_full_timetable_lifecycle_generate_override_publish():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # 1. Create School
        school_payload = {
            "name": "St. Jude Academy",
            "subdomain": "stjude",
            "timezone": "Asia/Kolkata",
            "term": "Term 1",
            "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "max_teacher_periods_per_day": 5,
            "activity_day": "Friday",
            "activity_periods": [1, 2],
        }
        resp = await client.post(
            "/api/schools",
            json=school_payload,
            headers={"X-Chronos-Platform-Token": "chronos-platform-dev-secret"},
        )
        assert resp.status_code == 201
        school = resp.json()
        sid = school["id"]

        from app.core.auth import create_access_token
        token = create_access_token({"sub": "admin-1", "school_id": sid, "role": "admin"})
        auth_client = AsyncClient(transport=ASGITransport(app=app), base_url="http://test", headers={"Authorization": f"Bearer {token}"})

        # 2. Add Grades
        resp = await auth_client.post(f"/api/schools/{sid}/grades", json={"name": "Grade 4", "tier": "primary"})
        assert resp.status_code == 201
        g_prim = resp.json()

        resp = await auth_client.post(f"/api/schools/{sid}/grades", json={"name": "Grade 10", "tier": "senior"})
        assert resp.status_code == 201
        g_sen = resp.json()

        # 3. Add Rooms
        resp = await auth_client.post(f"/api/schools/{sid}/rooms", json={"name": "Room 101", "type": "classroom"})
        r_101 = resp.json()
        resp = await auth_client.post(f"/api/schools/{sid}/rooms", json={"name": "Room 201", "type": "classroom"})
        r_201 = resp.json()
        resp = await auth_client.post(f"/api/schools/{sid}/rooms", json={"name": "Art Atelier", "type": "art_room"})
        r_art = resp.json()

        # 4. Add Classes
        resp = await auth_client.post(
            f"/api/schools/{sid}/classes",
            json={"grade_id": g_prim["id"], "section": "4A", "home_room_id": r_101["id"]},
        )
        c_4a = resp.json()

        resp = await auth_client.post(
            f"/api/schools/{sid}/classes",
            json={"grade_id": g_sen["id"], "section": "10A", "home_room_id": r_201["id"]},
        )
        c_10a = resp.json()

        # 5. Add Subjects
        resp = await auth_client.post(f"/api/schools/{sid}/subjects", json={"name": "Math", "code": "MATH", "type": "academic"})
        s_math = resp.json()
        resp = await auth_client.post(f"/api/schools/{sid}/subjects", json={"name": "English", "code": "ENG", "type": "academic"})
        s_eng = resp.json()
        resp = await auth_client.post(f"/api/schools/{sid}/subjects", json={"name": "Science", "code": "SCI", "type": "academic"})
        s_sci = resp.json()
        resp = await auth_client.post(
            f"/api/schools/{sid}/subjects",
            json={"name": "Art & Craft", "code": "ART", "type": "activity", "room_id": r_art["id"]},
        )
        s_art = resp.json()
        resp = await auth_client.post(
            f"/api/schools/{sid}/subjects",
            json={"name": "Music", "code": "MUS", "type": "activity"},
        )
        s_mus = resp.json()

        # 6. Add Requirements
        for sid_item, f_p, f_s in [
            (s_math["id"], 6, 10),
            (s_eng["id"], 6, 9),
            (s_sci["id"], 6, 9),
            (s_art["id"], 1, 1),
            (s_mus["id"], 1, 1),
        ]:
            await auth_client.post(f"/api/schools/{sid}/requirements", json={"subject_id": sid_item, "grade_id": g_prim["id"], "weekly_frequency": f_p})
            await auth_client.post(f"/api/schools/{sid}/requirements", json={"subject_id": sid_item, "grade_id": g_sen["id"], "weekly_frequency": f_s})

        # 7. Add Teachers
        resp = await auth_client.post(f"/api/schools/{sid}/teachers", json={"name": "Mr. Euler", "subject_ids": [s_math["id"]]})
        t_m1 = resp.json()
        resp = await auth_client.post(f"/api/schools/{sid}/teachers", json={"name": "Ms. Lovelace", "subject_ids": [s_math["id"]]})
        t_m2 = resp.json()

        resp = await auth_client.post(f"/api/schools/{sid}/teachers", json={"name": "Mr. Shakespeare", "subject_ids": [s_eng["id"]]})
        t_e1 = resp.json()

        resp = await auth_client.post(f"/api/schools/{sid}/teachers", json={"name": "Dr. Curie", "subject_ids": [s_sci["id"]]})
        t_s1 = resp.json()

        resp = await auth_client.post(f"/api/schools/{sid}/teachers", json={"name": "Ms. Picasso", "subject_ids": [s_art["id"], s_mus["id"]]})
        t_art = resp.json()
        resp = await auth_client.post(f"/api/schools/{sid}/teachers", json={"name": "Maestro Mozart", "subject_ids": [s_mus["id"], s_art["id"]]})
        t_mus = resp.json()

        # 8. Generate Timetable
        gen_resp = await auth_client.post(f"/api/schools/{sid}/generate")
        assert gen_resp.status_code == 200
        gen_data = gen_resp.json()
        assert gen_data["feasible"] is True, f"Diagnostics: {gen_data['diagnostics']}"
        assert len(gen_data["entries"]) == (20 + 30)  # 50 entries

        # 9. Get Timetable
        tt_resp = await auth_client.get(f"/api/schools/{sid}/timetable")
        assert tt_resp.status_code == 200
        entries = tt_resp.json()
        assert len(entries) == 50

        # Filter by class
        class_resp = await auth_client.get(f"/api/schools/{sid}/timetable?class_id={c_4a['id']}")
        assert len(class_resp.json()) == 20

        # 10. Manual Override Test
        entry_to_edit = entries[0]
        other_entry = [e for e in entries if (e["day"] != entry_to_edit["day"] or e["period"] != entry_to_edit["period"]) and e["class_id"] == entry_to_edit["class_id"]][0]

        clash_payload = {
            "day": other_entry["day"],
            "period": other_entry["period"],
            "subject_id": entry_to_edit["subject_id"],
            "teacher_id": entry_to_edit["teacher_id"],
        }
        clash_resp = await auth_client.put(f"/api/schools/{sid}/entries/{entry_to_edit['id']}", json=clash_payload)
        assert clash_resp.status_code == 409
        assert "Class clash" in clash_resp.json()["detail"]

        curie_entries = [e for e in entries if e["teacher_id"] == t_s1["id"]]
        if curie_entries:
            for busy_slot in curie_entries:
                class_slot_busy = any(
                    e for e in entries
                    if e["class_id"] == entry_to_edit["class_id"]
                    and e["day"] == busy_slot["day"]
                    and e["period"] == busy_slot["period"]
                    and e["id"] != entry_to_edit["id"]
                )
                if not class_slot_busy and entry_to_edit["class_id"] != busy_slot["class_id"]:
                    teacher_clash_payload = {
                        "day": busy_slot["day"],
                        "period": busy_slot["period"],
                        "subject_id": s_sci["id"],
                        "teacher_id": t_s1["id"],
                    }
                    t_clash_resp = await auth_client.put(f"/api/schools/{sid}/entries/{entry_to_edit['id']}", json=teacher_clash_payload)
                    assert t_clash_resp.status_code == 409
                    assert "Teacher double-booking clash" in t_clash_resp.json()["detail"]
                    break

        # 11. Publish Timetable
        pub_resp = await auth_client.post(f"/api/schools/{sid}/publish")
        assert pub_resp.status_code == 200
        assert pub_resp.json()["published"] is True

        # 12. Absence Logging & Substitute Candidates
        abs_resp = await auth_client.post(
            f"/api/schools/{sid}/absences",
            json={"teacher_id": t_m1["id"], "day": "Monday", "reason": "Conference"},
        )
        assert abs_resp.status_code == 200
        absence = abs_resp.json()
        assert absence["teacher_id"] == t_m1["id"]

        subs_resp = await auth_client.get(f"/api/schools/{sid}/absences/{absence['id']}/substitutes")
        assert subs_resp.status_code == 200
        candidates = subs_resp.json()
        assert len(candidates) > 0
        assert all(c["teacher_id"] != t_m1["id"] for c in candidates)

        # 13. Assign Substitution
        sub_candidate = candidates[0]
        assign_resp = await auth_client.post(
            f"/api/schools/{sid}/substitutions",
            json={"entry_id": entry_to_edit["id"], "substitute_teacher_id": sub_candidate["teacher_id"]},
        )
        assert assign_resp.status_code == 200
        sub_data = assign_resp.json()
        assert sub_data["substitute_teacher_id"] == sub_candidate["teacher_id"]

        verify_resp = await auth_client.get(f"/api/schools/{sid}/timetable")
        updated_entries = verify_resp.json()
        subbed_entry = [e for e in updated_entries if e["id"] == entry_to_edit["id"]][0]
        assert subbed_entry["substitute_teacher_id"] == sub_candidate["teacher_id"]
