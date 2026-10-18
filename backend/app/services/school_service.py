"""SERVICE LAYER — School setup CRUD operations."""
from __future__ import annotations

import uuid
from fastapi import HTTPException
from sqlalchemy import func, select
from sqlalchemy.orm import joinedload

from app.db import models
from app.db.session import tenant_session
from app.schemas.setup import (
    ClassSectionCreate,
    ClassSectionOut,
    FullSchoolOut,
    GradeCreate,
    GradeOut,
    RequirementCreate,
    RequirementOut,
    RoomCreate,
    RoomOut,
    SchoolCreate,
    SchoolOut,
    SubjectCreate,
    SubjectOut,
    TeacherCreate,
    TeacherOut,
    UserCreate,
    UserOut,
)
from app.core.security import hash_password


def create_school(data: SchoolCreate) -> SchoolOut:
    """Create a new school tenant."""
    new_id = uuid.uuid4()
    with tenant_session(str(new_id)) as session:
        existing = session.scalar(select(models.School).where(models.School.subdomain == data.subdomain))
        if existing:
            raise HTTPException(status_code=409, detail=f"School with subdomain '{data.subdomain}' already exists.")

        school = models.School(
            id=new_id,
            name=data.name,
            subdomain=data.subdomain,
            timezone=data.timezone,
            term=data.term,
            working_days=data.working_days,
            max_teacher_periods_per_day=data.max_teacher_periods_per_day,
            activity_day=data.activity_day,
            activity_periods=data.activity_periods,
            published=False,
        )
        session.add(school)

        # If explicit admin credentials were provided upon creation, set initial administrator
        if data.admin_password:
            if len(data.admin_password) < 8:
                raise HTTPException(status_code=400, detail="Administrator password must be at least 8 characters long.")
            admin_email = (data.admin_email or f"admin@{data.subdomain}.edu").strip().lower()
            admin_user = models.AppUser(
                id=uuid.uuid4(),
                school_id=new_id,
                email=admin_email,
                password_hash=hash_password(data.admin_password),
                role="admin",
            )
            session.add(admin_user)

        session.flush()

        return SchoolOut(
            id=str(school.id),
            name=school.name,
            subdomain=school.subdomain,
            timezone=school.timezone,
            term=school.term,
            published=school.published,
            working_days=school.working_days,
            max_teacher_periods_per_day=school.max_teacher_periods_per_day,
            activity_day=school.activity_day,
            activity_periods=school.activity_periods,
        )


def get_school(school_id: str) -> SchoolOut:
    """Get school by ID."""
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        school = session.get(models.School, sid)
        if not school:
            raise HTTPException(status_code=404, detail="School not found")
        return SchoolOut(
            id=str(school.id),
            name=school.name,
            subdomain=school.subdomain,
            timezone=school.timezone,
            term=school.term,
            published=school.published,
            working_days=school.working_days,
            max_teacher_periods_per_day=school.max_teacher_periods_per_day,
            activity_day=school.activity_day,
            activity_periods=school.activity_periods,
        )


def add_grade(school_id: str, data: GradeCreate) -> GradeOut:
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        grade = models.GradeLevel(
            id=uuid.uuid4(),
            school_id=sid,
            name=data.name,
            tier=data.tier,
            day_end_time=data.day_end_time,
        )
        session.add(grade)
        session.flush()
        return GradeOut(
            id=str(grade.id),
            school_id=str(sid),
            name=grade.name,
            tier=grade.tier,
            day_end_time=grade.day_end_time,
        )


def add_room(school_id: str, data: RoomCreate) -> RoomOut:
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        room = models.Room(
            id=uuid.uuid4(),
            school_id=sid,
            name=data.name,
            type=data.type,
        )
        session.add(room)
        session.flush()
        return RoomOut(
            id=str(room.id),
            school_id=str(sid),
            name=room.name,
            type=room.type,
        )


def add_class_section(school_id: str, data: ClassSectionCreate) -> ClassSectionOut:
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        c = models.ClassSection(
            id=uuid.uuid4(),
            school_id=sid,
            grade_id=uuid.UUID(data.grade_id),
            section=data.section,
            home_room_id=uuid.UUID(data.home_room_id) if data.home_room_id else None,
        )
        session.add(c)
        session.flush()
        return ClassSectionOut(
            id=str(c.id),
            school_id=str(sid),
            grade_id=str(c.grade_id),
            section=c.section,
            home_room_id=str(c.home_room_id) if c.home_room_id else None,
        )


def add_subject(school_id: str, data: SubjectCreate) -> SubjectOut:
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        s = models.Subject(
            id=uuid.uuid4(),
            school_id=sid,
            name=data.name,
            code=data.code,
            type=data.type,
            room_id=uuid.UUID(data.room_id) if data.room_id else None,
        )
        session.add(s)
        session.flush()
        return SubjectOut(
            id=str(s.id),
            school_id=str(sid),
            name=s.name,
            code=s.code,
            type=s.type,
            room_id=str(s.room_id) if s.room_id else None,
        )


def add_requirement(school_id: str, data: RequirementCreate) -> RequirementOut:
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        req = models.SubjectRequirement(
            id=uuid.uuid4(),
            school_id=sid,
            subject_id=uuid.UUID(data.subject_id),
            grade_id=uuid.UUID(data.grade_id),
            weekly_frequency=data.weekly_frequency,
        )
        session.add(req)
        session.flush()
        return RequirementOut(
            id=str(req.id),
            school_id=str(sid),
            subject_id=str(req.subject_id),
            grade_id=str(req.grade_id),
            weekly_frequency=req.weekly_frequency,
        )


def add_teacher(school_id: str, data: TeacherCreate) -> TeacherOut:
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        t = models.Teacher(
            id=uuid.uuid4(),
            school_id=sid,
            name=data.name,
            email=data.email,
            phone=data.phone,
            max_periods_per_day=data.max_periods_per_day,
            unavailable_days=data.unavailable_days,
        )
        session.add(t)
        session.flush()

        for sub_id in data.subject_ids:
            ts = models.TeacherSubject(
                school_id=sid,
                teacher_id=t.id,
                subject_id=uuid.UUID(sub_id),
            )
            session.add(ts)

        session.flush()

        return TeacherOut(
            id=str(t.id),
            school_id=str(sid),
            name=t.name,
            email=t.email,
            phone=t.phone,
            max_periods_per_day=t.max_periods_per_day,
            unavailable_days=t.unavailable_days,
            subject_ids=list(data.subject_ids),
        )


def create_user(school_id: str, data: UserCreate) -> UserOut:
    """Register an authenticated user for a school tenant."""
    sid = uuid.UUID(school_id)
    with tenant_session(str(sid)) as session:
        clean_email = data.email.strip().lower()
        existing = session.scalar(
            select(models.AppUser).where(
                models.AppUser.school_id == sid,
                models.AppUser.email == clean_email,
            )
        )
        if existing:
            raise HTTPException(status_code=409, detail=f"User with email '{clean_email}' already exists in this school.")

        user = models.AppUser(
            id=uuid.uuid4(),
            school_id=sid,
            email=clean_email,
            password_hash=hash_password(data.password),
            role=data.role,
            teacher_id=uuid.UUID(data.teacher_id) if data.teacher_id else None,
            class_id=uuid.UUID(data.class_id) if data.class_id else None,
        )
        session.add(user)
        session.flush()

        return UserOut(
            id=str(user.id),
            school_id=str(user.school_id),
            email=user.email,
            role=user.role,
            teacher_id=str(user.teacher_id) if user.teacher_id else None,
            class_id=str(user.class_id) if user.class_id else None,
        )


def setup_initial_admin(school_id: str, data: UserCreate) -> UserOut:
    """Set the initial administrator account for a newly created school when 0 users exist."""
    sid = uuid.UUID(school_id)
    if len(data.password) < 8:
        raise HTTPException(status_code=400, detail="Administrator password must be at least 8 characters long.")

    with tenant_session(str(sid)) as session:
        admin_count = session.scalar(
            select(func.count(models.AppUser.id)).where(
                models.AppUser.school_id == sid,
                models.AppUser.role == "admin",
            )
        ) or 0
        if admin_count > 0:
            raise HTTPException(
                status_code=403,
                detail="Initial administrator already exists for this school. Setup-admin is disabled.",
            )

        clean_email = data.email.strip().lower()
        admin_user = models.AppUser(
            id=uuid.uuid4(),
            school_id=sid,
            email=clean_email,
            password_hash=hash_password(data.password),
            role="admin",
        )
        session.add(admin_user)
        session.flush()

        return UserOut(
            id=str(admin_user.id),
            school_id=str(admin_user.school_id),
            email=admin_user.email,
            role="admin",
            teacher_id=None,
            class_id=None,
        )


def list_schools() -> list[SchoolOut]:
    """Retrieve all school tenants in the platform."""
    with tenant_session("") as session:
        schools = session.scalars(select(models.School).order_by(models.School.name)).all()
        return [
            SchoolOut(
                id=str(s.id),
                name=s.name,
                subdomain=s.subdomain,
                timezone=s.timezone,
                term=s.term,
                published=s.published,
                working_days=s.working_days,
                max_teacher_periods_per_day=s.max_teacher_periods_per_day,
                activity_day=s.activity_day,
                activity_periods=s.activity_periods,
            )
            for s in schools
        ]


