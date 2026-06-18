import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))

from langchain_community.vectorstores import Chroma
from app.services.embeddings import get_embeddings
from app.core.config import VECTORSTORE_DIR

# Collection Name 
COLLECTION_NAME = "company_docs"

# Get Vector Store 
def get_vector_store():
    embeddings = get_embeddings()
    vector_store = Chroma(
        collection_name=COLLECTION_NAME,
        embedding_function=embeddings,
        persist_directory=VECTORSTORE_DIR
    )
    print(f"✅ Vector store loaded from {VECTORSTORE_DIR}")
    return vector_store

# Save Chunks to Vector Store 
def save_to_vector_store(chunks: list):
    embeddings = get_embeddings()
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name=COLLECTION_NAME,
        persist_directory=VECTORSTORE_DIR
    )
    print(f"✅ Saved {len(chunks)} chunks to vector store")
    return vector_store

# Search Vector Store 
def search_vector_store(query: str, k: int = 4):
    vector_store = get_vector_store()

    # search with similarity score
    results = vector_store.similarity_search_with_score(
        query=query,
        k=k
    )

    # format results
    formatted = []
    for doc, score in results:
        formatted.append({
            "content"   : doc.page_content,
            "metadata"  : doc.metadata,
            "file_name" : doc.metadata.get("file_name", "unknown"),
            "page"      : doc.metadata.get("page", 0),
            "score"     : round(float(score), 4)
        })

    print(f"✅ Found {len(formatted)} results for query")
    return formatted

# Delete Vector Store 
def delete_vector_store():
    import shutil
    if os.path.exists(VECTORSTORE_DIR):
        shutil.rmtree(VECTORSTORE_DIR)
        print("✅ Vector store deleted")
    else:
        print("⚠️ No vector store found")

# Get Document Count
def get_document_count():
    vector_store = get_vector_store()
    count = vector_store._collection.count()
    print(f"✅ Total documents in store: {count}")
    return count