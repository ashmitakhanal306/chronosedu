"""ENGINE LAYER — constraint solver entrypoint (Google OR-Tools CP-SAT).

Encodes hard constraints H1–H7, H_week, H_consec, H_room, Pinned Lessons, Blocked Slots,
and soft constraints S1–S5 per timetable plan blueprint.
Returns SolveResult with generated Entry list, Diagnostic entries, and QualityReport.
Pure Python: no DB, no HTTP imports.
"""
from __future__ import annotations

from collections import defaultdict
from ortools.sat.python import cp_model

from .models import Diagnostic, Entry, PinnedLesson, ProblemInput, QualityReport, SolveResult


def run_pre_checks(problem: ProblemInput) -> list[Diagnostic]:
    """Domain pre-checks to detect mathematical infeasibility early with clear diagnostics."""
    diagnostics: list[Diagnostic] = []
    rules = problem.rules
    classes = problem.classes
    subjects = problem.subjects
    teachers = problem.teachers
    weekly_frequency = problem.weekly_frequency

    s_map = {s.id: s for s in subjects}
    c_map = {c.id: c for c in classes}
    teacher_by_id = {t.id: t for t in teachers}
    assigned_teacher_map = {(a.class_id, a.subject_id): a.teacher_id for a in problem.assignments}

    # 0. Build blocked slots lookup
    blocked_class_slots: set[tuple[str, str, int]] = set()
    for b in problem.blocked_slots:
        if b.day not in rules.working_days:
            continue
        if b.scope == "school":
            for c in classes:
                blocked_class_slots.add((c.id, b.day, b.period))
        elif b.scope == "grade":
            for c in classes:
                if c.grade_id and c.grade_id == b.scope_id:
                    blocked_class_slots.add((c.id, b.day, b.period))
        elif b.scope == "class":
            if b.scope_id:
                blocked_class_slots.add((b.scope_id, b.day, b.period))

    # 1. Teaching assignment pre-checks (Phase 1)
    # Every (class, subject) with required frequency > 0 must have an assigned teacher
    for c in classes:
        for s in subjects:
            freq = weekly_frequency.get((c.id, s.id), 0)
            if freq > 0:
                assigned_tid = assigned_teacher_map.get((c.id, s.id))
                if not assigned_tid:
                    diagnostics.append(
                        Diagnostic(
                            severity="error",
                            title=f"No Teacher Assigned: {c.name} / {s.name}",
                            detail=(
                                f"Class {c.name} needs {freq} periods/week of {s.name} but has no teacher assigned. "
                                f"Go to Step 8 (Teacher Assignments) to fix this."
                            ),
                        )
                    )
                elif assigned_tid not in teacher_by_id:
                    diagnostics.append(
                        Diagnostic(
                            severity="error",
                            title=f"Invalid Teacher Assignment: {c.name} / {s.name}",
                            detail=f"Class {c.name} is assigned to unknown teacher ID '{assigned_tid}'.",
                        )
                    )
                else:
                    t = teacher_by_id[assigned_tid]
                    if s.id not in t.subject_ids:
                        diagnostics.append(
                            Diagnostic(
                                severity="error",
                                title=f"Unstaffed Subject: {s.name}",
                                detail=f"Teacher {t.name} is assigned to teach {s.name} to {c.name}, but is not qualified in {s.name}.",
                            )
                        )

    # 2. Teacher weekly assigned workload check
    teacher_assigned_load: dict[str, int] = defaultdict(int)
    for (cid, sid), tid in assigned_teacher_map.items():
        freq = weekly_frequency.get((cid, sid), 0)
        if freq > 0:
            teacher_assigned_load[tid] += freq

    for tid, load in teacher_assigned_load.items():
        t = teacher_by_id.get(tid)
        if t:
            max_week = getattr(t, "max_periods_per_week", 30)
            if load > max_week:
                diagnostics.append(
                    Diagnostic(
                        severity="error",
                        title=f"Teacher Weekly Overload: {t.name}",
                        detail=(
                            f"Teacher {t.name} is assigned {load} periods/week across classes, "
                            f"which exceeds their maximum weekly limit of {max_week} periods."
                        ),
                    )
                )

    # 3. Total weekly capacity per class considering blocked slots (H4 / H5)
    for c in classes:
        max_p = rules.primary_periods if c.tier == "primary" else rules.senior_periods
        total_slots = len(rules.working_days) * max_p
        blocked_count = sum(1 for (cid, d, p) in blocked_class_slots if cid == c.id and p <= max_p)
        available_slots = total_slots - blocked_count
        required_slots = sum(weekly_frequency.get((c.id, s.id), 0) for s in subjects)
        if required_slots > available_slots:
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title=f"Over-scheduled Class: {c.name} ({c.tier.capitalize()})",
                    detail=(
                        f"{c.name} requires {required_slots} weekly periods across subjects, "
                        f"but only has {available_slots} available non-blocked periods/week "
                        f"({total_slots} total minus {blocked_count} blocked slots)."
                    ),
                )
            )

    # 4. Activity block shortage (H6)
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

    # 5. Pinned lesson consistency and clash checks (Phase 3-B)
    pinned_by_class_slot: dict[tuple[str, str, int], list[PinnedLesson]] = defaultdict(list)
    pinned_by_teacher_slot: dict[tuple[str, str, int], list[PinnedLesson]] = defaultdict(list)
    pinned_by_room_slot: dict[tuple[str, str, int], list[PinnedLesson]] = defaultdict(list)

    for pl in problem.pinned_lessons:
        c = c_map.get(pl.class_id)
        s = s_map.get(pl.subject_id)
        t = teacher_by_id.get(pl.teacher_id)

        if not c or not s or not t:
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title="Invalid Pinned Lesson Reference",
                    detail=f"Pinned lesson references non-existent class, subject, or teacher ID.",
                )
            )
            continue

        max_p = rules.primary_periods if c.tier == "primary" else rules.senior_periods
        if pl.day not in rules.working_days:
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title=f"Pinned Lesson on Non-Working Day: {c.name}",
                    detail=f"Lesson for {c.name} ({s.name}) is pinned to {pl.day}, which is not an active school day.",
                )
            )
        if pl.period < 1 or pl.period > max_p:
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title=f"Pinned Lesson Out of Range: {c.name}",
                    detail=f"Lesson for {c.name} ({s.name}) is pinned to Period {pl.period}, but {c.tier} tier only has {max_p} periods/day.",
                )
            )
        if pl.day in t.unavailable_days:
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title=f"Pinned Lesson on Teacher Unavailable Day: {t.name}",
                    detail=f"Lesson for {c.name} ({s.name}) is pinned to {pl.day}, but teacher {t.name} is marked unavailable on {pl.day}s.",
                )
            )
        if (pl.class_id, pl.day, pl.period) in blocked_class_slots:
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title=f"Pinned Lesson Clashes with Blocked Slot: {c.name}",
                    detail=f"Lesson for {c.name} ({s.name}) is pinned to {pl.day} Period {pl.period}, which is designated as a blocked slot.",
                )
            )

        pinned_by_class_slot[(pl.class_id, pl.day, pl.period)].append(pl)
        pinned_by_teacher_slot[(pl.teacher_id, pl.day, pl.period)].append(pl)

        room = s.room if s.room else (c.home_room or None)
        if room:
            pinned_by_room_slot[(room, pl.day, pl.period)].append(pl)

    for (cid, d, p), pins in pinned_by_class_slot.items():
        if len(pins) > 1:
            c_name = c_map[cid].name if cid in c_map else cid
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title=f"Pinned Lesson Class Clash: {c_name}",
                    detail=f"Class {c_name} has {len(pins)} lessons pinned simultaneously to {d} Period {p}.",
                )
            )

    for (tid, d, p), pins in pinned_by_teacher_slot.items():
        if len(pins) > 1:
            t_name = teacher_by_id[tid].name if tid in teacher_by_id else tid
            diagnostics.append(
                Diagnostic(
                    severity="error",
                    title=f"Pinned Lesson Teacher Clash: {t_name}",
                    detail=f"Teacher {t_name} is pinned to teach {len(pins)} different classes simultaneously on {d} Period {p}.",
                )
            )

    for (rm, d, p), pins in pinned_by_room_slot.items():
        if rm in problem.room_capacities:
            cap = problem.room_capacities[rm]
            if cap > 0 and len(pins) > cap:
                diagnostics.append(
                    Diagnostic(
                        severity="error",
                        title=f"Pinned Lesson Room Overcapacity: {rm}",
                        detail=f"Room '{rm}' has {len(pins)} pinned lessons on {d} Period {p}, exceeding its capacity of {cap}.",
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
    teacher_by_id = {t.id: t for t in teachers}
    assigned_teacher_map = {(a.class_id, a.subject_id): a.teacher_id for a in problem.assignments}
    activity_subject_ids = {s.id for s in subjects if s.is_activity}

    class_max_p = {
        c.id: rules.primary_periods if c.tier == "primary" else rules.senior_periods
        for c in classes
    }

    # Blocked slots lookup
    blocked_class_slots: set[tuple[str, str, int]] = set()
    for b in problem.blocked_slots:
        if b.day not in rules.working_days:
            continue
        if b.scope == "school":
            for c in classes:
                blocked_class_slots.add((c.id, b.day, b.period))
        elif b.scope == "grade":
            for c in classes:
                if c.grade_id and c.grade_id == b.scope_id:
                    blocked_class_slots.add((c.id, b.day, b.period))
        elif b.scope == "class":
            if b.scope_id:
                blocked_class_slots.add((b.scope_id, b.day, b.period))

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
    vars_by_room_slot: dict[tuple[str, str, int], list[cp_model.IntVar]] = defaultdict(list)

    # 2. Decision variable generation
    # The solver strictly places only the admin-assigned teacher; it never selects among teachers.
    for c in classes:
        max_p = class_max_p[c.id]
        class_act_needed = sum(weekly_frequency.get((c.id, sid), 0) for sid in activity_subject_ids)

        for s in subjects:
            freq = weekly_frequency.get((c.id, s.id), 0)
            if freq <= 0:
                continue

            assigned_tid = assigned_teacher_map.get((c.id, s.id))
            if not assigned_tid:
                continue
            t = teacher_by_id.get(assigned_tid)
            if not t:
                continue

            room = s.room if s.room else (c.home_room or None)

            for d in rules.working_days:
                if d in t.unavailable_days:
                    continue

                for p in range(1, max_p + 1):
                    # Phase 3-B: Do not create variable if slot is blocked for this class
                    if (c.id, d, p) in blocked_class_slots:
                        continue

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

                    if room:
                        vars_by_room_slot[(room, d, p)].append(var)

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

    # Hard Constraint H_week: Teacher weekly period cap (Phase 3-C)
    for t in teachers:
        t_week_cap = getattr(t, "max_periods_per_week", 30)
        all_t_vars = [var for (cid, sid, tid, d, p), var in x.items() if tid == t.id]
        if all_t_vars:
            model.Add(sum(all_t_vars) <= t_week_cap)

    # Hard Constraint H_consec: Max consecutive periods without a break (Phase 3-C)
    recess_after = getattr(rules, "recess_after_period", 2)
    lunch_after = getattr(rules, "lunch_after_period", 4)
    break_periods = {recess_after, lunch_after}

    for t in teachers:
        max_consec = getattr(t, "max_consecutive_periods", 3)
        if max_consec <= 0:
            continue
        for d in rules.working_days:
            for start_p in range(1, rules.senior_periods - max_consec + 1):
                periods = list(range(start_p, start_p + max_consec + 1))
                has_break_in_between = any(bp in periods[:-1] for bp in break_periods)
                if not has_break_in_between:
                    window = [vars_by_teacher_slot.get((t.id, d, p), []) for p in periods]
                    window_vars = [v for vlist in window for v in vlist]
                    if len(window_vars) > max_consec:
                        model.Add(sum(window_vars) <= max_consec)

    # Hard Constraint H_room: Room capacity constraint (Phase 3-A)
    for (rm, d, p), rm_vars in vars_by_room_slot.items():
        if rm in problem.room_capacities:
            cap = problem.room_capacities[rm]
            if cap > 0 and len(rm_vars) > cap:
                model.Add(sum(rm_vars) <= cap)

    # Hard Constraint H_pin: Pinned Lessons (Phase 3-B)
    for pl in problem.pinned_lessons:
        key = (pl.class_id, pl.subject_id, pl.teacher_id, pl.day, pl.period)
        if key in x:
            model.Add(x[key] == 1)

    # Soft Constraints (Objective)
    penalties: list[cp_model.LinearExpr] = []
    num_days = max(1, len(rules.working_days))

    # S1: Spread each academic subject across days (penalize multiple periods on same day)
    if getattr(rules, "spread_subjects", True):
        for c in classes:
            for s in subjects:
                if s.is_activity:
                    continue
                freq = weekly_frequency.get((c.id, s.id), 0)
                if freq <= 0:
                    continue
                base_target = (freq + num_days - 1) // num_days
                target_max_per_day = max(2, base_target) if getattr(s, "requires_double_period", False) else base_target
                for d in rules.working_days:
                    csd_vars = vars_by_class_subject_day.get((c.id, s.id, d), [])
                    if len(csd_vars) > target_max_per_day:
                        excess = model.NewIntVar(0, len(csd_vars), f"excess_{c.id}_{s.id}_{d}")
                        model.Add(excess >= sum(csd_vars) - target_max_per_day)
                        penalties.append(excess * 10)

    # S2: Teacher workload smoothness (prefer <= 4 periods/day over hitting cap of 5)
    if getattr(rules, "smooth_teacher_workload", True):
        for t in teachers:
            for d in rules.working_days:
                t_day_vars = vars_by_teacher_day.get((t.id, d), [])
                if len(t_day_vars) > 4:
                    overload = model.NewIntVar(0, len(t_day_vars), f"overload_{t.id}_{d}")
                    model.Add(overload >= sum(t_day_vars) - 4)
                    penalties.append(overload * 2)

    # S3: Minimize teacher idle gaps (avoid isolated 1-period split shifts)
    if getattr(rules, "minimize_teacher_gaps", True):
        for t in teachers:
            for d in rules.working_days:
                for p in range(1, rules.senior_periods - 1):
                    p1_vars = vars_by_teacher_slot.get((t.id, d, p), [])
                    p2_vars = vars_by_teacher_slot.get((t.id, d, p + 1), [])
                    p3_vars = vars_by_teacher_slot.get((t.id, d, p + 2), [])
                    if p1_vars and p3_vars:
                        gap_var = model.NewBoolVar(f"gap_{t.id}_{d}_{p}")
                        u_p1 = sum(p1_vars)
                        u_p2 = sum(p2_vars) if p2_vars else 0
                        u_p3 = sum(p3_vars)
                        model.Add(u_p1 + u_p3 - u_p2 <= 1 + gap_var)
                        penalties.append(gap_var * 3)

    # S4: Morning core subject priority (Math, Science, CS scheduled before late periods)
    if getattr(rules, "morning_core_priority", True):
        core_keywords = ("math", "sci", "cs", "computer", "physics", "chem")
        core_subject_ids = {
            s.id for s in subjects
            if not s.is_activity and any(kw in s.name.lower() or kw in getattr(s, "code", "").lower() for kw in core_keywords)
        }
        for (cid, sid, tid, d, p), var in x.items():
            if sid in core_subject_ids and p > 4:
                penalties.append(var * (p - 4) * 2)

    # S5: Consecutive Double Periods for Practical / Lab / Art subjects
    if getattr(rules, "consecutive_double_periods", True):
        recess_after = getattr(rules, "recess_after_period", 2)
        lunch_after = getattr(rules, "lunch_after_period", 4)
        for c in classes:
            max_p = class_max_p[c.id]
            valid_start_periods = [p for p in range(1, max_p) if p != recess_after and p != lunch_after]
            for s in subjects:
                if not getattr(s, "requires_double_period", False):
                    continue
                freq = weekly_frequency.get((c.id, s.id), 0)
                if freq < 2:
                    continue

                assigned_tid = assigned_teacher_map.get((c.id, s.id))
                t = teacher_by_id.get(assigned_tid) if assigned_tid else None
                if not t:
                    continue

                dbl_indicators = []
                for d in rules.working_days:
                    if d in t.unavailable_days:
                        continue
                    for p in valid_start_periods:
                        is_act_p = (d == rules.activity_day and p in rules.activity_periods)
                        is_act_p1 = (d == rules.activity_day and (p + 1) in rules.activity_periods)
                        if s.is_activity:
                            if not (is_act_p and is_act_p1):
                                continue
                        else:
                            if is_act_p or is_act_p1:
                                continue

                        key_p = (c.id, s.id, t.id, d, p)
                        key_p1 = (c.id, s.id, t.id, d, p + 1)
                        if key_p in x and key_p1 in x:
                            v1 = x[key_p]
                            v2 = x[key_p1]
                            is_dbl = model.NewBoolVar(f"dbl_{c.id}_{s.id}_{t.id}_{d}_{p}")
                            model.AddBoolAnd([v1, v2]).OnlyEnforceIf(is_dbl)
                            model.AddBoolOr([v1.Not(), v2.Not()]).OnlyEnforceIf(is_dbl.Not())
                            dbl_indicators.append(is_dbl)

                if dbl_indicators:
                    has_dbl = model.NewBoolVar(f"has_dbl_{c.id}_{s.id}")
                    model.Add(sum(dbl_indicators) >= 1).OnlyEnforceIf(has_dbl)
                    model.Add(sum(dbl_indicators) == 0).OnlyEnforceIf(has_dbl.Not())
                    penalties.append((1 - has_dbl) * 40)

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

        # Phase 3-E: Compute QualityReport
        total_entries = len(entries)
        total_possible_slots = sum(
            len(rules.working_days) * class_max_p[c.id]
            - sum(1 for (cid, d, p) in blocked_class_slots if cid == c.id and p <= class_max_p[c.id])
            for c in classes
        )
        empty_periods = max(0, total_possible_slots - total_entries)

        teacher_workload = []
        for t in teachers:
            assigned_count = sum(1 for e in entries if e.teacher_id == t.id)
            max_w = getattr(t, "max_periods_per_week", 30)
            pct = round((assigned_count / max_w * 100), 1) if max_w > 0 else 0.0
            teacher_workload.append({
                "teacher_id": t.id,
                "name": t.name,
                "assigned": assigned_count,
                "max": max_w,
                "pct": pct,
            })

        soft_score = int(solver.ObjectiveValue()) if penalties else 0

        quality_report = QualityReport(
            total_entries=total_entries,
            empty_period_count=empty_periods,
            unplaced_lessons=[],
            teacher_workload=teacher_workload,
            soft_score=soft_score,
        )

        return SolveResult(
            entries=entries,
            diagnostics=[],
            feasible=True,
            quality_report=quality_report,
        )

    # Fallback diagnostics on INFEASIBLE / MODEL_INVALID
    infeasible_diagnostics = [
        Diagnostic(
            severity="error",
            title="Infeasible Timetable Constraints",
            detail=(
                "The constraint solver could not find a valid conflict-free schedule satisfying "
                "all hard rules (H1–H7, room capacities, pinned lessons, blocked slots) within the time limit. "
                "Verify teacher availability, room capacity, pinned lessons, and weekly requirements."
            ),
        )
    ]
    return SolveResult(entries=[], diagnostics=infeasible_diagnostics, feasible=False)
