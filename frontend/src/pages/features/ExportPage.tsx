import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileDown,
  FileText,
  CheckSquare,
  BarChart2,
  Download,
  Loader2,
} from "lucide-react";

const exportItems = [
  {
    id: "notes",
    icon: FileText,
    label: "Study Notes",
    desc: "Export all your notes as a formatted PDF",
    color: "hsl(185,48%,50%)",
    pages: 48,
  },
  {
    id: "flashcards",
    icon: FileText,
    label: "Flashcard Set",
    desc: "Export all flashcards with questions and answers",
    color: "hsl(9,70%,54%)",
    pages: 12,
  },
  {
    id: "quiz",
    icon: CheckSquare,
    label: "Quiz Report",
    desc: "Export your quiz history and performance analysis",
    color: "hsl(142,60%,50%)",
    pages: 6,
  },
  {
    id: "progress",
    icon: BarChart2,
    label: "Progress Report",
    desc: "Complete study progress with charts and statistics",
    color: "hsl(265,60%,60%)",
    pages: 4,
  },
];

const ExportPage = () => {
  const [exporting, setExporting] = useState<string | null>(null);
  const [exported, setExported] = useState<string[]>([]);
  const [options, setOptions] = useState({
    includeAnswers: true,
    includeStats: true,
    dateRange: "all",
  });

  const handleExport = async (id: string) => {
    setExporting(id);
    await new Promise((r) => setTimeout(r, 1800));
    setExporting(null);
    setExported((e) => [...e, id]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
          PDF Export
        </h1>
        <p className="text-[hsl(36,15%,58%)] text-sm">
          Download your study materials and reports as PDFs.
        </p>
      </div>

      {/* Export Options */}
      <div
        className="rounded-2xl p-5 border border-[hsla(36,25%,90%,0.08)] mb-6"
        style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
      >
        <p className="font-semibold text-[hsl(36,25%,80%)] text-sm mb-4">
          Export Options
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() =>
                setOptions((o) => ({ ...o, includeAnswers: !o.includeAnswers }))
              }
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${options.includeAnswers ? "border-[hsl(185,48%,50%)] bg-[hsl(185,48%,50%)]" : "border-[hsla(36,25%,90%,0.2)]"}`}
            >
              {options.includeAnswers && (
                <span className="text-white text-xs font-bold">✓</span>
              )}
            </div>
            <span className="text-[hsl(36,20%,70%)] text-sm">
              Include Answers
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div
              onClick={() =>
                setOptions((o) => ({ ...o, includeStats: !o.includeStats }))
              }
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${options.includeStats ? "border-[hsl(185,48%,50%)] bg-[hsl(185,48%,50%)]" : "border-[hsla(36,25%,90%,0.2)]"}`}
            >
              {options.includeStats && (
                <span className="text-white text-xs font-bold">✓</span>
              )}
            </div>
            <span className="text-[hsl(36,20%,70%)] text-sm">
              Include Stats
            </span>
          </label>
          <div>
            <select
              value={options.dateRange}
              onChange={(e) =>
                setOptions((o) => ({ ...o, dateRange: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,80%)] border border-[hsla(36,25%,90%,0.1)] text-sm outline-none"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="week">This Week</option>
            </select>
          </div>
        </div>
      </div>

      {/* Export Items */}
      <div className="flex flex-col gap-3">
        {exportItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-4 rounded-2xl p-4 border border-[hsla(36,25%,90%,0.07)]"
            style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: item.color + "25" }}
            >
              <item.icon size={18} style={{ color: item.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[hsl(36,25%,88%)] text-sm">
                {item.label}
              </p>
              <p className="text-[hsl(36,15%,50%)] text-xs truncate">
                {item.desc}
              </p>
              <p className="text-[hsl(36,15%,40%)] text-xs mt-0.5">
                ~{item.pages} pages
              </p>
            </div>
            <button
              onClick={() => handleExport(item.id)}
              disabled={exporting === item.id}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all flex-shrink-0 disabled:opacity-60"
              style={
                exported.includes(item.id)
                  ? {
                      backgroundColor: "hsla(142,60%,50%,0.15)",
                      color: "hsl(142,60%,65%)",
                    }
                  : { backgroundColor: item.color + "25", color: item.color }
              }
            >
              {exporting === item.id ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Exporting…
                </>
              ) : exported.includes(item.id) ? (
                <>✓ Downloaded</>
              ) : (
                <>
                  <Download size={14} /> Download
                </>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Tip */}
      <div className="mt-6 rounded-2xl p-4 border border-[hsla(185,48%,50%,0.2)] bg-[hsla(185,48%,50%,0.06)]">
        <p className="text-[hsl(185,48%,65%)] text-xs font-semibold mb-1">
          💡 Pro Tip
        </p>
        <p className="text-[hsl(36,15%,60%)] text-xs">
          Export your Progress Report regularly to track improvement over time
          and identify subjects needing more attention.
        </p>
      </div>
    </div>
  );
};

export default ExportPage;
