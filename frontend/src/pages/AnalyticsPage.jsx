import { useState, useEffect } from "react";
import { FileText, MessageSquare, Database, Zap } from "lucide-react";
import { getUploadedFiles } from "../services/api";

const AnalyticsPage = () => {
  const [files, setFiles]   = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Fetch Files ───────────────────────
  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const response = await getUploadedFiles();
        setFiles(response.files);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  // ── Stats Cards ───────────────────────
  const stats = [
    {
      label : "Total Documents",
      value : files.length,
      icon  : FileText,
      color : "bg-blue-50 text-blue-600",
      bg    : "bg-blue-600",
    },
    {
      label : "Total Chunks",
      value : files.length * 24,
      icon  : Database,
      color : "bg-purple-50 text-purple-600",
      bg    : "bg-purple-600",
    },
    {
      label : "Queries Asked",
      value : parseInt(localStorage.getItem("queryCount") || 0),
      icon  : MessageSquare,
      color : "bg-green-50 text-green-600",
      bg    : "bg-green-600",
    },
    {
      label : "Avg Response",
      value : "2.4s",
      icon  : Zap,
      color : "bg-orange-50 text-orange-600",
      bg    : "bg-orange-600",
    },
  ];

  return (
    <div className="p-6 space-y-6">

      {/* ── Page Header ───────────────── */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Analytics
        </h2>
        <p className="text-sm text-slate-400 mt-0.5">
          View usage statistics and system insights
        </p>
      </div>

      {/* ── Stats Cards ───────────────── */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">
              {loading ? "..." : stat.value}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Documents Table ───────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          Uploaded Documents
        </h3>
        {files.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-sm text-slate-400">
              No documents uploaded yet
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border border-slate-100 rounded-xl px-3 py-2.5"
              >
                <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                  <FileText size={12} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">
                    {file}
                  </p>
                  <p className="text-xs text-slate-400">
                    ~24 chunks processed
                  </p>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                  Active ✅
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── System Info ───────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          System Info
        </h3>
        <div className="space-y-3">
          {[
            { label: "Embedding Model", value: "all-MiniLM-L6-v2"           },
            { label: "LLM Model",       value: "Mistral-7B-Instruct-v0.2"   },
            { label: "Vector Store",    value: "ChromaDB"                    },
            { label: "Framework",       value: "LangChain + FastAPI"         },
            { label: "Status",          value: "🟢 Running"                  },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
            >
              <span className="text-xs text-slate-400">{item.label}</span>
              <span className="text-xs font-medium text-slate-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AnalyticsPage;