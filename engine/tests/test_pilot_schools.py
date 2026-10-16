"""Phase 5 Tests: Real Pilot Schools Validation (Greenwood High & St. Xavier's International)."""
from chronos_engine.models import (
    ClassSection,
    ProblemInput,
    Rules,
    Subject,
    Teacher,
)
from chronos_engine.solver import solve


def test_pilot_school_1_greenwood_high_feasible():
    """Verify Greenwood High solves feasibly with 4 activity specialists and balanced periods."""
    rules = Rules(
        working_days=("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
        primary_periods=4,
        senior_periods=6,
        max_teacher_periods_per_day=5,
        activity_day="Wednesday",
        activity_periods=(1, 2),
    )

    classes = [
        ClassSection(id="c-4a", name="4A", tier="primary"),
        ClassSection(id="c-5b", name="5B", tier="primary"),
        ClassSection(id="c-9a", name="9A", tier="senior"),
        ClassSection(id="c-10a", name="10A", tier="senior"),
    ]

    subjects = [
        Subject(id="sub-math", name="Mathematics", is_activity=False),
        Subject(id="sub-eng", name="English Lit", is_activity=False),
        Subject(id="sub-sci", name="General Science", is_activity=False),
        Subject(id="sub-sst", name="Social Studies", is_activity=False),
        Subject(id="sub-cs", name="Computer Sci", is_activity=False),
        Subject(id="sub-hin", name="Second Language", is_activity=False),
        Subject(id="sub-mus", name="Dance & Music", is_activity=True),
        Subject(id="sub-art", name="Art & Craft", is_activity=True),
        Subject(id="sub-gam", name="Sports & Games", is_activity=True),
    ]

    # Requirements: Primary = 20 periods, Senior = 30 periods
    weekly_frequency = {
        # 4A (Primary 20)
        ("c-4a", "sub-math"): 5,
        ("c-4a", "sub-eng"): 5,
        ("c-4a", "sub-sci"): 4,
        ("c-4a", "sub-sst"): 4,
        ("c-4a", "sub-mus"): 1,
        ("c-4a", "sub-art"): 1,
        # 5B (Primary 20)
        ("c-5b", "sub-math"): 5,
        ("c-5b", "sub-eng"): 5,
        ("c-5b", "sub-sci"): 4,
        ("c-5b", "sub-sst"): 4,
        ("c-5b", "sub-mus"): 1,
        ("c-5b", "sub-art"): 1,
        # 9A (Senior 30)
        ("c-9a", "sub-math"): 6,
        ("c-9a", "sub-eng"): 5,
        ("c-9a", "sub-sci"): 6,
        ("c-9a", "sub-sst"): 5,
        ("c-9a", "sub-cs"): 3,
        ("c-9a", "sub-hin"): 3,
        ("c-9a", "sub-mus"): 1,
        ("c-9a", "sub-gam"): 1,
        # 10A (Senior 30)
        ("c-10a", "sub-math"): 6,
        ("c-10a", "sub-eng"): 5,
        ("c-10a", "sub-sci"): 6,
        ("c-10a", "sub-sst"): 5,
        ("c-10a", "sub-cs"): 3,
        ("c-10a", "sub-hin"): 3,
        ("c-10a", "sub-mus"): 1,
        ("c-10a", "sub-gam"): 1,
    }

    teachers = [
        Teacher(id="t-1", name="Dr. Thorne", subject_ids=frozenset(["sub-math"])),
        Teacher(id="t-2", name="Ms. Nair", subject_ids=frozenset(["sub-math", "sub-cs"])),
        Teacher(id="t-3", name="Mr. Miller", subject_ids=frozenset(["sub-eng"])),
        Teacher(id="t-4", name="Mrs. Rao", subject_ids=frozenset(["sub-eng", "sub-hin"])),
        Teacher(id="t-5", name="Dr. Verma", subject_ids=frozenset(["sub-sci"])),
        Teacher(id="t-6", name="Mr. Joshi", subject_ids=frozenset(["sub-sci", "sub-cs"])),
        Teacher(id="t-7", name="Ms. Jenkins", subject_ids=frozenset(["sub-sst"])),
        Teacher(id="t-8", name="Mr. Singh", subject_ids=frozenset(["sub-sst", "sub-hin"])),
        # 4 specialists for 4 classes in Wednesday Activity Block
        Teacher(id="t-9", name="Maestro Carlos", subject_ids=frozenset(["sub-mus"])),
        Teacher(id="t-10", name="Ms. Rostova", subject_ids=frozenset(["sub-art", "sub-mus"])),
        Teacher(id="t-11", name="Coach Vance", subject_ids=frozenset(["sub-gam", "sub-art"])),
        Teacher(id="t-12", name="Coach Taylor", subject_ids=frozenset(["sub-gam", "sub-art", "sub-mus"])),
    ]

    problem = ProblemInput(
        rules=rules,
        classes=classes,
        subjects=subjects,
        teachers=teachers,
        weekly_frequency=weekly_frequency,
    )

    output = solve(problem, time_limit_s=10.0)
    assert output.feasible is True, f"Greenwood High diagnostics: {output.diagnostics}"
    assert len(output.entries) == (20 + 20 + 30 + 30)  # 100 entries


def test_pilot_school_2_st_xaviers_feasible():
    """Verify St. Xavier's International solves feasibly with Friday activity block."""
    rules = Rules(
        working_days=("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"),
        primary_periods=4,
        senior_periods=6,
        max_teacher_periods_per_day=5,
        activity_day="Friday",
        activity_periods=(1, 2),
    )

    classes = [
        ClassSection(id="x-3a", name="3A", tier="primary"),
        ClassSection(id="x-11a", name="11A", tier="senior"),
    ]

    subjects = [
        Subject(id="x-math", name="Mathematics", is_activity=False),
        Subject(id="x-eng", name="English Core", is_activity=False),
        Subject(id="x-sci", name="Physics & Chem", is_activity=False),
        Subject(id="x-hum", name="Humanities", is_activity=False),
        Subject(id="x-act1", name="Music & Choir", is_activity=True),
        Subject(id="x-act2", name="Athletics", is_activity=True),
    ]

    weekly_frequency = {
        # 3A (20 slots)
        ("x-3a", "x-math"): 6,
        ("x-3a", "x-eng"): 6,
        ("x-3a", "x-sci"): 6,
        ("x-3a", "x-act1"): 1,
        ("x-3a", "x-act2"): 1,
        # 11A (30 slots)
        ("x-11a", "x-math"): 8,
        ("x-11a", "x-eng"): 6,
        ("x-11a", "x-sci"): 8,
        ("x-11a", "x-hum"): 6,
        ("x-11a", "x-act1"): 1,
        ("x-11a", "x-act2"): 1,
    }

    teachers = [
        Teacher(id="xt-1", name="Prof. Grant", subject_ids=frozenset(["x-math"])),
        Teacher(id="xt-2", name="Ms. Sattler", subject_ids=frozenset(["x-sci"])),
        Teacher(id="xt-3", name="Dr. Malcolm", subject_ids=frozenset(["x-eng", "x-hum"])),
        Teacher(id="xt-4", name="Coach Hammond", subject_ids=frozenset(["x-act1", "x-act2"])),
        Teacher(id="xt-5", name="Ms. Dearing", subject_ids=frozenset(["x-act1", "x-act2", "x-eng"])),
    ]

    problem = ProblemInput(
        rules=rules,
        classes=classes,
        subjects=subjects,
        teachers=teachers,
        weekly_frequency=weekly_frequency,
    )

    output = solve(problem, time_limit_s=10.0)
    assert output.feasible is True, f"St. Xavier diagnostics: {output.diagnostics}"
    assert len(output.entries) == (20 + 30)  # 50 entries
