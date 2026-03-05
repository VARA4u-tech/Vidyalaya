import { motion } from "framer-motion";
import { Upload, Cpu, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload",
    description:
      "Drop your notes, PDFs, or images into Vidyalaya. We support handwritten pages, typed documents, and scanned files.",
    color: "hsl(185, 48%, 50%)",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Analyze",
    description:
      "Our AI reads, processes, and deeply understands your study material — identifying key concepts, definitions, and relationships.",
    color: "hsl(9, 70%, 54%)",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Learn",
    description:
      "Receive tailored summaries, adaptive quizzes, and a personalized study plan that evolves with your progress.",
    color: "hsl(34, 30%, 72%)",
  },
];

const VintageGrain = ({ zBase = 2 }: { zBase?: number }) => (
  <>
    <div
      className="absolute inset-0 pointer-events-none grain-coarse"
      style={{ opacity: 0.08, mixBlendMode: "color-burn", zIndex: zBase }}
    />
    <div
      className="absolute inset-0 pointer-events-none grain-fine"
      style={{ opacity: 0.12, mixBlendMode: "soft-light", zIndex: zBase + 1 }}
    />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(160deg,hsla(34,60%,55%,0.04) 0%,transparent 50%,hsla(34,60%,45%,0.05) 100%)",
        zIndex: zBase + 2,
      }}
    />
  </>
);

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-32 overflow-hidden"
      style={{ backgroundColor: "hsl(210, 48%, 22%)" }}
    >
      <VintageGrain zBase={1} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsla(210,60%,6%,0.12) 100%)",
          zIndex: 5,
        }}
      />

      {/* Left diagonal bands */}
      <motion.div
        className="absolute"
        style={{
          backgroundColor: "hsl(9, 70%, 54%)",
          opacity: 0.14,
          width: "30vw",
          height: "160vh",
          top: "-30vh",
          left: "-8vw",
          transform: "rotate(22deg)",
          zIndex: 0,
        }}
        animate={{ rotate: [22, 19, 22] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute"
        style={{
          backgroundColor: "hsl(185, 48%, 50%)",
          opacity: 0.11,
          width: "9vw",
          height: "160vh",
          top: "-30vh",
          left: "18vw",
          transform: "rotate(22deg)",
          zIndex: 0,
        }}
        animate={{ rotate: [22, 18, 22] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p
            className="font-sans font-medium uppercase mb-4"
            style={{
              color: "hsl(185, 45%, 58%)",
              fontSize: "0.72rem",
              letterSpacing: "0.26em",
            }}
          >
            The Process
          </p>
          <h2
            className="font-serif font-bold leading-[0.95] tracking-tight"
            style={{
              color: "hsl(36, 25%, 91%)",
              fontSize: "clamp(3rem, 7vw, 6rem)",
            }}
          >
            How It Works
          </h2>
          <p
            className="mt-4 font-sans max-w-lg"
            style={{
              color: "hsl(36, 20%, 62%)",
              fontSize: "clamp(1rem, 1.5vw, 1.12rem)",
            }}
          >
            Three simple steps to transform your study routine.
          </p>
          <motion.div
            className="mt-6 h-1 rounded-full"
            style={{ backgroundColor: "hsl(185, 48%, 52%)", width: "0%" }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.18 }}
            >
              {/* Ghost big number */}
              <div
                className="font-serif font-black leading-none mb-3"
                style={{
                  color: step.color,
                  opacity: 0.22,
                  fontSize: "clamp(5rem, 10vw, 8rem)",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </div>

              {/* Icon badge */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 -mt-5"
                style={{ backgroundColor: step.color }}
              >
                <step.icon
                  className="w-7 h-7"
                  style={{ color: "hsl(210, 48%, 16%)" }}
                  strokeWidth={1.8}
                />
              </div>

              <h3
                className="font-serif font-bold mb-3"
                style={{
                  color: "hsl(36, 25%, 91%)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                }}
              >
                {step.title}
              </h3>

              <p
                className="font-sans leading-relaxed"
                style={{
                  color: "hsl(36, 18%, 60%)",
                  fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
