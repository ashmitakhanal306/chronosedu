from datetime import date, datetime, timezone
import re
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
    RoomUpdate,
    SchoolCreate,
    SchoolOut,
    SubjectCreate,
    SubjectOut,
    TeacherCreate,
    TeacherOut,
    UserCreate,
    UserOut,
    AssignmentCreate,
    AssignmentOut,
    SuggestAssignmentsOut,
    WorkloadItem,
    QualificationCreate,
    QualificationOut,
    HolidayCreate,
    HolidayOut,
    PinnedLessonCreate,
    PinnedLessonOut,
    BlockedSlotCreate,
    BlockedSlotOut,
    VersionOut,
    VersionStateUpdate,
    AuditLogOut,
)
from app.core.security import hash_password


ROMAN_MAP = {
    "i": 1, "ii": 2, "iii": 3, "iv": 4, "v": 5, "vi": 6,
    "vii": 7, "viii": 8, "ix": 9, "x": 10, "xi": 11, "xii": 12,
}
STREAM_RANKS = {
    "general": 0, "science": 1, "commerce": 2, "humanities": 3, "arts": 3,
}


def class_sort_key(name: str, grade: str = "") -> tuple:
    """Natural educational progression sort key for classes and sections.
    Handles Nursery/Nur/nur/NURSERY/nursery -> LKG -> UKG -> Class 1..12 -> Section A..Z.
    """
    s = f"{name or ''} {grade or ''}".lower().strip()
    tier_rank = 100

    if re.search(r"(\bpre[- ]?nur|\bplaygroup\b|\binfant\b|\bcreche\b|\btoddler\b)", s):
        tier_rank = 1
    elif re.search(r"(\bnursery\b|\bnur\b|\bpre[- ]?k\b|\bpk\b)", s):
        tier_rank = 2
    elif re.search(r"(\bl\.?k\.?g\b|\bkg[- ]?1\b|\bprep[- ]?1\b|\bjr\.?[- ]?kg\b|\bjunior[- ]?kg\b)", s):
        tier_rank = 3
    elif re.search(r"(\bu\.?k\.?g\b|\bkg[- ]?2\b|\bprep[- ]?2\b|\bsr\.?[- ]?kg\b|\bsenior[- ]?kg\b)", s):
        tier_rank = 4
    else:
        num_m = re.search(r"(?:class|grade)?\s*(\b\d{1,2}\b)", s)
        if num_m:
            tier_rank = 10 + int(num_m.group(1))
        else:
            roman_m = re.search(r"\b(xii|xi|ix|x|viii|vii|vi|iv|v|iii|ii|i)\b", s)
            if roman_m and roman_m.group(1) in ROMAN_MAP:
                tier_rank = 10 + ROMAN_MAP[roman_m.group(1)]

    sec_m = re.search(r"[- /]([A-Za-z])\b|(?:\d|[A-Za-z]+)\s*([A-Za-z])$", (name or "").strip())
    sec = ""
    if sec_m:
        sec = (sec_m.group(1) or sec_m.group(2) or "").upper()

    stream_rank = 0
    for k, v in STREAM_RANKS.items():
        if k in s:
            stream_rank = v
            break

    return (tier_rank, sec, stream_rank, (name or "").strip().lower())


def room_sort_key(name: str) -> list:
    """Natural alphanumeric sort key for rooms and facilities (e.g. B-105 < B-108 < C-302)."""
    parts = re.split(r"(\d+)", (name or "").strip().lower())
    res = []
    for p in parts:
        if p.isdigit():
            res.append(int(p))
        else:
            res.append(p)
    return res


def teacher_sort_key(name: str) -> str:
    """Dictionary pattern (A to Z alphabetical) sort key for teachers."""
    return (name or "").strip().lower()


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
            name=data.name.strip(),
            type=data.type.strip() if data.type else "classroom",
            capacity=data.capacity if data.capacity else 35,
        )
        session.add(room)
        session.flush()
        return RoomOut(
            id=str(room.id),
            school_id=str(sid),
            name=room.name,
            type=room.type,
            capacity=room.capacity,
        )


def update_room(school_id: str, room_id: str, data: RoomUpdate) -> RoomOut:
    sid = uuid.UUID(school_id)
    rid = uuid.UUID(room_id)
    with tenant_session(str(sid)) as session:
        room = session.get(models.Room, rid)
        if not room or room.school_id != sid:
            raise HTTPException(status_code=404, detail="Room not found.")
        if data.name is not None and data.name.strip():
            room.name = data.name.strip()
        if data.type is not None and data.type.strip():
            room.type = data.type.strip()
        if data.capacity is not None:
            room.capacity = data.capacity
        session.flush()
        return RoomOut(
            id=str(room.id),
            school_id=str(sid),
            name=room.name,
            type=room.type,
            capacity=room.capacity,
        )


