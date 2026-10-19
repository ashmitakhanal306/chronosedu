"""API and database tests for ChronosEdu backend (FastAPI + SQLAlchemy + SQLite/Postgres)."""
from __future__ import annotations

import os
import pytest
from httpx import ASGITransport, AsyncClient

# Configure test in-memory SQLite database
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

        # 7.5. Teaching Assignments (Phase 1)
        for cid, t_map in [
            (c_4a["id"], {s_math["id"]: t_m1["id"], s_eng["id"]: t_e1["id"], s_sci["id"]: t_s1["id"], s_art["id"]: t_art["id"], s_mus["id"]: t_mus["id"]}),
            (c_10a["id"], {s_math["id"]: t_m2["id"], s_eng["id"]: t_e1["id"], s_sci["id"]: t_s1["id"], s_art["id"]: t_art["id"], s_mus["id"]: t_mus["id"]}),
        ]:
            for s_id_val, t_id_val in t_map.items():
                asgn_resp = await auth_client.post(
                    f"/api/schools/{sid}/assignments",
                    json={"class_id": cid, "subject_id": s_id_val, "teacher_id": t_id_val},
                )
                assert asgn_resp.status_code == 200

        # Verify assignments list endpoint
        asgns_list_resp = await auth_client.get(f"/api/schools/{sid}/assignments")
        assert asgns_list_resp.status_code == 200
        assert len(asgns_list_resp.json()) == 10

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


