"""API LAYER — HTTP only: parse, authorise, validate, delegate to services. No SQL, no solver logic."""
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/schools/{school_id}", tags=["timetable"])

# Phase 2 endpoints (blueprint 4.1 / 9):
#   POST /generate        run engine, store draft
#   GET  /timetable       by class or teacher (role-filtered)
#   PUT  /entries/{id}    manual override (validated for clashes)
#   POST /publish         approve & publish
#   POST /absences        log absence ; GET /absences/{id}/substitutes  ranked candidates


def _todo() -> None:
    raise HTTPException(status_code=501, detail="Not implemented yet (roadmap Phase 2)")


@router.post("/generate")
def generate_timetable(school_id: str):
    _todo()


@router.get("/timetable")
def get_timetable(school_id: str, class_id: str | None = None, teacher_id: str | None = None):
    _todo()


@router.post("/publish")
def publish(school_id: str):
    _todo()
