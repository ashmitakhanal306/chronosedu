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
        user_count = session.scalar(
            select(func.count(models.AppUser.id)).where(models.AppUser.school_id == sid)
        ) or 0
        if user_count > 0:
            raise HTTPException(
                status_code=403,
                detail="Initial administrator already exists for this school. Use authenticated user management.",
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
