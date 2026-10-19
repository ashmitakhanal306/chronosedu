"""SERVICE LAYER — timetable business use-cases.

Routes call this; this calls DB + chronos_engine. No SQL in API layer.
"""
from __future__ import annotations

from datetime import datetime, timezone
import uuid
from typing import Any

from fastapi import HTTPException
from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session, joinedload

import chronos_engine
from chronos_engine import (
    Assignment as EngineAssignment,
    BlockedSlot as EngineBlocked,
    ClassSection as EngineClass,
    PinnedLesson as EnginePinned,
    ProblemInput,
    Rules,
    Subject as EngineSubject,
    Teacher as EngineTeacher,
)

from app.core.config import settings
from app.db import models
from app.db.session import tenant_session
from app.services.rule_validator import validate_entry
from app.schemas.timetable import (
    AbsenceCreate,
    AbsenceOut,
    CandidateOut,
    DiagnosticOut,
    EntryOut,
    GenerateRequest,
    GenerateResponse,
    OverrideRequest,
    PublishResponse,
    QualityReportOut,
    LockResponse,
    SubstitutionAssignRequest,
    SubstitutionOut,
)


def generate(school_id: str, req: GenerateRequest | None = None) -> GenerateResponse:
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
            spread_subjects=req.spread_subjects if req and req.spread_subjects is not None else True,
            smooth_teacher_workload=req.smooth_teacher_workload if req and req.smooth_teacher_workload is not None else True,
            minimize_teacher_gaps=req.minimize_teacher_gaps if req and req.minimize_teacher_gaps is not None else False,
            morning_core_priority=req.morning_core_priority if req and req.morning_core_priority is not None else False,
            consecutive_double_periods=True,
        )

        # Load rooms and room capacities (Phase 3-A)
        rooms = session.scalars(select(models.Room).where(models.Room.school_id == sid)).all()
        room_capacities = {r.name: (r.capacity or 1) for r in rooms}

        # Load pinned lessons and blocked slots (Phase 3-B)
        pinned_db = session.scalars(select(models.PinnedLesson).where(models.PinnedLesson.school_id == sid)).all()
        engine_pinned = tuple(
            EnginePinned(
                class_id=str(p.class_id),
                subject_id=str(p.subject_id),
                teacher_id=str(p.teacher_id),
                day=p.day,
                period=p.period,
            )
            for p in pinned_db
        )

        blocked_db = session.scalars(select(models.BlockedSlot).where(models.BlockedSlot.school_id == sid)).all()
        engine_blocked = tuple(
            EngineBlocked(
                scope=b.scope,
                scope_id=str(b.scope_id) if b.scope_id else None,
                day=b.day,
                period=b.period,
                label=b.label,
            )
            for b in blocked_db
        )

        engine_classes = [
            EngineClass(
                id=str(c.id),
                name=c.section,
                tier="primary" if c.grade.tier.lower() == "primary" else "senior",
                home_room=c.home_room.name if c.home_room else "",
                grade_id=str(c.grade_id),
            )
            for c in classes
        ]

        engine_subjects = [
            EngineSubject(
                id=str(s.id),
                name=s.name,
                is_activity=(s.type == "activity"),
                room=s.room.name if s.room else None,
                requires_double_period=getattr(s, "requires_double_period", False),
            )
            for s in subjects
        ]

        engine_teachers = [
            EngineTeacher(
                id=str(t.id),
                name=t.name,
                subject_ids=frozenset(str(ts.subject_id) for ts in t.subjects),
                max_periods_per_day=t.max_periods_per_day,
                max_periods_per_week=t.max_periods_per_week,
                max_consecutive_periods=t.max_consecutive_periods,
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

        # Load admin-decided teaching assignments
        assignments = session.scalars(
            select(models.TeachingAssignment).where(models.TeachingAssignment.school_id == sid)
        ).all()
        engine_assignments = tuple(
            EngineAssignment(
                class_id=str(a.class_id),
                subject_id=str(a.subject_id),
                teacher_id=str(a.teacher_id),
            )
            for a in assignments
        )

        problem = ProblemInput(
            rules=engine_rules,
            classes=engine_classes,
            subjects=engine_subjects,
            teachers=engine_teachers,
            weekly_frequency=weekly_frequency,
            assignments=engine_assignments,
            room_capacities=room_capacities,
            pinned_lessons=engine_pinned,
            blocked_slots=engine_blocked,
        )

        # Call solver
        result = chronos_engine.solve(problem, time_limit_s=settings.solver_time_limit_s)

        if not result.feasible:
            diag_outs = [
                DiagnosticOut(severity=d.severity, title=d.title, detail=d.detail)
                for d in result.diagnostics
            ]
            return GenerateResponse(feasible=False, entries=[], diagnostics=diag_outs)

        # Create a new draft TimetableVersion
        max_v = session.scalar(
            select(func.max(models.TimetableVersion.version_number))
            .where(models.TimetableVersion.school_id == sid)
        )
        next_version = (max_v or 0) + 1
        new_version = models.TimetableVersion(
            id=uuid.uuid4(),
            school_id=sid,
            version_number=next_version,
            state="draft",
            notes=f"Draft Version {next_version} generated by solver",
        )
        session.add(new_version)
        session.flush()

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
                version_id=new_version.id,
            )
            session.add(entry_model)
            new_entries.append(entry_model)

        # Audit log for generation
        audit_log = models.AuditLog(
            id=uuid.uuid4(),
            school_id=sid,
            action="generate_timetable",
            entity_type="timetable_version",
            entity_id=str(new_version.id),
            detail=f"Generated draft version {next_version} with {len(new_entries)} entries",
        )
        session.add(audit_log)
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

        qr_out = None
        if result.quality_report:
            qr_out = QualityReportOut(
                total_entries=result.quality_report.total_entries,
                empty_period_count=result.quality_report.empty_period_count,
                unplaced_lessons=result.quality_report.unplaced_lessons,
                teacher_workload=result.quality_report.teacher_workload,
                soft_score=result.quality_report.soft_score,
            )

        return GenerateResponse(feasible=True, entries=entries_out, diagnostics=[], quality_report=qr_out)


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
        target_room_id = entry.room_id
        if override.room:
            try:
                target_room_id = uuid.UUID(override.room)
            except ValueError:
                r_obj = session.scalar(
                    select(models.Room).where(
                        models.Room.school_id == sid,
                        models.Room.name == override.room,
                    )
                )
                if r_obj:
                    target_room_id = r_obj.id

        # Validate all hard constraints using shared rule checker (Phase 3-D)
        validate_entry(
            session=session,
            school_id=sid,
            class_id=cid,
            day=override.day,
            period=override.period,
            subject_id=target_sid,
            teacher_id=target_tid,
            room_id=target_room_id,
            exclude_entry_id=eid,
        )

        # Apply update
        entry.day = override.day
        entry.period = override.period
        target_teacher = session.get(models.Teacher, target_tid)
        entry.subject_id = target_sid
        entry.teacher_id = target_tid
        entry.room_id = target_room_id
        entry.is_manual_override = True

        audit_log = models.AuditLog(
            id=uuid.uuid4(),
            school_id=sid,
            action="manual_override",
            entity_type="timetable_entry",
            entity_id=str(entry.id),
            detail=f"Overrode slot for {entry.class_section.section if entry.class_section else ''} to {target_teacher.name} on {override.day} P{override.period}",
        )
        session.add(audit_log)
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
            is_locked=entry.is_locked,
        )


