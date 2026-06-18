# ── Base Image ────────────────────────────
FROM python:3.12-slim

# ── Set Working Directory ─────────────────
WORKDIR /app

# ── Install System Dependencies ───────────
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# ── Copy Requirements ─────────────────────
COPY requirements.txt .

# ── Install Python Dependencies ───────────
RUN pip install --no-cache-dir -r requirements.txt

# ── Copy App Code ─────────────────────────
COPY . .

# ── Create Directories ────────────────────
RUN mkdir -p uploads vectorstore data

# ── Expose Port ───────────────────────────
EXPOSE 8000

# ── Run App ───────────────────────────────
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]