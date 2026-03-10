import { useState } from "react";
import { motion } from "framer-motion";
import { Store, Star, Download, Search, BookOpen, Filter } from "lucide-react";

const items = [
  {
    id: 1,
    title: "Complete Chemistry Notes — Class 12",
    author: "Priya S.",
    subject: "Chemistry",
    rating: 4.8,
    downloads: 1240,
    pages: 92,
    color: "hsl(185,48%,50%)",
    free: true,
  },
  {
    id: 2,
    title: "Physics Mechanics Notes",
    author: "Aarav P.",
    subject: "Physics",
    rating: 4.6,
    downloads: 980,
    pages: 58,
    color: "hsl(9,70%,54%)",
    free: true,
  },
  {
    id: 3,
    title: "Mathematics — Calculus Deep Dive",
    author: "Sneha R.",
    subject: "Math",
    rating: 4.9,
    downloads: 2100,
    pages: 120,
    color: "hsl(265,60%,60%)",
    free: false,
  },
  {
    id: 4,
    title: "Biology Cell Biology Summary",
    author: "Rohan G.",
    subject: "Biology",
    rating: 4.7,
    downloads: 870,
    pages: 44,
    color: "hsl(142,60%,50%)",
    free: true,
  },
  {
    id: 5,
    title: "History — Modern India Complete Guide",
    author: "Meera N.",
    subject: "History",
    rating: 4.5,
    downloads: 650,
    pages: 78,
    color: "hsl(34,60%,55%)",
    free: false,
  },
  {
    id: 6,
    title: "English Grammar Master Notes",
    author: "Kiran K.",
    subject: "English",
    rating: 4.4,
    downloads: 430,
    pages: 36,
    color: "hsl(9,70%,54%)",
    free: true,
  },
];

const subjects = [
  "All",
  "Chemistry",
  "Physics",
  "Math",
  "Biology",
  "History",
  "English",
];

const MarketplacePage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [downloaded, setDownloaded] = useState<number[]>([]);

  const filtered = items.filter(
    (i) =>
      (filter === "All" || i.subject === filter) &&
      (i.title.toLowerCase().includes(search.toLowerCase()) ||
        i.author.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
          Note Marketplace
        </h1>
        <p className="text-[hsl(36,15%,58%)] text-sm">
          Discover and download community study notes.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsla(210,50%,24%,0.5)] border border-[hsla(36,25%,90%,0.08)] focus-within:border-[hsl(185,48%,50%)] transition-all">
          <Search size={16} className="text-[hsl(36,15%,50%)]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes, authors…"
            className="bg-transparent text-[hsl(36,25%,88%)] placeholder-[hsl(36,15%,40%)] text-sm outline-none flex-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-[hsl(36,15%,50%)]" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-[hsla(210,50%,24%,0.5)] text-[hsl(36,25%,80%)] border border-[hsla(36,25%,90%,0.08)] text-sm outline-none"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl overflow-hidden border border-[hsla(36,25%,90%,0.07)] flex flex-col"
            style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
          >
            {/* Color bar */}
            <div
              className="h-1.5 w-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.color + "25" }}
                >
                  <BookOpen size={14} style={{ color: item.color }} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: item.color }}
                >
                  {item.subject}
                </span>
                {!item.free && (
                  <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-[hsla(265,60%,60%,0.2)] text-[hsl(265,60%,70%)]">
                    PREMIUM
                  </span>
                )}
                {item.free && (
                  <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-[hsla(142,60%,50%,0.2)] text-[hsl(142,60%,65%)]">
                    FREE
                  </span>
                )}
              </div>
              <p className="font-semibold text-[hsl(36,25%,88%)] text-sm leading-snug mb-1 flex-1">
                {item.title}
              </p>
              <p className="text-[hsl(36,15%,50%)] text-xs mb-3">
                by {item.author} · {item.pages} pages
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={11}
                      className={
                        s <= Math.round(item.rating) ? "fill-current" : ""
                      }
                      style={{ color: "hsl(45,95%,55%)" }}
                    />
                  ))}
                  <span className="text-[hsl(36,15%,55%)] text-xs ml-1">
                    {item.rating}
                  </span>
                </div>
                <span className="text-[hsl(36,15%,45%)] text-xs">
                  <Download size={10} className="inline mr-1" />
                  {item.downloads.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button
                onClick={() =>
                  setDownloaded((d) =>
                    d.includes(item.id) ? d : [...d, item.id],
                  )
                }
                className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={
                  downloaded.includes(item.id)
                    ? {
                        backgroundColor: "hsla(142,60%,50%,0.15)",
                        color: "hsl(142,60%,65%)",
                      }
                    : { backgroundColor: item.color + "25", color: item.color }
                }
              >
                {downloaded.includes(item.id) ? "✓ Downloaded" : "Download"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-[hsl(36,15%,45%)]">
          No notes found matching your search.
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
