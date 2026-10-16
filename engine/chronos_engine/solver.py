"""ENGINE LAYER — constraint solver entrypoint (Google OR-Tools CP-SAT).

Encodes hard constraints H1–H7 and soft constraints S1–S2 per blueprint section 5.
Returns SolveResult with generated Entry list and Diagnostic entries.
Pure Python: no DB, no HTTP imports.
"""
from __future__ import annotations

from collections import defaultdict
from ortools.sat.python import cp_model

from .models import Diagnostic, Entry, ProblemInput, SolveResult


def run_pre_checks(problem: ProblemInput) -> list[Diagnostic]:
    """Domain pre-checks to detect mathematical infeasibility early with clear diagnostics."""
    diagnostics: list[Diagnostic] = []
    rules = problem.rules
    classes = problem.classes
    subjects = problem.subjects
    teachers = problem.teachers
    weekly_frequency = problem.weekly_frequency

    # 1. Total weekly capacity per class (H4 / H5)
    for c in classes:
        max_p = rules.primary_periods if c.tier == "primary" else rules.senior_periods
        available_slots = len(rules.working_days) * max_p
        required_slots = sum(weekly_frequency.get((c.id, s.id), 0) for s in subjects)
        if required_slots > available_slots:
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title=f"Over-scheduled Class: {c.name} ({c.tier.capitalize()})",
                    detail=(
                        f"{c.name} requires {required_slots} weekly periods across subjects, "
                        f"but {c.tier} tier only has {available_slots} periods/week "
                        f"({len(rules.working_days)} days × {max_p} periods/day)."
                    ),
                )
            )

    # 2. Subject qualification (no qualified teachers at all)
    for s in subjects:
        total_req = sum(weekly_frequency.get((c.id, s.id), 0) for c in classes)
        if total_req > 0:
            qualified = [t for t in teachers if s.id in t.subject_ids]
            if not qualified:
                diagnostics.append(
                    Diagnostic(
                        severity="error",
                        title=f"Unstaffed Subject: {s.name}",
                        detail=f"Subject {s.name} requires {total_req} periods/week across classes, but no teacher is qualified to teach it.",
                    )
                )

    # 3. Overall subject capacity vs qualified teacher availability
    for s in subjects:
        total_req = sum(weekly_frequency.get((c.id, s.id), 0) for c in classes)
        if total_req > 0:
            qualified = [t for t in teachers if s.id in t.subject_ids]
            max_possible_periods = 0
            for t in qualified:
                avail_days = [d for d in rules.working_days if d not in t.unavailable_days]
                daily_limit = min(t.max_periods_per_day, rules.max_teacher_periods_per_day)
                max_possible_periods += len(avail_days) * daily_limit
            if total_req > max_possible_periods:
                diagnostics.append(
                    Diagnostic(
                        severity="error",
                        title=f"Teacher Shortage: {s.name}",
                        detail=(
                            f"Subject {s.name} requires {total_req} periods/week across classes, "
                            f"but all {len(qualified)} qualified teachers combined can teach at most "
                            f"{max_possible_periods} periods/week."
                        ),
                    )
                )

    # 4. Activity block shortage (H6)
    # Check if number of classes needing activity during activity periods exceeds available activity teachers
    activity_subject_ids = {s.id for s in subjects if s.is_activity}
    classes_with_activity = [
        c for c in classes
        if sum(weekly_frequency.get((c.id, sid), 0) for sid in activity_subject_ids) > 0
    ]
    if classes_with_activity and rules.activity_day in rules.working_days:
        act_teachers_on_day = [
            t for t in teachers
            if (t.subject_ids & activity_subject_ids) and rules.activity_day not in t.unavailable_days
        ]
        if len(classes_with_activity) > len(act_teachers_on_day):
            teacher_names = ", ".join(t.name for t in act_teachers_on_day) or "None"
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title="Activity Block Specialist Shortage",
                    detail=(
                        f"{len(classes_with_activity)} classes require simultaneous activity during "
                        f"{rules.activity_day} activity block periods, but only {len(act_teachers_on_day)} "
                        f"specialist activity teachers are available ({teacher_names})."
                    ),
                )
            )

    return diagnostics


