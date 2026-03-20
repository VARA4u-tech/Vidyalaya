import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Plus, Trash2, Clock, BookOpen } from "lucide-react";

interface Exam {
  id: number;
  subject: string;
  date: string;
  color: string;
  notes: string;
}

const COLORS = [
  "hsl(9,70%,54%)",
  "hsl(185,48%,50%)",
  "hsl(265,60%,60%)",
  "hsl(142,60%,50%)",
  "hsl(34,60%,55%)",
];

const initialExams: Exam[] = [];

const getCountdown = (dateStr: string) => {
  const now = new Date();
  const target = new Date(dateStr);
  const diff = target.getTime() - now.getTime();
  if (diff <= 0)
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, passed: false };
};

const CountdownUnit = ({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) => (
  <div className="flex flex-col items-center">
    <div
      className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-mono font-bold text-lg md:text-xl text-white"
      style={{ backgroundColor: color + "25", border: `1px solid ${color}40` }}
    >
      <span style={{ color }}>{String(value).padStart(2, "0")}</span>
    </div>
    <span className="text-[hsl(36,15%,48%)] text-[10px] mt-1 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const ExamCard = ({
  exam,
  onDelete,
}: {
  exam: Exam;
  onDelete: (id: number) => void;
}) => {
  const [countdown, setCountdown] = useState(getCountdown(exam.date));

  useEffect(() => {
    const interval = setInterval(
      () => setCountdown(getCountdown(exam.date)),
      1000,
    );
    return () => clearInterval(interval);
  }, [exam.date]);

  const urgency =
    countdown.days <= 3
      ? "border-[hsl(9,70%,54%)]"
      : countdown.days <= 7
        ? "border-[hsl(34,60%,55%)]"
        : "border-[hsla(36,25%,90%,0.07)]";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-4 md:p-5 border ${urgency}`}
      style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
    >
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: exam.color + "25" }}
          >
            <BookOpen size={16} style={{ color: exam.color }} />
          </div>
          <div>
            <p className="font-semibold text-[hsl(36,25%,88%)]">
              {exam.subject}
            </p>
            <p className="text-[hsl(36,15%,50%)] text-xs flex items-center gap-1 mt-0.5">
              <Calendar size={10} />
              {new Date(exam.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {countdown.days <= 3 && !countdown.passed && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[hsla(9,70%,54%,0.2)] text-[hsl(9,70%,70%)] animate-pulse">
              SOON
            </span>
          )}
          {countdown.passed && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[hsla(142,60%,50%,0.2)] text-[hsl(142,60%,65%)]">
              DONE
            </span>
          )}
          <button
            onClick={() => onDelete(exam.id)}
            className="text-[hsl(36,15%,40%)] hover:text-[hsl(9,70%,65%)] transition-colors p-1"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {!countdown.passed ? (
        <div className="flex items-center gap-2 mb-3">
          <CountdownUnit
            value={countdown.days}
            label="days"
            color={exam.color}
          />
          <span className="text-[hsl(36,15%,40%)] font-bold text-lg self-start mt-2">
            :
          </span>
          <CountdownUnit
            value={countdown.hours}
            label="hrs"
            color={exam.color}
          />
          <span className="text-[hsl(36,15%,40%)] font-bold text-lg self-start mt-2">
            :
          </span>
          <CountdownUnit
            value={countdown.minutes}
            label="min"
            color={exam.color}
          />
          <span className="text-[hsl(36,15%,40%)] font-bold text-lg self-start mt-2">
            :
          </span>
          <CountdownUnit
            value={countdown.seconds}
            label="sec"
            color={exam.color}
          />
        </div>
      ) : (
        <p className="text-[hsl(142,60%,55%)] text-sm font-semibold mb-3">
          ✓ Exam passed
        </p>
      )}

      {exam.notes && (
        <p className="text-[hsl(36,15%,50%)] text-xs leading-relaxed border-t border-[hsla(36,25%,90%,0.07)] pt-3">
          {exam.notes}
        </p>
      )}
    </motion.div>
  );
};

const ExamCountdownPage = () => {
  const [exams, setExams] = useState<Exam[]>(initialExams);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    date: "",
    color: COLORS[0],
    notes: "",
  });

  const addExam = () => {
    if (!form.subject.trim() || !form.date) return;
    setExams((e) => [...e, { ...form, id: Date.now() }]);
    setForm({ subject: "", date: "", color: COLORS[0], notes: "" });
    setShowForm(false);
  };

  const sorted = [...exams].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const upcoming = sorted.filter((e) => !getCountdown(e.date).passed);
  const passed = sorted.filter((e) => getCountdown(e.date).passed);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
            Exam Countdown
          </h1>
          <p className="text-[hsl(36,15%,58%)] text-sm">
            Track exactly how much time is left before each exam.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white"
          style={{ backgroundColor: "hsl(9,70%,54%)" }}
        >
          <Plus size={15} /> Add Exam
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 rounded-2xl p-5 border border-[hsla(36,25%,90%,0.1)]"
            style={{ backgroundColor: "hsla(210,50%,24%,0.6)" }}
          >
            <p className="font-semibold text-[hsl(36,25%,80%)] mb-4">
              New Exam
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <input
                value={form.subject}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subject: e.target.value }))
                }
                placeholder="Subject name"
                className="px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,40%)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
              />
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className="px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,80%)] border border-[hsla(36,25%,90%,0.1)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
              />
            </div>
            <input
              value={form.notes}
              onChange={(e) =>
                setForm((f) => ({ ...f, notes: e.target.value }))
              }
              placeholder="Study notes / reminder (optional)"
              className="w-full mb-3 px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,40%)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
            />
            <div className="flex gap-2 mb-4">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${form.color === c ? "border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={addExam}
                className="px-4 py-2 rounded-xl bg-[hsl(9,70%,54%)] text-white text-sm font-semibold"
              >
                Add Exam
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-[hsl(36,15%,55%)] text-sm hover:text-white"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <>
          <p className="text-[hsl(36,15%,55%)] text-xs font-semibold uppercase tracking-wider mb-3">
            Upcoming ({upcoming.length})
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {upcoming.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onDelete={(id) => setExams((e) => e.filter((x) => x.id !== id))}
              />
            ))}
          </div>
        </>
      )}

      {/* Passed */}
      {passed.length > 0 && (
        <>
          <p className="text-[hsl(36,15%,45%)] text-xs font-semibold uppercase tracking-wider mb-3">
            Completed
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-50">
            {passed.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onDelete={(id) => setExams((e) => e.filter((x) => x.id !== id))}
              />
            ))}
          </div>
        </>
      )}

      {exams.length === 0 && (
        <div className="text-center py-16 text-[hsl(36,15%,45%)]">
          No exams added yet. Click "Add Exam" to get started.
        </div>
      )}
    </div>
  );
};

export default ExamCountdownPage;
