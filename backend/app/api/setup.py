"""API LAYER — School setup CRUD routes."""
from fastapi import APIRouter

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
)
from app.services import school_service

router = APIRouter(prefix="/api/schools", tags=["setup"])


@router.post("", response_model=SchoolOut, status_code=201)
def create_school(data: SchoolCreate):
    return school_service.create_school(data)


@router.get("/{school_id}", response_model=SchoolOut)
def get_school(school_id: str):
    return school_service.get_school(school_id)


@router.post("/{school_id}/grades", response_model=GradeOut, status_code=201)
def add_grade(school_id: str, data: GradeCreate):
    return school_service.add_grade(school_id, data)


@router.post("/{school_id}/rooms", response_model=RoomOut, status_code=201)
def add_room(school_id: str, data: RoomCreate):
    return school_service.add_room(school_id, data)


@router.post("/{school_id}/classes", response_model=ClassSectionOut, status_code=201)
def add_class_section(school_id: str, data: ClassSectionCreate):
    return school_service.add_class_section(school_id, data)


@router.post("/{school_id}/subjects", response_model=SubjectOut, status_code=201)
def add_subject(school_id: str, data: SubjectCreate):
    return school_service.add_subject(school_id, data)


@router.post("/{school_id}/requirements", response_model=RequirementOut, status_code=201)
def add_requirement(school_id: str, data: RequirementCreate):
    return school_service.add_requirement(school_id, data)


@router.post("/{school_id}/teachers", response_model=TeacherOut, status_code=201)
def add_teacher(school_id: str, data: TeacherCreate):
    return school_service.add_teacher(school_id, data)
