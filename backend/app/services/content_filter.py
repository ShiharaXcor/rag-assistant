from better_profanity import profanity
from app.core.config import CONTENT_FILTER_ENABLED

# ── Load Profanity Filter ─────────────────
profanity.load_censor_words()

# ── Sensitive Keywords to Block ───────────
SENSITIVE_KEYWORDS = [
    # Company sensitive data
    "salary", "payroll", "confidential", "secret",
    "password", "credentials", "private key", "api key",
    "bank account", "credit card", "ssn", "social security",

    # Explicit content
    "porn", "nude", "explicit", "adult content",

    # Harmful content
    "hack", "exploit", "malware", "virus",
]

# ── Check Question ────────────────────────
def filter_question(question: str) -> dict:
    if not CONTENT_FILTER_ENABLED:
        return {"allowed": True, "reason": None}

    question_lower = question.lower()

    # check profanity
    if profanity.contains_profanity(question):
        return {
            "allowed": False,
            "reason": "Your question contains inappropriate language. Please rephrase."
        }

    # check sensitive keywords
    for keyword in SENSITIVE_KEYWORDS:
        if keyword in question_lower:
            return {
                "allowed": False,
                "reason": f"Your question contains sensitive content: '{keyword}'. This chatbot is for company knowledge only."
            }

    return {"allowed": True, "reason": None}

# ── Check Document Content ────────────────
def filter_document_content(content: str) -> dict:
    if not CONTENT_FILTER_ENABLED:
        return {"allowed": True, "reason": None}

    content_lower = content.lower()

    # check sensitive keywords in document
    for keyword in SENSITIVE_KEYWORDS:
        if keyword in content_lower:
            return {
                "allowed": False,
                "reason": f"Document contains sensitive content: '{keyword}'"
            }

    return {"allowed": True, "reason": None}

# ── Sanitize Answer ───────────────────────
def sanitize_answer(answer: str) -> str:
    if not CONTENT_FILTER_ENABLED:
        return answer

    # censor any profanity in the answer
    return profanity.censor(answer)