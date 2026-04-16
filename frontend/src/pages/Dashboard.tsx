import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, LayoutDashboard, ChevronLeft } from "lucide-react";
import { insforge, User } from "@/lib/insforge";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data) setUser(data);
      } catch (err) {
        console.log("Dashboard auth check failed");
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await insforge.auth.signOut();
    } catch (err) {
      console.error("Unexpected error signing out:", err);
    } finally {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.includes('auth') || key?.includes('insforge') || key?.includes('token')) {
          localStorage.removeItem(key);
        }
      }
      window.location.href = "/";
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[hsl(210,48%,12%)] text-[hsl(36,25%,90%)]">
      {/* 
          CLEAN BASE FOR REDESIGN 
          This is the primary container for the new dashboard structure.
      */}
      <aside className="w-64 border-r border-white/5 bg-[hsl(210,48%,16%)] flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-lg bg-[hsl(9,70%,54%)]" />
          <span className="font-serif font-bold text-xl">Vidyalaya</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 text-white">
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard Base</span>
          </div>
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <button 
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronLeft size={18} />
            <span>Back to Home</span>
          </button>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[hsl(9,70%,60%)] hover:bg-[hsl(9,70%,54%,0.1)] transition-all"
          >
            <LogOut size={18} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-serif font-bold mb-4">Dashboard Rebirth</h1>
          <p className="text-[hsl(36,15%,65%)] leading-relaxed mb-8">
            The platform is ready for its reconstruction. All legacy structures have been cleared to make way for a premium, high-fidelity experience.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-[hsl(185,48%,50%)]">
            <span className="w-2 h-2 rounded-full bg-[hsl(185,48%,50%)] animate-pulse" />
            STANDBY FOR NEW REQUIREMENTS
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
