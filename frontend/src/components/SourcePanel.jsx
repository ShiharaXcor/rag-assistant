import { FileText, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const SourcePanel = ({ sources }) => {
  const [expanded, setExpanded] = useState(null);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">

      {/* ── Header ───────────────────── */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-primary-50 rounded-lg flex items-center justify-center">
          <FileText size={12} className="text-primary-600" />
        </div>
        <h3 className="text-sm font-semibold text-slate-700">
          Source Documents
        </h3>
        <span className="ml-auto text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full font-medium">
          {sources.length} found
        </span>
      </div>

      {/* ── Source List ───────────────── */}
      <div className="space-y-2">
        {sources.map((source, index) => (
          <div
            key={index}
            className="border border-slate-100 rounded-xl overflow-hidden"
          >

            {/* ── Source Header ─────────── */}
            <button
              onClick={() => setExpanded(expanded === index ? null : index)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors"
            >
              {/* icon */}
              <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={12} className="text-white" />
              </div>

              {/* file info */}
              <div className="flex-1 text-left">
                <p className="text-xs font-semibold text-slate-700 truncate">
                  {source.file_name}
                </p>
                <p className="text-xs text-slate-400">
                  Page {source.page_number}
                </p>
              </div>

              {/* similarity score */}
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs font-semibold text-primary-600">
                    {(source.similarity_score * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-slate-400">match</p>
                </div>

                {/* expand icon */}
                {expanded === index
                  ? <ChevronUp  size={14} className="text-slate-400" />
                  : <ChevronDown size={14} className="text-slate-400" />
                }
              </div>
            </button>

            {/* ── Expanded Content ──────── */}
            {expanded === index && (
              <div className="px-3 pb-3 bg-slate-50 border-t border-slate-100">
                <p className="text-xs text-slate-600 leading-relaxed pt-2">
                  {source.content_preview}
                </p>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};

export default SourcePanel;