"""Notifications Service: Provider interface, Resend email provider, mock provider, and background task handler."""
from __future__ import annotations

import logging
import os
import time
import uuid
from abc import ABC, abstractmethod
from typing import Any
import httpx
from pydantic import BaseModel
from sqlalchemy import select

from app.db import models
from app.db.session import tenant_session

logger = logging.getLogger("chronos.notifications")


class NotificationMessage(BaseModel):
    to_email: str
    to_name: str
    subject: str
    body_text: str
    body_html: str
    metadata: dict[str, Any] = {}


class NotificationProvider(ABC):
    @abstractmethod
    def send(self, message: NotificationMessage) -> bool:
        """Send a notification message. Return True on success, False/raise on error."""
        pass


class ResendEmailProvider(NotificationProvider):
    """Email notification provider using Resend API (https://resend.com)."""

    def __init__(self, api_key: str | None = None, from_email: str = "notifications@chronosedu.com"):
        self.api_key = api_key or os.getenv("RESEND_API_KEY")
        self.from_email = from_email

    def send(self, message: NotificationMessage) -> bool:
        if not self.api_key:
            logger.info(
                "[ResendProvider: DEMO_MODE] No RESEND_API_KEY configured. Logging notification instead:\n"
                "To: %s <%s>\nSubject: %s\nBody: %s",
                message.to_name,
                message.to_email,
                message.subject,
                message.body_text,
            )
            mock_provider.record(message)
            return True

        url = "https://api.resend.com/emails"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "from": self.from_email,
            "to": [message.to_email],
            "subject": message.subject,
            "text": message.body_text,
            "html": message.body_html,
        }

        with httpx.Client(timeout=10.0) as client:
            resp = client.post(url, headers=headers, json=payload)
            if resp.status_code >= 400:
                logger.error("Resend API failed [%d]: %s", resp.status_code, resp.text)
                return False
            logger.info("Resend notification sent successfully to %s: %s", message.to_email, resp.json())
            mock_provider.record(message)
            return True


class MockNotificationProvider(NotificationProvider):
    """In-memory mock provider for testing and offline development."""

    def __init__(self):
        self.sent_messages: list[NotificationMessage] = []

    def send(self, message: NotificationMessage) -> bool:
        self.sent_messages.append(message)
        logger.info("[MockProvider] Recorded notification to %s: %s", message.to_email, message.subject)
        return True

    def record(self, message: NotificationMessage):
        self.sent_messages.append(message)

    def clear(self):
        self.sent_messages.clear()


# Global providers
mock_provider = MockNotificationProvider()
resend_provider = ResendEmailProvider()

# Active default provider
current_provider: NotificationProvider = resend_provider


def set_notification_provider(provider: NotificationProvider):
    global current_provider
    current_provider = provider


def send_substitution_notification_task(
    school_id: str,
    entry_id: str,
    substitute_teacher_id: str,
    max_retries: int = 3,
):
    """Background task to dispatch substitution assignment notification to the substitute teacher.
    
    Failures are caught, logged, and retried with backoff. Never raises to the caller.
    """
    logger.info("Starting substitution notification task: school=%s entry=%s sub=%s", school_id, entry_id, substitute_teacher_id)

    try:
        sid = uuid.UUID(school_id)
        eid = uuid.UUID(entry_id)
        tid = uuid.UUID(substitute_teacher_id)

        with tenant_session(str(sid)) as session:
            # Query entry with class and subject
            entry = session.execute(
                select(models.TimetableEntry).where(models.TimetableEntry.id == eid)
            ).scalars().first()

            if not entry:
                logger.warning("Entry %s not found for notification dispatch", entry_id)
                return

            sub_teacher = session.execute(
                select(models.Teacher).where(models.Teacher.id == tid)
            ).scalars().first()

            if not sub_teacher:
                logger.warning("Substitute teacher %s not found for notification dispatch", substitute_teacher_id)
                return

            teacher_email = sub_teacher.email or f"{sub_teacher.name.lower().replace(' ', '.')}@school.edu"
            teacher_name = sub_teacher.name

            # Lookup class and subject names if possible
            cls = session.execute(
                select(models.ClassSection).where(models.ClassSection.id == entry.class_id)
            ).scalars().first()
            sub = session.execute(
                select(models.Subject).where(models.Subject.id == entry.subject_id)
            ).scalars().first()

            class_name = cls.section if cls else "Class"
            subject_name = sub.name if sub else "Subject"

            subject_line = f"Urgent: Substitution Assigned — {class_name} ({entry.day}, Period {entry.period})"
            body_text = (
                f"Hello {teacher_name},\n\n"
                f"You have been assigned as a substitute teacher for:\n"
                f"• Class: {class_name}\n"
                f"• Subject: {subject_name}\n"
                f"• Day: {entry.day}\n"
                f"• Period: Period {entry.period}\n"
                f"• Room: {entry.room or 'Home Classroom'}\n\n"
                f"Please review your updated schedule on the ChronosEdu Teacher Portal.\n\n"
                f"— ChronosEdu Automated Timetable Platform"
            )
            body_html = f"""
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px;">
              <h2 style="color: #4f46e5; margin-bottom: 8px;">Timetable Substitution Assignment</h2>
              <p>Hello <strong>{teacher_name}</strong>,</p>
              <p>You have been assigned as a substitute teacher for the following period:</p>
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Class:</td><td style="padding: 8px 0; font-weight: bold;">{class_name}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Subject:</td><td style="padding: 8px 0; font-weight: bold;">{subject_name}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Schedule Slot:</td><td style="padding: 8px 0; font-weight: bold;">{entry.day}, Period {entry.period}</td></tr>
                <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Room:</td><td style="padding: 8px 0; font-weight: bold;">{entry.room or 'Home Classroom'}</td></tr>
              </table>
              <p style="font-size: 13px; color: #64748b;">Please log in to your ChronosEdu Teacher Portal to view your complete updated schedule.</p>
            </div>
            """

            msg = NotificationMessage(
                to_email=teacher_email,
                to_name=teacher_name,
                subject=subject_line,
                body_text=body_text,
                body_html=body_html,
                metadata={
                    "school_id": school_id,
                    "entry_id": entry_id,
                    "substitute_teacher_id": substitute_teacher_id,
                },
            )

        # Retry loop
        for attempt in range(1, max_retries + 1):
            try:
                success = current_provider.send(msg)
                if success:
                    logger.info("Notification dispatched on attempt %d to %s", attempt, teacher_email)
                    return
            except Exception as e:
                logger.warning("Attempt %d to send notification failed: %s", attempt, e)

            if attempt < max_retries:
                time.sleep(0.5 * attempt)

        logger.error("All %d notification attempts failed for substitute %s", max_retries, substitute_teacher_id)

    except Exception as e:
        logger.error("Unhandled error in send_substitution_notification_task: %s", e, exc_info=True)
