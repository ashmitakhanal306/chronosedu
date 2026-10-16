"""SERVICE LAYER — timetable business use-cases.

Routes call this; this calls DB + chronos_engine. No SQL in API layer.
"""
from __future__ import annotations

import uuid
from typing import Any

from fastapi import HTTPException
from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session, joinedload

import chronos_engine
from chronos_engine import ClassSection as EngineClass, ProblemInput, Rules, Subject as EngineSubject, Teacher as EngineTeacher

from app.core.config import settings
from app.db import models
from app.db.session import tenant_session
from app.schemas.timetable import (
    AbsenceCreate,
    AbsenceOut,
    CandidateOut,
    DiagnosticOut,
    EntryOut,
    GenerateResponse,
    OverrideRequest,
    PublishResponse,
    SubstitutionAssignRequest,
    SubstitutionOut,
)


def generate(school_id: str) -> GenerateResponse:
    """Generate a conflict-free timetable for the school using chronos_engine."""
    sid = uuid.UUID(school_id) if isinstance(school_id, str) else school_id

    with tenant_session(str(sid)) as session:
        school = session.get(models.School, sid)
        if not school:
            raise HTTPException(status_code=404, detail="School not found")

        # Load school structure
        grades = session.scalars(select(models.GradeLevel).where(models.GradeLevel.school_id == sid)).all()
        classes = session.scalars(
            select(models.ClassSection)
            .where(models.ClassSection.school_id == sid)
            .options(joinedload(models.ClassSection.grade), joinedload(models.ClassSection.home_room))
        ).all()
        subjects = session.scalars(
            select(models.Subject)
            .where(models.Subject.school_id == sid)
            .options(joinedload(models.Subject.room))
        ).all()
        teachers = session.scalars(
            select(models.Teacher)
            .where(models.Teacher.school_id == sid)
            .options(joinedload(models.Teacher.subjects))
        ).unique().all()
        requirements = session.scalars(
            select(models.SubjectRequirement).where(models.SubjectRequirement.school_id == sid)
        ).all()

        # Build chronos_engine.ProblemInput
        engine_rules = Rules(
            working_days=tuple(school.working_days),
            primary_periods=4,
            senior_periods=6,
            max_teacher_periods_per_day=school.max_teacher_periods_per_day,
            activity_day=school.activity_day,
            activity_periods=tuple(school.activity_periods),
        )

        engine_classes = [
            EngineClass(
                id=str(c.id),
                name=c.section,
                tier="primary" if c.grade.tier.lower() == "primary" else "senior",
                home_room=c.home_room.name if c.home_room else "",
            )
            for c in classes
        ]

        engine_subjects = [
            EngineSubject(
                id=str(s.id),
                name=s.name,
                is_activity=(s.type == "activity"),
                room=s.room.name if s.room else None,
            )
            for s in subjects
        ]

        engine_teachers = [
            EngineTeacher(
                id=str(t.id),
                name=t.name,
                subject_ids=frozenset(str(ts.subject_id) for ts in t.subjects),
                max_periods_per_day=t.max_periods_per_day,
                unavailable_days=frozenset(t.unavailable_days),
            )
            for t in teachers
        ]

        # Map requirements by (grade_id, subject_id) -> frequency
        req_map: dict[tuple[uuid.UUID, uuid.UUID], int] = {
            (r.grade_id, r.subject_id): r.weekly_frequency for r in requirements
        }

        # (class_id, subject_id) -> frequency
        weekly_frequency: dict[tuple[str, str], int] = {}
        for c in classes:
            for s in subjects:
                freq = req_map.get((c.grade_id, s.id), 0)
                if freq > 0:
                    weekly_frequency[(str(c.id), str(s.id))] = freq

        problem = ProblemInput(
            rules=engine_rules,
            classes=engine_classes,
            subjects=engine_subjects,
            teachers=engine_teachers,
            weekly_frequency=weekly_frequency,
        )

        # Call solver
        result = chronos_engine.solve(problem, time_limit_s=settings.solver_time_limit_s)

        if not result.feasible:
            diag_outs = [
                DiagnosticOut(severity=d.severity, title=d.title, detail=d.detail)
                for d in result.diagnostics
            ]
            return GenerateResponse(feasible=False, entries=[], diagnostics=diag_outs)

        # Delete existing entries (preserving manual overrides if any, or full replace)
        session.execute(delete(models.TimetableEntry).where(models.TimetableEntry.school_id == sid))
        session.flush()

        # Map room by subject/class
        subject_room_map = {str(s.id): s.room_id for s in subjects}
        class_room_map = {str(c.id): c.home_room_id for c in classes}
        class_name_map = {str(c.id): c.section for c in classes}
        subject_name_map = {str(s.id): s.name for s in subjects}
        teacher_name_map = {str(t.id): t.name for t in teachers}

        new_entries = []
        for e in result.entries:
            room_id = subject_room_map.get(e.subject_id) or class_room_map.get(e.class_id)
            entry_model = models.TimetableEntry(
                id=uuid.uuid4(),
                school_id=sid,
                class_id=uuid.UUID(e.class_id),
                day=e.day,
                period=e.period,
                subject_id=uuid.UUID(e.subject_id),
                teacher_id=uuid.UUID(e.teacher_id),
                room_id=room_id,
                is_manual_override=False,
            )
            session.add(entry_model)
            new_entries.append(entry_model)

        session.flush()

        # Build output
        entries_out = [
            EntryOut(
                id=str(m.id),
                class_id=str(m.class_id),
                class_name=class_name_map.get(str(m.class_id)),
                day=m.day,
                period=m.period,
                subject_id=str(m.subject_id),
                subject_name=subject_name_map.get(str(m.subject_id)),
                teacher_id=str(m.teacher_id),
                teacher_name=teacher_name_map.get(str(m.teacher_id)),
                room=m.room.name if m.room else None,
                is_manual_override=m.is_manual_override,
            )
            for m in new_entries
        ]

        return GenerateResponse(feasible=True, entries=entries_out, diagnostics=[])


