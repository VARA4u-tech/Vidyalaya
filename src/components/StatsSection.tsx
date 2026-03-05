import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Users, BookOpen, Star, Code2, Clock } from "lucide-react";

const stats = [
  { icon: Zap, label: "AI-Powered Features", value: 15, suffix: "+" },
  { icon: BookOpen, label: "Notes Processed", value: 500, suffix: "K+" },
  { icon: Users, label: "Student Beta Users", value: 1200, suffix: "+" },
  {
    icon: Star,
    label: "Avg User Rating",
    value: 4.9,
    suffix: "/5",
    decimals: 1,
  },
  { icon: Code2, label: "Lines of Code", value: 12, suffix: "K+" },
  { icon: Clock, label: "Built In", value: 3, suffix: " weeks" },
];

const AnimatedNumber = ({
  target,
  decimals = 0,
  suffix = "",
  active,
}: {
  target: number;
  decimals?: number;
  suffix?: string;
  active: boolean;
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span>
      {current.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: "hsl(210, 55%, 18%)" }}
    >
      {/* Subtle grain */}
      <div
        className="absolute inset-0 pointer-events-none grain-coarse"
        style={{ opacity: 0.06, mixBlendMode: "multiply" }}
      />

      {/* Top divider line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsla(36,25%,90%,0.12), transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.p
          className="text-center font-sans font-bold uppercase tracking-widest mb-10 md:mb-14"
          style={{
            color: "hsl(185, 48%, 55%)",
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          By the Numbers
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center p-5 rounded-2xl border border-[hsla(36,25%,90%,0.07)] hover:border-[hsla(36,25%,90%,0.16)] transition-all duration-300"
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: "hsla(185,48%,50%,0.12)" }}
              >
                <stat.icon size={18} style={{ color: "hsl(185,48%,55%)" }} />
              </div>
              <p
                className="font-serif font-bold mb-1"
                style={{
                  color: "hsl(36, 28%, 93%)",
                  fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                }}
              >
                <AnimatedNumber
                  target={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  active={inView}
                />
              </p>
              <p
                className="font-sans leading-tight"
                style={{
                  color: "hsl(36, 15%, 55%)",
                  fontSize: "0.72rem",
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.p
          className="text-center mt-10 font-sans"
          style={{ color: "hsl(36,15%,45%)", fontSize: "0.85rem" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Built by students, for students 🎓
        </motion.p>
      </div>

      {/* Bottom divider */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsla(36,25%,90%,0.1), transparent)",
        }}
      />
    </section>
  );
};

export default StatsSection;
