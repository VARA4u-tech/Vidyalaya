import { motion } from "framer-motion";

const techStack = [
  {
    category: "Frontend",
    color: "hsl(185, 48%, 50%)",
    items: [
      { name: "React 18", icon: "⚛️", desc: "UI library" },
      { name: "TypeScript", icon: "🔷", desc: "Type safety" },
      { name: "Vite", icon: "⚡", desc: "Build tool" },
      { name: "Tailwind CSS", icon: "🎨", desc: "Utility CSS" },
    ],
  },
  {
    category: "Animation & UX",
    color: "hsl(9, 70%, 54%)",
    items: [
      { name: "Framer Motion", icon: "🎬", desc: "Animations" },
      { name: "Recharts", icon: "📊", desc: "Data charts" },
      { name: "Lucide React", icon: "✨", desc: "Icon library" },
      { name: "Radix UI", icon: "🧩", desc: "Accessible UI" },
    ],
  },
  {
    category: "Backend & Tools",
    color: "hsl(265, 60%, 60%)",
    items: [
      { name: "React Router", icon: "🗺️", desc: "Client routing" },
      { name: "React Query", icon: "🔄", desc: "State & cache" },
      { name: "React Hook Form", icon: "📋", desc: "Form handling" },
      { name: "Zod", icon: "🛡️", desc: "Validation" },
    ],
  },
];

const TechStackSection = () => (
  <section
    id="tech-stack"
    className="relative py-24 md:py-32 overflow-hidden"
    style={{ backgroundColor: "hsl(34, 32%, 84%)" }}
  >
    {/* Grain */}
    <div
      className="absolute inset-0 pointer-events-none grain-fine"
      style={{ opacity: 0.1, mixBlendMode: "multiply" }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <motion.div
        className="mb-16 md:mb-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p
          className="font-sans font-bold uppercase mb-3"
          style={{
            color: "hsl(9, 68%, 48%)",
            fontSize: "0.72rem",
            letterSpacing: "0.28em",
          }}
        >
          Under the Hood
        </p>
        <h2
          className="font-serif font-bold leading-[0.95] tracking-tight"
          style={{
            color: "hsl(210, 48%, 20%)",
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
          }}
        >
          Built With
        </h2>
        <p
          className="mt-4 font-sans max-w-xl"
          style={{
            color: "hsl(210, 28%, 35%)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.08rem)",
            lineHeight: 1.7,
          }}
        >
          Vidyalaya is built on a modern, production-grade tech stack — the same
          tools used by top software companies worldwide.
        </p>
        <motion.div
          className="mt-5 h-1 rounded-full"
          style={{ backgroundColor: "hsl(9, 68%, 52%)", width: "0%" }}
          whileInView={{ width: "64px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {techStack.map((group, gi) => (
          <motion.div
            key={group.category}
            className="rounded-3xl overflow-hidden border border-[hsla(210,48%,20%,0.08)] shadow-sm"
            style={{ backgroundColor: "hsl(210, 48%, 24%)" }}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: gi * 0.12 }}
          >
            {/* Category header */}
            <div
              className="px-6 py-4 flex items-center gap-3"
              style={{
                backgroundColor: group.color + "18",
                borderBottom: `1px solid ${group.color}25`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: group.color }}
              />
              <p
                className="font-sans font-bold uppercase text-xs tracking-widest"
                style={{ color: group.color }}
              >
                {group.category}
              </p>
            </div>

            {/* Tech items */}
            <div className="p-4 flex flex-col gap-2">
              {group.items.map((item, ii) => (
                <motion.div
                  key={item.name}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-[hsla(36,25%,90%,0.06)] hover:border-[hsla(36,25%,90%,0.14)] transition-all duration-200"
                  style={{ backgroundColor: "hsla(210,50%,28%,0.5)" }}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1 + ii * 0.06 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-xl flex-shrink-0 w-8 text-center">
                    {item.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[hsl(36,25%,90%)] text-sm">
                      {item.name}
                    </p>
                    <p className="text-[hsl(36,15%,55%)] text-xs">
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: group.color }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <span
          className="font-sans text-sm"
          style={{ color: "hsl(210, 28%, 40%)" }}
        >
          Open source friendly · TypeScript strict mode · 0 runtime errors
        </span>
      </motion.div>
    </div>
  </section>
);

export default TechStackSection;
