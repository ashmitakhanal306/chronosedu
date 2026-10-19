"""Rule Validator — Shared hard constraint checker for manual overrides and solver pre-checks.

Implements Phase 3-D: unified rule validation across manual edits, substitutions, and generation.
Raises HTTPException(status_code=409, detail=...) on rule violation.
"""
from __future__ import annotations

import uuid
from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.db import models


def validate_entry(
    session: Session,
    school_id: uuid.UUID,
    class_id: uuid.UUID,
    day: str,
    period: int,
    subject_id: uuid.UUID,
    teacher_id: uuid.UUID,
    room_id: uuid.UUID | None = None,
    exclude_entry_id: uuid.UUID | None = None,
) -> None:
    """Validate that placing an entry into (day, period) satisfies all hard constraints."""
    school = session.get(models.School, school_id)
    teacher = session.get(models.Teacher, teacher_id)
    subject = session.get(models.Subject, subject_id)
    class_obj = session.get(models.ClassSection, class_id)

    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher not found")
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    if not class_obj:
        raise HTTPException(status_code=404, detail="Class section not found")

    # 1. Blocked slot check (Step 9)
    blocked_slots = session.scalars(
        select(models.BlockedSlot).where(
            models.BlockedSlot.school_id == school_id,
            models.BlockedSlot.day == day,
            models.BlockedSlot.period == period,
        )
    ).all()

    for b in blocked_slots:
        if b.scope == "school":
            raise HTTPException(
                status_code=409,
                detail=f"Blocked slot: '{b.label}' is scheduled on {day} Period {period} for the entire school.",
            )
        elif b.scope == "grade" and b.scope_id == class_obj.grade_id:
            raise HTTPException(
                status_code=409,
                detail=f"Blocked slot: '{b.label}' is scheduled on {day} Period {period} for this grade tier.",
            )
        elif b.scope == "class" and b.scope_id == class_id:
            raise HTTPException(
                status_code=409,
                detail=f"Blocked slot: '{b.label}' is scheduled on {day} Period {period} for {class_obj.section}.",
            )

    # 2. Pinned lesson check (cannot overwrite or move pinned slot)
    if exclude_entry_id:
        existing_entry = session.get(models.TimetableEntry, exclude_entry_id)
        if existing_entry:
            old_pinned = session.scalar(
                select(models.PinnedLesson).where(
                    models.PinnedLesson.school_id == school_id,
                    models.PinnedLesson.class_id == existing_entry.class_id,
                    models.PinnedLesson.day == existing_entry.day,
                    models.PinnedLesson.period == existing_entry.period,
                )
            )
            if old_pinned and (
                old_pinned.subject_id != subject_id
                or old_pinned.teacher_id != teacher_id
                or old_pinned.day != day
                or old_pinned.period != period
            ):
                raise HTTPException(
                    status_code=409,
                    detail="Cannot modify a pinned lesson. Unpin this slot in Step 9 (Special Rules) before editing.",
                )

    target_pinned = session.scalar(
        select(models.PinnedLesson).where(
            models.PinnedLesson.school_id == school_id,
            models.PinnedLesson.class_id == class_id,
            models.PinnedLesson.day == day,
            models.PinnedLesson.period == period,
        )
    )
    if target_pinned and (target_pinned.subject_id != subject_id or target_pinned.teacher_id != teacher_id):
        raise HTTPException(
            status_code=409,
            detail=f"Target slot ({day} Period {period}) is pinned for a different lesson. Unpin first to override.",
        )

    # 3. H1: Class double-booking check
    class_clash = session.scalar(
        select(models.TimetableEntry).where(
            models.TimetableEntry.school_id == school_id,
            models.TimetableEntry.class_id == class_id,
            models.TimetableEntry.day == day,
            models.TimetableEntry.period == period,
            models.TimetableEntry.id != exclude_entry_id,
        )
    )
    if class_clash:
        raise HTTPException(
            status_code=409,
            detail=f"Class clash: {class_obj.section} already has another subject scheduled on {day} Period {period}.",
        )

    # 4. H2: Teacher double-booking check
    teacher_clash = session.scalar(
        select(models.TimetableEntry).where(
            models.TimetableEntry.school_id == school_id,
            models.TimetableEntry.teacher_id == teacher_id,
            models.TimetableEntry.day == day,
            models.TimetableEntry.period == period,
            models.TimetableEntry.id != exclude_entry_id,
        )
    )
    if teacher_clash:
        raise HTTPException(
            status_code=409,
            detail=f"Teacher double-booking clash: {teacher.name} is already teaching another class on {day} Period {period}.",
        )

    # 5. Teacher unavailable day check
    if day in (teacher.unavailable_days or []):
        raise HTTPException(
            status_code=409,
            detail=f"Teacher unavailable: {teacher.name} is marked unavailable on {day}s.",
        )

    # 6. H7: Teacher daily period cap
    max_daily = min(
        teacher.max_periods_per_day,
        school.max_teacher_periods_per_day if school else 5,
    )
    current_daily = session.scalar(
        select(func.count()).select_from(models.TimetableEntry).where(
            models.TimetableEntry.school_id == school_id,
            models.TimetableEntry.teacher_id == teacher_id,
            models.TimetableEntry.day == day,
            models.TimetableEntry.id != exclude_entry_id,
        )
    ) or 0
    if current_daily >= max_daily:
        raise HTTPException(
            status_code=409,
            detail=f"Teacher daily cap exceeded: {teacher.name} already has {current_daily} periods scheduled on {day} (max: {max_daily}).",
        )

    # 7. Teacher weekly period cap
    max_weekly = getattr(teacher, "max_periods_per_week", 30)
    current_weekly = session.scalar(
        select(func.count()).select_from(models.TimetableEntry).where(
            models.TimetableEntry.school_id == school_id,
            models.TimetableEntry.teacher_id == teacher_id,
            models.TimetableEntry.id != exclude_entry_id,
        )
    ) or 0
    if current_weekly >= max_weekly:
        raise HTTPException(
            status_code=409,
            detail=f"Teacher weekly cap exceeded: {teacher.name} already has {current_weekly} periods scheduled this week (max: {max_weekly}).",
        )

    # 8. Room capacity check (Phase 3-A)
    if room_id:
        room_obj = session.get(models.Room, room_id)
        if room_obj:
            cap = room_obj.capacity or 1
            current_room_load = session.scalar(
                select(func.count()).select_from(models.TimetableEntry).where(
                    models.TimetableEntry.school_id == school_id,
                    models.TimetableEntry.room_id == room_id,
                    models.TimetableEntry.day == day,
                    models.TimetableEntry.period == period,
                    models.TimetableEntry.id != exclude_entry_id,
                )
            ) or 0
            if current_room_load >= cap:
                raise HTTPException(
                    status_code=409,
                    detail=f"Room capacity exceeded: room '{room_obj.name}' already has {current_room_load} classes on {day} Period {period} (capacity: {cap}).",
                )

    # 9. Teacher qualification check (including grade tier scope)
    qual = session.scalar(
        select(models.TeacherQualification).where(
            models.TeacherQualification.teacher_id == teacher_id,
            models.TeacherQualification.subject_id == subject_id,
            (models.TeacherQualification.grade_id.is_(None)) | (models.TeacherQualification.grade_id == class_obj.grade_id),
        )
    )
    if not qual:
        raise HTTPException(
            status_code=409,
            detail=f"Teacher qualification mismatch: {teacher.name} is not qualified to teach {subject.name} to this grade level.",
        )
