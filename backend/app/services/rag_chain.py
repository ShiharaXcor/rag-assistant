import os
import sys
import time
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))

from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory
from langchain_community.llms import HuggingFaceHub
from app.services.vector_store import get_vector_store
from app.services.content_filter import filter_question, sanitize_answer
from app.models.schemas import ChatResponse, SourceDocument
from app.core.config import HUGGINGFACE_API_KEY, LLM_MODEL
import os

os.environ["HUGGINGFACEHUB_API_TOKEN"] = HUGGINGFACE_API_KEY

# ── Load LLM ──────────────────────────────
def get_llm():
    llm = HuggingFaceHub(
        repo_id=LLM_MODEL,
        model_kwargs={
            "temperature" : 0.3,
            "max_length"  : 512,
            "max_new_tokens": 256
        }
    )
    print(f"✅ LLM loaded: {LLM_MODEL}")
    return llm

# ── Build RAG Chain ───────────────────────
def get_rag_chain():
    vector_store = get_vector_store()
    retriever    = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 4}
    )

    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True,
        output_key="answer"
    )

    chain = ConversationalRetrievalChain.from_llm(
        llm=get_llm(),
        retriever=retriever,
        memory=memory,
        return_source_documents=True,
        verbose=False
    )
    print("✅ RAG chain ready")
    return chain

# ── Ask Question ──────────────────────────
def ask_question(question: str, chat_history: list = []):
    start_time = time.time()

    # check content filter
    filter_result = filter_question(question)
    if not filter_result["allowed"]:
        return {
            "answer"          : filter_result["reason"],
            "sources"         : [],
            "processing_time" : 0.0
        }

    try:
        chain    = get_rag_chain()
        response = chain.invoke({
            "question"     : question,
            "chat_history" : chat_history
        })

        # get answer
        answer = sanitize_answer(response["answer"])

        # get source documents
        sources = []
        for doc in response.get("source_documents", []):
            sources.append({
                "file_name"       : doc.metadata.get("file_name", "unknown"),
                "page_number"     : doc.metadata.get("page", 0),
                "content_preview" : doc.page_content[:200],
                "similarity_score": 0.0
            })

        processing_time = round(time.time() - start_time, 2)

        print(f"✅ Answer generated in {processing_time}s")

        return {
            "answer"          : answer,
            "sources"         : sources,
            "processing_time" : processing_time
        }

    except Exception as e:
        print(f"❌ Error generating answer: {e}")
        return {
            "answer"          : "Sorry I could not find an answer. Please try again.",
            "sources"         : [],
            "processing_time" : 0.0
        }