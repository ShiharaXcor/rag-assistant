# 🤖 RAG Assistant — Company Knowledge AI Chatbot

A production-ready RAG (Retrieval-Augmented Generation) chatbot that allows
companies to upload PDF documents and ask questions using AI.

![RAG Assistant](https://img.shields.io/badge/RAG-Assistant-blue)
![Python](https://img.shields.io/badge/Python-3.12-green)
![React](https://img.shields.io/badge/React-18-blue)
![LangChain](https://img.shields.io/badge/LangChain-0.3-orange)

---

## ✨ Features

- 📄 Upload multiple PDF documents
- 💬 Ask questions and get AI answers
- 🔍 Semantic search with similarity scoring
- 📌 Source highlighting — see which document answered
- 🛡️ Content filtering and security
- 💾 Chat history
- 📊 Analytics dashboard
- ⚙️ Configurable settings

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React + Vite + Tailwind CSS         |
| Backend    | FastAPI + Python                    |
| AI/ML      | LangChain + HuggingFace             |
| Embeddings | sentence-transformers/all-MiniLM-L6 |
| LLM        | Mistral-7B-Instruct                 |
| Vector DB  | ChromaDB                            |
| Container  | Docker + Docker Compose             |

---

## 🚀 Getting Started

### Prerequisites
- Python 3.12
- Node.js v22
- HuggingFace API Key

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:
```env
HUGGINGFACE_API_KEY=your_token_here
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
LLM_MODEL=mistralai/Mistral-7B-Instruct-v0.2
```

Run backend:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure