"""Pydantic schemas for School Setup CRUD endpoints."""
from __future__ import annotations

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


class RoomOut(BaseModel):
    id: str
    school_id: str
    name: str
    type: str

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


class SubjectOut(BaseModel):
    id: str
    school_id: str
    name: str
    code: str
    type: str
    room_id: str | None = None

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


class TeacherCreate(BaseModel):
    name: str
    email: str | None = None
    phone: str | None = None
    max_periods_per_day: int = 5
    unavailable_days: list[str] = Field(default_factory=list)
    subject_ids: list[str] = Field(default_factory=list)


class TeacherOut(BaseModel):
    id: str
    school_id: str
    name: str
    email: str | None = None
    phone: str | None = None
    max_periods_per_day: int
    unavailable_days: list[str]
    subject_ids: list[str] = Field(default_factory=list)

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
    absences: list[dict[str, Any]] = Field(default_factory=list)
    substitutions: dict[str, str] = Field(default_factory=dict)

