import os
from dotenv import load_dotenv

#Load .env file 
load_dotenv()

# API Keys 
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")

# Models 
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
LLM_MODEL       = os.getenv("LLM_MODEL",       "mistralai/Mistral-7B-Instruct-v0.2")

# ── File Upload Settings 
MAX_FILE_SIZE_MB = int(os.getenv("MAX_FILE_SIZE_MB", 20))
MAX_FILES        = int(os.getenv("MAX_FILES", 10))

# Chunking Settings
CHUNK_SIZE    = int(os.getenv("CHUNK_SIZE", 500))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", 50))

# Security 
CONTENT_FILTER_ENABLED = os.getenv("CONTENT_FILTER_ENABLED", "true").lower() == "true"

# Directories 
UPLOAD_DIR        = "uploads"
VECTORSTORE_DIR   = "vectorstore"
CHAT_HISTORY_FILE = "chat_history.json"

# Create Directories if not exist
os.makedirs(UPLOAD_DIR,      exist_ok=True)
os.makedirs(VECTORSTORE_DIR, exist_ok=True)