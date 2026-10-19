"""Pydantic schemas for School Setup CRUD endpoints."""
from __future__ import annotations

from datetime import date, datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class SchoolCreate(BaseModel):
    name: str
    subdomain: str
    timezone: str = "Asia/Kolkata"
    term: str | None = None
    working_days: list[str] = Field(default_factory=lambda: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
    max_teacher_periods_per_day: int = 5
    activity_day: str = "Wednesday"
    activity_periods: list[int] = Field(default_factory=lambda: [1, 2])
    admin_email: str | None = None
    admin_password: str | None = None


class UserCreate(BaseModel):
    email: str
    password: str
    role: str  # "admin", "teacher", "student"
    teacher_id: str | None = None
    class_id: str | None = None


class UserOut(BaseModel):
    id: str
    school_id: str
    email: str
    role: str
    teacher_id: str | None = None
    class_id: str | None = None

    model_config = ConfigDict(from_attributes=True)


class SchoolOut(BaseModel):
    id: str
    name: str
    subdomain: str
    timezone: str
    term: str | None = None
    published: bool
    working_days: list[str]
    max_teacher_periods_per_day: int
    activity_day: str
    activity_periods: list[int]

    model_config = ConfigDict(from_attributes=True)


class GradeCreate(BaseModel):
    name: str
    tier: str  # 'primary' or 'senior'
    day_end_time: str = "12:00"


class GradeOut(BaseModel):
    id: str
    school_id: str
    name: str
    tier: str
    day_end_time: str

    model_config = ConfigDict(from_attributes=True)


class RoomCreate(BaseModel):
    name: str
    type: str = "classroom"
    capacity: int = 1


class RoomOut(BaseModel):
    id: str
    school_id: str
    name: str
    type: str
    capacity: int = 1

    model_config = ConfigDict(from_attributes=True)


class ClassSectionCreate(BaseModel):
    grade_id: str
    section: str
    home_room_id: str | None = None


class ClassSectionOut(BaseModel):
    id: str
    school_id: str
    grade_id: str
    section: str
    home_room_id: str | None = None

    model_config = ConfigDict(from_attributes=True)


class SubjectCreate(BaseModel):
    name: str
    code: str
    type: str = "academic"
    room_id: str | None = None
    requires_double_period: bool = False
    color: str | None = None


class SubjectOut(BaseModel):
    id: str
    school_id: str
    name: str
    code: str
    type: str
    room_id: str | None = None
    requires_double_period: bool = False
    color: str | None = None

    model_config = ConfigDict(from_attributes=True)


class RequirementCreate(BaseModel):
    subject_id: str
    grade_id: str
    weekly_frequency: int


class RequirementOut(BaseModel):
    id: str
    school_id: str
    subject_id: str
    grade_id: str
    weekly_frequency: int

    model_config = ConfigDict(from_attributes=True)


class QualificationCreate(BaseModel):
    subject_id: str
    grade_id: str | None = None


class QualificationOut(BaseModel):
    id: str
    teacher_id: str
    subject_id: str
    grade_id: str | None = None
    subject_name: str | None = None
    grade_name: str | None = None

    model_config = ConfigDict(from_attributes=True)


class TeacherCreate(BaseModel):
    name: str
    email: str | None = None
    phone: str | None = None
    max_periods_per_day: int = 5
    max_periods_per_week: int = 30
    max_consecutive_periods: int = 3
    unavailable_days: list[str] = Field(default_factory=list)
    subject_ids: list[str] = Field(default_factory=list)
    qualifications: list[QualificationCreate] = Field(default_factory=list)


class TeacherOut(BaseModel):
    id: str
    school_id: str
    name: str
    email: str | None = None
    phone: str | None = None
    max_periods_per_day: int
    max_periods_per_week: int = 30
    max_consecutive_periods: int = 3
    unavailable_days: list[str]
    subject_ids: list[str] = Field(default_factory=list)
    qualifications: list[QualificationOut] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)


