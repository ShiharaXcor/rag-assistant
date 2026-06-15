import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../../..'))

from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List
from app.core.security import (
    validate_files,
    validate_file_size,
    sanitize_filename,
    check_sensitive_filename
)
from app.services.pdf_processor import process_pdfs, validate_pdf
from app.services.vector_store import save_to_vector_store
from app.models.schemas import UploadResponse
from app.core.config import UPLOAD_DIR

router = APIRouter()

# ── Upload PDFs ───────────────────────────
@router.post("/upload", response_model=UploadResponse)
async def upload_pdfs(files: List[UploadFile] = File(...)):

    # validate files
    validate_files(files)

    saved_files    = []
    total_chunks   = 0
    all_chunks     = []

    for file in files:

        # check sensitive filename
        check_sensitive_filename(file.filename)

        # sanitize filename
        clean_name = sanitize_filename(file.filename)

        # read file content
        content = await file.read()

        # validate file size
        validate_file_size(len(content))

        # save file to upload directory
        file_path = os.path.join(UPLOAD_DIR, clean_name)
        with open(file_path, "wb") as f:
            f.write(content)

        # validate pdf
        result = validate_pdf(file_path)
        if not result["valid"]:
            raise HTTPException(
                status_code=400,
                detail=f"❌ Invalid PDF: {result['error']}"
            )

        saved_files.append(clean_name)
        print(f"✅ Saved file: {clean_name}")

    # process all pdfs
    all_chunks = process_pdfs(
        [os.path.join(UPLOAD_DIR, f) for f in saved_files]
    )

    # save to vector store
    if all_chunks:
        save_to_vector_store(all_chunks)
        total_chunks = len(all_chunks)

    return UploadResponse(
        success        = True,
        message        = f"✅ Successfully processed {len(saved_files)} file(s)",
        files_processed= saved_files,
        total_chunks   = total_chunks
    )

# ── Get Uploaded Files ────────────────────
@router.get("/files")
async def get_uploaded_files():
    files = []
    if os.path.exists(UPLOAD_DIR):
        files = [
            f for f in os.listdir(UPLOAD_DIR)
            if f.endswith(".pdf")
        ]
    return {
        "files" : files,
        "count" : len(files)
    }

# ── Delete All Files ──────────────────────
@router.delete("/files")
async def delete_all_files():
    import shutil
    if os.path.exists(UPLOAD_DIR):
        shutil.rmtree(UPLOAD_DIR)
        os.makedirs(UPLOAD_DIR, exist_ok=True)
    return {"message": "✅ All files deleted"}