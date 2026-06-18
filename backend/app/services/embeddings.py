import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))

from langchain_huggingface import HuggingFaceEmbeddings
from app.core.config import HUGGINGFACE_API_KEY, EMBEDDING_MODEL

#Load Embedding Model 
def get_embeddings():
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True}
    )
    print(f"✅ Embedding model loaded: {EMBEDDING_MODEL}")
    return embeddings

# Embed Single Text 
def embed_text(text: str):
    embeddings = get_embeddings()
    vector = embeddings.embed_query(text)
    print(f"✅ Text embedded: vector size {len(vector)}")
    return vector

# Embed Multiple Texts 
def embed_documents(texts: list):
    embeddings = get_embeddings()
    vectors = embeddings.embed_documents(texts)
    print(f"✅ Embedded {len(vectors)} documents")
    return vectors