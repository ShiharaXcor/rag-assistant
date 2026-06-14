import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))

from fastapi import HTTPException, UploadFile
from app.core.config import MAX_FILE_SIZE_MB, MAX_FILES

# ── Allowed File Types ────────────────────
ALLOWED_EXTENSIONS = ["pdf"]
ALLOWED_MIME_TYPES = ["application/pdf"]

# ── Validate Single File ──────────────────
def validate_file(file: UploadFile) -> dict:

    # check extension
    file_ext = file.filename.split(".")[-1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"❌ File type not allowed: {file_ext}. Only PDF files are accepted."
        )

    # check mime type
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"❌ Invalid file type. Only PDF files are accepted."
        )

    return {"valid": True}

# ── Validate Multiple Files ───────────────
def validate_files(files: list) -> dict:

    # check number of files
    if len(files) > MAX_FILES:
        raise HTTPException(
            status_code=400,
            detail=f"❌ Too many files. Maximum {MAX_FILES} files allowed."
        )

    # check each file
    for file in files:
        validate_file(file)

    return {"valid": True}

# ── Validate File Size ────────────────────
def validate_file_size(file_size_bytes: int) -> dict:
    size_mb = file_size_bytes / (1024 * 1024)

    if size_mb > MAX_FILE_SIZE_MB:
        raise HTTPException(
            status_code=400,
            detail=f"❌ File too large: {size_mb:.1f}MB. Maximum {MAX_FILE_SIZE_MB}MB allowed."
        )

    return {"valid": True}

# ── Sanitize Filename ─────────────────────
def sanitize_filename(filename: str) -> str:
    # remove special characters
    filename = filename.replace(" ", "_")
    filename = "".join(
        c for c in filename
        if c.isalnum() or c in ["_", "-", "."]
    )
    return filename.lower()

# ── Check Company Sensitive Data ──────────
SENSITIVE_PATTERNS = [
    "password", "secret", "private",
    "credentials", "api_key", "token",
    "salary", "payroll", "bank",
    "ssn", "social_security"
]

def check_sensitive_filename(filename: str) -> dict:
    filename_lower = filename.lower()

    for pattern in SENSITIVE_PATTERNS:
        if pattern in filename_lower:
            raise HTTPException(
                status_code=400,
                detail=f"❌ File name contains sensitive content: '{pattern}'. Please rename your file."
            )

    return {"valid": True}