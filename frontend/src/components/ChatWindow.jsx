import { useRef, useEffect, useState } from "react";
import { Send, Trash2, Bot, Loader } from "lucide-react";
import { useChat } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
  const { messages, isLoading, error, handleSendMessage, handleClearHistory } = useChat();
  const [input, setInput]   = useState("");
  const bottomRef           = useRef(null);

  // ── Auto Scroll ───────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Send Message ──────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSendMessage(input.trim());
    setInput("");
  };

  // ── Handle Enter Key ──────────────────
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* ── Chat Header ───────────────── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-slate-500 font-medium">
            {messages.length} messages
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
            Clear history
          </button>
        )}
      </div>

      {/* ── Messages Area ─────────────── */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">

        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-16 h-16 bg-primary-50 rounded-3xl flex items-center justify-center">
              <Bot size={28} className="text-primary-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-700">
                Ask me anything!
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Upload your company PDFs and start asking questions.
              </p>
            </div>

            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {[
                "What is the leave policy?",
                "Summarize the document",
                "What are the company values?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSendMessage(suggestion)}
                  className="text-xs bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-primary-400 hover:text-primary-600 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Loading */}
        {isLoading && (
          <div className="flex gap-3 mb-6">
            <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
              <Bot size={16} className="text-primary-600" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <Loader size={16} className="text-primary-600 animate-spin" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input Area ────────────────── */}
      <div className="px-6 py-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-3"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your documents..."
            rows={1}
            className="flex-1 resize-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-10 h-10 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Send size={16} />
          </button>
        </form>
        <p className="text-xs text-slate-400 mt-2 text-center">
          Press Enter to send · Shift + Enter for new line
        </p>
      </div>

    </div>
  );
};

export default ChatWindow;