def lock_entry(school_id: str, entry_id: str, lock_state: bool) -> LockResponse:
    """Lock or unlock a timetable slot to protect it from moves, swaps, deletions, and solver regeneration."""
    sid = uuid.UUID(school_id)
    eid = uuid.UUID(entry_id)
    with tenant_session(str(sid)) as session:
        entry = session.get(models.TimetableEntry, eid)
        if not entry or entry.school_id != sid:
            raise HTTPException(status_code=404, detail="Entry not found")
        entry.is_locked = lock_state
        action_name = "lock_entry" if lock_state else "unlock_entry"
        audit = models.AuditLog(
            id=uuid.uuid4(),
            school_id=sid,
            action=action_name,
            entity_type="timetable_entry",
            entity_id=str(entry.id),
            detail=f"{'Locked' if lock_state else 'Unlocked'} slot on {entry.day} P{entry.period}",
        )
        session.add(audit)
        session.flush()
        return LockResponse(id=str(entry.id), is_locked=entry.is_locked)


def delete_entry(school_id: str, entry_id: str) -> None:
    """Delete a timetable entry. Rejects if entry is locked."""
    sid = uuid.UUID(school_id)
    eid = uuid.UUID(entry_id)
    with tenant_session(str(sid)) as session:
        entry = session.get(models.TimetableEntry, eid)
        if not entry or entry.school_id != sid:
            raise HTTPException(status_code=404, detail="Entry not found")
        if entry.is_locked:
            raise HTTPException(status_code=409, detail="Cannot delete a locked timetable entry. Unlock it first.")
        audit = models.AuditLog(
            id=uuid.uuid4(),
            school_id=sid,
            action="delete_entry",
            entity_type="timetable_entry",
            entity_id=str(entry.id),
            detail=f"Deleted lesson slot on {entry.day} P{entry.period}",
        )
        session.add(audit)
        session.delete(entry)
        session.flush()


