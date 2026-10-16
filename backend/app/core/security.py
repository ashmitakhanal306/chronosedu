"""Cryptographic security utilities for password hashing and verification using Argon2id."""
from __future__ import annotations

import hashlib
import hmac
from argon2 import PasswordHasher
from argon2.exceptions import VerificationError, VerifyMismatchError

# Initialize Argon2id password hasher with secure parameters
_argon2_hasher = PasswordHasher(
    time_cost=3,
    memory_cost=65536,  # 64 MiB
    parallelism=4,
    hash_len=32,
    salt_len=16,
)


def hash_password(password: str) -> str:
    """Hash password using Argon2id (OWASP recommended standard)."""
    return _argon2_hasher.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against Argon2id hash (with backward-compatible PBKDF2 fallback)."""
    if not hashed_password:
        return False

    # Argon2 verification
    if hashed_password.startswith("$argon2"):
        try:
            return _argon2_hasher.verify(hashed_password, plain_password)
        except (VerifyMismatchError, VerificationError):
            return False
        except Exception:
            return False

    # Legacy PBKDF2-HMAC-SHA256 verification fallback
    if hashed_password.startswith("pbkdf2_sha256$"):
        try:
            parts = hashed_password.split("$")
            if len(parts) != 4:
                return False
            iterations = int(parts[1])
            salt = bytes.fromhex(parts[2])
            expected_key = bytes.fromhex(parts[3])

            computed_key = hashlib.pbkdf2_hmac(
                "sha256",
                plain_password.encode("utf-8"),
                salt,
                iterations,
            )
            return hmac.compare_digest(expected_key, computed_key)
        except Exception:
            return False

    return False
