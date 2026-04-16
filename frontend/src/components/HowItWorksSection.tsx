import { motion } from "framer-motion";
import { Upload, Cpu, Sparkles, ArrowRight } from "lucide-react";
import AnimatedIcon from "./AnimatedIcon";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Documents",
    description:
      "Seamlessly drop your notes, PDFs, or images. Our system leverages advanced OCR to digitize handwritten scripts and complex diagrams with precision.",
    color: "hsl(185, 48%, 50%)",
    glow: "hsla(185, 48%, 50%, 0.15)",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Analysis",
    description:
      "Vidyalaya's neural engine dissects your material, auto-generating semantic links between concepts and distilling dense information into structured knowledge.",
    color: "hsl(9, 70%, 54%)",
    glow: "hsla(9, 70%, 54%, 0.15)",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Mastery & Insights",
    description:
      "Transform static notes into interactive mastery paths. Adaptive quizzes and AI-curated study plans evolve dynamically to bridge your knowledge gaps.",
    color: "hsl(34, 30%, 72%)",
    glow: "hsla(34, 30%, 72%, 0.15)",
  },
];

const VintageGrain = ({ zBase = 2 }: { zBase?: number }) => (
  <>
    <div
      className="absolute inset-0 pointer-events-none grain-coarse"
      style={{ opacity: 0.1, mixBlendMode: "multiply", zIndex: zBase }}
    />
    <div
      className="absolute inset-0 pointer-events-none grain-fine"
      style={{ opacity: 0.15, mixBlendMode: "overlay", zIndex: zBase + 1 }}
    />
    {/* Texture paper overlay */}
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        zIndex: zBase + 0,
      }}
    />
  </>
);

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="relative py-36 md:py-48 overflow-hidden"
      style={{ backgroundColor: "hsl(210, 48%, 20%)" }}
    >
      <VintageGrain zBase={1} />

      {/* Deep Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 20%, hsla(210,60%,5%,0.3) 100%)",
          zIndex: 5,
        }}
      />

      {/* Decorative large circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, hsla(185, 48%, 50%, 0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[60%] aspect-square rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, hsla(9, 70%, 54%, 0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 md:mb-32">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p
              className="font-sans font-bold uppercase mb-4"
              style={{
                color: "hsl(185, 45%, 58%)",
                fontSize: "0.75rem",
                letterSpacing: "0.3em",
              }}
            >
              The Evolution of Learning
            </p>
            <h2
              className="font-serif font-bold leading-[1] tracking-tight mb-8"
              style={{
                color: "hsl(36, 25%, 95%)",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
              }}
            >
              How It{" "}
              <span className="italic" style={{ color: "hsl(9, 70%, 54%)" }}>
                Works
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="font-sans md:max-w-xs md:mb-4 lg:max-w-md"
            style={{
              color: "hsl(36, 15%, 55%)",
              fontSize: "1.1rem",
              lineHeight: 1.6,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Vidyalaya bridges the gap between raw data and true understanding
            through a seamless three-stage metamorphosis.
          </motion.p>
        </div>

        {/* Staggered Path Design */}
        <div className="relative flex flex-col gap-24 md:gap-40">
          {/* Central spine for desktop */}
          <div
            className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsla(36, 25%, 90%, 0.1) 15%, hsla(36, 25%, 90%, 0.1) 85%, transparent)",
              transform: "translateX(-50%)",
            }}
          />

          {steps.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={step.number}
                className={`relative flex flex-col ${isEven ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-0`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                {/* Visual Connector Circle */}
                <div
                  className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 z-20 transition-all duration-500 bg-[hsl(210,48%,20%)] group-hover:scale-150"
                  style={{ borderColor: step.color }}
                />

                {/* Content Side */}
                <div className="w-full md:w-[45%]">
                  <motion.div
                    className="relative group p-8 md:p-10 rounded-[2.5rem] overflow-hidden transition-all duration-500 border border-[hsla(36,25%,90%,0.05)]"
                    style={{
                      backgroundColor: "hsla(210, 50%, 24%, 0.4)",
                      backdropFilter: "blur(10px)",
                      boxShadow: `0 20px 40px -20px hsla(210, 60%, 5%, 0.4), 0 0 0 1px hsla(36,25%,95%,0.03)`,
                    }}
                    whileHover={{
                      y: -10,
                      backgroundColor: "hsla(210, 50%, 28%, 0.5)",
                      borderColor: "hsla(36,25%,90%,0.15)",
                    }}
                  >
                    {/* Unique step glow */}
                    <div
                      className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ backgroundColor: step.glow }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-6 mb-6">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:rotate-[10deg]"
                          style={{ backgroundColor: step.color }}
                        >
                          <AnimatedIcon
                            icon={step.icon}
                            size={28}
                            color="hsl(210, 48%, 15%)"
                            animationType="bounce"
                            delay={i * 0.3}
                          />
                        </div>
                        <span
                          className="font-serif italic text-4xl leading-none opacity-20"
                          style={{ color: step.color }}
                        >
                          {step.number}
                        </span>
                      </div>

                      <h3
                        className="font-serif font-bold mb-4"
                        style={{
                          color: "hsl(36, 25%, 95%)",
                          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="font-sans leading-relaxed mb-6"
                        style={{
                          color: "hsl(36, 12%, 65%)",
                          fontSize: "1.05rem",
                        }}
                      >
                        {step.description}
                      </p>

                      <div className="flex items-center gap-2 group/btn cursor-pointer">
                        <span
                          className="text-sm font-bold uppercase tracking-widest"
                          style={{ color: step.color }}
                        >
                          Learn More
                        </span>
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                          style={{ color: step.color }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Empty Side (For desktop staggered effect) */}
                <div className="hidden md:block md:w-[45%]" />
              </motion.div>
            );
          })}
        </div>

        {/* Final CTA in section */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <a
            href="#features"
            className="inline-flex items-center gap-3 font-sans font-bold uppercase tracking-[0.2em] text-xs px-10 py-5 rounded-full border border-[hsla(36,25%,90%,0.1)] transition-all duration-300 hover:bg-[hsl(36,25%,90%)] hover:text-[hsl(210,48%,20%)]"
            style={{ color: "hsl(36, 25%, 90%)" }}
          >
            Start Your Transformation
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
