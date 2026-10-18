"""JWT Auth, Tenant Isolation, Role Guards, and Subdomain Resolution."""
from datetime import datetime, timedelta, timezone
from typing import Any
import jwt
from fastapi import Depends, Header, HTTPException, Request, status
from pydantic import BaseModel

from app.core.config import settings


class AuthContext(BaseModel):
    user_id: str
    school_id: str
    role: str  # "admin", "teacher", "student"
    email: str | None = None
    teacher_id: str | None = None
    class_id: str | None = None


def create_access_token(payload: dict[str, Any], expires_delta: timedelta | None = None) -> str:
    """Create signed JWT token containing tenant and role claims."""
    to_encode = payload.copy()
    now = datetime.now(timezone.utc)
    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=settings.jwt_expiration_minutes)

    to_encode.update({"iat": now, "exp": expire})
    return jwt.encode(to_encode, settings.jwt_secret, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> dict[str, Any]:
    """Decode and verify signed JWT token."""
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {e}",
            headers={"WWW-Authenticate": "Bearer"},
        )


def extract_subdomain(host: str | None) -> str | None:
    """Extract subdomain from host header (e.g. greenwood.chronosedu.com -> greenwood)."""
    if not host:
        return None
    # Strip port if present
    clean_host = host.split(":")[0].strip().lower()
    # Ignore localhost, IP addresses, or bare domains
    if clean_host in ("localhost", "127.0.0.1", "testserver"):
        return None
    parts = clean_host.split(".")
    if len(parts) >= 3:
        # e.g., greenwood.example.com
        return parts[0]
    return None


async def get_auth_context(
    request: Request,
    authorization: str | None = Header(None),
) -> AuthContext:
    """Extract and validate AuthContext from Authorization Bearer header.
    
    If no authorization header is provided, checks for demo/subdomain query or raises 401.
    """
    token: str | None = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1].strip()

    if not token:
        # Check query param (e.g. for direct media/export downloads)
        token = request.query_params.get("token")

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required: missing Bearer token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_access_token(token)
    user_id = payload.get("sub") or payload.get("user_id")
    school_id = payload.get("school_id")
    role = payload.get("role")

    if not school_id or not role or not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Malformed token: claims must include sub, school_id, and role",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return AuthContext(
        user_id=user_id,
        school_id=school_id,
        role=role,
        email=payload.get("email"),
        teacher_id=payload.get("teacher_id"),
        class_id=payload.get("class_id"),
    )


async def get_optional_auth_context(
    request: Request,
    authorization: str | None = Header(None),
) -> AuthContext | None:
    """Extract AuthContext if valid Bearer token provided, else None without raising 401."""
    token: str | None = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1].strip()
    if not token:
        token = request.query_params.get("token")
    if not token:
        return None
    try:
        payload = decode_access_token(token)
        user_id = payload.get("sub") or payload.get("user_id")
        school_id = payload.get("school_id")
        role = payload.get("role")
        if not school_id or not role or not user_id:
            return None
        return AuthContext(
            user_id=user_id,
            school_id=school_id,
            role=role,
            email=payload.get("email"),
            teacher_id=payload.get("teacher_id"),
            class_id=payload.get("class_id"),
        )
    except Exception:
        return None


def require_roles(allowed_roles: list[str]):
    """Role-guard dependency factory ensuring the caller has one of the allowed roles."""
    async def role_checker(auth: AuthContext = Depends(get_auth_context)) -> AuthContext:
        if auth.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Forbidden: role '{auth.role}' is not authorized. Allowed: {allowed_roles}",
            )
        return auth
    return role_checker


def verify_tenant_access(
    school_id: str,
    auth: AuthContext,
) -> AuthContext:
    """Verify that the authenticated token belongs to the requested school_id.
    
    Prevents cross-tenant access attacks: school A token reading/mutating school B.
    """
    if auth.school_id != school_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Cross-tenant access forbidden: token school '{auth.school_id}' != path school '{school_id}'",
        )
    return auth


def verify_platform_token(
    request: Request,
    token: str | None = Header(None, alias="X-Chronos-Platform-Token"),
) -> str:
    """Verify CHRONOS_PLATFORM_TOKEN header for platform-level management operations (e.g. school creation)."""
    provided = (
        token
        or request.headers.get("CHRONOS_PLATFORM_TOKEN")
        or request.headers.get("chronos_platform_token")
        or request.headers.get("chronos-platform-token")
    )
    if not provided:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing required platform authorization header: 'X-Chronos-Platform-Token'.",
        )
    if settings.platform_token and provided != settings.platform_token:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid platform authorization token.",
        )
    return provided