class FullSchoolOut(BaseModel):
    id: str
    name: str
    subdomain: str
    timezone: str
    term: str | None = None
    published: bool
    workingDays: list[str]
    rules: dict[str, Any]
    timingConfig: dict[str, Any] | None = None
    periodSlots: list[dict[str, Any]] = Field(default_factory=list)
    classes: list[dict[str, Any]] = Field(default_factory=list)
    subjects: list[dict[str, Any]] = Field(default_factory=list)
    teachers: list[dict[str, Any]] = Field(default_factory=list)
    assignments: list[dict[str, Any]] = Field(default_factory=list)
    absences: list[dict[str, Any]] = Field(default_factory=list)
    substitutions: dict[str, str] = Field(default_factory=dict)
    holidays: list[dict[str, Any]] = Field(default_factory=list)
    pinnedLessons: list[dict[str, Any]] = Field(default_factory=list)
    blockedSlots: list[dict[str, Any]] = Field(default_factory=list)
    versions: list[dict[str, Any]] = Field(default_factory=list)


# ── Teaching Assignment schemas (Phase 1) ─────────────────────────────────────

class AssignmentCreate(BaseModel):
    """Upsert: create or replace the teacher for a class-subject pair."""
    class_id: str
    subject_id: str
    teacher_id: str


class AssignmentOut(BaseModel):
    id: str
    school_id: str
    class_id: str
    subject_id: str
    teacher_id: str
    # Enriched display fields (populated by service layer)
    class_name: str | None = None
    subject_name: str | None = None
    teacher_name: str | None = None
    # Computed workload of the assigned teacher (periods/week from requirements)
    teacher_weekly_load: int = 0

    model_config = ConfigDict(from_attributes=True)


class WorkloadItem(BaseModel):
    teacher_id: str
    teacher_name: str
    assigned_periods: int   # sum of all requirements for classes assigned to this teacher
    max_periods_per_week: int
    overloaded: bool


class SuggestAssignmentsOut(BaseModel):
    """Result of the auto-suggest endpoint. Admin reviews and accepts or changes."""
    suggestions: list[AssignmentOut]
    warnings: list[str]   # e.g. 'Teacher X overloaded', 'No teacher for Class 4A / Art'
    workload_summary: list[WorkloadItem]


# ── Holiday schemas (Phase 2-A) ────────────────────────────────────────────────

class HolidayCreate(BaseModel):
    name: str
    start_date: date
    end_date: date
    holiday_type: str = "school"  # 'national', 'school', 'exam', 'sports'


class HolidayOut(BaseModel):
    id: str
    school_id: str
    name: str
    start_date: date
    end_date: date
    holiday_type: str

    model_config = ConfigDict(from_attributes=True)


# ── Pinned Lesson & Blocked Slot schemas (Phase 2-C) ───────────────────────────

class PinnedLessonCreate(BaseModel):
    class_id: str
    subject_id: str
    teacher_id: str
    day: str
    period: int


class PinnedLessonOut(BaseModel):
    id: str
    school_id: str
    class_id: str
    class_name: str | None = None
    subject_id: str
    subject_name: str | None = None
    teacher_id: str
    teacher_name: str | None = None
    day: str
    period: int

    model_config = ConfigDict(from_attributes=True)


class BlockedSlotCreate(BaseModel):
    scope: str = "school"  # 'school', 'class', 'grade'
    scope_id: str | None = None
    day: str
    period: int
    label: str = "Blocked"
    on_date: date | None = None


class BlockedSlotOut(BaseModel):
    id: str
    school_id: str
    scope: str
    scope_id: str | None = None
    scope_name: str | None = None
    day: str
    period: int
    label: str
    on_date: date | None = None

    model_config = ConfigDict(from_attributes=True)


# ── Timetable Version schemas (Phase 2-D) ──────────────────────────────────────

class VersionOut(BaseModel):
    id: str
    school_id: str
    version_number: int
    state: str  # 'draft', 'approved', 'published'
    effective_from: date | None = None
    published_by: str | None = None
    published_at: datetime | None = None
    notes: str | None = None
    entry_count: int = 0
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class VersionStateUpdate(BaseModel):
    notes: str | None = None
    effective_from: date | None = None


# ── Audit Log schemas (Phase 2-E) ──────────────────────────────────────────────

class AuditLogOut(BaseModel):
    id: str
    school_id: str
    actor_id: str | None = None
    action: str
    entity_type: str
    entity_id: str | None = None
    detail: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
