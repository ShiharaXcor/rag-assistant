import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { Upload, FileText, X, CheckCircle, Loader } from "lucide-react";
import { uploadPDFs } from "../services/api";

const FileUploader = ({ onUploadSuccess }) => {
  const [files, setFiles]       = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess]   = useState(false);
  const [error, setError]       = useState(null);

  // ── Dropzone ──────────────────────────
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept : { "application/pdf": [".pdf"] },
    maxFiles: 5,
    onDrop : (acceptedFiles) => {
      setFiles(acceptedFiles);
      setSuccess(false);
      setError(null);
    },
  });

  // ── Remove File ───────────────────────
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Upload Files ──────────────────────
  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);
    setError(null);

    try {
      const response = await uploadPDFs(files);
      setSuccess(true);
      setFiles([]);
      if (onUploadSuccess) onUploadSuccess(response);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "❌ Upload failed. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* ── Drop Zone ─────────────────── */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragActive
            ? "border-primary-500 bg-primary-50"
            : "border-slate-200 hover:border-primary-400 hover:bg-slate-50"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center">
            <Upload size={22} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">
              {isDragActive ? "Drop PDFs here..." : "Drag & drop PDFs here"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              or click to browse — max 5 files, 20MB each
            </p>
          </div>
        </div>
      </div>

      {/* ── File List ─────────────────── */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3 py-2.5"
            >
              <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={12} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ── Success Message ───────────── */}
      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <CheckCircle size={16} className="text-green-500" />
          <p className="text-sm text-green-700 font-medium">
            ✅ Files uploaded and processed successfully!
          </p>
        </div>
      )}

      {/* ── Error Message ─────────────── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* ── Upload Button ─────────────── */}
      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white text-sm font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader size={16} className="animate-spin" />
              Processing PDFs...
            </>
          ) : (
            <>
              <Upload size={16} />
              Upload {files.length} file{files.length > 1 ? "s" : ""}
            </>
          )}
        </button>
      )}

    </div>
  );
};

export default FileUploader;