def get_full_school(school_id: str) -> FullSchoolOut:
    """Retrieve fully hydrated school hierarchy matching frontend School domain model."""
    sid = uuid.UUID(school_id) if isinstance(school_id, str) else school_id
    with tenant_session(str(sid)) as session:
        school = session.get(models.School, sid)
        if not school:
            raise HTTPException(status_code=404, detail="School not found")

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
        absences = session.scalars(
            select(models.TeacherAbsence).where(models.TeacherAbsence.school_id == sid)
        ).all()
        substitutions = session.scalars(
            select(models.Substitution)
            .where(models.Substitution.school_id == sid)
            .options(joinedload(models.Substitution.entry))
        ).all()

        grade_tier = {g.id: g.tier.lower() for g in grades}

        req_primary: dict[uuid.UUID, int] = {}
        req_senior: dict[uuid.UUID, int] = {}
        for r in requirements:
            tier = grade_tier.get(r.grade_id, "primary")
            if tier == "primary":
                req_primary[r.subject_id] = r.weekly_frequency
            else:
                req_senior[r.subject_id] = r.weekly_frequency

        default_colors = [
            "bg-blue-50 text-blue-700 border-blue-200",
            "bg-indigo-50 text-indigo-700 border-indigo-200",
            "bg-emerald-50 text-emerald-700 border-emerald-200",
            "bg-amber-50 text-amber-700 border-amber-200",
            "bg-cyan-50 text-cyan-700 border-cyan-200",
            "bg-rose-50 text-rose-700 border-rose-200",
            "bg-purple-100 text-purple-800 border-purple-300",
            "bg-pink-100 text-pink-800 border-pink-300",
            "bg-lime-100 text-lime-800 border-lime-300",
        ]

        formatted_subjects = [
            {
                "id": str(s.id),
                "name": s.name,
                "code": s.code,
                "type": s.type,
                "room": s.room.name if s.room else None,
                "color": default_colors[idx % len(default_colors)],
                "freqPrimary": req_primary.get(s.id, 0),
                "freqSenior": req_senior.get(s.id, 0),
            }
            for idx, s in enumerate(subjects)
        ]

        formatted_classes = [
            {
                "id": str(c.id),
                "name": c.section,
                "grade": c.grade.name if c.grade else "General",
                "tier": "Primary" if (c.grade and c.grade.tier.lower() == "primary") else "Senior",
                "room": c.home_room.name if c.home_room else "Classroom",
            }
            for c in classes
        ]

        formatted_teachers = [
            {
                "id": str(t.id),
                "name": t.name,
                "subjects": [str(ts.subject_id) for ts in t.subjects],
                "maxPerDay": t.max_periods_per_day,
                "unavailableDays": t.unavailable_days or [],
            }
            for t in teachers
        ]

        formatted_absences = [
            {
                "id": str(a.id),
                "teacherId": str(a.teacher_id),
                "day": a.day,
                "reason": a.reason or "",
            }
            for a in absences
        ]

        formatted_substitutions = {
            f"{sub.entry.day}-{sub.entry.period}-{str(sub.entry.class_id)}": str(sub.substitute_teacher_id)
            for sub in substitutions if sub.entry
        }

        period_slots = [
            {"number": 0, "label": "Zero Period", "time": "08:00 - 08:30", "isBreak": True, "type": "zero"},
            {"number": 1, "label": "Period 1", "time": "08:30 - 09:15", "isBreak": False},
            {"number": 2, "label": "Period 2", "time": "09:15 - 10:00", "isBreak": False},
            {"number": "B1", "label": "Short Break", "time": "10:00 - 10:15", "isBreak": True, "type": "break"},
            {"number": 3, "label": "Period 3", "time": "10:15 - 11:00", "isBreak": False},
            {"number": 4, "label": "Period 4", "time": "11:00 - 12:00", "isBreak": False, "note": "Primary Dismissal (12:00)"},
            {"number": "L1", "label": "Lunch Break", "time": "12:00 - 12:30", "isBreak": True, "type": "lunch", "seniorOnly": True},
            {"number": 5, "label": "Period 5", "time": "12:30 - 01:15", "isBreak": False, "seniorOnly": True},
            {"number": 6, "label": "Period 6", "time": "01:15 - 02:00", "isBreak": False, "seniorOnly": True, "note": "Senior Dismissal (02:00)"},
        ]

        return FullSchoolOut(
            id=str(school.id),
            name=school.name,
            subdomain=school.subdomain,
            timezone=school.timezone,
            term=school.term,
            published=school.published,
            workingDays=school.working_days,
            rules={
                "primaryEndPeriod": 4,
                "seniorEndPeriod": 6,
                "maxTeacherPeriodsPerDay": school.max_teacher_periods_per_day,
                "activityDay": school.activity_day,
                "activityPeriods": school.activity_periods,
                "zeroPeriodLabel": "Zero Period (Homeroom / Assembly)",
                "lunchAfterPeriod": 4,
            },
            timingConfig={
                "startTime": "08:00",
                "periodDurationMinutes": 45,
                "hasZeroPeriod": True,
                "zeroPeriodDurationMinutes": 30,
                "zeroPeriodLabel": "Zero Period (Homeroom / Assembly)",
                "recessAfterPeriod": 2,
                "recessDurationMinutes": 15,
                "recessLabel": "Short Break",
                "lunchAfterPeriod": 4,
                "lunchDurationMinutes": 30,
                "lunchLabel": "Lunch Break",
                "lunchSeniorOnly": False,
            },
            periodSlots=period_slots,
            classes=formatted_classes,
            subjects=formatted_subjects,
            teachers=formatted_teachers,
            absences=formatted_absences,
            substitutions=formatted_substitutions,
        )
