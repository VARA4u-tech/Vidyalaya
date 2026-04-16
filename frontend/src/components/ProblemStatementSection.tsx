import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, Clock, Lightbulb } from "lucide-react";
import AnimatedIcon from "./AnimatedIcon";

const problems = [
  {
    icon: AlertTriangle,
    title: "Information Overload",
    desc: "Students drown in hundreds of pages of notes, textbooks, and PDFs with no effective way to digest or retain the content.",
    color: "hsl(9,70%,54%)",
  },
  {
    icon: TrendingDown,
    title: "Ineffective Study Methods",
    desc: "Passive re-reading and highlighting create an illusion of learning. Without active recall, information doesn't stick.",
    color: "hsl(265,60%,60%)",
  },
  {
    icon: Clock,
    title: "Poor Time Management",
    desc: "Most students lack a structured plan — they study the wrong things at the wrong time, especially under exam pressure.",
    color: "hsl(34,60%,55%)",
  },
];

const ProblemStatementSection = () => (
  <section
    id="problem"
    className="relative py-24 md:py-36 overflow-hidden"
    style={{ backgroundColor: "hsl(210, 55%, 18%)" }}
  >
    {/* Background grain */}
    <div
      className="absolute inset-0 pointer-events-none grain-coarse"
      style={{ opacity: 0.06, mixBlendMode: "multiply" }}
    />

    {/* Decorative glows */}
    <div
      className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, hsla(9,70%,54%,0.07) 0%, transparent 70%)",
      }}
    />
    <div
      className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
      style={{
        background:
          "radial-gradient(circle, hsla(265,60%,60%,0.07) 0%, transparent 70%)",
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-24">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-sans font-bold uppercase mb-4"
            style={{
              color: "hsl(9,70%,60%)",
              fontSize: "0.72rem",
              letterSpacing: "0.3em",
            }}
          >
            The Problem
          </p>
          <h2
            className="font-serif font-bold leading-[1.0] tracking-tight mb-6"
            style={{
              color: "hsl(36,25%,95%)",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            }}
          >
            Why Students{" "}
            <span className="italic" style={{ color: "hsl(9,70%,54%)" }}>
              Struggle
            </span>
          </h2>
          <motion.div
            className="h-1 rounded-full mb-6"
            style={{ backgroundColor: "hsl(9,68%,52%)", width: "0%" }}
            whileInView={{ width: "64px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p
            className="font-sans leading-relaxed"
            style={{
              color: "hsl(36,15%,60%)",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              lineHeight: 1.8,
            }}
          >
            Traditional studying hasn't evolved. Students spend hours passively
            reading notes they can't retain, missing efficient tools that
            actually help them learn faster and remember longer.
          </p>
        </motion.div>

        {/* Big quote */}
        <motion.div
          className="rounded-3xl p-8 md:p-10 border"
          style={{
            backgroundColor: "hsla(210,50%,24%,0.5)",
            borderColor: "hsla(36,25%,90%,0.06)",
          }}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div
            className="text-6xl mb-4"
            style={{ color: "hsl(9,70%,54%)", fontFamily: "serif" }}
          >
            "
          </div>
          <p
            className="font-serif italic leading-relaxed text-xl md:text-2xl mb-6"
            style={{ color: "hsl(36,25%,85%)" }}
          >
            Only 10% of students study effectively. The rest work hard without
            the right strategy — and Vidyalaya exists to fix that.
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold font-serif"
              style={{ backgroundColor: "hsl(9,70%,54%)" }}
            >
              V
            </div>
            <div>
              <p className="font-semibold text-[hsl(36,25%,80%)] text-sm">
                Vidyalaya Mission
              </p>
              <p className="text-[hsl(36,15%,48%)] text-xs">
                Founded on evidence-based learning science
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-20">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            className="rounded-3xl p-6 md:p-7 border border-[hsla(36,25%,90%,0.06)] group hover:border-[hsla(36,25%,90%,0.14)] transition-all duration-300"
            style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
              style={{ backgroundColor: p.color + "20" }}
            >
              <AnimatedIcon
                icon={p.icon}
                size={22}
                color={p.color}
                animationType="pulse"
                delay={i * 0.4}
              />
            </div>
            <h3
              className="font-serif font-bold mb-3"
              style={{
                color: "hsl(36,25%,90%)",
                fontSize: "clamp(1.2rem, 2vw, 1.4rem)",
              }}
            >
              {p.title}
            </h3>
            <p
              className="font-sans leading-relaxed"
              style={{
                color: "hsl(36,15%,60%)",
                fontSize: "0.93rem",
                lineHeight: 1.75,
              }}
            >
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Transition to solution */}
      <motion.div
        className="flex flex-col items-center text-center gap-4"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: "hsla(185,48%,50%,0.15)" }}
        >
          <AnimatedIcon
            icon={Lightbulb}
            size={28}
            color="hsl(185,48%,55%)"
            animationType="float"
          />
        </div>
        <p
          className="font-serif font-bold"
          style={{
            color: "hsl(36,25%,90%)",
            fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
          }}
        >
          That's exactly why we built Vidyalaya.
        </p>
        <p
          className="font-sans max-w-lg"
          style={{ color: "hsl(36,15%,55%)", fontSize: "0.95rem" }}
        >
          An AI-powered platform that transforms how students upload, summarise,
          quiz, and plan — based on real learning science.
        </p>
      </motion.div>
    </div>
  </section>
);

export default ProblemStatementSection;
