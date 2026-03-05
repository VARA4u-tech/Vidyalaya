import { motion } from "framer-motion";
import { Trophy, Crown, Medal, Star, TrendingUp } from "lucide-react";

const users = [
  {
    rank: 1,
    name: "Priya Sharma",
    xp: 4820,
    streak: 21,
    badges: 12,
    avatar: "P",
    color: "hsl(9,70%,54%)",
  },
  {
    rank: 2,
    name: "Aarav Patel",
    xp: 4230,
    streak: 18,
    badges: 9,
    avatar: "A",
    color: "hsl(185,48%,50%)",
  },
  {
    rank: 3,
    name: "Sneha Reddy",
    xp: 3980,
    streak: 15,
    badges: 8,
    avatar: "S",
    color: "hsl(265,60%,60%)",
  },
  {
    rank: 4,
    name: "You",
    xp: 3650,
    streak: 7,
    badges: 6,
    avatar: "Y",
    color: "hsl(34,60%,55%)",
    isYou: true,
  },
  {
    rank: 5,
    name: "Rohan Gupta",
    xp: 3320,
    streak: 10,
    badges: 7,
    avatar: "R",
    color: "hsl(142,60%,50%)",
  },
  {
    rank: 6,
    name: "Meera Nair",
    xp: 2980,
    streak: 4,
    badges: 5,
    avatar: "M",
    color: "hsl(9,70%,54%)",
  },
  {
    rank: 7,
    name: "Kiran Kumar",
    xp: 2750,
    streak: 6,
    badges: 4,
    avatar: "K",
    color: "hsl(185,48%,50%)",
  },
];

const RANK_ICONS: Record<number, React.ReactNode> = {
  1: <Crown size={18} style={{ color: "hsl(45,95%,55%)" }} />,
  2: <Medal size={18} style={{ color: "hsl(0,0%,75%)" }} />,
  3: <Medal size={18} style={{ color: "hsl(30,80%,55%)" }} />,
};

const LeaderboardPage = () => (
  <div className="max-w-3xl mx-auto">
    <div className="mb-6 md:mb-8">
      <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
        Leaderboard
      </h1>
      <p className="text-[hsl(36,15%,58%)] text-sm">
        Compete with peers and celebrate top learners.
      </p>
    </div>

    {/* Top 3 Podium */}
    <div className="flex items-end justify-center gap-3 mb-10">
      {[users[1], users[0], users[2]].map((u, i) => {
        const heights = ["h-28", "h-36", "h-24"];
        const sizes = ["w-14 h-14", "w-18 h-18", "w-14 h-14"];
        return (
          <motion.div
            key={u.rank}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-2 flex-1 max-w-[120px]"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl font-serif"
              style={{ backgroundColor: u.color }}
            >
              {u.avatar}
            </div>
            <p className="text-[hsl(36,25%,85%)] text-xs font-semibold text-center truncate w-full px-1">
              {u.name}
            </p>
            <p className="text-[hsl(36,15%,50%)] text-xs">
              {u.xp.toLocaleString()} XP
            </p>
            <div
              className={`w-full rounded-t-xl flex items-end justify-center pb-3 ${heights[i]}`}
              style={{
                background: `linear-gradient(to top, ${u.color}50, ${u.color}18)`,
                border: `1px solid ${u.color}40`,
              }}
            >
              <span
                className="font-serif font-bold text-2xl"
                style={{ color: u.color }}
              >
                #{u.rank}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>

    {/* Full Ranking */}
    <div className="flex flex-col gap-2">
      {users.map((u, i) => (
        <motion.div
          key={u.rank}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.06 }}
          className={`flex items-center gap-3 md:gap-4 rounded-2xl p-3 md:p-4 border transition-all ${u.isYou ? "border-[hsl(34,60%,55%)] bg-[hsla(34,60%,55%,0.08)]" : "border-[hsla(36,25%,90%,0.07)] bg-[hsla(210,50%,24%,0.5)]"}`}
        >
          {/* Rank */}
          <div className="w-8 flex items-center justify-center flex-shrink-0">
            {RANK_ICONS[u.rank] ?? (
              <span className="text-[hsl(36,15%,50%)] text-sm font-bold">
                #{u.rank}
              </span>
            )}
          </div>

          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold font-serif flex-shrink-0"
            style={{ backgroundColor: u.color + "cc" }}
          >
            {u.avatar}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-[hsl(36,25%,88%)] text-sm">
              {u.name}{" "}
              {u.isYou && (
                <span className="text-[hsl(34,60%,65%)] text-xs">(you)</span>
              )}
            </p>
            <p className="text-[hsl(36,15%,50%)] text-xs">
              🔥 {u.streak} day streak · ⭐ {u.badges} badges
            </p>
          </div>

          {/* XP Bar */}
          <div className="hidden sm:block w-24 md:w-36">
            <div className="h-1.5 rounded-full bg-[hsla(36,25%,90%,0.07)] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: u.color }}
                initial={{ width: 0 }}
                animate={{ width: `${(u.xp / 5000) * 100}%` }}
                transition={{ delay: 0.5 + i * 0.06 }}
              />
            </div>
            <p className="text-[hsl(36,15%,48%)] text-[10px] mt-1 text-right">
              {u.xp.toLocaleString()} XP
            </p>
          </div>

          {u.rank <= 3 && (
            <Star
              size={14}
              style={{ color: u.color }}
              className="flex-shrink-0 fill-current"
            />
          )}
          {u.isYou && (
            <TrendingUp
              size={14}
              style={{ color: "hsl(142,60%,55%)" }}
              className="flex-shrink-0"
            />
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

export default LeaderboardPage;
