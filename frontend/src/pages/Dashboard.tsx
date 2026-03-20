import { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Timer,
  Youtube,
  FolderOpen,
  Users,
  Store,
  Bell,
  FileDown,
  GitBranch,
  Mic,
  Camera,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";

// Feature pages
import FlashcardPage from "./features/FlashcardPage";
import ProgressPage from "./features/ProgressPage";
import PomodoroPage from "./features/PomodoroPage";
import FoldersPage from "./features/FoldersPage";
import SpacedRepPage from "./features/SpacedRepPage";
import StudyGroupsPage from "./features/StudyGroupsPage";
import MarketplacePage from "./features/MarketplacePage";
import RemindersPage from "./features/RemindersPage";
import ExportPage from "./features/ExportPage";
import MindMapPage from "./features/MindMapPage";
import AudioNotesPage from "./features/AudioNotesPage";
import HandwritingPage from "./features/HandwritingPage";
import ExamCountdownPage from "./features/ExamCountdownPage";
import DashboardHome from "./features/DashboardHome";

interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "" },
  { label: "Flashcards", icon: BookOpen, path: "flashcards" },
  { label: "Progress", icon: Brain, path: "progress" },
  { label: "Pomodoro Timer", icon: Timer, path: "pomodoro" },
  { label: "Folders", icon: FolderOpen, path: "folders" },
  { label: "Spaced Repetition", icon: Calendar, path: "spaced-rep" },
  { label: "Study Groups", icon: Users, path: "groups" },
  { label: "Marketplace", icon: Store, path: "marketplace" },
  { label: "Reminders", icon: Bell, path: "reminders" },
  { label: "PDF Export", icon: FileDown, path: "export" },
  { label: "Mind Map", icon: GitBranch, path: "mindmap" },
  { label: "Audio Notes", icon: Mic, path: "audio-notes" },
  { label: "Handwriting OCR", icon: Camera, path: "handwriting" },
  { label: "Exam Countdown", icon: Calendar, path: "exam-countdown" },
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`flex flex-col h-full bg-[hsl(210,48%,20%)] border-r border-[hsla(36,25%,90%,0.07)] transition-all duration-300 ${
        mobile ? "w-72" : collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[hsla(36,25%,90%,0.07)]">
        <img
          src="/logo.png"
          alt="Vidyalaya"
          className="w-10 h-10 object-contain flex-shrink-0"
        />
        {(!collapsed || mobile) && (
          <span className="font-serif font-bold text-[hsl(36,28%,92%)] text-lg">
            Vidyalaya
          </span>
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto text-[hsl(36,20%,65%)] hover:text-[hsl(36,28%,92%)] transition-colors"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path === "" ? "/app" : `/app/${item.path}`}
            end={item.path === ""}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[hsl(9,70%,54%)] text-white shadow-lg"
                  : "text-[hsl(36,20%,65%)] hover:bg-[hsla(36,25%,90%,0.06)] hover:text-[hsl(36,28%,90%)]"
              }`
            }
          >
            <item.icon size={18} className="flex-shrink-0" />
            {(!collapsed || mobile) && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Back to Home */}
      <div className="p-3 border-t border-[hsla(36,25%,90%,0.07)]">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[hsl(36,20%,55%)] hover:text-[hsl(36,28%,90%)] hover:bg-[hsla(36,25%,90%,0.06)] transition-all"
        >
          <ChevronLeft size={18} className="flex-shrink-0" />
          {(!collapsed || mobile) && <span>Back to Home</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ backgroundColor: "hsl(210, 48%, 15%)" }}
    >
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 h-full z-50 md:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-[hsla(36,25%,90%,0.07)] bg-[hsl(210,48%,20%)]">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-[hsl(36,28%,90%)] hover:text-white transition-colors"
          >
            <Menu size={22} />
          </button>
          <img
            src="/logo.png"
            alt="Vidyalaya"
            className="w-8 h-8 object-contain"
          />
          <span className="font-serif font-bold text-[hsl(36,28%,92%)]">
            Vidyalaya
          </span>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="flashcards" element={<FlashcardPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="pomodoro" element={<PomodoroPage />} />
            <Route path="folders" element={<FoldersPage />} />
            <Route path="spaced-rep" element={<SpacedRepPage />} />
            <Route path="groups" element={<StudyGroupsPage />} />
            <Route path="marketplace" element={<MarketplacePage />} />
            <Route path="reminders" element={<RemindersPage />} />
            <Route path="export" element={<ExportPage />} />
            <Route path="mindmap" element={<MindMapPage />} />
            <Route path="audio-notes" element={<AudioNotesPage />} />
            <Route path="handwriting" element={<HandwritingPage />} />
            <Route path="exam-countdown" element={<ExamCountdownPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