def move_entry(school_id: str, entry_id: str, new_day: str, new_period: int) -> EntryOut:
    """Move a timetable entry to a new day and period, strictly re-validating all constraints."""
    sid = uuid.UUID(school_id)
    eid = uuid.UUID(entry_id)
    with tenant_session(str(sid)) as session:
        entry = session.get(models.TimetableEntry, eid)
        if not entry or entry.school_id != sid:
            raise HTTPException(status_code=404, detail="Entry not found")
        if entry.is_locked:
            raise HTTPException(status_code=409, detail="Cannot move a locked timetable entry. Unlock it first.")

        validate_entry(
            session=session,
            school_id=sid,
            class_id=entry.class_id,
            day=new_day,
            period=new_period,
            subject_id=entry.subject_id,
            teacher_id=entry.teacher_id,
            room_id=entry.room_id,
            exclude_entry_id=eid,
        )

        entry.day = new_day
        entry.period = new_period
        entry.is_manual_override = True

        audit = models.AuditLog(
            id=uuid.uuid4(),
            school_id=sid,
            action="move_entry",
            entity_type="timetable_entry",
            entity_id=str(entry.id),
            detail=f"Moved entry to {new_day} P{new_period}",
        )
        session.add(audit)
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
            teacher_name=entry.teacher.name if entry.teacher else None,
            room=entry.room.name if entry.room else None,
            is_manual_override=True,
            is_locked=entry.is_locked,
        )


def swap_entries(school_id: str, entry_a_id: str, entry_b_id: str) -> list[EntryOut]:
    """Swap the slots of two timetable entries, validating constraints on both sides."""
    sid = uuid.UUID(school_id)
    ea_id = uuid.UUID(entry_a_id)
    eb_id = uuid.UUID(entry_b_id)
    with tenant_session(str(sid)) as session:
        ea = session.get(models.TimetableEntry, ea_id)
        eb = session.get(models.TimetableEntry, eb_id)
        if not ea or ea.school_id != sid or not eb or eb.school_id != sid:
            raise HTTPException(status_code=404, detail="One or both entries not found")
        if ea.is_locked or eb.is_locked:
            raise HTTPException(status_code=409, detail="Cannot swap locked entries. Unlock them first.")

        validate_entry(
            session=session,
            school_id=sid,
            class_id=ea.class_id,
            day=eb.day,
            period=eb.period,
            subject_id=ea.subject_id,
            teacher_id=ea.teacher_id,
            room_id=ea.room_id,
            exclude_entry_id=ea_id,
        )
        validate_entry(
            session=session,
            school_id=sid,
            class_id=eb.class_id,
            day=ea.day,
            period=ea.period,
            subject_id=eb.subject_id,
            teacher_id=eb.teacher_id,
            room_id=eb.room_id,
            exclude_entry_id=eb_id,
        )

        ea.day, eb.day = eb.day, ea.day
        ea.period, eb.period = eb.period, ea.period
        ea.is_manual_override = True
        eb.is_manual_override = True

        audit = models.AuditLog(
            id=uuid.uuid4(),
            school_id=sid,
            action="swap_entries",
            entity_type="timetable_entry",
            entity_id=f"{entry_a_id}:{entry_b_id}",
            detail=f"Swapped slots between {ea.id} and {eb.id}",
        )
        session.add(audit)
        session.flush()

        return [
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
                is_manual_override=True,
                is_locked=e.is_locked,
            )
            for e in [ea, eb]
        ]



def publish(school_id: str, actor_id: str | None = None) -> PublishResponse:
    """Publish the timetable for students and teachers to view."""
    sid = uuid.UUID(school_id)
    aid = uuid.UUID(actor_id) if actor_id else None
    with tenant_session(str(sid)) as session:
        school = session.get(models.School, sid)
        if not school:
            raise HTTPException(status_code=404, detail="School not found")

        # Find latest version to publish
        latest_version = session.scalars(
            select(models.TimetableVersion)
            .where(models.TimetableVersion.school_id == sid)
            .order_by(models.TimetableVersion.version_number.desc())
        ).first()

        if latest_version:
            prev_published = session.scalars(
                select(models.TimetableVersion).where(
                    models.TimetableVersion.school_id == sid,
                    models.TimetableVersion.state == "published",
                    models.TimetableVersion.id != latest_version.id,
                )
            ).all()
            for p in prev_published:
                p.state = "approved"

            latest_version.state = "published"
            latest_version.published_by = aid
            latest_version.published_at = datetime.now(timezone.utc)

        school.published = True
        session.flush()

        audit_log = models.AuditLog(
            id=uuid.uuid4(),
            school_id=sid,
            actor_id=aid,
            action="publish_timetable",
            entity_type="school",
            entity_id=str(sid),
            detail=f"Published timetable (Version {latest_version.version_number if latest_version else 1})",
        )
        session.add(audit_log)
        session.commit()

        v_label = f" (Version {latest_version.version_number})" if latest_version else ""
        return PublishResponse(published=True, message=f"Timetable for {school.name} published successfully{v_label}.")


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
