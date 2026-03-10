import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Plus, Trash2, Clock, BookOpen } from "lucide-react";

interface Reminder {
  id: number;
  title: string;
  time: string;
  days: string[];
  subject: string;
  enabled: boolean;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialReminders: Reminder[] = [
  {
    id: 1,
    title: "Morning Study Session",
    time: "07:00",
    days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    subject: "Mathematics",
    enabled: true,
  },
  {
    id: 2,
    title: "Flashcard Review",
    time: "20:00",
    days: ["Mon", "Wed", "Fri"],
    subject: "Physics",
    enabled: true,
  },
  {
    id: 3,
    title: "Weekend Revision",
    time: "10:00",
    days: ["Sat", "Sun"],
    subject: "Biology",
    enabled: false,
  },
];

const RemindersPage = () => {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    time: "09:00",
    days: [] as string[],
    subject: "",
  });

  const toggle = (id: number) =>
    setReminders((r) =>
      r.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)),
    );
  const remove = (id: number) =>
    setReminders((r) => r.filter((x) => x.id !== id));
  const toggleDay = (day: string) =>
    setForm((f) => ({
      ...f,
      days: f.days.includes(day)
        ? f.days.filter((d) => d !== day)
        : [...f.days, day],
    }));

  const save = () => {
    if (!form.title || !form.time || form.days.length === 0) return;
    setReminders((r) => [...r, { ...form, id: Date.now(), enabled: true }]);
    setForm({ title: "", time: "09:00", days: [], subject: "" });
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 md:mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
            Study Reminders
          </h1>
          <p className="text-[hsl(36,15%,58%)] text-sm">
            Never miss a study session with smart reminders.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white"
          style={{ backgroundColor: "hsl(9,70%,54%)" }}
        >
          <Plus size={15} /> Add Reminder
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl p-5 border border-[hsla(36,25%,90%,0.1)]"
          style={{ backgroundColor: "hsla(210,50%,24%,0.6)" }}
        >
          <p className="font-semibold text-[hsl(36,25%,80%)] mb-4">
            New Reminder
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="Reminder title"
              className="px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,40%)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
            />
            <input
              value={form.subject}
              onChange={(e) =>
                setForm((f) => ({ ...f, subject: e.target.value }))
              }
              placeholder="Subject (optional)"
              className="px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,40%)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
            />
          </div>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
          />
          <div className="flex gap-2 mb-4 flex-wrap">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => toggleDay(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${form.days.includes(d) ? "text-white bg-[hsl(9,70%,54%)]" : "text-[hsl(36,15%,55%)] bg-[hsla(36,25%,90%,0.06)] hover:text-white"}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={save}
              className="px-4 py-2 rounded-xl bg-[hsl(9,70%,54%)] text-white text-sm font-semibold"
            >
              Save
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

      {/* Reminders List */}
      <div className="flex flex-col gap-3">
        {reminders.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-2xl p-4 border transition-all ${r.enabled ? "border-[hsla(36,25%,90%,0.08)]" : "border-[hsla(36,25%,90%,0.04)] opacity-50"}`}
            style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[hsla(9,70%,54%,0.15)]">
                <Bell size={16} className="text-[hsl(9,70%,65%)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="font-semibold text-[hsl(36,25%,88%)] text-sm">
                    {r.title}
                  </p>
                  {r.subject && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[hsla(185,48%,50%,0.15)] text-[hsl(185,48%,65%)]">
                      <BookOpen size={9} /> {r.subject}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={12} className="text-[hsl(36,15%,50%)]" />
                  <span className="text-[hsl(36,15%,55%)] text-xs">
                    {r.time}
                  </span>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {r.days.map((d) => (
                    <span
                      key={d}
                      className="px-2 py-0.5 rounded-full text-[10px] border border-[hsla(36,25%,90%,0.12)] text-[hsl(36,15%,55%)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggle(r.id)}
                  className={`relative w-11 h-6 rounded-full transition-all ${r.enabled ? "bg-[hsl(142,60%,45%)]" : "bg-[hsla(36,25%,90%,0.12)]"}`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${r.enabled ? "left-6" : "left-1"}`}
                  />
                </button>
                <button
                  onClick={() => remove(r.id)}
                  className="text-[hsl(36,15%,40%)] hover:text-[hsl(9,70%,65%)] transition-colors p-1"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-16 text-[hsl(36,15%,45%)]">
          No reminders set. Add one above!
        </div>
      )}
    </div>
  );
};

export default RemindersPage;
