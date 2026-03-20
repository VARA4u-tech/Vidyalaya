import { motion } from "framer-motion";
import {
  BookOpen,
  Brain,
  Timer,
  ArrowRight,
  Flame,
  Target,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { SmartSummarizer } from "../../components/SmartSummarizer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface RawStatItem {
  label: string;
  value: string;
  color: string;
}

interface StatItem extends RawStatItem {
  icon: LucideIcon;
}

const iconMap: Record<string, LucideIcon> = {
  "Study Streak": Flame,
  "Cards Reviewed": BookOpen,
  "Quiz Score Avg": Target,
  "Goals Met": CheckCircle,
};

const DashboardHome = () => {
  const navigate = useNavigate();
  const [liveStats, setLiveStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data: RawStatItem[]) => {
        const statsWithIcons = data.map((item) => ({
          ...item,
          icon: iconMap[item.label] || Target,
        }));
        setLiveStats(statsWithIcons);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-3xl md:text-4xl mb-1">
          Welcome back! 👋
        </h1>
        <p className="text-[hsl(36,15%,60%)] mb-8 text-sm md:text-base">
          Here's your study overview for today.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {loading
            ? [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-white/5 animate-pulse"
                />
              ))
            : liveStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="rounded-2xl p-4 md:p-5 border border-[hsla(36,25%,90%,0.07)]"
                  style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: s.color + "29" }}
                  >
                    <s.icon size={18} style={{ color: s.color }} />
                  </div>
                  <p className="text-[hsl(36,28%,92%)] font-bold text-xl md:text-2xl font-serif">
                     {s.value}
                  </p>
                  <p className="text-[hsl(36,15%,55%)] text-xs mt-1">
                    {s.label}
                  </p>
                </motion.div>
              ))}
        </div>

        {/* AI Summarizer Integration */}
        <div className="mb-8">
          <SmartSummarizer />
        </div>

        {/* Quick Links */}
        <h2 className="font-serif font-bold text-[hsl(36,25%,85%)] text-xl mb-4">
          Quick Access
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
          {[
            {
              label: "Study Flashcards",
              path: "/app/flashcards",
              icon: BookOpen,
              color: "hsl(185,48%,50%)",
            },
            {
              label: "Start Pomodoro",
              path: "/app/pomodoro",
              icon: Timer,
              color: "hsl(9,70%,54%)",
            },
            {
              label: "View Progress",
              path: "/app/progress",
              icon: Brain,
              color: "hsl(34,60%,55%)",
            },

          ].map((q, i) => (
            <motion.button
              key={q.label}
              onClick={() => navigate(q.path)}
              className="flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-[hsla(36,25%,90%,0.07)] text-left group hover:border-[hsla(36,25%,90%,0.18)] transition-all"
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: q.color + "29" }}
              >
                <q.icon size={20} style={{ color: q.color }} />
              </div>
              <span className="font-semibold text-[hsl(36,25%,88%)] flex-1">
                {q.label}
              </span>
              <ArrowRight
                size={16}
                className="text-[hsl(36,15%,50%)] group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          ))}
        </div>

        {/* Tip */}
        <motion.div
          className="rounded-2xl p-4 md:p-6 border border-[hsla(9,70%,54%,0.25)]"
          style={{ backgroundColor: "hsla(9,70%,54%,0.08)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-[hsl(9,70%,80%)] text-sm font-semibold mb-1">
            💡 Daily Tip
          </p>
          <p className="text-[hsl(36,15%,65%)] text-sm leading-relaxed">
            Use the{" "}
            <strong className="text-[hsl(36,25%,85%)]">
              Spaced Repetition
            </strong>{" "}
            feature to review yesterday's flashcards — it's the most effective
            way to retain information long-term!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