def delete_room(school_id: str, room_id: str) -> None:
    sid = uuid.UUID(school_id)
    rid = uuid.UUID(room_id)
    with tenant_session(str(sid)) as session:
        room = session.get(models.Room, rid)
        if not room or room.school_id != sid:
            raise HTTPException(status_code=404, detail="Room not found.")
        for c in session.scalars(select(models.ClassSection).where(models.ClassSection.home_room_id == rid)).all():
            c.home_room_id = None
        for s in session.scalars(select(models.Subject).where(models.Subject.room_id == rid)).all():
            s.room_id = None
        session.delete(room)
        session.flush()


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
            max_periods_per_week=data.max_periods_per_week,
            max_consecutive_periods=data.max_consecutive_periods,
            unavailable_days=data.unavailable_days,
        )
        session.add(t)
        session.flush()

        qual_outs: list[QualificationOut] = []
        subject_id_set: set[str] = set()

        if data.qualifications:
            for q in data.qualifications:
                tq = models.TeacherQualification(
                    id=uuid.uuid4(),
                    school_id=sid,
                    teacher_id=t.id,
                    subject_id=uuid.UUID(q.subject_id),
                    grade_id=uuid.UUID(q.grade_id) if q.grade_id else None,
                )
                session.add(tq)
                session.flush()
                subject_id_set.add(q.subject_id)
                qual_outs.append(
                    QualificationOut(
                        id=str(tq.id),
                        teacher_id=str(t.id),
                        subject_id=q.subject_id,
                        grade_id=q.grade_id,
                    )
                )
        elif data.subject_ids:
            for sub_id in data.subject_ids:
                tq = models.TeacherQualification(
                    id=uuid.uuid4(),
                    school_id=sid,
                    teacher_id=t.id,
                    subject_id=uuid.UUID(sub_id),
                    grade_id=None,
                )
                session.add(tq)
                session.flush()
                subject_id_set.add(sub_id)
                qual_outs.append(
                    QualificationOut(
                        id=str(tq.id),
                        teacher_id=str(t.id),
                        subject_id=sub_id,
                        grade_id=None,
                    )
                )

        session.flush()

        record_audit(
            session=session,
            school_id=sid,
            action="create_teacher",
            entity_type="teacher",
            entity_id=str(t.id),
            detail=f"Created teacher '{t.name}' with {len(qual_outs)} qualifications",
        )

        return TeacherOut(
            id=str(t.id),
            school_id=str(sid),
            name=t.name,
            email=t.email,
            phone=t.phone,
            max_periods_per_day=t.max_periods_per_day,
            max_periods_per_week=t.max_periods_per_week,
            max_consecutive_periods=t.max_consecutive_periods,
            unavailable_days=t.unavailable_days,
            subject_ids=list(subject_id_set),
            qualifications=qual_outs,
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
        rooms_db = session.scalars(select(models.Room).where(models.Room.school_id == sid)).all()
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
                # Use stored color when available, otherwise fall back to a default palette
                "color": s.color if s.color else default_colors[idx % len(default_colors)],
                "freqPrimary": req_primary.get(s.id, 0),
                "freqSenior": req_senior.get(s.id, 0),
                "requiresDoublePeriod": s.requires_double_period,
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
        formatted_classes.sort(key=lambda c: class_sort_key(c["name"], c.get("grade", "")))

        class_homeroom_map = {c.home_room_id: (str(c.id), c.section) for c in classes if c.home_room_id}
        formatted_rooms = [
            {
                "id": str(r.id),
                "name": r.name,
                "type": r.type,
                "capacity": r.capacity if r.capacity else 35,
                "homeroomForClassId": class_homeroom_map.get(r.id, (None, None))[0],
                "homeroomForClassName": class_homeroom_map.get(r.id, (None, None))[1],
            }
            for r in rooms_db
        ]
        formatted_rooms.sort(key=lambda r: room_sort_key(r["name"]))

        formatted_teachers = [
            {
                "id": str(t.id),
                "name": t.name,
                "email": t.email,
                "phone": t.phone,
                "subjects": [str(ts.subject_id) for ts in t.subjects],
                "qualifications": [
                    {
                        "id": str(ts.id),
                        "subjectId": str(ts.subject_id),
                        "gradeId": str(ts.grade_id) if ts.grade_id else None,
                    }
                    for ts in t.subjects
                ],
                "maxPerDay": t.max_periods_per_day,
                "maxPerWeek": t.max_periods_per_week,
                "maxConsecutive": t.max_consecutive_periods,
                "unavailableDays": t.unavailable_days or [],
            }
            for t in teachers
        ]
        formatted_teachers.sort(key=lambda t: teacher_sort_key(t["name"]))

        # Load teaching assignments
        assignments_db = session.scalars(
            select(models.TeachingAssignment)
            .where(models.TeachingAssignment.school_id == sid)
            .options(
                joinedload(models.TeachingAssignment.class_section),
                joinedload(models.TeachingAssignment.subject),
                joinedload(models.TeachingAssignment.teacher),
            )
        ).unique().all()

        freq_map = {(r.grade_id, r.subject_id): r.weekly_frequency for r in requirements}
        teacher_load: dict[uuid.UUID, int] = {}
        for a in assignments_db:
            gid = a.class_section.grade_id if a.class_section else None
            freq = freq_map.get((gid, a.subject_id), 0) if gid else 0
            teacher_load[a.teacher_id] = teacher_load.get(a.teacher_id, 0) + freq

        formatted_assignments = [
            {
                "id": str(a.id),
                "classId": str(a.class_id),
                "subjectId": str(a.subject_id),
                "teacherId": str(a.teacher_id),
                "className": a.class_section.section if a.class_section else None,
                "subjectName": a.subject.name if a.subject else None,
                "teacherName": a.teacher.name if a.teacher else None,
                "weeklyFrequency": freq_map.get((a.class_section.grade_id, a.subject_id), 0) if a.class_section else 0,
                "teacherWeeklyLoad": teacher_load.get(a.teacher_id, 0),
            }
            for a in assignments_db
        ]
        formatted_assignments.sort(key=lambda a: (class_sort_key(a["className"] or ""), (a["subjectName"] or "").lower()))

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

        # Load holidays
        holidays_db = session.scalars(
            select(models.Holiday)
            .where(models.Holiday.school_id == sid)
            .order_by(models.Holiday.start_date)
        ).all()
        formatted_holidays = [
            {
                "id": str(h.id),
                "name": h.name,
                "startDate": h.start_date.isoformat(),
                "endDate": h.end_date.isoformat(),
                "type": h.holiday_type,
            }
            for h in holidays_db
        ]

        # Load pinned lessons
        pinned_db = session.scalars(
            select(models.PinnedLesson)
            .where(models.PinnedLesson.school_id == sid)
            .options(
                joinedload(models.PinnedLesson.class_section),
                joinedload(models.PinnedLesson.subject),
                joinedload(models.PinnedLesson.teacher),
            )
        ).unique().all()
        formatted_pinned = [
            {
                "id": str(p.id),
                "classId": str(p.class_id),
                "subjectId": str(p.subject_id),
                "teacherId": str(p.teacher_id),
                "className": p.class_section.section if p.class_section else None,
                "subjectName": p.subject.name if p.subject else None,
                "teacherName": p.teacher.name if p.teacher else None,
                "day": p.day,
                "period": p.period,
            }
            for p in pinned_db
        ]

        # Load blocked slots
        blocked_db = session.scalars(
            select(models.BlockedSlot)
            .where(models.BlockedSlot.school_id == sid)
        ).all()
        formatted_blocked = [
            {
                "id": str(b.id),
                "scope": b.scope,
                "scopeId": str(b.scope_id) if b.scope_id else None,
                "day": b.day,
                "period": b.period,
                "label": b.label,
                "onDate": b.on_date.isoformat() if b.on_date else None,
            }
            for b in blocked_db
        ]

        # Load versions
        versions_db = session.scalars(
            select(models.TimetableVersion)
            .where(models.TimetableVersion.school_id == sid)
            .order_by(models.TimetableVersion.version_number.desc())
        ).all()
        formatted_versions = [
            {
                "id": str(v.id),
                "versionNumber": v.version_number,
                "state": v.state,
                "effectiveFrom": v.effective_from.isoformat() if v.effective_from else None,
                "publishedAt": v.published_at.isoformat() if v.published_at else None,
                "notes": v.notes,
                "createdAt": v.created_at.isoformat(),
            }
            for v in versions_db
        ]

        # Load period slots from DB if present
        db_slots = session.scalars(
            select(models.PeriodSlot)
            .where(models.PeriodSlot.school_id == sid)
            .order_by(models.PeriodSlot.period_number)
        ).all()

        max_p_senior = max([ps.period_number for ps in db_slots if ps.period_number] or [6])
        max_p_primary = max([ps.period_number for ps in db_slots if ps.tier == "primary" and ps.period_number] or [min(4, max_p_senior)])

        if max_p_senior >= 8:
            # 8-period CBSE/ICSE schedule (40-minute periods, Short Break after P3, Lunch after P6)
            period_slots = [
                {"number": 1, "label": "Period 1", "time": "08:00 - 08:40", "isBreak": False},
                {"number": 2, "label": "Period 2", "time": "08:40 - 09:20", "isBreak": False},
                {"number": 3, "label": "Period 3", "time": "09:20 - 10:00", "isBreak": False},
                {"number": "B1", "label": "Short Break", "time": "10:00 - 10:20", "isBreak": True, "type": "break"},
                {"number": 4, "label": "Period 4", "time": "10:20 - 11:00", "isBreak": False},
                {"number": 5, "label": "Period 5", "time": "11:00 - 11:40", "isBreak": False},
                {"number": 6, "label": "Period 6", "time": "11:40 - 12:20", "isBreak": False, "note": "Pre-Primary Dismissal (12:20)"},
                {"number": "L1", "label": "Lunch Break", "time": "12:20 - 12:50", "isBreak": True, "type": "lunch"},
                {"number": 7, "label": "Period 7", "time": "12:50 - 13:30", "isBreak": False, "note": "Primary Dismissal (13:30)"},
                {"number": 8, "label": "Period 8", "time": "13:30 - 14:10", "isBreak": False, "seniorOnly": True, "note": "Senior Dismissal (14:10)"},
            ]
            rules_dict = {
                "primaryEndPeriod": max_p_primary,
                "seniorEndPeriod": max_p_senior,
                "maxTeacherPeriodsPerDay": school.max_teacher_periods_per_day,
                "activityDay": school.activity_day or "None",
                "activityPeriods": school.activity_periods or [],
                "zeroPeriodLabel": "Homeroom / Assembly",
                "lunchAfterPeriod": 6,
            }
            timing_dict = {
                "startTime": "08:00",
                "periodDurationMinutes": 40,
                "hasZeroPeriod": False,
                "zeroPeriodDurationMinutes": 0,
                "zeroPeriodLabel": "Zero Period",
                "hasRecessBreak": True,
                "recessAfterPeriod": 3,
                "recessDurationMinutes": 20,
                "recessLabel": "Short Break",
                "hasLunchBreak": True,
                "lunchAfterPeriod": 6,
                "lunchDurationMinutes": 30,
                "lunchLabel": "Lunch Break",
                "lunchSeniorOnly": False,
            }
        else:
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
            rules_dict = {
                "primaryEndPeriod": 4,
                "seniorEndPeriod": 6,
                "maxTeacherPeriodsPerDay": school.max_teacher_periods_per_day,
                "activityDay": school.activity_day,
                "activityPeriods": school.activity_periods,
                "zeroPeriodLabel": "Zero Period (Homeroom / Assembly)",
                "lunchAfterPeriod": 4,
            }
            timing_dict = {
                "startTime": "08:00",
                "periodDurationMinutes": 45,
                "hasZeroPeriod": True,
                "zeroPeriodDurationMinutes": 30,
                "zeroPeriodLabel": "Zero Period (Homeroom / Assembly)",
                "hasRecessBreak": True,
                "recessAfterPeriod": 2,
                "recessDurationMinutes": 15,
                "recessLabel": "Short Break",
                "hasLunchBreak": True,
                "lunchAfterPeriod": 4,
                "lunchDurationMinutes": 30,
                "lunchLabel": "Lunch Break",
                "lunchSeniorOnly": False,
            }

        return FullSchoolOut(
            id=str(school.id),
            name=school.name,
            subdomain=school.subdomain,
            timezone=school.timezone,
            term=school.term,
            published=school.published,
            workingDays=school.working_days,
            rules=rules_dict,
            timingConfig=timing_dict,
            periodSlots=period_slots,
            classes=formatted_classes,
            rooms=formatted_rooms,
            subjects=formatted_subjects,
            teachers=formatted_teachers,
            assignments=formatted_assignments,
            absences=formatted_absences,
            substitutions=formatted_substitutions,
            holidays=formatted_holidays,
            pinnedLessons=formatted_pinned,
            blockedSlots=formatted_blocked,
            versions=formatted_versions,
        )


def list_assignments(school_id: str) -> list[AssignmentOut]:
    """Retrieve all teaching assignments for a school, enriched with names and teacher workload."""
    sid = uuid.UUID(school_id)
    with tenant_session(school_id) as session:
        assignments = session.scalars(
            select(models.TeachingAssignment)
            .where(models.TeachingAssignment.school_id == sid)
            .options(
                joinedload(models.TeachingAssignment.class_section),
                joinedload(models.TeachingAssignment.subject),
                joinedload(models.TeachingAssignment.teacher),
            )
        ).unique().all()

        reqs = session.scalars(
            select(models.SubjectRequirement).where(models.SubjectRequirement.school_id == sid)
        ).all()
        freq_map = {(r.grade_id, r.subject_id): r.weekly_frequency for r in reqs}

        teacher_load: dict[uuid.UUID, int] = {}
        for a in assignments:
            grade_id = a.class_section.grade_id if a.class_section else None
            freq = freq_map.get((grade_id, a.subject_id), 0) if grade_id else 0
            teacher_load[a.teacher_id] = teacher_load.get(a.teacher_id, 0) + freq

        results = [
            AssignmentOut(
                id=str(a.id),
                school_id=str(a.school_id),
                class_id=str(a.class_id),
                subject_id=str(a.subject_id),
                teacher_id=str(a.teacher_id),
                class_name=a.class_section.section if a.class_section else None,
                subject_name=a.subject.name if a.subject else None,
                teacher_name=a.teacher.name if a.teacher else None,
                teacher_weekly_load=teacher_load.get(a.teacher_id, 0),
            )
            for a in assignments
        ]
        results.sort(key=lambda a: (class_sort_key(a.class_name or ""), (a.subject_name or "").lower()))
        return results


def upsert_assignment(school_id: str, data: AssignmentCreate) -> AssignmentOut:
    """Create or update a teacher assignment for a class-subject pair."""
    sid = uuid.UUID(school_id)
    cid = uuid.UUID(data.class_id)
    sbid = uuid.UUID(data.subject_id)
    tid = uuid.UUID(data.teacher_id)

    with tenant_session(school_id) as session:
        existing = session.scalar(
            select(models.TeachingAssignment).where(
                models.TeachingAssignment.school_id == sid,
                models.TeachingAssignment.class_id == cid,
                models.TeachingAssignment.subject_id == sbid,
            )
        )
        if existing:
            existing.teacher_id = tid
            asgn = existing
        else:
            asgn = models.TeachingAssignment(
                id=uuid.uuid4(),
                school_id=sid,
                class_id=cid,
                subject_id=sbid,
                teacher_id=tid,
            )
            session.add(asgn)
        session.commit()
        session.refresh(asgn)

        class_sec = session.get(models.ClassSection, cid)
        subj = session.get(models.Subject, sbid)
        teacher = session.get(models.Teacher, tid)

        all_for_teacher = session.scalars(
            select(models.TeachingAssignment)
            .where(
                models.TeachingAssignment.school_id == sid,
                models.TeachingAssignment.teacher_id == tid,
            )
            .options(joinedload(models.TeachingAssignment.class_section))
        ).unique().all()

        reqs = session.scalars(
            select(models.SubjectRequirement).where(models.SubjectRequirement.school_id == sid)
        ).all()
        freq_map = {(r.grade_id, r.subject_id): r.weekly_frequency for r in reqs}
        total_load = sum(
            freq_map.get((a.class_section.grade_id, a.subject_id), 0)
            for a in all_for_teacher
            if a.class_section and a.class_section.grade_id
        )

        return AssignmentOut(
            id=str(asgn.id),
            school_id=str(asgn.school_id),
            class_id=str(asgn.class_id),
            subject_id=str(asgn.subject_id),
            teacher_id=str(asgn.teacher_id),
            class_name=class_sec.section if class_sec else None,
            subject_name=subj.name if subj else None,
            teacher_name=teacher.name if teacher else None,
            teacher_weekly_load=total_load,
        )


def delete_teacher(school_id: str, teacher_id: str) -> bool:
    """Delete a teacher and cascade delete related qualifications/assignments."""
    sid = uuid.UUID(school_id)
    tid = uuid.UUID(teacher_id)
    with tenant_session(school_id) as session:
        t = session.scalar(select(models.Teacher).where(models.Teacher.id == tid, models.Teacher.school_id == sid))
        if not t:
            raise HTTPException(status_code=404, detail="Teacher not found.")
        session.delete(t)
        session.commit()
        return True


def delete_room(school_id: str, room_id: str) -> bool:
    """Delete a room."""
    sid = uuid.UUID(school_id)
    rid = uuid.UUID(room_id)
    with tenant_session(school_id) as session:
        r = session.scalar(select(models.Room).where(models.Room.id == rid, models.Room.school_id == sid))
        if not r:
            raise HTTPException(status_code=404, detail="Room not found.")
        session.delete(r)
        session.commit()
        return True


def delete_subject(school_id: str, subject_id: str) -> bool:
    """Delete a subject and related requirements."""
    sid = uuid.UUID(school_id)
    sub_id = uuid.UUID(subject_id)
    with tenant_session(school_id) as session:
        s = session.scalar(select(models.Subject).where(models.Subject.id == sub_id, models.Subject.school_id == sid))
        if not s:
            raise HTTPException(status_code=404, detail="Subject not found.")
        session.delete(s)
        session.commit()
        return True


def delete_class_section(school_id: str, class_id: str) -> bool:
    """Delete a class section."""
    sid = uuid.UUID(school_id)
    cid = uuid.UUID(class_id)
    with tenant_session(school_id) as session:
        c = session.scalar(select(models.ClassSection).where(models.ClassSection.id == cid, models.ClassSection.school_id == sid))
        if not c:
            raise HTTPException(status_code=404, detail="Class section not found.")
        session.delete(c)
        session.commit()
        return True


def delete_assignment(school_id: str, assignment_id: str) -> bool:
    """Delete a teaching assignment."""
    sid = uuid.UUID(school_id)
    aid = uuid.UUID(assignment_id)
    with tenant_session(school_id) as session:
        asgn = session.scalar(
            select(models.TeachingAssignment).where(
                models.TeachingAssignment.id == aid,
                models.TeachingAssignment.school_id == sid,
            )
        )
        if not asgn:
            raise HTTPException(status_code=404, detail="Teaching assignment not found.")
        session.delete(asgn)
        session.commit()
        return True


def suggest_assignments(school_id: str) -> SuggestAssignmentsOut:
    """Auto-suggest teaching assignments based on subject qualification and lowest current load."""
    sid = uuid.UUID(school_id)
    with tenant_session(school_id) as session:
        classes = session.scalars(
            select(models.ClassSection)
            .where(models.ClassSection.school_id == sid)
            .options(joinedload(models.ClassSection.grade))
        ).unique().all()

        subjects = session.scalars(
            select(models.Subject).where(models.Subject.school_id == sid)
        ).all()

        teachers = session.scalars(
            select(models.Teacher)
            .where(models.Teacher.school_id == sid)
            .options(joinedload(models.Teacher.subjects))
        ).unique().all()

        reqs = session.scalars(
            select(models.SubjectRequirement).where(models.SubjectRequirement.school_id == sid)
        ).all()
        freq_map = {(r.grade_id, r.subject_id): r.weekly_frequency for r in reqs}

        existing = session.scalars(
            select(models.TeachingAssignment).where(models.TeachingAssignment.school_id == sid)
        ).all()
        existing_map = {(a.class_id, a.subject_id): a for a in existing}

        teacher_quals: dict[uuid.UUID, set[tuple[uuid.UUID, uuid.UUID | None]]] = {
            t.id: {(ts.subject_id, ts.grade_id) for ts in t.subjects} for t in teachers
        }

        teacher_load: dict[uuid.UUID, int] = {t.id: 0 for t in teachers}
        teacher_max_week: dict[uuid.UUID, int] = {t.id: t.max_periods_per_week for t in teachers}
        teacher_names: dict[uuid.UUID, str] = {t.id: t.name for t in teachers}

        for a in existing:
            cls = next((c for c in classes if c.id == a.class_id), None)
            freq = freq_map.get((cls.grade_id, a.subject_id), 0) if cls and cls.grade_id else 0
            if a.teacher_id in teacher_load:
                teacher_load[a.teacher_id] += freq

        suggestions: list[AssignmentOut] = []
        warnings: list[str] = []

        for c in classes:
            for s in subjects:
                freq = freq_map.get((c.grade_id, s.id), 0) if c.grade_id else 0
                if freq <= 0:
                    continue

                if (c.id, s.id) in existing_map:
                    cur = existing_map[(c.id, s.id)]
                    t_name = teacher_names.get(cur.teacher_id, "Unknown")
                    suggestions.append(
                        AssignmentOut(
                            id=str(cur.id),
                            school_id=str(sid),
                            class_id=str(c.id),
                            subject_id=str(s.id),
                            teacher_id=str(cur.teacher_id),
                            class_name=c.section,
                            subject_name=s.name,
                            teacher_name=t_name,
                            teacher_weekly_load=teacher_load.get(cur.teacher_id, 0),
                        )
                    )
                    continue

                qualified = [
                    t for t in teachers
                    if (s.id, None) in teacher_quals.get(t.id, set())
                    or (s.id, c.grade_id) in teacher_quals.get(t.id, set())
                ]
                if not qualified:
                    warnings.append(f"No qualified teacher found for class '{c.section}' and subject '{s.name}'.")
                    continue

                qualified.sort(key=lambda t: teacher_load.get(t.id, 0))
                best_t = qualified[0]

                new_load = teacher_load.get(best_t.id, 0) + freq
                teacher_load[best_t.id] = new_load

                if new_load > teacher_max_week.get(best_t.id, 30):
                    warnings.append(
                        f"Teacher '{best_t.name}' will be overloaded ({new_load}/{teacher_max_week.get(best_t.id, 30)} periods/week) when assigned to '{c.section}' for '{s.name}'."
                    )

                suggestions.append(
                    AssignmentOut(
                        id=str(uuid.uuid4()),
                        school_id=str(sid),
                        class_id=str(c.id),
                        subject_id=str(s.id),
                        teacher_id=str(best_t.id),
                        class_name=c.section,
                        subject_name=s.name,
                        teacher_name=best_t.name,
                        teacher_weekly_load=new_load,
                    )
                )

        workload_summary = [
            WorkloadItem(
                teacher_id=str(t.id),
                teacher_name=t.name,
                assigned_periods=teacher_load.get(t.id, 0),
                max_periods_per_week=t.max_periods_per_week,
                overloaded=teacher_load.get(t.id, 0) > t.max_periods_per_week,
            )
            for t in teachers
        ]

        return SuggestAssignmentsOut(
            suggestions=suggestions,
            warnings=warnings,
            workload_summary=workload_summary,
        )


# ── Audit Log services (Phase 2-E) ─────────────────────────────────────────────

def record_audit(
    session,
    school_id: uuid.UUID,
    action: str,
    entity_type: str,
    entity_id: str | None = None,
    actor_id: uuid.UUID | None = None,
    detail: str | None = None,
) -> models.AuditLog:
    """Record an audit trail event inside an existing transaction."""
    log = models.AuditLog(
        id=uuid.uuid4(),
        school_id=school_id,
        actor_id=actor_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        detail=detail,
    )
    session.add(log)
    return log


def list_audit_logs(school_id: str, limit: int = 100) -> list[AuditLogOut]:
    """Retrieve the recent audit log for a school."""
    sid = uuid.UUID(school_id)
    with tenant_session(school_id) as session:
        logs = session.scalars(
            select(models.AuditLog)
            .where(models.AuditLog.school_id == sid)
            .order_by(models.AuditLog.created_at.desc())
            .limit(limit)
        ).all()
        return [
            AuditLogOut(
                id=str(l.id),
                school_id=str(l.school_id),
                actor_id=str(l.actor_id) if l.actor_id else None,
                action=l.action,
                entity_type=l.entity_type,
                entity_id=l.entity_id,
                detail=l.detail,
                created_at=l.created_at,
            )
            for l in logs
        ]


# ── Holiday services (Phase 2-A) ───────────────────────────────────────────────

def list_holidays(school_id: str) -> list[HolidayOut]:
    """Retrieve all holidays for a school."""
    sid = uuid.UUID(school_id)
    with tenant_session(school_id) as session:
        holidays = session.scalars(
            select(models.Holiday)
            .where(models.Holiday.school_id == sid)
            .order_by(models.Holiday.start_date)
        ).all()
        return [
            HolidayOut(
                id=str(h.id),
                school_id=str(h.school_id),
                name=h.name,
                start_date=h.start_date,
                end_date=h.end_date,
                holiday_type=h.holiday_type,
            )
            for h in holidays
        ]


def create_holiday(school_id: str, data: HolidayCreate) -> HolidayOut:
    """Create a new holiday date-range."""
    sid = uuid.UUID(school_id)
    with tenant_session(school_id) as session:
        holiday = models.Holiday(
            id=uuid.uuid4(),
            school_id=sid,
            name=data.name,
            start_date=data.start_date,
            end_date=data.end_date,
            holiday_type=data.holiday_type,
        )
        session.add(holiday)
        session.flush()

        record_audit(
            session=session,
            school_id=sid,
            action="create_holiday",
            entity_type="holiday",
            entity_id=str(holiday.id),
            detail=f"Created holiday '{holiday.name}' ({holiday.start_date} to {holiday.end_date})",
        )
        session.commit()

        return HolidayOut(
            id=str(holiday.id),
            school_id=str(sid),
            name=holiday.name,
            start_date=holiday.start_date,
            end_date=holiday.end_date,
            holiday_type=holiday.holiday_type,
        )


def delete_holiday(school_id: str, holiday_id: str) -> None:
    """Delete a holiday record."""
    sid = uuid.UUID(school_id)
    hid = uuid.UUID(holiday_id)
    with tenant_session(school_id) as session:
        holiday = session.get(models.Holiday, hid)
        if not holiday or holiday.school_id != sid:
            raise HTTPException(status_code=404, detail="Holiday not found.")
        record_audit(
            session=session,
            school_id=sid,
            action="delete_holiday",
            entity_type="holiday",
            entity_id=str(hid),
            detail=f"Deleted holiday '{holiday.name}'",
        )
        session.delete(holiday)
        session.commit()


# ── Pinned Lesson services (Phase 2-C) ─────────────────────────────────────────

def list_pinned_lessons(school_id: str) -> list[PinnedLessonOut]:
    """Retrieve all pinned lessons for a school."""
    sid = uuid.UUID(school_id)
    with tenant_session(school_id) as session:
        pinned = session.scalars(
            select(models.PinnedLesson)
            .where(models.PinnedLesson.school_id == sid)
            .options(
                joinedload(models.PinnedLesson.class_section),
                joinedload(models.PinnedLesson.subject),
                joinedload(models.PinnedLesson.teacher),
            )
        ).unique().all()
        return [
            PinnedLessonOut(
                id=str(p.id),
                school_id=str(p.school_id),
                class_id=str(p.class_id),
                class_name=p.class_section.section if p.class_section else None,
                subject_id=str(p.subject_id),
                subject_name=p.subject.name if p.subject else None,
                teacher_id=str(p.teacher_id),
                teacher_name=p.teacher.name if p.teacher else None,
                day=p.day,
                period=p.period,
            )
            for p in pinned
        ]


def create_pinned_lesson(school_id: str, data: PinnedLessonCreate) -> PinnedLessonOut:
    """Pin a lesson to an exact day and period (solver treats as fixed)."""
    sid = uuid.UUID(school_id)
    cid = uuid.UUID(data.class_id)
    sub_id = uuid.UUID(data.subject_id)
    tid = uuid.UUID(data.teacher_id)
    with tenant_session(school_id) as session:
        clash_class = session.scalar(
            select(models.PinnedLesson).where(
                models.PinnedLesson.school_id == sid,
                models.PinnedLesson.class_id == cid,
                models.PinnedLesson.day == data.day,
                models.PinnedLesson.period == data.period,
            )
        )
        if clash_class:
            raise HTTPException(status_code=409, detail=f"Class already has a pinned lesson on {data.day} period {data.period}.")

        clash_teacher = session.scalar(
            select(models.PinnedLesson).where(
                models.PinnedLesson.school_id == sid,
                models.PinnedLesson.teacher_id == tid,
                models.PinnedLesson.day == data.day,
                models.PinnedLesson.period == data.period,
            )
        )
        if clash_teacher:
            raise HTTPException(status_code=409, detail=f"Teacher is already pinned on {data.day} period {data.period}.")

        pin = models.PinnedLesson(
            id=uuid.uuid4(),
            school_id=sid,
            class_id=cid,
            subject_id=sub_id,
            teacher_id=tid,
            day=data.day,
            period=data.period,
        )
        session.add(pin)
        session.flush()

        cls = session.get(models.ClassSection, cid)
        sub = session.get(models.Subject, sub_id)
        teacher = session.get(models.Teacher, tid)

        record_audit(
            session=session,
            school_id=sid,
            action="pin_lesson",
            entity_type="pinned_lesson",
            entity_id=str(pin.id),
            detail=f"Pinned {sub.name if sub else ''} with {teacher.name if teacher else ''} for {cls.section if cls else ''} on {data.day} P{data.period}",
        )
        session.commit()

        return PinnedLessonOut(
            id=str(pin.id),
            school_id=str(sid),
            class_id=data.class_id,
            class_name=cls.section if cls else None,
            subject_id=data.subject_id,
            subject_name=sub.name if sub else None,
            teacher_id=data.teacher_id,
            teacher_name=teacher.name if teacher else None,
            day=pin.day,
            period=pin.period,
        )


def delete_pinned_lesson(school_id: str, pin_id: str) -> None:
    """Delete a pinned lesson."""
    sid = uuid.UUID(school_id)
    pid = uuid.UUID(pin_id)
    with tenant_session(school_id) as session:
        pin = session.get(models.PinnedLesson, pid)
        if not pin or pin.school_id != sid:
            raise HTTPException(status_code=404, detail="Pinned lesson not found.")
        record_audit(
            session=session,
            school_id=sid,
            action="unpin_lesson",
            entity_type="pinned_lesson",
            entity_id=str(pid),
            detail=f"Unpinned lesson on {pin.day} P{pin.period}",
        )
        session.delete(pin)
        session.commit()


# ── Blocked Slot services (Phase 2-C) ─────────────────────────────────────────

def list_blocked_slots(school_id: str) -> list[BlockedSlotOut]:
    """Retrieve all blocked slots for a school."""
    sid = uuid.UUID(school_id)
    with tenant_session(school_id) as session:
        slots = session.scalars(
            select(models.BlockedSlot)
            .where(models.BlockedSlot.school_id == sid)
            .order_by(models.BlockedSlot.day, models.BlockedSlot.period)
        ).all()
        return [
            BlockedSlotOut(
                id=str(b.id),
                school_id=str(b.school_id),
                scope=b.scope,
                scope_id=str(b.scope_id) if b.scope_id else None,
                day=b.day,
                period=b.period,
                label=b.label,
                on_date=b.on_date,
            )
            for b in slots
        ]


def create_blocked_slot(school_id: str, data: BlockedSlotCreate) -> BlockedSlotOut:
    """Create a blocked slot for school/class/grade where no lessons can occur."""
    sid = uuid.UUID(school_id)
    sc_id = uuid.UUID(data.scope_id) if data.scope_id else None
    with tenant_session(school_id) as session:
        slot = models.BlockedSlot(
            id=uuid.uuid4(),
            school_id=sid,
            scope=data.scope,
            scope_id=sc_id,
            day=data.day,
            period=data.period,
            label=data.label,
            on_date=data.on_date,
        )
        session.add(slot)
        session.flush()

        record_audit(
            session=session,
            school_id=sid,
            action="block_slot",
            entity_type="blocked_slot",
            entity_id=str(slot.id),
            detail=f"Blocked {data.scope} slot on {data.day} P{data.period} ({data.label})",
        )
        session.commit()

        return BlockedSlotOut(
            id=str(slot.id),
            school_id=str(sid),
            scope=slot.scope,
            scope_id=str(slot.scope_id) if slot.scope_id else None,
            day=slot.day,
            period=slot.period,
            label=slot.label,
            on_date=slot.on_date,
        )


def delete_blocked_slot(school_id: str, slot_id: str) -> None:
    """Delete a blocked slot."""
    sid = uuid.UUID(school_id)
    bid = uuid.UUID(slot_id)
    with tenant_session(school_id) as session:
        slot = session.get(models.BlockedSlot, bid)
        if not slot or slot.school_id != sid:
            raise HTTPException(status_code=404, detail="Blocked slot not found.")
        record_audit(
            session=session,
            school_id=sid,
            action="unblock_slot",
            entity_type="blocked_slot",
            entity_id=str(bid),
            detail=f"Unblocked slot on {slot.day} P{slot.period}",
        )
        session.delete(slot)
        session.commit()


# ── Timetable Version services (Phase 2-D) ────────────────────────────────────

def list_versions(school_id: str) -> list[VersionOut]:
    """Retrieve all timetable versions for a school."""
    sid = uuid.UUID(school_id)
    with tenant_session(school_id) as session:
        versions = session.scalars(
            select(models.TimetableVersion)
            .where(models.TimetableVersion.school_id == sid)
            .order_by(models.TimetableVersion.version_number.desc())
        ).all()
        res = []
        for v in versions:
            count = session.scalar(
                select(func.count(models.TimetableEntry.id))
                .where(models.TimetableEntry.version_id == v.id)
            ) or 0
            res.append(
                VersionOut(
                    id=str(v.id),
                    school_id=str(v.school_id),
                    version_number=v.version_number,
                    state=v.state,
                    effective_from=v.effective_from,
                    published_by=str(v.published_by) if v.published_by else None,
                    published_at=v.published_at,
                    notes=v.notes,
                    entry_count=count,
                    created_at=v.created_at,
                )
            )
        return res


def _parse_optional_uuid(val: str | None) -> uuid.UUID | None:
    if not val:
        return None
    try:
        return uuid.UUID(str(val))
    except (ValueError, TypeError, AttributeError):
        return None


def approve_version(school_id: str, version_id: str, user_id: str | None = None) -> VersionOut:
    """Set a draft timetable version to approved state."""
    sid = uuid.UUID(school_id)
    vid = uuid.UUID(version_id)
    uid = _parse_optional_uuid(user_id)
    with tenant_session(school_id) as session:
        version = session.get(models.TimetableVersion, vid)
        if not version or version.school_id != sid:
            raise HTTPException(status_code=404, detail="Timetable version not found.")
        version.state = "approved"
        session.flush()

        record_audit(
            session=session,
            school_id=sid,
            actor_id=uid,
            action="approve_version",
            entity_type="timetable_version",
            entity_id=str(vid),
            detail=f"Approved version {version.version_number}",
        )
        session.commit()

        count = session.scalar(
            select(func.count(models.TimetableEntry.id)).where(models.TimetableEntry.version_id == vid)
        ) or 0
        return VersionOut(
            id=str(version.id),
            school_id=str(sid),
            version_number=version.version_number,
            state=version.state,
            effective_from=version.effective_from,
            published_by=str(version.published_by) if version.published_by else None,
            published_at=version.published_at,
            notes=version.notes,
            entry_count=count,
            created_at=version.created_at,
        )


def publish_version(school_id: str, version_id: str, user_id: str | None = None, effective_from: date | None = None) -> VersionOut:
    """Publish a timetable version and activate it."""
    sid = uuid.UUID(school_id)
    vid = uuid.UUID(version_id)
    uid = _parse_optional_uuid(user_id)
    with tenant_session(school_id) as session:
        version = session.get(models.TimetableVersion, vid)
        if not version or version.school_id != sid:
            raise HTTPException(status_code=404, detail="Timetable version not found.")

        # Demote previous published versions to approved
        prev_published = session.scalars(
            select(models.TimetableVersion).where(
                models.TimetableVersion.school_id == sid,
                models.TimetableVersion.state == "published",
                models.TimetableVersion.id != vid,
            )
        ).all()
        for p in prev_published:
            p.state = "approved"

        version.state = "published"
        version.published_by = uid
        version.published_at = datetime.now(timezone.utc)
        if effective_from:
            version.effective_from = effective_from

        school = session.get(models.School, sid)
        if school:
            school.published = True

        session.flush()

        record_audit(
            session=session,
            school_id=sid,
            actor_id=uid,
            action="publish_version",
            entity_type="timetable_version",
            entity_id=str(vid),
            detail=f"Published version {version.version_number}",
        )
        session.commit()

        count = session.scalar(
            select(func.count(models.TimetableEntry.id)).where(models.TimetableEntry.version_id == vid)
        ) or 0
        return VersionOut(
            id=str(version.id),
            school_id=str(sid),
            version_number=version.version_number,
            state=version.state,
            effective_from=version.effective_from,
            published_by=str(version.published_by) if version.published_by else None,
            published_at=version.published_at,
            notes=version.notes,
            entry_count=count,
            created_at=version.created_at,
        )


def rollback_version(school_id: str, version_id: str, user_id: str | None = None) -> VersionOut:
    """Roll back to an older version by setting it as published and demoting current published."""
    return publish_version(school_id, version_id, user_id=user_id)

