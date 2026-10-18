"""Authentication and Session Endpoints (JWT Token Issuance, Rate Limiting, Profile, Subdomain Resolution)."""
from __future__ import annotations

import time
import uuid
from collections import defaultdict

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel
from sqlalchemy import select

from app.core.auth import (
    AuthContext,
    create_access_token,
    extract_subdomain,
    get_auth_context,
    require_roles,
    verify_tenant_access,
)
from app.core.security import verify_password
from app.db.models import AppUser, School
from app.db.session import tenant_session
from app.schemas.setup import UserCreate, UserOut
from app.services import school_service

router = APIRouter(prefix="/api/auth", tags=["auth"])

# Rate limiting storage: key -> list of attempt timestamps
_login_attempts: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT_WINDOW_SECONDS: int = 60
MAX_LOGIN_ATTEMPTS: int = 5


def check_login_rate_limit(key: str) -> None:
    now = time.time()
    cutoff = now - RATE_LIMIT_WINDOW_SECONDS
    valid = [ts for ts in _login_attempts[key] if ts > cutoff]
    _login_attempts[key] = valid
    if len(valid) >= MAX_LOGIN_ATTEMPTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many failed login attempts. Please wait 60 seconds before trying again.",
            headers={"Retry-After": str(RATE_LIMIT_WINDOW_SECONDS)},
        )


def record_failed_attempt(key: str) -> None:
    _login_attempts[key].append(time.time())


def clear_attempts(key: str) -> None:
    _login_attempts.pop(key, None)


def reset_login_rate_limits() -> None:
    """Clear all in-memory rate limits (used by tests)."""
    _login_attempts.clear()


class LoginRequest(BaseModel):
    school_id: str
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AuthContext


@router.post("/token", response_model=TokenResponse)
def login_for_access_token(req: LoginRequest, request: Request):
    """Authenticate with real credentials (email and password) and issue signed JWT token with rate limiting."""
    client_ip = request.client.host if request.client else "unknown"
    clean_email = req.email.strip().lower()
    rate_limit_key = f"{client_ip}:{req.school_id}:{clean_email}"

    # Enforce rate limit before checking credentials
    check_login_rate_limit(rate_limit_key)

    try:
        sid = uuid.UUID(req.school_id)
    except (ValueError, AttributeError):
        record_failed_attempt(rate_limit_key)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid school_id format (must be UUID)",
        )

    with tenant_session(str(sid)) as session:
        stmt = select(AppUser).where(
            AppUser.school_id == sid,
            AppUser.email == clean_email,
        )
        user = session.execute(stmt).scalars().first()

        if not user or not verify_password(req.password, user.password_hash):
            record_failed_attempt(rate_limit_key)
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid school, email, or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Successful authentication: clear recorded failures
        clear_attempts(rate_limit_key)

        token_claims = {
            "sub": str(user.id),
            "school_id": str(user.school_id),
            "role": user.role,
            "email": user.email,
            "teacher_id": str(user.teacher_id) if user.teacher_id else None,
            "class_id": str(user.class_id) if user.class_id else None,
        }

        token = create_access_token(token_claims)
        return TokenResponse(
            access_token=token,
            token_type="bearer",
            user=AuthContext(
                user_id=str(user.id),
                school_id=str(user.school_id),
                role=user.role,
                email=user.email,
                teacher_id=str(user.teacher_id) if user.teacher_id else None,
                class_id=str(user.class_id) if user.class_id else None,
            ),
        )


@router.post("/setup-admin", response_model=UserOut, status_code=201)
def setup_initial_admin(school_id: str, data: UserCreate):
    """Set the initial administrator account for a newly created school organization. Only permitted when 0 users exist."""
    return school_service.setup_initial_admin(school_id, data)


@router.post("/register", response_model=UserOut, status_code=201)
def register_user(
    school_id: str,
    data: UserCreate,
    auth: AuthContext = Depends(require_roles(["admin"])),
):
    """Register a new user account with hashed credentials for a school tenant. Admin only."""
    verify_tenant_access(school_id, auth)
    return school_service.create_user(school_id, data)


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
            "id": str(school.id),
            "name": school.name,
            "subdomain": school.subdomain,
            "published": school.published,
        }
