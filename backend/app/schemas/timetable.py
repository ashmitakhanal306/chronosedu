"""API contracts (Pydantic). Mirror frontend/src/domain/types.ts."""
from pydantic import BaseModel


class EntryOut(BaseModel):
    class_id: str
    day: str
    period: int
    subject_id: str
    teacher_id: str
    room: str | None = None
    is_manual_override: bool = False


class DiagnosticOut(BaseModel):
    severity: str
    title: str
    detail: str


class GenerateResponse(BaseModel):
    feasible: bool
    entries: list[EntryOut]
    diagnostics: list[DiagnosticOut]


class SubstituteOut(BaseModel):
    teacher_id: str
    name: str
    free_periods_today: int
