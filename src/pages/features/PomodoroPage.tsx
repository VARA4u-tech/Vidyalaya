import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Settings } from "lucide-react";

type Mode = "focus" | "short" | "long";

const DEFAULTS: Record<Mode, number> = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};
const LABELS: Record<Mode, string> = {
  focus: "Focus",
  short: "Short Break",
  long: "Long Break",
};
const COLORS: Record<Mode, string> = {
  focus: "hsl(9,70%,54%)",
  short: "hsl(185,48%,50%)",
  long: "hsl(265,60%,60%)",
};

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const PomodoroPage = () => {
  const [mode, setMode] = useState<Mode>("focus");
  const [timeLeft, setTimeLeft] = useState(DEFAULTS.focus);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [durations, setDurations] = useState(DEFAULTS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            if (mode === "focus") setSessions((s) => s + 1);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running, mode]);

  const switchMode = (m: Mode) => {
    setMode(m);
    setTimeLeft(durations[m]);
    setRunning(false);
  };
  const reset = () => {
    setTimeLeft(durations[mode]);
    setRunning(false);
  };
  const progress = 1 - timeLeft / durations[mode];
  const r = 110;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
          Pomodoro Timer
        </h1>
        <p className="text-[hsl(36,15%,58%)] text-sm">
          Stay focused with timed study sessions.
        </p>
      </div>

      {/* Mode Buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {(Object.keys(LABELS) as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${mode === m ? "text-white shadow-lg" : "bg-[hsla(210,50%,24%,0.5)] text-[hsl(36,20%,60%)] hover:text-white"}`}
            style={mode === m ? { backgroundColor: COLORS[m] } : {}}
          >
            {LABELS[m]}
          </button>
        ))}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="ml-auto p-2 rounded-xl text-[hsl(36,20%,55%)] hover:text-white bg-[hsla(210,50%,24%,0.5)] transition-all"
        >
          <Settings size={16} />
        </button>
      </div>

      {/* Settings */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl p-5 border border-[hsla(36,25%,90%,0.08)]"
          style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
        >
          <p className="font-semibold text-[hsl(36,25%,80%)] mb-4 text-sm">
            Durations (minutes)
          </p>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(LABELS) as Mode[]).map((m) => (
              <div key={m}>
                <label className="text-[hsl(36,15%,55%)] text-xs mb-1 block">
                  {LABELS[m]}
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={durations[m] / 60}
                  onChange={(e) => {
                    const val = Math.max(1, Number(e.target.value)) * 60;
                    setDurations((d) => ({ ...d, [m]: val }));
                    if (mode === m) setTimeLeft(val);
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Timer Circle */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <svg
            width={280}
            height={280}
            viewBox="0 0 280 280"
            className="rotate-[-90deg]"
          >
            <circle
              cx={140}
              cy={140}
              r={r}
              fill="none"
              stroke="hsla(36,25%,90%,0.07)"
              strokeWidth={10}
            />
            <circle
              cx={140}
              cy={140}
              r={r}
              fill="none"
              stroke={COLORS[mode]}
              strokeWidth={10}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="font-serif font-bold text-[hsl(36,28%,95%)] text-5xl tracking-tight">
              {fmt(timeLeft)}
            </p>
            <p className="text-[hsl(36,15%,55%)] text-sm mt-1">
              {LABELS[mode]}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={reset}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-[hsla(210,50%,24%,0.5)] text-[hsl(36,20%,55%)] hover:text-white transition-all"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={() => setRunning(!running)}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-105"
            style={{ backgroundColor: COLORS[mode] }}
          >
            {running ? (
              <Pause size={26} />
            ) : (
              <Play size={26} className="ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Session count */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${i < sessions % 4 ? "scale-110" : ""}`}
              style={{
                backgroundColor:
                  i < sessions % 4 ? COLORS.focus : "hsla(36,25%,90%,0.1)",
              }}
            />
          ))}
        </div>
        <span className="text-[hsl(36,15%,55%)] text-sm">
          {sessions} sessions completed today
        </span>
      </div>
    </div>
  );
};

export default PomodoroPage;
