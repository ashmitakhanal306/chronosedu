"""ENGINE LAYER — substitute ranking (reference port of frontend/src/engine/substitutes.ts)."""
from __future__ import annotations

from .models import Entry, Teacher


def rank_substitutes(
    teachers: list[Teacher],
    entries: list[Entry],
    day: str,
    period: int,
    absent_teacher_id: str,
    *,
    subject_id: str | None = None,
    day_periods: int = 6,
    max_per_day: int = 5,
    absent_today: frozenset[str] = frozenset(),
    already_subbing: frozenset[str] = frozenset(),
) -> list[tuple[Teacher, int]]:
    """Return [(teacher, free_periods_today)] best-first.

    Hard: only teachers free this period, not absent, under the daily cap.
    Soft ranking & Tie-breakers (docs/DECISIONS.md):
      1. Most free periods today (highest first)
      2. Same-subject qualification match (qualified teachers first)
      3. Lowest total weekly load (balances weekly teaching load)
      4. Name alphabetically (deterministic)
    """
    busy_now = {e.teacher_id for e in entries if e.day == day and e.period == period} | set(already_subbing)
    daily_load: dict[str, int] = {}
    weekly_load: dict[str, int] = {}
    for e in entries:
        weekly_load[e.teacher_id] = weekly_load.get(e.teacher_id, 0) + 1
        if e.day == day:
            daily_load[e.teacher_id] = daily_load.get(e.teacher_id, 0) + 1

    ranked_candidates: list[tuple[Teacher, int]] = []
    for t in teachers:
        if t.id == absent_teacher_id or t.id in absent_today or day in t.unavailable_days:
            continue
        if t.id in busy_now:
            continue
        assigned_today = daily_load.get(t.id, 0)
        if assigned_today >= min(t.max_periods_per_day, max_per_day):
            continue
        free_today = day_periods - assigned_today
        ranked_candidates.append((t, free_today))

    # Sort key:
    # 1. -free_today (highest free periods first)
    # 2. -is_qualified (1 if teacher qualifies for subject_id, 0 otherwise)
    # 3. total weekly load (lowest first)
    # 4. teacher name alphabetically
    ranked_candidates.sort(
        key=lambda item: (
            -item[1],
            -1 if (subject_id is not None and subject_id in item[0].subject_ids) else 0,
            weekly_load.get(item[0].id, 0),
            item[0].name,
        )
    )
    return ranked_candidates

