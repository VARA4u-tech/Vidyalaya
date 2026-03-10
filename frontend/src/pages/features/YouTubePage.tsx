import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Youtube, Loader2, Copy, Check, ExternalLink } from "lucide-react";

const mockSummaries: Record<
  string,
  { title: string; summary: string; keyPoints: string[]; duration: string }
> = {
  default: {
    title: "Introduction to Machine Learning — Stanford University",
    summary:
      "This lecture introduces the fundamental concepts of machine learning, covering supervised and unsupervised learning paradigms. The professor explains gradient descent optimization, the bias-variance tradeoff, and how neural networks approximate complex functions. Real-world applications in image recognition and natural language processing are discussed with practical examples.",
    keyPoints: [
      "Supervised learning uses labeled training data to make predictions",
      "Unsupervised learning finds patterns in unlabeled data (e.g., clustering)",
      "Gradient descent iteratively minimizes the loss function",
      "Overfitting occurs when a model learns noise rather than patterns",
      "Neural networks are universal function approximators",
      "Cross-validation helps evaluate model generalization",
    ],
    duration: "1h 12m",
  },
};

const YouTubePage = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<
    (typeof mockSummaries)["default"] | null
  >(null);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2200));
    setLoading(false);
    setResult(mockSummaries.default);
  };

  const copy = () => {
    if (result) {
      navigator.clipboard.writeText(
        `${result.title}\n\n${result.summary}\n\nKey Points:\n${result.keyPoints.map((k) => `• ${k}`).join("\n")}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
          YouTube Summarizer
        </h1>
        <p className="text-[hsl(36,15%,58%)] text-sm">
          Paste any YouTube lecture URL and get an instant AI summary.
        </p>
      </div>

      {/* Input */}
      <div
        className="rounded-2xl p-5 border border-[hsla(36,25%,90%,0.08)] mb-6"
        style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
      >
        <label className="text-[hsl(36,20%,65%)] text-xs font-semibold uppercase tracking-wider mb-3 block">
          YouTube URL
        </label>
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] border border-[hsla(36,25%,90%,0.1)] focus-within:border-[hsl(9,70%,54%)] transition-all">
            <Youtube
              size={18}
              className="text-[hsl(9,70%,54%)] flex-shrink-0"
            />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSummarize()}
              placeholder="https://youtube.com/watch?v=..."
              className="bg-transparent text-[hsl(36,25%,88%)] placeholder-[hsl(36,15%,40%)] text-sm outline-none flex-1 min-w-0"
            />
          </div>
          <button
            onClick={handleSummarize}
            disabled={loading || !url.trim()}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"
            style={{ backgroundColor: "hsl(9,70%,54%)" }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Youtube size={16} />
            )}
            {loading ? "Summarizing..." : "Summarize"}
          </button>
        </div>
        <p className="text-[hsl(36,15%,40%)] text-xs mt-3">
          Try: https://youtube.com/watch?v=example
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center py-16 gap-4">
          <Loader2 size={36} className="text-[hsl(9,70%,54%)] animate-spin" />
          <p className="text-[hsl(36,15%,55%)] text-sm">
            Fetching transcript and generating summary…
          </p>
        </div>
      )}

      {/* Result */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4"
          >
            {/* Title bar */}
            <div
              className="rounded-2xl p-4 border border-[hsla(36,25%,90%,0.08)] flex items-start gap-3"
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-[hsla(9,70%,54%,0.15)] flex items-center justify-center flex-shrink-0">
                <Youtube size={18} className="text-[hsl(9,70%,65%)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[hsl(36,25%,88%)] text-sm leading-snug">
                  {result.title}
                </p>
                <p className="text-[hsl(36,15%,50%)] text-xs mt-1">
                  Duration: {result.duration}
                </p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-[hsl(36,15%,50%)] hover:text-white transition-colors flex-shrink-0"
              >
                <ExternalLink size={16} />
              </a>
            </div>

            {/* Summary */}
            <div
              className="rounded-2xl p-5 border border-[hsla(36,25%,90%,0.08)]"
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-[hsl(36,25%,80%)] text-sm">
                  AI Summary
                </p>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[hsl(185,48%,60%)] hover:text-white bg-[hsla(185,48%,50%,0.1)] hover:bg-[hsla(185,48%,50%,0.2)] transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={12} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              </div>
              <p className="text-[hsl(36,20%,70%)] text-sm leading-relaxed">
                {result.summary}
              </p>
            </div>

            {/* Key Points */}
            <div
              className="rounded-2xl p-5 border border-[hsla(36,25%,90%,0.08)]"
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
            >
              <p className="font-semibold text-[hsl(36,25%,80%)] text-sm mb-4">
                Key Points
              </p>
              <ul className="flex flex-col gap-3">
                {result.keyPoints.map((pt, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                      style={{
                        backgroundColor: "hsl(9,70%,54%)",
                        color: "white",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[hsl(36,20%,72%)] text-sm leading-relaxed">
                      {pt}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YouTubePage;
