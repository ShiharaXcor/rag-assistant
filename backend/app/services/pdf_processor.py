import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))

from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.core.config import (
    UPLOAD_DIR,
    CHUNK_SIZE,
    CHUNK_OVERLAP
)

# ── Load Single PDF ───────────────────────
def load_pdf(file_path: str):
    loader = PyMuPDFLoader(file_path)
    documents = loader.load()
    print(f"✅ Loaded {len(documents)} pages from {os.path.basename(file_path)}")
    return documents

# ── Chunk Documents ───────────────────────
def chunk_documents(documents):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        length_function=len
    )
    chunks = splitter.split_documents(documents)
    print(f"✅ Created {len(chunks)} chunks")
    return chunks

# ── Process Multiple PDFs ─────────────────
def process_pdfs(file_paths: list):
    all_chunks = []

    for file_path in file_paths:
        try:
            # load
            docs = load_pdf(file_path)

            # add file name to metadata
            for doc in docs:
                doc.metadata["file_name"] = os.path.basename(file_path)

            # chunk
            chunks = chunk_documents(docs)
            all_chunks.extend(chunks)

        except Exception as e:
            print(f"❌ Error processing {file_path}: {e}")
            continue

    print(f"\n✅ Total chunks from all PDFs: {len(all_chunks)}")
    return all_chunks

# ── Validate PDF File ─────────────────────
def validate_pdf(file_path: str, max_size_mb: int = 20) -> dict:
    # check file exists
    if not os.path.exists(file_path):
        return {"valid": False, "error": "File not found"}

    # check extension
    if not file_path.endswith(".pdf"):
        return {"valid": False, "error": "File must be a PDF"}

    # check file size
    size_mb = os.path.getsize(file_path) / (1024 * 1024)
    if size_mb > max_size_mb:
        return {"valid": False, "error": f"File too large: {size_mb:.1f}MB (max {max_size_mb}MB)"}

    return {"valid": True, "error": None}