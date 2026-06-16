import { Bot, User, Clock, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  // ── Copy Answer ───────────────────────
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 mb-6 ${isUser ? "flex-row-reverse" : "flex-row"}`}>

      {/* ── Avatar ───────────────────── */}
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
        isUser ? "bg-primary-600" : "bg-slate-100"
      }`}>
        {isUser
          ? <User size={16} className="text-white" />
          : <Bot  size={16} className="text-primary-600" />
        }
      </div>

      {/* ── Message Content ───────────── */}
      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>

        {/* bubble */}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-primary-600 text-white rounded-tr-sm"
            : "bg-white text-slate-700 border border-slate-200 rounded-tl-sm shadow-sm"
        }`}>
          {message.content}
        </div>

        {/* ── Footer ───────────────────── */}
        <div className="flex items-center gap-3 px-1">

          {/* processing time */}
          {message.processing_time && (
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Clock size={10} />
              <span>{message.processing_time}s</span>
            </div>
          )}

          {/* copy button */}
          {!isUser && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-primary-600 transition-colors"
            >
              {copied
                ? <><CheckCheck size={10} /><span>Copied!</span></>
                : <><Copy size={10} /><span>Copy</span></>
              }
            </button>
          )}

        </div>

        {/* ── Sources ──────────────────── */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 space-y-2 w-full">
            <p className="text-xs text-slate-400 px-1 font-medium">
              Sources:
            </p>
            {message.sources.map((source, index) => (
              <div
                key={index}
                className="bg-primary-50 border border-primary-100 rounded-xl px-3 py-2"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-primary-700">
                    📄 {source.file_name}
                  </span>
                  <span className="text-xs text-primary-500 bg-primary-100 px-2 py-0.5 rounded-full">
                    Page {source.page_number}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {source.content_preview}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default MessageBubble;