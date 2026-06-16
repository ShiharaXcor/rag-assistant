import { NavLink } from "react-router-dom";
import {
  MessageSquare,
  FileText,
  BarChart2,
  Settings,
  Bot,
} from "lucide-react";

// ── Nav Items ─────────────────────────────
const navItems = [
  { path: "/",          icon: MessageSquare, label: "Chat"      },
  { path: "/documents", icon: FileText,      label: "Documents" },
  { path: "/analytics", icon: BarChart2,     label: "Analytics" },
  { path: "/settings",  icon: Settings,      label: "Settings"  },
];

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col z-10">

      {/* ── Logo ───────────────────────── */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
        <div className="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
          <Bot className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-sm font-700 text-slate-800">RAG Assistant</h1>
          <p className="text-xs text-slate-400">Company Knowledge AI</p>
        </div>
      </div>

      {/* ── Nav Links ──────────────────── */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ─────────────────────── */}
      <div className="px-6 py-4 border-t border-slate-200">
        <p className="text-xs text-slate-400 text-center">
          Powered by LangChain & HuggingFace
        </p>
      </div>

    </div>
  );
};

export default Sidebar;