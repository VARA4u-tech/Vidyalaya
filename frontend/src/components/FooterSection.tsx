import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VintageGrain = ({ zBase = 2 }: { zBase?: number }) => (
  <>
    <div
      className="absolute inset-0 pointer-events-none grain-coarse"
      style={{ opacity: 0.08, mixBlendMode: "multiply", zIndex: zBase }}
    />
    <div
      className="absolute inset-0 pointer-events-none grain-fine"
      style={{ opacity: 0.12, mixBlendMode: "overlay", zIndex: zBase + 1 }}
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

const FooterSection = () => {
  const links: Record<string, { label: string; href: string }[]> = {
    Product: [
      { label: "Upload Notes", href: "#features" },
      { label: "AI Summaries", href: "#features" },
      { label: "Smart Quizzes", href: "#features" },
      { label: "Exam Planner", href: "#features" },
    ],
    Project: [
      {
        label: "Source Code",
        href: "https://github.com/VARA4u-tech/Vidyalaya",
      },
      { label: "Documentation", href: "/README.md" },
      { label: "Team Varanasi", href: "#team" },
      { label: "Send Feedback", href: "mailto:support@vidyalaya.ai" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Hackathon Project", href: "#" },
    ],
  };

  return (
    <footer
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ backgroundColor: "hsl(34, 32%, 82%)" }}
    >
      <VintageGrain zBase={1} />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, hsla(28,30%,12%,0.16) 100%)",
          zIndex: 5,
        }}
      />

      {/* Coral diagonal accent */}
      <motion.div
        className="absolute"
        style={{
          backgroundColor: "hsl(9, 70%, 54%)",
          opacity: 0.09,
          width: "30vw",
          height: "120vh",
          top: "-20vh",
          right: "-5vw",
          transform: "rotate(-22deg)",
          zIndex: 0,
        }}
        animate={{ rotate: [-22, -19.5, -22] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Top grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Vidyalaya Logo"
                className="w-24 h-24 object-contain"
              />
              <h6
                className="font-serif font-bold"
                style={{
                  color: "hsl(210, 48%, 22%)",
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                }}
              >
                Vidyalaya
              </h6>
            </div>
            <p
              className="font-sans font-medium leading-relaxed mb-6"
              style={{
                color: "hsl(210, 48%, 22%)",
                fontSize: "1rem",
                lineHeight: 1.7,
              }}
            >
              AI-powered study platform that helps you upload notes, generate
              intelligent summaries, take adaptive quizzes, and plan your exams
              with confidence.
            </p>
            {/* Animated dot trio */}
            <div className="flex gap-2.5">
              {["hsl(9,70%,54%)", "hsl(185,48%,50%)", "hsl(210,12%,58%)"].map(
                (c, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: c }}
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.45,
                    }}
                  />
                ),
              )}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                className="font-sans font-bold uppercase mb-5"
                style={{
                  color: "hsl(210, 48%, 20%)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.22em",
                }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="font-sans font-semibold transition-colors duration-200"
                      style={{
                        color: "hsl(210, 48%, 28%)",
                        fontSize: "0.95rem",
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Team Varanasi Signature */}
        <motion.div
          className="text-center py-8 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="font-sans text-sm md:text-base font-medium tracking-wide flex flex-wrap items-center justify-center gap-1.5"
            style={{ color: "hsl(210, 48%, 28%)" }}
          >
            Designed and Engineered with{" "}
            <span className="text-coral-500 animate-pulse">❤️</span> for
            Students by{" "}
            <span
              className="font-bold border-b-2 border-coral-500/30 pb-0.5"
              style={{ color: "hsl(210, 48%, 20%)" }}
            >
              Team Varanasi
            </span>
          </p>
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ backgroundColor: "hsl(34, 20%, 68%)", opacity: 0.4 }}
        />

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p
            className="font-sans font-bold text-xs md:text-sm text-center md:text-left order-2 md:order-1"
            style={{ color: "hsl(210, 48%, 22%)", opacity: 0.7 }}
          >
            &copy; {new Date().getFullYear()} Vidyalaya. All rights reserved.
          </p>
          <div className="flex items-center gap-3 order-1 md:order-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="/favicon.png"
                alt="Vidyalaya Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span
                className="font-serif font-black text-lg"
                style={{ color: "hsl(210, 48%, 22%)" }}
              >
                Vidyalaya
              </span>
              <span className="font-sans font-black text-[8px] uppercase tracking-[0.2em] opacity-30">
                AI Powered Platform
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
