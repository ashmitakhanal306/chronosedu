"""Authentication and Session Endpoints (JWT Token Issuance, Profile, Subdomain Resolution)."""
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy import select

from app.core.auth import AuthContext, create_access_token, extract_subdomain, get_auth_context
from app.db.models import School
from app.db.session import tenant_session

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginRequest(BaseModel):
    school_id: str
    role: str  # "admin", "teacher", "student"
    email: str | None = None
    teacher_id: str | None = None
    class_id: str | None = None
    name: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AuthContext


@router.post("/token", response_model=TokenResponse)
def login_for_access_token(req: LoginRequest):
    """Generate signed JWT token for school tenant and role."""
    if req.role not in ("admin", "teacher", "student"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be one of: admin, teacher, student",
        )

    user_id = req.email or f"{req.role}-{req.school_id}"
    if req.role == "teacher" and req.teacher_id:
        user_id = req.teacher_id
    elif req.role == "student" and req.class_id:
        user_id = f"student-{req.class_id}"

    token_claims = {
        "sub": user_id,
        "school_id": req.school_id,
        "role": req.role,
        "email": req.email,
        "teacher_id": req.teacher_id,
        "class_id": req.class_id,
    }

    token = create_access_token(token_claims)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user=AuthContext(
            user_id=user_id,
            school_id=req.school_id,
            role=req.role,
            email=req.email,
            teacher_id=req.teacher_id,
            class_id=req.class_id,
        ),
    )


@router.get("/me", response_model=AuthContext)
def get_current_user_profile(auth: AuthContext = Depends(get_auth_context)):
    """Return the currently authenticated user's token claims and permissions."""
    return auth


@router.get("/resolve-school")
def resolve_school_by_subdomain(request: Request):
    """Resolve school details from host header subdomain (e.g. greenwood.chronosedu.com)."""
    host = request.headers.get("host")
    subdomain = extract_subdomain(host)
    if not subdomain:
        # Check query param fallback
        subdomain = request.query_params.get("subdomain")

    if not subdomain:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to resolve subdomain from Host header or query parameter",
        )

    with tenant_session(school_id=None) as session:
        stmt = select(School).where(School.subdomain == subdomain)
        school = session.execute(stmt).scalars().first()
        if not school:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"School with subdomain '{subdomain}' not found",
            )
        return {
            "id": school.id,
            "name": school.name,
            "subdomain": school.subdomain,
            "published": school.published,
        }
