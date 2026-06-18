import { useState, useEffect } from "react";
import { FileText, Trash2, RefreshCw, AlertCircle } from "lucide-react";
import FileUploader from "../components/FileUploader";
import { getUploadedFiles, deleteAllFiles } from "../services/api";

const DocumentsPage = () => {
  const [files, setFiles]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [error, setError]         = useState(null);

  // ── Fetch Files ───────────────────────
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await getUploadedFiles();
      setFiles(response.files);
    } catch (err) {
      setError("❌ Failed to load files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // ── Delete All Files ──────────────────
  const handleDeleteAll = async () => {
    if (!window.confirm("Are you sure you want to delete all files?")) return;
    setDeleting(true);
    try {
      await deleteAllFiles();
      setFiles([]);
    } catch (err) {
      setError("❌ Failed to delete files.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* ── Page Header ───────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Document Management
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Upload and manage your company PDF documents
          </p>
        </div>
        <button
          onClick={fetchFiles}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary-600 transition-colors"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ── Upload Section ────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          Upload New Documents
        </h3>
        <FileUploader onUploadSuccess={fetchFiles} />
      </div>

      {/* ── Uploaded Files ────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">
            Uploaded Files
            <span className="ml-2 text-xs bg-primary-100 text-primary-600 px-2 py-0.5 rounded-full">
              {files.length}
            </span>
          </h3>
          {files.length > 0 && (
            <button
              onClick={handleDeleteAll}
              disabled={deleting}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={12} />
              {deleting ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            <AlertCircle size={14} className="text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* File List */}
        {loading ? (
          <div className="text-center py-8">
            <RefreshCw size={20} className="animate-spin text-primary-600 mx-auto" />
            <p className="text-sm text-slate-400 mt-2">Loading files...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FileText size={20} className="text-slate-400" />
            </div>
            <p className="text-sm text-slate-500 font-medium">
              No documents uploaded yet
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Upload PDFs above to get started
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 border border-slate-100 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={14} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {file}
                  </p>
                  <p className="text-xs text-slate-400">PDF Document</p>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">
                  Processed ✅
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default DocumentsPage;