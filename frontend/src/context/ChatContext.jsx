import { createContext, useContext, useState } from "react";
import { sendMessage, clearChatHistory } from "../services/api";

// ── Create Context ────────────────────────
const ChatContext = createContext();

// ── Chat Provider ─────────────────────────
export const ChatProvider = ({ children }) => {
  const [messages, setMessages]   = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState(null);

  // ── Send Message ──────────────────────
  const handleSendMessage = async (question) => {
    // add user message
    const userMessage = {
      id      : Date.now(),
      role    : "user",
      content : question,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // format chat history
      const chatHistory = messages.map((msg) => ({
        role    : msg.role,
        content : msg.content,
      }));

      // get answer from API
      const response = await sendMessage(question, chatHistory);

      // add AI message
      const aiMessage = {
        id              : Date.now() + 1,
        role            : "assistant",
        content         : response.answer,
        sources         : response.sources,
        processing_time : response.processing_time,
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "❌ Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ── Clear Messages ────────────────────
  const handleClearHistory = async () => {
    await clearChatHistory();
    setMessages([]);
    setError(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        error,
        handleSendMessage,
        handleClearHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// ── Use Chat Hook ─────────────────────────
export const useChat = () => useContext(ChatContext);