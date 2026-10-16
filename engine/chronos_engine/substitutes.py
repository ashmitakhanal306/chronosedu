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
    day_periods: int = 6,
    max_per_day: int = 5,
    absent_today: frozenset[str] = frozenset(),
    already_subbing: frozenset[str] = frozenset(),
) -> list[tuple[Teacher, int]]:
    """Return [(teacher, free_periods_today)] best-first.

    Hard: only teachers free this period, not absent, under the daily cap.
    Soft: most free periods that day first. Ties keep input order (tie-breaker = open decision).
    """
    busy_now = {e.teacher_id for e in entries if e.day == day and e.period == period} | set(already_subbing)
    load: dict[str, int] = {}
    for e in entries:
        if e.day == day:
            load[e.teacher_id] = load.get(e.teacher_id, 0) + 1

    ranked: list[tuple[Teacher, int]] = []
    for t in teachers:
        if t.id == absent_teacher_id or t.id in absent_today or day in t.unavailable_days:
            continue
        if t.id in busy_now:
            continue
        assigned = load.get(t.id, 0)
        if assigned >= min(t.max_periods_per_day, max_per_day):
            continue
        ranked.append((t, day_periods - assigned))

    ranked.sort(key=lambda x: -x[1])  # stable sort
    return ranked