@pytest.mark.anyio
async def test_phase2_holidays_pins_blocks_versions_and_audit():
    """Verify Phase 2 data model completion: Holidays, Pinned Lessons, Blocked Slots, Timetable Versions, and Audit Logs."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Create school
        s_resp = await client.post(
            "/api/schools",
            json={
                "name": "Phase 2 Academy",
                "subdomain": "phase2",
                "timezone": "Asia/Kolkata",
                "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "max_teacher_periods_per_day": 5,
                "activity_day": "Wednesday",
                "activity_periods": [1, 2],
            },
            headers={"X-Chronos-Platform-Token": "chronos-platform-dev-secret"},
        )
        assert s_resp.status_code == 201
        sid = s_resp.json()["id"]

        from app.core.auth import create_access_token
        token = create_access_token({"sub": "admin-p2", "school_id": sid, "role": "admin"})
        auth_client = AsyncClient(transport=ASGITransport(app=app), base_url="http://test", headers={"Authorization": f"Bearer {token}"})

        # 1. Holidays (Phase 2-A)
        h_resp = await auth_client.post(
            f"/api/schools/{sid}/holidays",
            json={"name": "Diwali Break", "start_date": "2026-11-01", "end_date": "2026-11-05", "holiday_type": "national"},
        )
        assert h_resp.status_code == 201
        holiday = h_resp.json()
        assert holiday["name"] == "Diwali Break"
        assert holiday["holiday_type"] == "national"

        list_h = await auth_client.get(f"/api/schools/{sid}/holidays")
        assert list_h.status_code == 200
        assert len(list_h.json()) == 1

        # 2. Setup Grade, Class, Subject, Teacher for Pins and Blocks
        g_resp = await auth_client.post(f"/api/schools/{sid}/grades", json={"name": "Grade 5", "tier": "primary"})
        gid = g_resp.json()["id"]

        c_resp = await auth_client.post(f"/api/schools/{sid}/classes", json={"grade_id": gid, "section": "5A"})
        cid = c_resp.json()["id"]

        sub_resp = await auth_client.post(f"/api/schools/{sid}/subjects", json={"name": "Math", "code": "MTH", "type": "academic"})
        sub_id = sub_resp.json()["id"]

        t_resp = await auth_client.post(
            f"/api/schools/{sid}/teachers",
            json={
                "name": "Prof. Gauss",
                "max_periods_per_day": 5,
                "max_periods_per_week": 25,
                "max_consecutive_periods": 3,
                "qualifications": [{"subject_id": sub_id, "grade_id": gid}],
            },
        )
        assert t_resp.status_code == 201
        tid = t_resp.json()["id"]
        assert len(t_resp.json()["qualifications"]) == 1

        # 3. Pinned Lessons (Phase 2-C)
        pin_resp = await auth_client.post(
            f"/api/schools/{sid}/pinned-lessons",
            json={"class_id": cid, "subject_id": sub_id, "teacher_id": tid, "day": "Monday", "period": 1},
        )
        assert pin_resp.status_code == 201
        pin = pin_resp.json()
        assert pin["day"] == "Monday"
        assert pin["period"] == 1
        assert pin["class_name"] == "5A"

        # Clash on pinning same class slot
        pin_clash = await auth_client.post(
            f"/api/schools/{sid}/pinned-lessons",
            json={"class_id": cid, "subject_id": sub_id, "teacher_id": tid, "day": "Monday", "period": 1},
        )
        assert pin_clash.status_code == 409

        pins = (await auth_client.get(f"/api/schools/{sid}/pinned-lessons")).json()
        assert len(pins) == 1

        # 4. Blocked Slots (Phase 2-C)
        block_resp = await auth_client.post(
            f"/api/schools/{sid}/blocked-slots",
            json={"scope": "school", "day": "Friday", "period": 4, "label": "All-School Assembly"},
        )
        assert block_resp.status_code == 201
        block = block_resp.json()
        assert block["label"] == "All-School Assembly"

        blocks = (await auth_client.get(f"/api/schools/{sid}/blocked-slots")).json()
        assert len(blocks) == 1

        # 5. Requirement and Assignment for Generate
        await auth_client.post(f"/api/schools/{sid}/requirements", json={"grade_id": gid, "subject_id": sub_id, "weekly_frequency": 3})
        await auth_client.post(f"/api/schools/{sid}/assignments", json={"class_id": cid, "subject_id": sub_id, "teacher_id": tid})

        # 6. Versioning (Phase 2-D)
        gen_resp = await auth_client.post(f"/api/schools/{sid}/generate")
        assert gen_resp.status_code == 200
        assert gen_resp.json()["feasible"] is True

        versions_resp = await auth_client.get(f"/api/schools/{sid}/versions")
        assert versions_resp.status_code == 200
        versions = versions_resp.json()
        assert len(versions) >= 1
        v1 = versions[0]
        assert v1["state"] == "draft"
        assert v1["entry_count"] > 0

        # Approve Version
        app_resp = await auth_client.post(f"/api/schools/{sid}/versions/{v1['id']}/approve")
        assert app_resp.status_code == 200
        assert app_resp.json()["state"] == "approved"

        # Publish Version
        pub_v_resp = await auth_client.post(f"/api/schools/{sid}/versions/{v1['id']}/publish", json={"notes": "Final Q1 schedule"})
        assert pub_v_resp.status_code == 200
        assert pub_v_resp.json()["state"] == "published"

        # 7. Audit Log (Phase 2-E)
        audit_resp = await auth_client.get(f"/api/schools/{sid}/audit-logs")
        assert audit_resp.status_code == 200
        logs = audit_resp.json()
        assert len(logs) >= 5
        actions = [l["action"] for l in logs]
        assert "create_holiday" in actions
        assert "pin_lesson" in actions
        assert "block_slot" in actions
        assert "generate_timetable" in actions
        assert "publish_version" in actions

        # 8. Full School Hydration
        full_resp = await auth_client.get(f"/api/schools/{sid}/full")
        assert full_resp.status_code == 200
        full_data = full_resp.json()
        assert len(full_data["holidays"]) == 1
        assert len(full_data["pinnedLessons"]) == 1
        assert len(full_data["blockedSlots"]) == 1
        assert len(full_data["versions"]) >= 1


@pytest.mark.anyio
async def test_phase3_solver_upgrades_and_rule_validator():
    """Test Phase 3 solver upgrades: QualityReport and shared validate_entry for overrides."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        token = create_access_token({"sub": "admin-p3", "role": "admin"})
        headers = {"Authorization": f"Bearer {token}", "X-Chronos-Platform-Token": "chronos-platform-dev-secret"}

        resp = await client.post("/api/schools", json={"name": "Rule Check Academy", "subdomain": "rules"}, headers=headers)
        assert resp.status_code == 201
        sid = resp.json()["id"]

        token = create_access_token({"sub": "admin-p3", "school_id": sid, "role": "admin"})
        headers = {"Authorization": f"Bearer {token}", "X-Chronos-Platform-Token": "chronos-platform-dev-secret"}

        # 1. Setup grade, class, subjects, teachers
        resp = await client.post(f"/api/schools/{sid}/grades", json={"name": "Grade 5", "tier": "primary"}, headers=headers)
        grade = resp.json()
        resp = await client.post(f"/api/schools/{sid}/rooms", json={"name": "Lab Alpha", "type": "lab"}, headers=headers)
        room = resp.json()
        resp = await client.post(f"/api/schools/{sid}/classes", json={"grade_id": grade["id"], "section": "5A"}, headers=headers)
        c5a = resp.json()

        resp = await client.post(f"/api/schools/{sid}/subjects", json={"name": "Mathematics", "code": "MTH", "type": "academic"}, headers=headers)
        s_mth = resp.json()
        resp = await client.post(f"/api/schools/{sid}/subjects", json={"name": "Music", "code": "MUS", "type": "activity"}, headers=headers)
        s_mus = resp.json()

        # Teacher 1 qualified in Math, Teacher 2 in Music
        resp = await client.post(f"/api/schools/{sid}/teachers", json={"name": "Mr. Euclid", "subject_ids": [s_mth["id"]]}, headers=headers)
        t_mth = resp.json()
        resp = await client.post(f"/api/schools/{sid}/teachers", json={"name": "Ms. Harmony", "subject_ids": [s_mus["id"]]}, headers=headers)
        t_mus = resp.json()

        # Requirements & Teaching Assignments
        await client.post(f"/api/schools/{sid}/requirements", json={"grade_id": grade["id"], "subject_id": s_mth["id"], "weekly_frequency": 10}, headers=headers)
        await client.post(f"/api/schools/{sid}/requirements", json={"grade_id": grade["id"], "subject_id": s_mus["id"], "weekly_frequency": 2}, headers=headers)

        await client.post(f"/api/schools/{sid}/assignments", json={"class_id": c5a["id"], "subject_id": s_mth["id"], "teacher_id": t_mth["id"]}, headers=headers)
        await client.post(f"/api/schools/{sid}/assignments", json={"class_id": c5a["id"], "subject_id": s_mus["id"], "teacher_id": t_mus["id"]}, headers=headers)

        # 2. Blocked Slot Enforcement via shared rule validator
        block_resp = await client.post(
            f"/api/schools/{sid}/blocked-slots",
            json={"scope": "school", "day": "Monday", "period": 1, "label": "Morning Assembly"},
            headers=headers,
        )
        assert block_resp.status_code in (200, 201)

        # Generate timetable
        gen_resp = await client.post(f"/api/schools/{sid}/generate", headers=headers)
        assert gen_resp.status_code == 200
        gen_data = gen_resp.json()
        assert gen_data["feasible"] is True

        # Phase 3-E Quality Report verification
        qr = gen_data["quality_report"]
        assert qr is not None
        assert qr["total_entries"] == 12
        assert len(qr["teacher_workload"]) >= 2

        # Verify no generated entry is placed on Monday Period 1 (Blocked Slot)
        mon_p1_entries = [e for e in gen_data["entries"] if e["day"] == "Monday" and e["period"] == 1]
        assert len(mon_p1_entries) == 0

        # 3. Test shared rule validator rejection on manual_override into a blocked slot
        target_entry = gen_data["entries"][0]
        blocked_override_payload = {
            "day": "Monday",
            "period": 1,
            "subject_id": s_mth["id"],
            "teacher_id": t_mth["id"],
        }
        res = await client.put(f"/api/schools/{sid}/entries/{target_entry['id']}", json=blocked_override_payload, headers=headers)
        assert res.status_code == 409
        assert "Blocked slot" in res.json()["detail"]

        # 4. Test shared rule validator rejection when assigning an unqualified teacher
        unqualified_payload = {
            "day": target_entry["day"],
            "period": target_entry["period"],
            "subject_id": s_mth["id"],
            "teacher_id": t_mus["id"],  # Ms. Harmony is only qualified in Music, not Math!
        }
        res2 = await client.put(f"/api/schools/{sid}/entries/{target_entry['id']}", json=unqualified_payload, headers=headers)
        assert res2.status_code == 409
        assert "qualification" in res2.json()["detail"].lower()

        # 5. Phase 4: Test lock, unlock, move, and swap operations
        # Lock entry
        lock_res = await client.patch(f"/api/schools/{sid}/entries/{target_entry['id']}/lock", headers=headers)
        assert lock_res.status_code == 200
        assert lock_res.json()["is_locked"] is True

        # Moving or deleting a locked entry must be rejected with 409
        move_res = await client.patch(
            f"/api/schools/{sid}/entries/{target_entry['id']}/move",
            json={"new_day": "Tuesday", "new_period": 5},
            headers=headers,
        )
        assert move_res.status_code == 409
        assert "locked" in move_res.json()["detail"].lower()

        del_locked = await client.delete(f"/api/schools/{sid}/entries/{target_entry['id']}", headers=headers)
        assert del_locked.status_code == 409
        assert "locked" in del_locked.json()["detail"].lower()

        # Unlock entry
        unlock_res = await client.patch(f"/api/schools/{sid}/entries/{target_entry['id']}/unlock", headers=headers)
        assert unlock_res.status_code == 200
        assert unlock_res.json()["is_locked"] is False

        # Swap entries
        if len(gen_data["entries"]) >= 2:
            e1 = gen_data["entries"][0]
            e2 = gen_data["entries"][1]
            swap_res = await client.post(f"/api/schools/{sid}/entries/{e1['id']}/swap/{e2['id']}", headers=headers)
            assert swap_res.status_code in (200, 409)  # either swapped or validated clash


