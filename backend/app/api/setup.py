"""API LAYER — School setup CRUD routes."""
from fastapi import APIRouter, Depends

from app.core.auth import (
    AuthContext,
    get_auth_context,
    get_optional_auth_context,
    require_roles,
    verify_platform_token,
    verify_tenant_access,
)
from app.schemas.setup import (
    ClassSectionCreate,
    ClassSectionOut,
    FullSchoolOut,
    GradeCreate,
    GradeOut,
    RequirementCreate,
    RequirementOut,
    RoomCreate,
    RoomOut,
    SchoolCreate,
    SchoolOut,
    SubjectCreate,
    SubjectOut,
    TeacherCreate,
    TeacherOut,
    UserCreate,
    UserOut,
    AssignmentCreate,
    AssignmentOut,
    SuggestAssignmentsOut,
    HolidayCreate,
    HolidayOut,
    PinnedLessonCreate,
    PinnedLessonOut,
    BlockedSlotCreate,
    BlockedSlotOut,
    VersionOut,
    VersionStateUpdate,
    AuditLogOut,
)
from app.services import school_service

router = APIRouter(prefix="/api/schools", tags=["setup"])


@router.get("", response_model=list[SchoolOut])
def list_schools():
    """Retrieve all school organizations registered on the platform."""
    return school_service.list_schools()


@router.post("", response_model=SchoolOut, status_code=201)
def create_school(
    data: SchoolCreate,
    _platform_token: str = Depends(verify_platform_token),
):
    """Create a new school organization (platform-gated onboarding). Requires CHRONOS_PLATFORM_TOKEN."""
    return school_service.create_school(data)


@router.get("/{school_id}", response_model=SchoolOut)
def get_school(
    school_id: str,
    auth: AuthContext = Depends(get_auth_context),
):
    """Retrieve school metadata and configuration."""
    verify_tenant_access(school_id, auth)
    return school_service.get_school(school_id)


@router.get("/{school_id}/full", response_model=FullSchoolOut)
def get_full_school(
    school_id: str,
    auth: AuthContext | None = Depends(get_optional_auth_context),
):
    """Retrieve fully hydrated school hierarchy matching frontend School domain model."""
    if auth:
        verify_tenant_access(school_id, auth)
    return school_service.get_full_school(school_id)


