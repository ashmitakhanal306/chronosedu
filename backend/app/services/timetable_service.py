"""SERVICE LAYER — business use-cases. Routes call this; this calls DB + engine.

TODO (Phase 2): load a school's data via tenant_session(), map rows -> chronos_engine.ProblemInput,
call chronos_engine.solve(), persist entries, return the result.
"""
from chronos_engine import ProblemInput, SolveResult, solve

from app.core.config import settings


def generate(problem: ProblemInput) -> SolveResult:
    return solve(problem, time_limit_s=settings.solver_time_limit_s)
