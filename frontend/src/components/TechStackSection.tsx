import { motion } from "framer-motion";
import {
  Zap,
  Palette,
  Wind,
  Monitor,
  Database,
  ShieldCheck,
  LineChart,
  Navigation,
  RefreshCcw,
  Layout,
  Terminal,
  Container,
  Globe,
  Layers,
} from "lucide-react";

const allTags = [
  { name: "React 18", icon: Layout, color: "hsl(185, 48%, 50%)" },
  { name: "TypeScript", icon: ShieldCheck, color: "hsl(210, 60%, 45%)" },
  { name: "Vite", icon: Zap, color: "hsl(265, 60%, 60%)" },
  { name: "Tailwind CSS", icon: Palette, color: "hsl(185, 48%, 50%)" },
  { name: "Framer Motion", icon: Wind, color: "hsl(9, 70%, 54%)" },
  { name: "Recharts", icon: LineChart, color: "hsl(9, 70%, 54%)" },
  { name: "Lucide Icons", icon: Monitor, color: "hsl(185, 48%, 50%)" },
  { name: "OpenRouter AI", icon: RefreshCcw, color: "hsl(9, 70%, 54%)" },
  { name: "TanStack Query", icon: Layers, color: "hsl(265, 60%, 60%)" },
  { name: "React Router", icon: Navigation, color: "hsl(265, 60%, 60%)" },
  { name: "InsForge DB", icon: Database, color: "hsl(185, 48%, 50%)" },
  { name: "Zod Validation", icon: ShieldCheck, color: "hsl(265, 60%, 60%)" },
  { name: "Node.js", icon: Terminal, color: "hsl(142, 60%, 45%)" },
  { name: "Express", icon: Container, color: "hsl(210, 20%, 30%)" },
  { name: "REST APIs", icon: Globe, color: "hsl(185, 48%, 50%)" },
];

const TechTag = ({ item }: { item: (typeof allTags)[0] }) => (
  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/40 border border-white/60 shadow-sm whitespace-nowrap group hover:bg-white transition-all duration-300 mx-3 cursor-pointer shrink-0">
    <div
      className="p-1.5 rounded-lg bg-white/50 group-hover:bg-coral-500/10 transition-colors duration-300"
      style={{ color: item.color }}
    >
      <item.icon size={20} />
    </div>
    <span className="font-sans font-bold text-sm text-[hsl(210,48%,20%)]">
      {item.name}
    </span>
  </div>
);

const MarqueeRow = ({
  items,
  reverse = false,
  duration = 30,
}: {
  items: typeof allTags;
  reverse?: boolean;
  duration?: number;
}) => {
  return (
    <div className="flex overflow-hidden py-2 select-none group">
      <motion.div
        className="flex shrink-0 min-w-full"
        animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ gap: "1.5rem" }}
      >
        {items.map((item, idx) => (
          <TechTag key={`${item.name}-${idx}`} item={item} />
        ))}
        {/* Mirror items for seamless loop */}
        {items.map((item, idx) => (
          <TechTag key={`${item.name}-mirror-${idx}`} item={item} />
        ))}
      </motion.div>

      {/* Secondary Row to Bridge the Gap */}
      <motion.div
        className="flex shrink-0 min-w-full"
        animate={{ x: reverse ? ["-100%", "0%"] : ["0%", "-100%"] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        style={{ gap: "1.5rem" }}
      >
        {items.map((item, idx) => (
          <TechTag key={`${item.name}-extra-${idx}`} item={item} />
        ))}
        {/* Mirror items to guarantee no gap even on huge screens */}
        {items.map((item, idx) => (
          <TechTag key={`${item.name}-extra-mirror-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

const TechStackSection = () => {
  // Row combinations
  const row1 = [...allTags.slice(0, 8)];
  const row2 = [...allTags.slice(5, 12)];
  const row3 = [...allTags.slice(9, 15), ...allTags.slice(0, 3)];

  return (
    <section
      id="tech-stack"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "hsl(34, 32%, 84%)" }}
    >
      {/* Background Decorative Blobs — desktop only (blur is expensive on mobile) */}
      <div className="hidden md:block absolute top-0 right-0 w-[600px] h-[600px] bg-white/30 blur-[130px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[600px] bg-coral-500/5 blur-[130px] rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none grain-fine"
        style={{ opacity: 0.1, mixBlendMode: "multiply" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-coral-500/10 border border-coral-500/20 mb-6">
            <Zap size={14} className="text-coral-500" />
            <span className="font-sans font-bold uppercase tracking-[0.2em] text-coral-600 text-[10px]">
              Industry Standard Stack
            </span>
          </div>
          <h2
            className="font-serif font-bold leading-tight"
            style={{
              color: "hsl(210, 48%, 20%)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            Powered by the <br />
            <span className="italic text-coral-500 underline decoration-coral-500/20 underline-offset-8">
              Best in Class
            </span>{" "}
            Technologies
          </h2>
        </motion.div>

        {/* Floating Marquee Rows */}
        <div className="flex flex-col gap-6 relative py-10">
          {/* Improved Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-[hsl(34,32%,84%)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-[hsl(34,32%,84%)] to-transparent z-10 pointer-events-none" />

          <MarqueeRow items={row1} duration={40} />
          <MarqueeRow items={row2} reverse duration={35} />
          {/* 3rd row hidden on mobile to reduce paint work */}
          <div className="hidden md:block">
            <MarqueeRow items={row3} duration={45} />
          </div>
        </div>

        {/* Footer Stats Row */}
        <motion.div
          className="mt-20 pt-10 border-t border-black/5 flex flex-wrap items-center justify-center md:justify-between gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-black/5 bg-white/40 flex items-center justify-center shadow-inner">
              <ShieldCheck size={20} className="text-coral-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[hsl(210,20%,50%)]">
                Development
              </p>
              <p className="text-sm font-bold text-[hsl(210,48%,20%)]">
                TypeScript Strict Mode
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-black/5 bg-white/40 flex items-center justify-center shadow-inner">
              <Zap size={20} className="text-cyan-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[hsl(210,20%,50%)]">
                Performance
              </p>
              <p className="text-sm font-bold text-[hsl(210,48%,20%)]">
                Vite Optimized Build
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-black/5 bg-white/40 flex items-center justify-center shadow-inner">
              <Layers size={20} className="text-purple-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[hsl(210,20%,50%)]">
                Architecture
              </p>
              <p className="text-sm font-bold text-[hsl(210,48%,20%)]">
                Component-Driven
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
