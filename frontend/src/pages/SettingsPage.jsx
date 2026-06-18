import { useState } from "react";
import { Save, RefreshCw } from "lucide-react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    chunkSize      : 500,
    chunkOverlap   : 50,
    maxFiles       : 5,
    maxFileSizeMB  : 20,
    contentFilter  : true,
    embeddingModel : "sentence-transformers/all-MiniLM-L6-v2",
    llmModel       : "mistralai/Mistral-7B-Instruct-v0.2",
  });

  const [saved, setSaved] = useState(false);

  // ── Handle Change ─────────────────────
  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  // ── Save Settings ─────────────────────
  const handleSave = () => {
    localStorage.setItem("rag_settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // ── Reset Settings ────────────────────
  const handleReset = () => {
    setSettings({
      chunkSize      : 500,
      chunkOverlap   : 50,
      maxFiles       : 5,
      maxFileSizeMB  : 20,
      contentFilter  : true,
      embeddingModel : "sentence-transformers/all-MiniLM-L6-v2",
      llmModel       : "mistralai/Mistral-7B-Instruct-v0.2",
    });
    setSaved(false);
  };

  return (
    <div className="p-6 space-y-6">

      {/* ── Page Header ───────────────── */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800">Settings</h2>
        <p className="text-sm text-slate-400 mt-0.5">
          Configure your RAG Assistant
        </p>
      </div>

      {/* ── Model Settings ────────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">
          Model Configuration
        </h3>

        {/* Embedding Model */}
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1.5 block">
            Embedding Model
          </label>
          <select
            value={settings.embeddingModel}
            onChange={(e) => handleChange("embeddingModel", e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="sentence-transformers/all-MiniLM-L6-v2">
              all-MiniLM-L6-v2 (Recommended)
            </option>
            <option value="sentence-transformers/all-mpnet-base-v2">
              all-mpnet-base-v2 (More Accurate)
            </option>
          </select>
        </div>

        {/* LLM Model */}
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1.5 block">
            LLM Model
          </label>
          <select
            value={settings.llmModel}
            onChange={(e) => handleChange("llmModel", e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="mistralai/Mistral-7B-Instruct-v0.2">
              Mistral-7B-Instruct (Recommended)
            </option>
            <option value="google/flan-t5-large">
              Flan-T5-Large (Faster)
            </option>
          </select>
        </div>
      </div>

      {/* ── Chunking Settings ─────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">
          Chunking Settings
        </h3>

        {/* Chunk Size */}
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1.5 block">
            Chunk Size — {settings.chunkSize}
          </label>
          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={settings.chunkSize}
            onChange={(e) => handleChange("chunkSize", Number(e.target.value))}
            className="w-full accent-primary-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>100</span>
            <span>1000</span>
          </div>
        </div>

        {/* Chunk Overlap */}
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1.5 block">
            Chunk Overlap — {settings.chunkOverlap}
          </label>
          <input
            type="range"
            min={0}
            max={200}
            step={10}
            value={settings.chunkOverlap}
            onChange={(e) => handleChange("chunkOverlap", Number(e.target.value))}
            className="w-full accent-primary-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0</span>
            <span>200</span>
          </div>
        </div>
      </div>

      {/* ── Upload Settings ───────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">
          Upload Settings
        </h3>

        {/* Max Files */}
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1.5 block">
            Max Files — {settings.maxFiles}
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={settings.maxFiles}
            onChange={(e) => handleChange("maxFiles", Number(e.target.value))}
            className="w-full accent-primary-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        {/* Max File Size */}
        <div>
          <label className="text-xs font-medium text-slate-600 mb-1.5 block">
            Max File Size — {settings.maxFileSizeMB}MB
          </label>
          <input
            type="range"
            min={5}
            max={50}
            step={5}
            value={settings.maxFileSizeMB}
            onChange={(e) => handleChange("maxFileSizeMB", Number(e.target.value))}
            className="w-full accent-primary-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>5MB</span>
            <span>50MB</span>
          </div>
        </div>
      </div>

      {/* ── Security Settings ─────────── */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">
          Security Settings
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">
              Content Filter
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Block explicit and sensitive content
            </p>
          </div>
          <button
            onClick={() => handleChange("contentFilter", !settings.contentFilter)}
            className={`w-11 h-6 rounded-full transition-colors ${
              settings.contentFilter ? "bg-primary-600" : "bg-slate-200"
            }`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${
              settings.contentFilter ? "translate-x-5" : "translate-x-0"
            }`} />
          </button>
        </div>
      </div>

      {/* ── Action Buttons ────────────── */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
        >
          <RefreshCw size={14} />
          Reset
        </button>
        <button
          onClick={handleSave}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          <Save size={14} />
          {saved ? "Saved! ✅" : "Save Settings"}
        </button>
      </div>

    </div>
  );
};

export default SettingsPage;