def get_timetable(
    school_id: str,
    class_id: str | None = None,
    teacher_id: str | None = None,
) -> list[EntryOut]:
    """Get timetable entries filtered by school, class, or teacher."""
    sid = uuid.UUID(school_id)

    with tenant_session(str(sid)) as session:
        stmt = (
            select(models.TimetableEntry)
            .where(models.TimetableEntry.school_id == sid)
            .options(
                joinedload(models.TimetableEntry.class_section),
                joinedload(models.TimetableEntry.subject),
                joinedload(models.TimetableEntry.teacher),
                joinedload(models.TimetableEntry.room),
                joinedload(models.TimetableEntry.substitutions).joinedload(models.Substitution.substitute_teacher),
            )
        )

        if class_id:
            stmt = stmt.where(models.TimetableEntry.class_id == uuid.UUID(class_id))
        if teacher_id:
            tid = uuid.UUID(teacher_id)
            stmt = stmt.where(models.TimetableEntry.teacher_id == tid)

        entries = session.scalars(stmt).unique().all()

        results = []
        for e in entries:
            sub = e.substitutions[0] if e.substitutions else None
            results.append(
                EntryOut(
                    id=str(e.id),
                    class_id=str(e.class_id),
                    class_name=e.class_section.section if e.class_section else None,
                    day=e.day,
                    period=e.period,
                    subject_id=str(e.subject_id),
                    subject_name=e.subject.name if e.subject else None,
                    teacher_id=str(e.teacher_id),
                    teacher_name=e.teacher.name if e.teacher else None,
                    room=e.room.name if e.room else None,
                    is_manual_override=e.is_manual_override,
                    substitute_teacher_id=str(sub.substitute_teacher_id) if sub else None,
                    substitute_teacher_name=sub.substitute_teacher.name if sub and sub.substitute_teacher else None,
                )
            )

        return results