def solve(problem: ProblemInput, *, time_limit_s: float = 30.0) -> SolveResult:
    """Solve the timetable scheduling problem using Google OR-Tools CP-SAT."""
    # 1. Run domain pre-checks
    pre_diagnostics = run_pre_checks(problem)
    has_errors = any(d.severity == "error" for d in pre_diagnostics)
    if has_errors:
        return SolveResult(entries=[], diagnostics=pre_diagnostics, feasible=False)

    rules = problem.rules
    classes = problem.classes
    subjects = problem.subjects
    teachers = problem.teachers
    weekly_frequency = problem.weekly_frequency

    s_map = {s.id: s for s in subjects}
    c_map = {c.id: c for c in classes}
    activity_subject_ids = {s.id for s in subjects if s.is_activity}

    class_max_p = {
        c.id: rules.primary_periods if c.tier == "primary" else rules.senior_periods
        for c in classes
    }

    # Initialize CP-SAT model
    model = cp_model.CpModel()

    # Indexed storage for O(1) constraint construction
    # x: (c_id, s_id, t_id, day, period) -> BoolVar
    x: dict[tuple[str, str, str, str, int], cp_model.IntVar] = {}
    vars_by_class_slot: dict[tuple[str, str, int], list[cp_model.IntVar]] = defaultdict(list)
    vars_by_teacher_slot: dict[tuple[str, str, int], list[cp_model.IntVar]] = defaultdict(list)
    vars_by_class_subject: dict[tuple[str, str], list[cp_model.IntVar]] = defaultdict(list)
    vars_by_teacher_day: dict[tuple[str, str], list[cp_model.IntVar]] = defaultdict(list)
    vars_by_class_subject_day: dict[tuple[str, str, str], list[cp_model.IntVar]] = defaultdict(list)
    vars_activity_block_slot: dict[tuple[str, int], list[cp_model.IntVar]] = defaultdict(list)

    # Pre-filter qualified teachers per subject
    teachers_by_subject: dict[str, list] = defaultdict(list)
    for t in teachers:
        for sid in t.subject_ids:
            teachers_by_subject[sid].append(t)

    # 2. Decision variable generation
    for c in classes:
        max_p = class_max_p[c.id]
        class_act_needed = sum(weekly_frequency.get((c.id, sid), 0) for sid in activity_subject_ids)

        for s in subjects:
            freq = weekly_frequency.get((c.id, s.id), 0)
            if freq <= 0:
                continue

            qualified_teachers = teachers_by_subject[s.id]
            for t in qualified_teachers:
                for d in rules.working_days:
                    if d in t.unavailable_days:
                        continue

                    for p in range(1, max_p + 1):
                        is_act_slot = (d == rules.activity_day and p in rules.activity_periods)

                        # H6: Activity subject restrictions
                        if s.is_activity:
                            if not is_act_slot:
                                continue
                        else:
                            # Academic subjects cannot occupy activity slots if class requires activity
                            if is_act_slot and class_act_needed > 0:
                                continue

                        var = model.NewBoolVar(f"x_{c.id}_{s.id}_{t.id}_{d}_{p}")
                        key = (c.id, s.id, t.id, d, p)
                        x[key] = var

                        vars_by_class_slot[(c.id, d, p)].append(var)
                        vars_by_teacher_slot[(t.id, d, p)].append(var)
                        vars_by_class_subject[(c.id, s.id)].append(var)
                        vars_by_teacher_day[(t.id, d)].append(var)
                        vars_by_class_subject_day[(c.id, s.id, d)].append(var)

                        if is_act_slot and s.is_activity:
                            vars_activity_block_slot[(c.id, p)].append(var)

    # Hard Constraint H1: At most one subject per class per (day, period)
    for c in classes:
        max_p = class_max_p[c.id]
        for d in rules.working_days:
            for p in range(1, max_p + 1):
                slot_vars = vars_by_class_slot.get((c.id, d, p), [])
                if slot_vars:
                    model.Add(sum(slot_vars) <= 1)

    # Hard Constraint H2: A teacher teaches at most one class per (day, period)
    for t in teachers:
        for d in rules.working_days:
            for p in range(1, rules.senior_periods + 1):
                t_slot_vars = vars_by_teacher_slot.get((t.id, d, p), [])
                if t_slot_vars:
                    model.Add(sum(t_slot_vars) <= 1)

    # Hard Constraint H3: Exact weekly frequency for each (class, subject)
    for c in classes:
        for s in subjects:
            freq = weekly_frequency.get((c.id, s.id), 0)
            if freq > 0:
                cs_vars = vars_by_class_subject.get((c.id, s.id), [])
                model.Add(sum(cs_vars) == freq)

    # Hard Constraint H6: Activity block locked
    for c in classes:
        class_act_needed = sum(weekly_frequency.get((c.id, sid), 0) for sid in activity_subject_ids)
        if class_act_needed >= len(rules.activity_periods) and rules.activity_day in rules.working_days:
            for p in rules.activity_periods:
                act_vars = vars_activity_block_slot.get((c.id, p), [])
                if act_vars:
                    model.Add(sum(act_vars) == 1)

    # Hard Constraint H7: Teacher daily cap <= min(teacher.max, rules.max) (<= 5)
    for t in teachers:
        max_day_cap = min(t.max_periods_per_day, rules.max_teacher_periods_per_day)
        for d in rules.working_days:
            t_day_vars = vars_by_teacher_day.get((t.id, d), [])
            if t_day_vars:
                model.Add(sum(t_day_vars) <= max_day_cap)

    # Soft Constraints (Objective)
    penalties: list[cp_model.LinearExpr] = []
    num_days = max(1, len(rules.working_days))

    # S1: Spread each academic subject across days (penalize multiple periods on same day)
    for c in classes:
        for s in subjects:
            if s.is_activity:
                continue
            freq = weekly_frequency.get((c.id, s.id), 0)
            if freq <= 0:
                continue
            target_max_per_day = (freq + num_days - 1) // num_days
            for d in rules.working_days:
                csd_vars = vars_by_class_subject_day.get((c.id, s.id, d), [])
                if len(csd_vars) > target_max_per_day:
                    excess = model.NewIntVar(0, len(csd_vars), f"excess_{c.id}_{s.id}_{d}")
                    model.Add(excess >= sum(csd_vars) - target_max_per_day)
                    penalties.append(excess * 10)

    # S2: Teacher workload smoothness (prefer <= 4 periods/day over hitting cap of 5)
    for t in teachers:
        for d in rules.working_days:
            t_day_vars = vars_by_teacher_day.get((t.id, d), [])
            if len(t_day_vars) > 4:
                overload = model.NewIntVar(0, len(t_day_vars), f"overload_{t.id}_{d}")
                model.Add(overload >= sum(t_day_vars) - 4)
                penalties.append(overload * 2)

    if penalties:
        model.Minimize(sum(penalties))

    # Solver invocation
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = max(0.1, float(time_limit_s))
    solver.parameters.num_workers = 4

    status = solver.Solve(model)

    if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
        entries: list[Entry] = []
        for (cid, sid, tid, d, p), var in x.items():
            if solver.Value(var) == 1:
                subj = s_map[sid]
                cls_sec = c_map[cid]
                room = subj.room if subj.room else (cls_sec.home_room or None)
                entries.append(
                    Entry(
                        class_id=cid,
                        day=d,
                        period=p,
                        subject_id=sid,
                        teacher_id=tid,
                        room=room,
                    )
                )

        day_index = {d: i for i, d in enumerate(rules.working_days)}
        entries.sort(key=lambda e: (day_index.get(e.day, 99), e.period, c_map[e.class_id].name))
        return SolveResult(entries=entries, diagnostics=[], feasible=True)

    # Fallback diagnostics on INFEASIBLE / MODEL_INVALID
    infeasible_diagnostics = [
        Diagnostic(
            severity="error",
            title="Infeasible Timetable Constraints",
            detail=(
                "The constraint solver could not find a valid conflict-free schedule satisfying "
                "all hard rules (H1–H7) within the time limit. Verify teacher availability, "
                "daily caps, and subject requirements."
            ),
        )
    ]
    return SolveResult(entries=[], diagnostics=infeasible_diagnostics, feasible=False)
