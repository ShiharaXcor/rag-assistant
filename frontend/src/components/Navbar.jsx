import { useLocation } from "react-router-dom";
import { MessageSquare, FileText, BarChart2, Settings } from "lucide-react";

// ── Page Titles ───────────────────────────
const pageTitles = {
  "/"          : { title: "AI Chat Assistant",  icon: MessageSquare, desc: "Ask questions from your company documents"  },
  "/documents" : { title: "Documents",          icon: FileText,      desc: "Upload and manage your PDF documents"       },
  "/analytics" : { title: "Analytics",          icon: BarChart2,     desc: "View usage statistics and insights"         },
  "/settings"  : { title: "Settings",           icon: Settings,      desc: "Configure your RAG Assistant"               },
};

const Navbar = () => {
  const location = useLocation();
  const page     = pageTitles[location.pathname] || pageTitles["/"];
  const Icon     = page.icon;

  return (
    <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">

      {/* ── Left — Page Title ─────────── */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
          <Icon className="text-primary-600" size={16} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-slate-800">
            {page.title}
          </h2>
          <p className="text-xs text-slate-400">
            {page.desc}
          </p>
        </div>
      </div>

      {/* ── Right — Status ────────────── */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs text-slate-500 font-medium">
          API Connected
        </span>
      </div>

    </div>
  );
};

export default Navbar;