def manual_override(school_id: str, entry_id: str, override: OverrideRequest) -> EntryOut:
    """Manual override for a slot with strict clash checking (H1, H2, H7). Rejects clashes with 409."""
    sid = uuid.UUID(school_id)
    eid = uuid.UUID(entry_id)
    target_tid = uuid.UUID(override.teacher_id)
    target_sid = uuid.UUID(override.subject_id)

    with tenant_session(str(sid)) as session:
        entry = session.get(models.TimetableEntry, eid)
        if not entry or entry.school_id != sid:
            raise HTTPException(status_code=404, detail="Timetable entry not found")

        cid = entry.class_id
        school = session.get(models.School, sid)
        target_teacher = session.get(models.Teacher, target_tid)
        if not target_teacher:
            raise HTTPException(status_code=404, detail="Target teacher not found")

        # 1. H1 Clash check: Does class already have another entry in (day, period)?
        class_clash = session.scalar(
            select(models.TimetableEntry).where(
                models.TimetableEntry.school_id == sid,
                models.TimetableEntry.class_id == cid,
                models.TimetableEntry.day == override.day,
                models.TimetableEntry.period == override.period,
                models.TimetableEntry.id != eid,
            )
        )
        if class_clash:
            raise HTTPException(
                status_code=409,
                detail=f"Class clash: class already has another subject scheduled on {override.day} Period {override.period}.",
            )

        # 2. H2 Clash check: Is target teacher already teaching another class in (day, period)?
        teacher_clash = session.scalar(
            select(models.TimetableEntry).where(
                models.TimetableEntry.school_id == sid,
                models.TimetableEntry.teacher_id == target_tid,
                models.TimetableEntry.day == override.day,
                models.TimetableEntry.period == override.period,
                models.TimetableEntry.id != eid,
            )
        )
        if teacher_clash:
            raise HTTPException(
                status_code=409,
                detail=f"Teacher double-booking clash: {target_teacher.name} is already teaching another class on {override.day} Period {override.period}.",
            )

        # 3. H7 Check: Does target teacher exceed daily period cap?
        max_daily = min(
            target_teacher.max_periods_per_day,
            school.max_teacher_periods_per_day if school else 5,
        )
        current_daily_count = session.scalar(
            select(func.count()).select_from(models.TimetableEntry).where(
                models.TimetableEntry.school_id == sid,
                models.TimetableEntry.teacher_id == target_tid,
                models.TimetableEntry.day == override.day,
                models.TimetableEntry.id != eid,
            )
        ) or 0

        if current_daily_count >= max_daily:
            raise HTTPException(
                status_code=409,
                detail=f"Teacher daily cap exceeded: {target_teacher.name} already has {current_daily_count} periods scheduled on {override.day} (max: {max_daily}).",
            )

        # 4. Check teacher unavailable days
        if override.day in target_teacher.unavailable_days:
            raise HTTPException(
                status_code=409,
                detail=f"Teacher unavailable: {target_teacher.name} is marked unavailable on {override.day}s.",
            )

        # Apply update
        entry.day = override.day
        entry.period = override.period
        entry.subject_id = target_sid
        entry.teacher_id = target_tid
        entry.is_manual_override = True

        session.flush()

        return EntryOut(
            id=str(entry.id),
            class_id=str(entry.class_id),
            class_name=entry.class_section.section if entry.class_section else None,
            day=entry.day,
            period=entry.period,
            subject_id=str(entry.subject_id),
            subject_name=entry.subject.name if entry.subject else None,
            teacher_id=str(entry.teacher_id),
            teacher_name=target_teacher.name,
            room=entry.room.name if entry.room else None,
            is_manual_override=True,
        )


def publish(school_id: str) -> PublishResponse:
    """Publish the timetable for students and teachers to view."""
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        school = session.get(models.School, sid)
        if not school:
            raise HTTPException(status_code=404, detail="School not found")
        school.published = True
        return PublishResponse(published=True, message=f"Timetable for {school.name} published successfully.")


