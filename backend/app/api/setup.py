"""API LAYER — School setup CRUD routes."""
from fastapi import APIRouter, Depends

from app.core.auth import (
    AuthContext,
    get_auth_context,
    require_roles,
    verify_platform_token,
    verify_tenant_access,
)
from app.schemas.setup import (
    ClassSectionCreate,
    ClassSectionOut,
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
)
from app.services import school_service

router = APIRouter(prefix="/api/schools", tags=["setup"])


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
