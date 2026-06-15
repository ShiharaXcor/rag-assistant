import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../../..'))

from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse, SourceDocument
from app.services.rag_chain import ask_question
from app.services.vector_store import get_document_count

router = APIRouter()

# ── Ask Question ──────────────────────────
@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):

    # check if vector store has documents
    try:
        count = get_document_count()
        if count == 0:
            raise HTTPException(
                status_code=400,
                detail="❌ No documents uploaded yet. Please upload PDFs first."
            )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail="❌ No documents found. Please upload PDFs first."
        )

    # check empty question
    if not request.question.strip():
        raise HTTPException(
            status_code=400,
            detail="❌ Question cannot be empty."
        )

    # get answer from RAG chain
    result = ask_question(
        question     = request.question,
        chat_history = request.chat_history
    )

    # format sources
    sources = []
    for src in result["sources"]:
        sources.append(SourceDocument(
            file_name        = src["file_name"],
            page_number      = src["page_number"],
            content_preview  = src["content_preview"],
            similarity_score = src["similarity_score"]
        ))

    return ChatResponse(
        answer          = result["answer"],
        sources         = sources,
        processing_time = result["processing_time"]
    )

# ── Get Chat History ──────────────────────
@router.get("/history")
async def get_chat_history():
    import json
    from app.core.config import CHAT_HISTORY_FILE

    if not os.path.exists(CHAT_HISTORY_FILE):
        return {"history": []}

    with open(CHAT_HISTORY_FILE, "r") as f:
        history = json.load(f)

    return {"history": history}

# ── Clear Chat History ────────────────────
@router.delete("/history")
async def clear_chat_history():
    import json
    from app.core.config import CHAT_HISTORY_FILE

    with open(CHAT_HISTORY_FILE, "w") as f:
        json.dump([], f)

    return {"message": "✅ Chat history cleared"}