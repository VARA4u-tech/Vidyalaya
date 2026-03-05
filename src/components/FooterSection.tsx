import { motion } from "framer-motion";

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

const FooterSection = () => {
  const links: Record<string, string[]> = {
    Product: ["Upload Notes", "AI Summaries", "Smart Quizzes", "Exam Planner"],
    Company: ["About Us", "Blog", "Careers", "Contact"],
    Support: ["Help Center", "Privacy Policy", "Terms of Service"],
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
              className="font-sans leading-relaxed mb-6"
              style={{
                color: "hsl(210, 28%, 38%)",
                fontSize: "0.94rem",
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
                className="font-sans font-semibold uppercase mb-5"
                style={{
                  color: "hsl(210, 48%, 24%)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                }}
              >
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-sans transition-colors duration-200"
                      style={{
                        color: "hsl(210, 25%, 42%)",
                        fontSize: "0.92rem",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "hsl(9, 70%, 54%)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "hsl(210, 25%, 42%)")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{ backgroundColor: "hsl(34, 20%, 68%)" }}
        />

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p
            className="font-sans text-sm"
            style={{ color: "hsl(210, 20%, 50%)" }}
          >
            &copy; 2026 Vidyalaya. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="w-12 h-12 object-contain" />
            <span
              className="font-serif font-bold"
              style={{ color: "hsl(210, 48%, 25%)", fontSize: "1rem" }}
            >
              Vidyalaya
            </span>
            <span
              className="font-sans text-xs uppercase"
              style={{
                color: "hsl(210, 18%, 50%)",
                letterSpacing: "0.15em",
              }}
            >
              &nbsp;· AI Powered Study Platform
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
