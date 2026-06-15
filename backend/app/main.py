import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../..'))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import upload, chat

# Create FastAPI App 
app = FastAPI(
    title       = "RAG Chatbot API",
    description = "AI Chatbot powered by LangChain and HuggingFace",
    version     = "1.0.0"
)

#  CORS Middleware 
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["http://localhost:3000"],
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"]
)

# Include Routers
app.include_router(
    upload.router,
    prefix = "/api",
    tags   = ["Upload"]
)

app.include_router(
    chat.router,
    prefix = "/api",
    tags   = ["Chat"]
)

#  Root Endpoint
@app.get("/")
async def root():
    return {
        "message" : "✅ RAG Chatbot API is running",
        "docs"    : "http://localhost:8000/docs",
        "version" : "1.0.0"
    }

# Health Check 
@app.get("/health")
async def health():
    return {
        "status"  : "healthy",
        "message" : "✅ All systems running"
    }