@router.post("/{school_id}/grades", response_model=GradeOut, status_code=201)
def add_grade(
    school_id: str,
    data: GradeCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Add a grade tier to school. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.add_grade(school_id, data)


@router.post("/{school_id}/rooms", response_model=RoomOut, status_code=201)
def add_room(
    school_id: str,
    data: RoomCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Add a room to school. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.add_room(school_id, data)


@router.post("/{school_id}/classes", response_model=ClassSectionOut, status_code=201)
def add_class_section(
    school_id: str,
    data: ClassSectionCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Add a class section to school. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.add_class_section(school_id, data)


@router.post("/{school_id}/subjects", response_model=SubjectOut, status_code=201)
def add_subject(
    school_id: str,
    data: SubjectCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Add a subject to school. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.add_subject(school_id, data)


@router.post("/{school_id}/requirements", response_model=RequirementOut, status_code=201)
def add_requirement(
    school_id: str,
    data: RequirementCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Add a subject weekly period requirement for a grade. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.add_requirement(school_id, data)


@router.post("/{school_id}/teachers", response_model=TeacherOut, status_code=201)
def add_teacher(
    school_id: str,
    data: TeacherCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Add a teacher with qualified subjects and unavailability. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.add_teacher(school_id, data)


@router.post("/{school_id}/users", response_model=UserOut, status_code=201)
def add_user(
    school_id: str,
    data: UserCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Register an authenticated user for a school tenant. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.create_user(school_id, data)


# ── Teaching Assignment endpoints (Phase 1) ───────────────────────────────────

@router.get("/{school_id}/assignments", response_model=list[AssignmentOut])
def list_assignments(
    school_id: str,
    auth: AuthContext = Depends(get_auth_context),
):
    """Retrieve all teacher assignments for the school."""
    verify_tenant_access(school_id, auth)
    return school_service.list_assignments(school_id)


@router.post("/{school_id}/assignments", response_model=AssignmentOut)
def upsert_assignment(
    school_id: str,
    data: AssignmentCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Create or update a teaching assignment (one teacher per class-subject pair). Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.upsert_assignment(school_id, data)


@router.delete("/{school_id}/assignments/{assignment_id}", status_code=204)
def delete_assignment(
    school_id: str,
    assignment_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Delete a teaching assignment. Admin only."""
    verify_tenant_access(school_id, auth)
    school_service.delete_assignment(school_id, assignment_id)
    return None


@router.post("/{school_id}/assignments/suggest", response_model=SuggestAssignmentsOut)
def suggest_assignments(
    school_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Auto-suggest teacher assignments based on subject qualification and lowest current load. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.suggest_assignments(school_id)


# ── Holiday endpoints (Phase 2-A) ─────────────────────────────────────────────

@router.get("/{school_id}/holidays", response_model=list[HolidayOut])
def list_holidays(
    school_id: str,
    auth: AuthContext = Depends(get_auth_context),
):
    """Retrieve all holidays for a school."""
    verify_tenant_access(school_id, auth)
    return school_service.list_holidays(school_id)


@router.post("/{school_id}/holidays", response_model=HolidayOut, status_code=201)
def create_holiday(
    school_id: str,
    data: HolidayCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Create a new holiday in the school calendar. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.create_holiday(school_id, data)


@router.delete("/{school_id}/holidays/{holiday_id}", status_code=204)
def delete_holiday(
    school_id: str,
    holiday_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Delete a holiday. Admin only."""
    verify_tenant_access(school_id, auth)
    school_service.delete_holiday(school_id, holiday_id)
    return None


# ── Pinned Lesson endpoints (Phase 2-C) ───────────────────────────────────────

@router.get("/{school_id}/pinned-lessons", response_model=list[PinnedLessonOut])
def list_pinned_lessons(
    school_id: str,
    auth: AuthContext = Depends(get_auth_context),
):
    """Retrieve all pinned lessons for a school."""
    verify_tenant_access(school_id, auth)
    return school_service.list_pinned_lessons(school_id)


@router.post("/{school_id}/pinned-lessons", response_model=PinnedLessonOut, status_code=201)
def create_pinned_lesson(
    school_id: str,
    data: PinnedLessonCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Pin a lesson to an exact day and period. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.create_pinned_lesson(school_id, data)


@router.delete("/{school_id}/pinned-lessons/{pin_id}", status_code=204)
def delete_pinned_lesson(
    school_id: str,
    pin_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Delete a pinned lesson. Admin only."""
    verify_tenant_access(school_id, auth)
    school_service.delete_pinned_lesson(school_id, pin_id)
    return None


# ── Blocked Slot endpoints (Phase 2-C) ─────────────────────────────────────────

@router.get("/{school_id}/blocked-slots", response_model=list[BlockedSlotOut])
def list_blocked_slots(
    school_id: str,
    auth: AuthContext = Depends(get_auth_context),
):
    """Retrieve all blocked slots for a school."""
    verify_tenant_access(school_id, auth)
    return school_service.list_blocked_slots(school_id)


@router.post("/{school_id}/blocked-slots", response_model=BlockedSlotOut, status_code=201)
def create_blocked_slot(
    school_id: str,
    data: BlockedSlotCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Create a blocked slot for school, grade, or class. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.create_blocked_slot(school_id, data)


@router.delete("/{school_id}/blocked-slots/{slot_id}", status_code=204)
def delete_blocked_slot(
    school_id: str,
    slot_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Delete a blocked slot. Admin only."""
    verify_tenant_access(school_id, auth)
    school_service.delete_blocked_slot(school_id, slot_id)
    return None


# ── Timetable Version endpoints (Phase 2-D) ────────────────────────────────────

@router.get("/{school_id}/versions", response_model=list[VersionOut])
def list_versions(
    school_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """List all timetable versions for the school. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.list_versions(school_id)


@router.post("/{school_id}/versions/{version_id}/approve", response_model=VersionOut)
def approve_version(
    school_id: str,
    version_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Approve a draft timetable version. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.approve_version(school_id, version_id, user_id=auth.user_id)


@router.post("/{school_id}/versions/{version_id}/publish", response_model=VersionOut)
def publish_version(
    school_id: str,
    version_id: str,
    body: VersionStateUpdate | None = None,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Publish a timetable version and activate it. Admin only."""
    verify_tenant_access(school_id, auth)
    eff = body.effective_from if body else None
    return school_service.publish_version(school_id, version_id, user_id=auth.user_id, effective_from=eff)


@router.post("/{school_id}/versions/{version_id}/rollback", response_model=VersionOut)
def rollback_version(
    school_id: str,
    version_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Roll back active schedule to an older version. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.rollback_version(school_id, version_id, user_id=auth.user_id)


# ── Audit Log endpoints (Phase 2-E) ────────────────────────────────────────────

@router.get("/{school_id}/audit-logs", response_model=list[AuditLogOut])
def list_audit_logs(
    school_id: str,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """List recent audit logs for the school. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.list_audit_logs(school_id)
