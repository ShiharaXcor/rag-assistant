import axios from "axios";

// ── Base URL ──────────────────────────────
const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Upload PDFs ───────────────────────────
export const uploadPDFs = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });
  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ── Get Uploaded Files ────────────────────
export const getUploadedFiles = async () => {
  const response = await api.get("/files");
  return response.data;
};

// ── Delete All Files ──────────────────────
export const deleteAllFiles = async () => {
  const response = await api.delete("/files");
  return response.data;
};

// ── Send Chat Message ─────────────────────
export const sendMessage = async (question, chatHistory = []) => {
  const response = await api.post("/chat", {
    question,
    chat_history: chatHistory,
  });
  return response.data;
};

// ── Get Chat History ──────────────────────
export const getChatHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};

// ── Clear Chat History ────────────────────
export const clearChatHistory = async () => {
  const response = await api.delete("/history");
  return response.data;
};