def log_absence(school_id: str, absence: AbsenceCreate) -> AbsenceOut:
    """Log an absence for a teacher."""
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        teacher = session.get(models.Teacher, uuid.UUID(absence.teacher_id))
        if not teacher:
            raise HTTPException(status_code=404, detail="Teacher not found")

        model_abs = models.TeacherAbsence(
            id=uuid.uuid4(),
            school_id=sid,
            teacher_id=teacher.id,
            day=absence.day,
            reason=absence.reason,
        )
        session.add(model_abs)
        session.flush()

        return AbsenceOut(
            id=str(model_abs.id),
            school_id=str(sid),
            teacher_id=str(teacher.id),
            teacher_name=teacher.name,
            day=model_abs.day,
            reason=model_abs.reason,
        )


def get_substitutes(school_id: str, absence_id: str) -> list[CandidateOut]:
    """Get ranked substitute candidates for an absent teacher's affected periods."""
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        abs_model = session.get(models.TeacherAbsence, uuid.UUID(absence_id))
        if not abs_model:
            raise HTTPException(status_code=404, detail="Absence record not found")

        school = session.get(models.School, sid)
        teachers = session.scalars(
            select(models.Teacher)
            .where(models.Teacher.school_id == sid)
            .options(joinedload(models.Teacher.subjects))
        ).unique().all()
        entries = session.scalars(
            select(models.TimetableEntry).where(models.TimetableEntry.school_id == sid)
        ).all()

        # Engine models conversion for ranking
        engine_teachers = [
            EngineTeacher(
                id=str(t.id),
                name=t.name,
                subject_ids=frozenset(str(ts.subject_id) for ts in t.subjects),
                max_periods_per_day=t.max_periods_per_day,
                unavailable_days=frozenset(t.unavailable_days),
            )
            for t in teachers
        ]

        engine_entries = [
            chronos_engine.Entry(
                class_id=str(e.class_id),
                day=e.day,
                period=e.period,
                subject_id=str(e.subject_id),
                teacher_id=str(e.teacher_id),
            )
            for e in entries
        ]

        # Use first affected period or period 1
        affected_entries = [e for e in engine_entries if e.day == abs_model.day and e.teacher_id == str(abs_model.teacher_id)]
        target_period = affected_entries[0].period if affected_entries else 1
        target_subject = affected_entries[0].subject_id if affected_entries else None

        ranked = chronos_engine.rank_substitutes(
            teachers=engine_teachers,
            entries=engine_entries,
            day=abs_model.day,
            period=target_period,
            absent_teacher_id=str(abs_model.teacher_id),
            subject_id=target_subject,
        )

        candidates = [
            CandidateOut(
                teacher_id=str(t.id),
                name=t.name,
                free_periods_today=free,
                assigned_today=6 - free,
                is_qualified=(target_subject in t.subject_ids if target_subject else False),
            )
            for t, free in ranked
        ]
        return candidates


def assign_substitution(school_id: str, req: SubstitutionAssignRequest) -> SubstitutionOut:
    """Assign a substitute teacher to a timetable entry."""
    sid = uuid.UUID(school_id)
    eid = uuid.UUID(req.entry_id)
    sub_tid = uuid.UUID(req.substitute_teacher_id)

    with tenant_session(str(sid)) as session:
        entry = session.get(models.TimetableEntry, eid)
        if not entry:
            raise HTTPException(status_code=404, detail="Timetable entry not found")

        sub_teacher = session.get(models.Teacher, sub_tid)
        if not sub_teacher:
            raise HTTPException(status_code=404, detail="Substitute teacher not found")

        existing_sub = session.scalar(
            select(models.Substitution).where(models.Substitution.entry_id == eid)
        )
        if existing_sub:
            existing_sub.substitute_teacher_id = sub_tid
            sub_model = existing_sub
        else:
            sub_model = models.Substitution(
                id=uuid.uuid4(),
                school_id=sid,
                entry_id=eid,
                substitute_teacher_id=sub_tid,
            )
            session.add(sub_model)

        session.flush()

        return SubstitutionOut(
            id=str(sub_model.id),
            entry_id=str(sub_model.entry_id),
            substitute_teacher_id=str(sub_model.substitute_teacher_id),
            substitute_name=sub_teacher.name,
        )
