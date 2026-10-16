"""Pydantic schemas for Timetable API contracts. Mirrors frontend/src/domain/types.ts."""
from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class EntryOut(BaseModel):
    id: str | None = None
    class_id: str
    class_name: str | None = None
    day: str
    period: int
    subject_id: str
    subject_name: str | None = None
    teacher_id: str
    teacher_name: str | None = None
    room: str | None = None
    is_manual_override: bool = False
    substitute_teacher_id: str | None = None
    substitute_teacher_name: str | None = None

    model_config = ConfigDict(from_attributes=True)


class DiagnosticOut(BaseModel):
    severity: str
    title: str
    detail: str


class GenerateResponse(BaseModel):
    feasible: bool
    entries: list[EntryOut]
    diagnostics: list[DiagnosticOut]


class OverrideRequest(BaseModel):
    day: str
    period: int
    subject_id: str
    teacher_id: str
    room: str | None = None


class AbsenceCreate(BaseModel):
    teacher_id: str
    day: str
    reason: str = ""


class AbsenceOut(BaseModel):
    id: str
    school_id: str
    teacher_id: str
    teacher_name: str | None = None
    day: str
    reason: str | None = None

    model_config = ConfigDict(from_attributes=True)


class CandidateOut(BaseModel):
    teacher_id: str
    name: str
    free_periods_today: int
    assigned_today: int
    is_qualified: bool = False


class SubstitutionAssignRequest(BaseModel):
    entry_id: str
    substitute_teacher_id: str


class SubstitutionOut(BaseModel):
    id: str
    entry_id: str
    substitute_teacher_id: str
    substitute_name: str | None = None

    model_config = ConfigDict(from_attributes=True)


class PublishResponse(BaseModel):
    published: bool
    message: str
