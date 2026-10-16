"""Tests for ChronosEdu Constraint Engine (Google OR-Tools CP-SAT)."""
from __future__ import annotations

import time
import pytest
from chronos_engine.models import (
    ClassSection,
    Diagnostic,
    Entry,
    ProblemInput,
    Rules,
    Subject,
    Teacher,
)
from chronos_engine.solver import solve, run_pre_checks
from chronos_engine.substitutes import rank_substitutes


def create_demo_school_1_problem(extra_activity_teacher: bool = False) -> ProblemInput:
    """Port of Demo School 1 (Greenwood High) from frontend/src/data/demoSchools.ts."""
    rules = Rules(
        working_days=("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
        primary_periods=4,
        senior_periods=6,
        max_teacher_periods_per_day=5,
        activity_day="Wednesday",
        activity_periods=(1, 2),
    )

    classes = [
        ClassSection(id="c-4a", name="4A", tier="primary", home_room="Room 101"),
        ClassSection(id="c-5b", name="5B", tier="primary", home_room="Room 102"),
        ClassSection(id="c-9a", name="9A", tier="senior", home_room="Room 201"),
        ClassSection(id="c-10a", name="10A", tier="senior", home_room="Room 202"),
    ]

    subjects = [
        Subject(id="sub-math", name="Mathematics", is_activity=False),
        Subject(id="sub-eng", name="English Lit", is_activity=False),
        Subject(id="sub-sci", name="General Science", is_activity=False),
        Subject(id="sub-sst", name="Social Studies", is_activity=False),
        Subject(id="sub-cs", name="Computer Sci", is_activity=False),
        Subject(id="sub-hin", name="Second Language", is_activity=False),
        Subject(id="sub-mus", name="Dance & Music", is_activity=True, room="Music Studio"),
        Subject(id="sub-art", name="Art & Craft", is_activity=True, room="Art Atelier"),
        Subject(id="sub-gam", name="Sports & Games", is_activity=True, room="Sports Arena"),
    ]

    teachers = [
        Teacher(id="t-1", name="Dr. Aris Thorne", subject_ids=frozenset(["sub-math"])),
        Teacher(id="t-2", name="Ms. Priya Nair", subject_ids=frozenset(["sub-math", "sub-cs"])),
        Teacher(id="t-3", name="Mr. David Miller", subject_ids=frozenset(["sub-eng"])),
        Teacher(id="t-4", name="Mrs. Kavita Rao", subject_ids=frozenset(["sub-eng", "sub-hin"])),
        Teacher(id="t-5", name="Dr. Neha Verma", subject_ids=frozenset(["sub-sci"])),
        Teacher(id="t-6", name="Mr. Rohan Joshi", subject_ids=frozenset(["sub-sci", "sub-cs"])),
        Teacher(id="t-7", name="Ms. Sarah Jenkins", subject_ids=frozenset(["sub-sst"])),
        Teacher(id="t-8", name="Mr. Vikram Singh", subject_ids=frozenset(["sub-sst", "sub-hin"])),
        # Specialists
        Teacher(id="t-9", name="Maestro Carlos (Music)", subject_ids=frozenset(["sub-mus"])),
        Teacher(id="t-10", name="Ms. Elena Rostova (Art)", subject_ids=frozenset(["sub-art", "sub-mus"])),
        Teacher(id="t-11", name="Coach Marcus Vance (Sports)", subject_ids=frozenset(["sub-gam", "sub-art"])),
    ]

    if extra_activity_teacher:
        teachers.append(
            Teacher(id="t-12", name="Mr. Leo Drama (Drama/Dance)", subject_ids=frozenset(["sub-mus", "sub-art", "sub-gam"]))
        )

    # Weekly frequencies:
    # Primary (4A, 5B): 4 periods * 5 days = 20 total periods/week
    # math: 5, eng: 5, sci: 4, sst: 4, mus: 1, art: 1 = 20 periods
    # Senior (9A, 10A): 6 periods * 5 days = 30 total periods/week
    # math: 6, eng: 5, sci: 6, sst: 5, cs: 3, hin: 3, mus: 1, gam: 1 = 30 periods
    weekly_frequency: dict[tuple[str, str], int] = {}
    for cid in ("c-4a", "c-5b"):
        weekly_frequency[(cid, "sub-math")] = 5
        weekly_frequency[(cid, "sub-eng")] = 5
        weekly_frequency[(cid, "sub-sci")] = 4
        weekly_frequency[(cid, "sub-sst")] = 4
        weekly_frequency[(cid, "sub-mus")] = 1
        weekly_frequency[(cid, "sub-art")] = 1

    for cid in ("c-9a", "c-10a"):
        weekly_frequency[(cid, "sub-math")] = 6
        weekly_frequency[(cid, "sub-eng")] = 5
        weekly_frequency[(cid, "sub-sci")] = 6
        weekly_frequency[(cid, "sub-sst")] = 5
        weekly_frequency[(cid, "sub-cs")] = 3
        weekly_frequency[(cid, "sub-hin")] = 3
        weekly_frequency[(cid, "sub-mus")] = 1
        weekly_frequency[(cid, "sub-gam")] = 1

    return ProblemInput(
        rules=rules,
        classes=classes,
        subjects=subjects,
        teachers=teachers,
        weekly_frequency=weekly_frequency,
    )


def create_demo_school_2_problem() -> ProblemInput:
    """Port of Demo School 2 (St. Xavier's) from frontend/src/data/demoSchools.ts."""
    rules = Rules(
        working_days=("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
        primary_periods=4,
        senior_periods=6,
        max_teacher_periods_per_day=5,
        activity_day="Friday",
        activity_periods=(1, 2),
    )

    classes = [
        ClassSection(id="x-3a", name="3A", tier="primary", home_room="Block A-1"),
        ClassSection(id="x-11a", name="11A", tier="senior", home_room="Block C-4"),
    ]

    subjects = [
        Subject(id="x-math", name="Mathematics", is_activity=False),
        Subject(id="x-eng", name="English Core", is_activity=False),
        Subject(id="x-sci", name="Physics & Chem", is_activity=False),
        Subject(id="x-hum", name="Humanities", is_activity=False),
        Subject(id="x-act1", name="Music & Choir", is_activity=True, room="Auditorium"),
        Subject(id="x-act2", name="Athletics", is_activity=True, room="Main Field"),
    ]

    teachers = [
        Teacher(id="xt-1", name="Prof. Alan Grant", subject_ids=frozenset(["x-math"])),
        Teacher(id="xt-2", name="Ms. Ellie Sattler", subject_ids=frozenset(["x-sci"])),
        Teacher(id="xt-3", name="Dr. Ian Malcolm", subject_ids=frozenset(["x-eng", "x-hum"])),
        Teacher(id="xt-4", name="Coach John Hammond", subject_ids=frozenset(["x-act1", "x-act2"])),
        Teacher(id="xt-5", name="Ms. Claire Dearing", subject_ids=frozenset(["x-act1", "x-act2", "x-eng"])),
    ]

    # Primary (3A): 20 periods
    # math: 6, eng: 6, sci: 6, act1: 1, act2: 1 = 20
    # Senior (11A): 30 periods
    # math: 8, eng: 6, sci: 8, hum: 6, act1: 1, act2: 1 = 30
    weekly_frequency = {
        ("x-3a", "x-math"): 6,
        ("x-3a", "x-eng"): 6,
        ("x-3a", "x-sci"): 6,
        ("x-3a", "x-act1"): 1,
        ("x-3a", "x-act2"): 1,
        ("x-11a", "x-math"): 8,
        ("x-11a", "x-eng"): 6,
        ("x-11a", "x-sci"): 8,
        ("x-11a", "x-hum"): 6,
        ("x-11a", "x-act1"): 1,
        ("x-11a", "x-act2"): 1,
    }

    return ProblemInput(
        rules=rules,
        classes=classes,
        subjects=subjects,
        teachers=teachers,
        weekly_frequency=weekly_frequency,
    )


def test_demo_school_1_specialist_shortage():
    """Demo School 1 has 4 classes but only 3 activity specialists for Wednesday P1-P2.

    The solver MUST detect this shortage and return a clear diagnostic rather than silently failing.
    """
    problem = create_demo_school_1_problem(extra_activity_teacher=False)
    result = solve(problem)

    assert not result.feasible
    assert len(result.entries) == 0
    assert len(result.diagnostics) > 0
    assert any("Activity Block Specialist Shortage" in d.title for d in result.diagnostics)


def test_demo_school_1_feasible_with_sufficient_staff():
    """When Demo School 1 has 4 activity specialists, it solves quickly and is feasible."""
    problem = create_demo_school_1_problem(extra_activity_teacher=True)
    t0 = time.perf_counter()
    result = solve(problem, time_limit_s=10.0)
    elapsed = time.perf_counter() - t0

    assert result.feasible, f"Expected feasible, got diagnostics: {result.diagnostics}"
    assert elapsed < 5.0, f"Solved in {elapsed:.2f}s (expected < 5s)"
    assert len(result.entries) == (20 * 2 + 30 * 2)  # 100 periods


def test_demo_school_2_feasible():
    """Demo School 2 has 2 classes and 2 specialists, solves in under a second."""
    problem = create_demo_school_2_problem()
    t0 = time.perf_counter()
    result = solve(problem, time_limit_s=10.0)
    elapsed = time.perf_counter() - t0

    assert result.feasible, f"Expected feasible, got diagnostics: {result.diagnostics}"
    assert elapsed < 3.0
    assert len(result.entries) == (20 + 30)  # 50 periods


def test_hard_constraints_rigorously():
    """Validate hard constraints H1–H7 on the solved timetable."""
    problem = create_demo_school_1_problem(extra_activity_teacher=True)
    result = solve(problem)
    assert result.feasible

    entries = result.entries

    # H1: No class has two subjects in the same (day, period)
    class_slots = set()
    for e in entries:
        slot = (e.class_id, e.day, e.period)
        assert slot not in class_slots, f"Class clash: {slot}"
        class_slots.add(slot)

    # H2: No teacher teaches two classes in the same (day, period)
    teacher_slots = set()
    for e in entries:
        slot = (e.teacher_id, e.day, e.period)
        assert slot not in teacher_slots, f"Teacher double-booking: {slot}"
        teacher_slots.add(slot)

    # H3: Exact weekly frequency for each (class, subject)
    actual_freq: dict[tuple[str, str], int] = {}
    for e in entries:
        key = (e.class_id, e.subject_id)
        actual_freq[key] = actual_freq.get(key, 0) + 1

    for (cid, sid), expected in problem.weekly_frequency.items():
        if expected > 0:
            assert actual_freq.get((cid, sid), 0) == expected, f"Frequency mismatch for {(cid, sid)}"

    # H4: Primary classes only use periods 1..4, Senior use 1..6
    for e in entries:
        if e.class_id in ("c-4a", "c-5b"):
            assert 1 <= e.period <= problem.rules.primary_periods, f"Primary class out of bounds: P{e.period}"
        else:
            assert 1 <= e.period <= problem.rules.senior_periods, f"Senior class out of bounds: P{e.period}"

    # H6: Activity block locked (Wednesday P1 & P2 have activity subjects)
    activity_subject_ids = {s.id for s in problem.subjects if s.is_activity}
    for e in entries:
        if e.day == problem.rules.activity_day and e.period in problem.rules.activity_periods:
            assert e.subject_id in activity_subject_ids, f"Non-activity subject {e.subject_id} in activity block"
        else:
            assert e.subject_id not in activity_subject_ids, f"Activity subject {e.subject_id} outside activity block"

    # H7: Teacher daily cap <= 5
    teacher_daily_counts: dict[tuple[str, str], int] = {}
    for e in entries:
        key = (e.teacher_id, e.day)
        teacher_daily_counts[key] = teacher_daily_counts.get(key, 0) + 1

    for (tid, day), count in teacher_daily_counts.items():
        assert count <= 5, f"Teacher {tid} exceeded 5 periods on {day}: {count}"


def test_teacher_unavailable_days_respected():
    """A teacher with unavailable days must never be scheduled on those days."""
    problem = create_demo_school_1_problem(extra_activity_teacher=True)
    # Make Dr. Aris Thorne (t-1) unavailable on Monday
    updated_teachers = [
        Teacher(
            id=t.id,
            name=t.name,
            subject_ids=t.subject_ids,
            max_periods_per_day=t.max_periods_per_day,
            unavailable_days=frozenset(["Monday"]) if t.id == "t-1" else t.unavailable_days,
        )
        for t in problem.teachers
    ]
    problem.teachers = updated_teachers

    result = solve(problem)
    assert result.feasible
    monday_t1_entries = [e for e in result.entries if e.teacher_id == "t-1" and e.day == "Monday"]
    assert len(monday_t1_entries) == 0, "Teacher t-1 was scheduled on unavailable day (Monday)"


def test_understaffed_subject_diagnostic():
    """If a required subject has no qualified teachers, solver immediately reports error."""
    problem = create_demo_school_1_problem(extra_activity_teacher=True)
    # Remove subject from all teachers
    updated_teachers = [
        Teacher(
            id=t.id,
            name=t.name,
            subject_ids=t.subject_ids - {"sub-cs"},
            max_periods_per_day=t.max_periods_per_day,
        )
        for t in problem.teachers
    ]
    problem.teachers = updated_teachers

    result = solve(problem)
    assert not result.feasible
    assert any("Unstaffed Subject" in d.title for d in result.diagnostics)


def test_over_scheduled_class_diagnostic():
    """If a class requires more periods than available in its tier, diagnostic is returned."""
    problem = create_demo_school_1_problem(extra_activity_teacher=True)
    # Primary 4A has 20 slots. Require 25 periods.
    problem.weekly_frequency[("c-4a", "sub-math")] = 10  # pushes total to 25

    result = solve(problem)
    assert not result.feasible
    assert any("Over-scheduled Class" in d.title for d in result.diagnostics)


def test_substitute_ranking_tie_breaker():
    """Test substitute ranking with the new Step 0 tie-breaker rule."""
    teachers = [
        Teacher(id="t-1", name="Alice", subject_ids=frozenset(["sub-math"]), max_periods_per_day=5),
        Teacher(id="t-2", name="Bob", subject_ids=frozenset(["sub-eng"]), max_periods_per_day=5),
        Teacher(id="t-3", name="Charlie", subject_ids=frozenset(["sub-math"]), max_periods_per_day=5),
        Teacher(id="t-4", name="David (Busy)", subject_ids=frozenset(["sub-math"]), max_periods_per_day=5),
    ]

    entries = [
        # David is busy Monday P2
        Entry(class_id="c-1", day="Monday", period=2, subject_id="sub-math", teacher_id="t-4"),
        # Alice already taught 2 periods today
        Entry(class_id="c-1", day="Monday", period=1, subject_id="sub-math", teacher_id="t-1"),
        Entry(class_id="c-1", day="Monday", period=3, subject_id="sub-math", teacher_id="t-1"),
        # Charlie taught 1 period today and 1 on Tuesday (total weekly 2)
        Entry(class_id="c-2", day="Monday", period=4, subject_id="sub-math", teacher_id="t-3"),
        Entry(class_id="c-2", day="Tuesday", period=1, subject_id="sub-math", teacher_id="t-3"),
        # Bob taught 1 period today and 4 on other days (total weekly 5)
        Entry(class_id="c-3", day="Monday", period=4, subject_id="sub-eng", teacher_id="t-2"),
        Entry(class_id="c-3", day="Tuesday", period=1, subject_id="sub-eng", teacher_id="t-2"),
        Entry(class_id="c-3", day="Wednesday", period=1, subject_id="sub-eng", teacher_id="t-2"),
        Entry(class_id="c-3", day="Thursday", period=1, subject_id="sub-eng", teacher_id="t-2"),
        Entry(class_id="c-3", day="Friday", period=1, subject_id="sub-eng", teacher_id="t-2"),
    ]

    # Period 2 on Monday for absent teacher "t-absent", slot subject is "sub-math":
    # Candidates free at P2:
    # Alice: taught 2 periods today -> free_today = 6 - 2 = 4
    # Bob: taught 1 period today -> free_today = 6 - 1 = 5. Not qualified for math. Weekly load: 5.
    # Charlie: taught 1 period today -> free_today = 6 - 1 = 5. Qualified for math! Weekly load: 2.
    # David: busy at P2 -> excluded.
    ranked = rank_substitutes(
        teachers=teachers,
        entries=entries,
        day="Monday",
        period=2,
        absent_teacher_id="t-absent",
        subject_id="sub-math",
        day_periods=6,
    )

    candidate_ids = [t.id for t, _ in ranked]
    assert "t-4" not in candidate_ids, "Busy teacher should be excluded"
    # Charlie has 5 free periods and is qualified for math -> should be #1!
    assert candidate_ids[0] == "t-3"
    # Bob has 5 free periods (not qualified) -> should be #2
    assert candidate_ids[1] == "t-2"
    # Alice has 4 free periods -> should be #3
    assert candidate_ids[2] == "t-1"


def test_large_synthetic_scale():
    """Test solver scalability with 40 classes and 80 teachers."""
    rules = Rules(
        working_days=("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
        primary_periods=4,
        senior_periods=6,
        max_teacher_periods_per_day=5,
        activity_day="Wednesday",
        activity_periods=(1, 2),
    )

    num_classes = 40
    classes = [
        ClassSection(
            id=f"c-{i}",
            name=f"Class-{i}",
            tier="primary" if i < 20 else "senior",
            home_room=f"Room-{i}",
        )
        for i in range(num_classes)
    ]

    subjects: list[Subject] = []
    teachers: list[Teacher] = []
    weekly_frequency: dict[tuple[str, str], int] = {}

    # Realistic school staffing: 20 section pairs across grades.
    # Academic teachers teach their subject to assigned sections within their department.
    for g in range(20):
        tier = "primary" if g < 10 else "senior"
        sm, se, ss = f"m_{g}", f"e_{g}", f"s_{g}"
        subjects.extend([
            Subject(id=sm, name=f"Math G{g}"),
            Subject(id=se, name=f"English G{g}"),
            Subject(id=ss, name=f"Science G{g}"),
        ])
        c1, c2 = f"c-{2*g}", f"c-{2*g+1}"
        if tier == "primary":
            weekly_frequency[(c1, sm)] = 6
            weekly_frequency[(c2, sm)] = 6
            weekly_frequency[(c1, se)] = 6
            weekly_frequency[(c2, se)] = 6
            weekly_frequency[(c1, ss)] = 6
            weekly_frequency[(c2, ss)] = 6
        else:
            weekly_frequency[(c1, sm)] = 10
            weekly_frequency[(c2, sm)] = 10
            weekly_frequency[(c1, se)] = 9
            weekly_frequency[(c2, se)] = 9
            weekly_frequency[(c1, ss)] = 9
            weekly_frequency[(c2, ss)] = 9

        teachers.append(Teacher(id=f"tm_{g}", name=f"Math Teacher G{g}", subject_ids=frozenset([sm])))
        teachers.append(Teacher(id=f"te_{g}", name=f"Eng Teacher G{g}", subject_ids=frozenset([se])))
        teachers.append(Teacher(id=f"ts_{g}", name=f"Sci Teacher G{g}", subject_ids=frozenset([ss])))

    # 40 activity specialists for Wednesday P1-P2
    subjects.append(Subject(id="s-act", name="Activity", is_activity=True))
    for i in range(num_classes):
        weekly_frequency[(f"c-{i}", "s-act")] = 2
        teachers.append(Teacher(id=f"tact_{i}", name=f"Act Specialist {i}", subject_ids=frozenset(["s-act"])))

    # Total: 60 academic teachers + 40 activity specialists = 100 teachers
    problem = ProblemInput(
        rules=rules,
        classes=classes,
        subjects=subjects,
        teachers=teachers,
        weekly_frequency=weekly_frequency,
    )

    t0 = time.perf_counter()
    result = solve(problem, time_limit_s=15.0)
    elapsed = time.perf_counter() - t0

    assert result.feasible, f"Large scale failed: {result.diagnostics}"
    assert elapsed < 15.0, f"Took {elapsed:.2f}s, expected < 15s"
    expected_total_entries = 20 * 20 + 20 * 30  # 1000 entries
    assert len(result.entries) == expected_total_entries

