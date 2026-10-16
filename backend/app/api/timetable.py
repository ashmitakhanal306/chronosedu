"""API LAYER — HTTP only: parse, authorise, validate, delegate to services. No SQL, no solver logic."""
from fastapi import APIRouter

from app.schemas.timetable import (
    AbsenceCreate,
    AbsenceOut,
    CandidateOut,
    EntryOut,
    GenerateResponse,
    OverrideRequest,
    PublishResponse,
    SubstitutionAssignRequest,
    SubstitutionOut,
)
from app.services import timetable_service

router = APIRouter(prefix="/api/schools/{school_id}", tags=["timetable"])


@router.post("/generate", response_model=GenerateResponse)
def generate_timetable(school_id: str):
    """Run solver engine on school data, store generated schedule and return result."""
    return timetable_service.generate(school_id)


@router.get("/timetable", response_model=list[EntryOut])
def get_timetable(school_id: str, class_id: str | None = None, teacher_id: str | None = None):
    """Get timetable entries filtered by school, class, or teacher."""
    return timetable_service.get_timetable(school_id, class_id=class_id, teacher_id=teacher_id)


@router.put("/entries/{entry_id}", response_model=EntryOut)
def update_entry(school_id: str, entry_id: str, override: OverrideRequest):
    """Manual override for a timetable slot. Strictly re-validates H1, H2, H7 and rejects clashes with 409."""
    return timetable_service.manual_override(school_id, entry_id, override)


@router.post("/publish", response_model=PublishResponse)
def publish(school_id: str):
    """Approve and publish the timetable."""
    return timetable_service.publish(school_id)


@router.post("/absences", response_model=AbsenceOut)
def log_absence(school_id: str, absence: AbsenceCreate):
    """Log a teacher absence."""
    return timetable_service.log_absence(school_id, absence)


@router.get("/absences/{absence_id}/substitutes", response_model=list[CandidateOut])
def get_substitute_candidates(school_id: str, absence_id: str):
    """Get ranked substitute candidate teachers for an absence."""
    return timetable_service.get_substitutes(school_id, absence_id)


@router.post("/substitutions", response_model=SubstitutionOut)
def assign_substitution(school_id: str, req: SubstitutionAssignRequest):
    """Assign a substitute teacher to a slot."""
    return timetable_service.assign_substitution(school_id, req)
