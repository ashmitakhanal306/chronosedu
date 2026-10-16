"""ENGINE LAYER — constraint solver entrypoint (Google OR-Tools CP-SAT).

STATUS: interface only. The working reference implementation today is the greedy solver in
frontend/src/engine/generateTimetable.ts. Phase 1 of the roadmap is to implement this CP-SAT
model and test it on awkward staffing cases BEFORE wiring it to the API.

Rules to encode (blueprint section 5):

HARD
  H1  a class has at most one subject per (day, period)
  H2  a teacher teaches at most one class per (day, period)
  H3  each (class, subject) receives exactly its weekly frequency
  H4  primary classes use periods 1..primary_periods, senior 1..senior_periods
  H5  zero period + breaks/lunch are not schedulable slots
  H6  activity block (activity_day, activity_periods) is filled by activity subjects for relevant classes
  H7  per teacher per day: sum(assigned periods) <= min(teacher.max, rules.max) (<= 5)
  H8  substitutes only come from teachers free in that period (see substitutes.py)
SOFT (objective)
  S1  spread each subject across days (penalise >1 period/day/subject/class)
  S2  balance specialist (activity) teacher load across classes
  S3  substitute preference: most free periods that day; tie-breaker = OPEN DECISION

Suggested model:
  x[c, s, t, d, p] ∈ {0,1}  — only create vars for qualified (s, t) pairs and valid periods
  Add H1..H7 as linear constraints; S1/S2 as a minimised penalty sum.
  If solver returns INFEASIBLE, run a relaxation/assumption pass to name the offending
  subject/class/teacher and return it as a Diagnostic (never return a silently broken timetable).
"""
from __future__ import annotations

from .models import ProblemInput, SolveResult


def solve(problem: ProblemInput, *, time_limit_s: float = 30.0) -> SolveResult:
    raise NotImplementedError("Phase 1: implement CP-SAT model (see module docstring).")
