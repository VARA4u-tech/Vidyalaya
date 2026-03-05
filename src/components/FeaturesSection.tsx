import { motion } from "framer-motion";
import { BookOpen, Brain, ClipboardList, CalendarDays } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Upload Notes",
    description: "Drop your handwritten or typed notes — we digitize and organize them instantly.",
  },
  {
    icon: Brain,
    title: "AI Summaries",
    description: "Get concise, intelligent summaries of any subject, chapter, or topic.",
  },
  {
    icon: ClipboardList,
    title: "Smart Quizzes",
    description: "Auto-generated quizzes that adapt to your learning pace and weak areas.",
  },
  {
    icon: CalendarDays,
    title: "Exam Planner",
    description: "AI builds your personalized study schedule based on your exam dates.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Decorative coral circle — top right */}
      <motion.div
        className="absolute rounded-full bg-coral opacity-20"
        style={{ width: "40vmin", height: "40vmin", top: "-8%", right: "-5%" }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Decorative teal circle — bottom left */}
      <motion.div
        className="absolute rounded-full bg-teal opacity-15"
        style={{ width: "30vmin", height: "30vmin", bottom: "-5%", left: "-3%" }}
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl font-black text-foreground tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Features
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground mb-20 max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Everything you need to study smarter, not harder.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="relative p-8 rounded-2xl bg-teal group overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Card shape accent */}
              <div
                className="absolute w-32 h-32 rounded-full bg-cyan opacity-30 -top-6 -right-6 group-hover:scale-125 transition-transform duration-500"
              />
              <feature.icon className="w-10 h-10 text-primary-foreground mb-4 relative z-10" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold text-primary-foreground mb-2 relative z-10">
                {feature.title}
              </h3>
              <p className="text-primary-foreground/70 relative z-10 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
