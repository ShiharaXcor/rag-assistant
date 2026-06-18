import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import DocumentsPage from "./pages/DocumentsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

const App = () => {
  return (
    <BrowserRouter>
      <ChatProvider>
        <div className="flex h-screen bg-slate-50 overflow-hidden">

          {/* ── Sidebar ───────────────── */}
          <Sidebar />

          {/* ── Main Content ──────────── */}
          <div className="flex-1 flex flex-col ml-64">

            {/* Navbar */}
            <Navbar />

            {/* Pages */}
            <main className="flex-1 overflow-y-auto mt-16">
              <Routes>
                <Route path="/"          element={<ChatPage />}      />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings"  element={<SettingsPage />}  />
              </Routes>
            </main>

          </div>
        </div>
      </ChatProvider>
    </BrowserRouter>
  );
};

export default App;