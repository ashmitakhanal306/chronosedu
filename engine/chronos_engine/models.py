"""ENGINE LAYER — input/output contract. Plain dataclasses: no DB, no HTTP.

The backend maps DB rows -> ProblemInput, calls solve(), and maps the result back.
Keeping this boundary clean lets the engine be tested standalone (roadmap Phase 1).
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal

Tier = Literal["primary", "senior"]


@dataclass(frozen=True)
class ClassSection:
    id: str
    name: str
    tier: Tier
    home_room: str = ""


@dataclass(frozen=True)
class Subject:
    id: str
    name: str
    is_activity: bool = False
    room: str | None = None


@dataclass(frozen=True)
class Teacher:
    id: str
    name: str
    subject_ids: frozenset[str]
    max_periods_per_day: int = 5
    unavailable_days: frozenset[str] = frozenset()


@dataclass(frozen=True)
class Rules:
    working_days: tuple[str, ...] = ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")
    primary_periods: int = 4          # ends 12:00
    senior_periods: int = 6           # ends 14:00
    max_teacher_periods_per_day: int = 5
    activity_day: str = "Wednesday"
    activity_periods: tuple[int, ...] = (1, 2)


@dataclass
class ProblemInput:
    rules: Rules
    classes: list[ClassSection]
    subjects: list[Subject]
    teachers: list[Teacher]
    # (class_id, subject_id) -> required periods per week
    weekly_frequency: dict[tuple[str, str], int] = field(default_factory=dict)


@dataclass(frozen=True)
class Entry:
    class_id: str
    day: str
    period: int
    subject_id: str
    teacher_id: str
    room: str | None = None


@dataclass(frozen=True)
class Diagnostic:
    severity: Literal["error", "warning"]
    title: str
    detail: str


@dataclass
class SolveResult:
    entries: list[Entry]
    diagnostics: list[Diagnostic]   # "infeasible" cases are reported here, never silently dropped
    feasible: bool
