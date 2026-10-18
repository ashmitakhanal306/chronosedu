"""API LAYER — HTTP only: parse, authorise, validate, delegate to services. No SQL, no solver logic."""
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status

from app.core.auth import AuthContext, get_auth_context, require_roles, verify_tenant_access
from app.schemas.timetable import (
    AbsenceCreate,
    AbsenceOut,
    CandidateOut,
    EntryOut,
    GenerateRequest,
    GenerateResponse,
    OverrideRequest,
    PublishResponse,
    SubstitutionAssignRequest,
    SubstitutionOut,
)
from app.services import notifications, timetable_service

router = APIRouter(prefix="/api/schools/{school_id}", tags=["timetable"])


@router.post("/generate", response_model=GenerateResponse)
def generate_timetable(
    school_id: str,
    req: GenerateRequest | None = None,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Run solver engine on school data, store generated schedule and return result. Admin only."""
    verify_tenant_access(school_id, auth)
    return timetable_service.generate(school_id, req)


@router.get("/timetable", response_model=list[EntryOut])
def get_timetable(
    school_id: str,
    class_id: str | None = None,
    teacher_id: str | None = None,
    auth: AuthContext = Depends(get_auth_context),
):
    """Get timetable entries filtered by school, class, or teacher.
    
    Enforces role guards:
    - Admin: can view all, or filter by class/teacher.
    - Teacher: can only view own schedule.
    - Student: can only view own class schedule.
    """
    verify_tenant_access(school_id, auth)

    if auth.role == "student":
        student_class = auth.class_id
        if not student_class and not class_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Student token must have class_id assigned",
            )
        if class_id and student_class and class_id != student_class:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Students may only view their own class timetable",
            )
        target_class = student_class or class_id
        return timetable_service.get_timetable(school_id, class_id=target_class, teacher_id=None)

    if auth.role == "teacher":
        teacher_self = auth.teacher_id
        if not teacher_self and not teacher_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Teacher token must have teacher_id assigned",
            )
        if teacher_id and teacher_self and teacher_id != teacher_self:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Teachers may only view their own timetable",
            )
        target_teacher = teacher_self or teacher_id
        return timetable_service.get_timetable(school_id, class_id=None, teacher_id=target_teacher)

    # Admin: unrestricted access
    return timetable_service.get_timetable(school_id, class_id=class_id, teacher_id=teacher_id)


@router.put("/entries/{entry_id}", response_model=EntryOut)
def update_entry(
    school_id: str,
    entry_id: str,
    override: OverrideRequest,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Manual override for a timetable slot. Strictly re-validates H1, H2, H7 and rejects clashes with 409. Admin only."""
    verify_tenant_access(school_id, auth)
    return timetable_service.manual_override(school_id, entry_id, override)


@router.post("/publish", response_model=PublishResponse)
def publish(
    school_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Approve and publish the timetable. Admin only."""
    verify_tenant_access(school_id, auth)
    return timetable_service.publish(school_id)


@router.post("/absences", response_model=AbsenceOut)
def log_absence(
    school_id: str,
    absence: AbsenceCreate,
    auth: AuthContext = Depends(require_roles(["admin", "teacher"])),
):
    """Log a teacher absence. Admins or the absent teacher themselves."""
    verify_tenant_access(school_id, auth)
    if auth.role == "teacher" and auth.teacher_id and absence.teacher_id != auth.teacher_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Teachers can only report their own absence",
        )
    return timetable_service.log_absence(school_id, absence)


@router.get("/absences/{absence_id}/substitutes", response_model=list[CandidateOut])
def get_substitute_candidates(
    school_id: str,
    absence_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Get ranked substitute candidate teachers for an absence. Admin only."""
    verify_tenant_access(school_id, auth)
    return timetable_service.get_substitutes(school_id, absence_id)


@router.post("/substitutions", response_model=SubstitutionOut)
def assign_substitution(
    school_id: str,
    req: SubstitutionAssignRequest,
    background_tasks: BackgroundTasks,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Assign a substitute teacher to a slot. Admin only. Enqueues background notification."""
    verify_tenant_access(school_id, auth)
    result = timetable_service.assign_substitution(school_id, req)
    background_tasks.add_task(
        notifications.send_substitution_notification_task,
        school_id,
        req.entry_id,
        req.substitute_teacher_id,
    )
    return result
