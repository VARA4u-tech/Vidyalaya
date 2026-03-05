import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Upload", description: "Drop your notes, PDFs, or images into Vidyalaya." },
  { number: "02", title: "Analyze", description: "AI processes and understands your study material." },
  { number: "03", title: "Learn", description: "Get summaries, quizzes, and a personalized study plan." },
];

const HowItWorksSection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-teal">
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.1] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Decorative coral diagonal */}
      <motion.div
        className="absolute bg-coral opacity-25"
        style={{
          width: "20vw",
          height: "140vh",
          top: "-20vh",
          left: "-5vw",
          transform: "rotate(15deg)",
        }}
        animate={{ rotate: [15, 18, 15] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative cyan circle */}
      <motion.div
        className="absolute rounded-full bg-cyan opacity-20"
        style={{ width: "45vmin", height: "45vmin", bottom: "-10%", right: "10%" }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl font-black text-primary-foreground tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-lg text-primary-foreground/60 mb-20 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Three simple steps to transform your study routine.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <span className="text-8xl font-black text-coral/30 leading-none block">
                {step.number}
              </span>
              <h3 className="text-3xl font-bold text-primary-foreground mt-2 mb-3">
                {step.title}
              </h3>
              <p className="text-primary-foreground/60 text-lg leading-relaxed">
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
