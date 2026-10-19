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
    grade_id: str | None = None


@dataclass(frozen=True)
class Subject:
    id: str
    name: str
    is_activity: bool = False
    room: str | None = None
    requires_double_period: bool = False


@dataclass(frozen=True)
class Teacher:
    id: str
    name: str
    subject_ids: frozenset[str]
    max_periods_per_day: int = 5
    max_periods_per_week: int = 30
    max_consecutive_periods: int = 3
    unavailable_days: frozenset[str] = frozenset()


@dataclass(frozen=True)
class Assignment:
    """Admin-decided mapping of class + subject -> one specific teacher."""
    class_id: str
    subject_id: str
    teacher_id: str


@dataclass(frozen=True)
class PinnedLesson:
    """Admin-pinned lesson: must occur at the given day and period."""
    class_id: str
    subject_id: str
    teacher_id: str
    day: str
    period: int


@dataclass(frozen=True)
class BlockedSlot:
    """Blocked slot: forbidden for regular teaching lessons (e.g. assembly, sports)."""
    scope: Literal["school", "grade", "class"]
    day: str
    period: int
    scope_id: str | None = None
    label: str = ""


@dataclass(frozen=True)
class Rules:
    working_days: tuple[str, ...] = ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")
    primary_periods: int = 4          # ends 12:00
    senior_periods: int = 6           # ends 14:00
    max_teacher_periods_per_day: int = 5
    activity_day: str = "Wednesday"
    activity_periods: tuple[int, ...] = (1, 2)
    recess_after_period: int = 2
    lunch_after_period: int = 4
    # Optimization & Soft Constraint Preferences (S1 & S2 on by default; S3 & S4 opt-in; S5 double periods)
    spread_subjects: bool = True
    smooth_teacher_workload: bool = True
    minimize_teacher_gaps: bool = False
    morning_core_priority: bool = False
    consecutive_double_periods: bool = True


@dataclass
class ProblemInput:
    rules: Rules
    classes: list[ClassSection]
    subjects: list[Subject]
    teachers: list[Teacher]
    # (class_id, subject_id) -> required periods per week
    weekly_frequency: dict[tuple[str, str], int] = field(default_factory=dict)
    # Admin-assigned teacher per (class, subject)
    assignments: tuple[Assignment, ...] = ()
    # Room capacities: room_name -> max simultaneous classes (default 1)
    room_capacities: dict[str, int] = field(default_factory=dict)
    # Admin-pinned lessons (forced placements)
    pinned_lessons: tuple[PinnedLesson, ...] = ()
    # Blocked time slots (forbidden for regular lessons)
    blocked_slots: tuple[BlockedSlot, ...] = ()


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


@dataclass(frozen=True)
class QualityReport:
    total_entries: int
    empty_period_count: int
    unplaced_lessons: list[str] = field(default_factory=list)
    teacher_workload: list[dict] = field(default_factory=list)
    soft_score: int = 0


@dataclass
class SolveResult:
    entries: list[Entry]
    diagnostics: list[Diagnostic]   # "infeasible" cases are reported here, never silently dropped
    feasible: bool
    quality_report: QualityReport | None = None
