"""Phase 5 Tests: Notification Service, Provider Interface, Background Tasks, and Substitution Dispatch."""
from __future__ import annotations

import os
import pytest
from httpx import ASGITransport, AsyncClient

os.environ["CHRONOS_DATABASE_URL"] = "sqlite:///./test_chronos.db"

from app.core.auth import create_access_token
from app.db.models import Base
from app.db.session import engine
from app.main import app
from app.services.notifications import (
    MockNotificationProvider,
    NotificationMessage,
    NotificationProvider,
    mock_provider,
    set_notification_provider,
)


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    mock_provider.clear()
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.mark.anyio
async def test_notification_provider_direct_send():
    """Verify provider interface and recording."""
    provider = MockNotificationProvider()
    msg = NotificationMessage(
        to_email="teacher@school.edu",
        to_name="Prof. X",
        subject="Test Alert",
        body_text="Hello world",
        body_html="<p>Hello world</p>",
    )
    assert provider.send(msg) is True
    assert len(provider.sent_messages) == 1
    assert provider.sent_messages[0].to_email == "teacher@school.edu"


@pytest.mark.anyio
async def test_substitution_assign_triggers_background_notification():
    """Verify that assigning a substitute teacher automatically enqueues and dispatches an email notification."""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        # Create school
        resp = await client.post("/api/schools", json={
            "name": "St. Andrews",
            "subdomain": "standrews",
            "timezone": "UTC",
            "term": "Term 1",
            "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "max_teacher_periods_per_day": 5,
            "activity_day": "Friday",
            "activity_periods": [1, 2],
        })
        sid = resp.json()["id"]

        token = create_access_token({"sub": "admin-1", "school_id": sid, "role": "admin"})
        auth_client = AsyncClient(transport=ASGITransport(app=app), base_url="http://test", headers={"Authorization": f"Bearer {token}"})

        # Add Grade
        g_resp = await auth_client.post(f"/api/schools/{sid}/grades", json={"name": "Grade 4", "tier": "primary"})
        gid = g_resp.json()["id"]

        # Add Class
        c_resp = await auth_client.post(f"/api/schools/{sid}/classes", json={"grade_id": gid, "section": "4A"})
        cid = c_resp.json()["id"]

        # Add Subject
        s_resp = await auth_client.post(f"/api/schools/{sid}/subjects", json={"name": "Math", "code": "MTH", "type": "academic"})
        sub_id = s_resp.json()["id"]

        # Add Requirement: 20 slots
        await auth_client.post(f"/api/schools/{sid}/requirements", json={"subject_id": sub_id, "grade_id": gid, "weekly_frequency": 20})

        # Add Primary Teacher and Substitute Teacher with explicit email
        t1_resp = await auth_client.post(f"/api/schools/{sid}/teachers", json={
            "name": "Mr. Regular",
            "email": "regular@standrews.edu",
            "subject_ids": [sub_id],
        })
        t1 = t1_resp.json()

        t2_resp = await auth_client.post(f"/api/schools/{sid}/teachers", json={
            "name": "Ms. Substitute",
            "email": "substitute@standrews.edu",
            "phone": "+1-555-0199",
            "subject_ids": [sub_id],
        })
        t2 = t2_resp.json()

        # Generate schedule
        gen_resp = await auth_client.post(f"/api/schools/{sid}/generate")
        assert gen_resp.status_code == 200
        entries = gen_resp.json()["entries"]
        assert len(entries) > 0

        target_entry = entries[0]

        # Clear any prior recorded messages
        mock_provider.clear()

        # Assign Ms. Substitute to target_entry
        assign_resp = await auth_client.post(
            f"/api/schools/{sid}/substitutions",
            json={"entry_id": target_entry["id"], "substitute_teacher_id": t2["id"]},
        )
        assert assign_resp.status_code == 200
        assert assign_resp.json()["substitute_teacher_id"] == t2["id"]

        # Verify background notification was recorded for Ms. Substitute
        assert len(mock_provider.sent_messages) == 1
        sent = mock_provider.sent_messages[0]
        assert sent.to_email == "substitute@standrews.edu"
        assert sent.to_name == "Ms. Substitute"
        assert "Urgent: Substitution Assigned" in sent.subject
        assert "Class: 4A" in sent.body_text
        assert "Subject: Math" in sent.body_text


@pytest.mark.anyio
async def test_notification_failure_never_blocks_assignment():
    """Verify that if the notification provider raises an exception, the HTTP endpoint still returns 200."""
    class FailingProvider(NotificationProvider):
        def send(self, message: NotificationMessage) -> bool:
            raise ConnectionError("Simulated Resend API timeout / network down")

    original_provider = notifications_provider = mock_provider
    set_notification_provider(FailingProvider())

    try:
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
            resp = await client.post("/api/schools", json={
                "name": "Oakridge",
                "subdomain": "oakridge",
                "timezone": "UTC",
                "term": "Term 1",
                "working_days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "max_teacher_periods_per_day": 5,
                "activity_day": "Friday",
                "activity_periods": [1, 2],
            })
            sid = resp.json()["id"]
            token = create_access_token({"sub": "admin-1", "school_id": sid, "role": "admin"})
            auth_client = AsyncClient(transport=ASGITransport(app=app), base_url="http://test", headers={"Authorization": f"Bearer {token}"})

            g = (await auth_client.post(f"/api/schools/{sid}/grades", json={"name": "G1", "tier": "primary"})).json()
            c = (await auth_client.post(f"/api/schools/{sid}/classes", json={"grade_id": g["id"], "section": "1A"})).json()
            s = (await auth_client.post(f"/api/schools/{sid}/subjects", json={"name": "Art", "code": "ART", "type": "academic"})).json()
            await auth_client.post(f"/api/schools/{sid}/requirements", json={"subject_id": s["id"], "grade_id": g["id"], "weekly_frequency": 20})
            t1 = (await auth_client.post(f"/api/schools/{sid}/teachers", json={"name": "T1", "subject_ids": [s["id"]]})).json()
            t2 = (await auth_client.post(f"/api/schools/{sid}/teachers", json={"name": "T2", "subject_ids": [s["id"]]})).json()

            gen = (await auth_client.post(f"/api/schools/{sid}/generate")).json()
            entry = gen["entries"][0]

            # Assign substitute with failing provider
            assign_resp = await auth_client.post(
                f"/api/schools/{sid}/substitutions",
                json={"entry_id": entry["id"], "substitute_teacher_id": t2["id"]},
            )
            # Must succeed despite notification failure!
            assert assign_resp.status_code == 200
            assert assign_resp.json()["substitute_teacher_id"] == t2["id"]
    finally:
        set_notification_provider(original_provider)
