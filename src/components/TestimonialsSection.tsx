import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Class XII · Science Stream",
    avatar: "P",
    color: "hsl(9,70%,54%)",
    rating: 5,
    text: "Vidyalaya completely changed how I study. The AI summaries turn my 40-page physics notes into crisp bullet points in seconds. My exam scores went from 72% to 91% in just one semester!",
  },
  {
    name: "Aarav Patel",
    role: "B.Tech · Computer Science",
    avatar: "A",
    color: "hsl(185,48%,50%)",
    rating: 5,
    text: "The Pomodoro timer + flashcard combo is incredibly effective. I use it every day for data structures revision. The spaced repetition feature is especially powerful — it knows exactly when I'll forget something.",
  },
  {
    name: "Sneha Reddy",
    role: "Class X · CBSE",
    avatar: "S",
    color: "hsl(265,60%,60%)",
    rating: 5,
    text: "I was struggling with chemistry, but the Mind Map and AI study summaries made everything click. The interface feels so premium — hard to believe this is a student project!",
  },
  {
    name: "Rohan Gupta",
    role: "Competitive Exam Prep · JEE",
    avatar: "R",
    color: "hsl(142,60%,50%)",
    rating: 5,
    text: "The Exam Countdown keeps me accountable and the leaderboard with friends made studying actually fun. I've recommended Vidyalaya to my entire coaching class.",
  },
  {
    name: "Meera Nair",
    role: "Class XII · Commerce",
    avatar: "M",
    color: "hsl(34,60%,55%)",
    rating: 5,
    text: "YouTube Summarizer is a game changer. I paste any lecture link and get a structured breakdown with key points. It saves me 2-3 hours of note-taking every day.",
  },
];

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < count ? "fill-current" : ""}
        style={{ color: "hsl(45,95%,55%)" }}
      />
    ))}
  </div>
);

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  // Show 1 on mobile, 3 on desktop
  const visible = [
    testimonials[current % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "hsl(210, 55%, 18%)" }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none grain-coarse"
        style={{ opacity: 0.06, mixBlendMode: "multiply" }}
      />

      {/* Decorative accent */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, hsla(9,70%,54%,0.06) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p
              className="font-sans font-bold uppercase mb-3"
              style={{
                color: "hsl(185,48%,55%)",
                fontSize: "0.72rem",
                letterSpacing: "0.28em",
              }}
            >
              Student Stories
            </p>
            <h2
              className="font-serif font-bold leading-[0.95] tracking-tight"
              style={{
                color: "hsl(36, 25%, 95%)",
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
              }}
            >
              What Students{" "}
              <span className="italic" style={{ color: "hsl(9,70%,54%)" }}>
                Say
              </span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all hover:bg-[hsla(36,25%,90%,0.08)]"
              style={{
                borderColor: "hsla(36,25%,90%,0.15)",
                color: "hsl(36,25%,70%)",
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all"
              style={{ backgroundColor: "hsl(9,70%,54%)", color: "white" }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {visible.map((t, i) => (
            <motion.div
              key={`${t.name}-${current}`}
              className={`relative rounded-3xl p-6 md:p-7 border border-[hsla(36,25%,90%,0.06)] flex flex-col ${i > 0 ? "hidden md:flex" : "flex"} ${i > 1 ? "lg:flex md:hidden" : ""}`}
              style={{
                backgroundColor: "hsla(210,50%,24%,0.6)",
                backdropFilter: "blur(4px)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: i === 0 ? 1 : i === 1 ? 0.9 : 0.75, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              {/* Quote icon */}
              <Quote
                size={28}
                className="mb-4 flex-shrink-0"
                style={{ color: t.color, opacity: 0.6 }}
              />

              {/* Text */}
              <p
                className="font-sans leading-relaxed mb-6 flex-1"
                style={{
                  color: "hsl(36,20%,72%)",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                }}
              >
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-[hsla(36,25%,90%,0.07)]">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-serif text-white flex-shrink-0"
                  style={{ backgroundColor: t.color + "cc" }}
                >
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[hsl(36,25%,88%)] text-sm truncate">
                    {t.name}
                  </p>
                  <p className="text-[hsl(36,15%,50%)] text-xs truncate">
                    {t.role}
                  </p>
                </div>
                <StarRating count={t.rating} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: current === i ? "24px" : "8px",
                height: "8px",
                backgroundColor:
                  current === i ? "hsl(9,70%,54%)" : "hsla(36,25%,90%,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
