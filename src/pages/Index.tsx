import { motion } from "framer-motion";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FooterSection from "@/components/FooterSection";
import NavBar from "@/components/NavBar";

/* Inline grain overlay component — reused in every section */
const GrainOverlay = ({
  opacity1 = 0.35,
  opacity2 = 0.22,
  zIndex = 20,
}: {
  opacity1?: number;
  opacity2?: number;
  zIndex?: number;
}) => (
  <>
    {/* Coarse fibre layer */}
    <div
      className="absolute inset-0 pointer-events-none grain-coarse"
      style={{
        opacity: opacity1,
        mixBlendMode: "multiply",
        zIndex,
      }}
    />
    {/* Fine surface dust layer */}
    <div
      className="absolute inset-0 pointer-events-none grain-fine"
      style={{
        opacity: opacity2,
        mixBlendMode: "multiply",
        zIndex: zIndex + 1,
      }}
    />
    {/* Warm amber tint wash */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(160deg, hsla(34,60%,55%,0.10) 0%, hsla(28,55%,50%,0.06) 50%, hsla(34,60%,45%,0.13) 100%)",
        zIndex: zIndex + 2,
      }}
    />
  </>
);

const Index = () => {
  return (
    <div style={{ backgroundColor: "hsl(34, 35%, 82%)" }}>
      <NavBar />

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen overflow-hidden"
        style={{ backgroundColor: "hsl(210, 48%, 26%)" }}
      >
        {/* ── GRAIN LAYERS ── */}
        <GrainOverlay opacity1={0.38} opacity2={0.24} zIndex={30} />

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, hsla(210,60%,8%,0.35) 100%)",
            zIndex: 35,
          }}
        />

        {/* ── RIGHT SIDE DIAGONAL BANDS ── */}

        {/* Coral / Red main band */}
        <motion.div
          className="absolute"
          style={{
            backgroundColor: "hsl(9, 70%, 54%)",
            width: "52vw",
            height: "180vh",
            top: "-40vh",
            right: "-8vw",
            transform: "rotate(-22deg)",
            transformOrigin: "top right",
            zIndex: 2,
          }}
          animate={{ rotate: [-22, -19.5, -22] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Cyan band — on top of coral */}
        <motion.div
          className="absolute"
          style={{
            backgroundColor: "hsl(185, 48%, 50%)",
            width: "18vw",
            height: "180vh",
            top: "-40vh",
            right: "28vw",
            transform: "rotate(-22deg)",
            transformOrigin: "top right",
            zIndex: 3,
          }}
          animate={{ rotate: [-22, -18.5, -22] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Slate / gray thin strip */}
        <motion.div
          className="absolute"
          style={{
            backgroundColor: "hsl(210, 12%, 60%)",
            width: "9vw",
            height: "180vh",
            top: "-40vh",
            right: "44vw",
            transform: "rotate(-22deg)",
            transformOrigin: "top right",
            zIndex: 4,
          }}
          animate={{ rotate: [-22, -20, -22] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grain on right bands too */}
        <div
          className="absolute inset-0 pointer-events-none grain-coarse"
          style={{ opacity: 0.28, mixBlendMode: "multiply", zIndex: 5 }}
        />

        {/* ── MAIN TEAL BLOB (left side) ── */}
        <div className="absolute inset-0 z-10 flex items-center">
          <motion.div
            className="relative flex flex-col justify-center"
            style={{
              backgroundColor: "hsl(210, 48%, 26%)",
              width: "62%",
              minHeight: "76vh",
              borderRadius: "0 38% 38% 0 / 0 45% 45% 0",
              paddingLeft: "clamp(2rem, 6vw, 7rem)",
              paddingRight: "clamp(2rem, 5vw, 5rem)",
              paddingTop: "3rem",
              paddingBottom: "3rem",
            }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Grain inside blob */}
            <div
              className="absolute inset-0 pointer-events-none grain-coarse"
              style={{
                borderRadius: "inherit",
                opacity: 0.3,
                mixBlendMode: "multiply",
                zIndex: 1,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none grain-fine"
              style={{
                borderRadius: "inherit",
                opacity: 0.18,
                mixBlendMode: "multiply",
                zIndex: 2,
              }}
            />
            {/* Warm amber wash on blob */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "inherit",
                background:
                  "linear-gradient(140deg, hsla(34,55%,50%,0.09) 0%, hsla(28,50%,45%,0.05) 60%, hsla(34,55%,40%,0.10) 100%)",
                zIndex: 3,
              }}
            />

            {/* ── Text content ── */}
            <div className="relative" style={{ zIndex: 10 }}>
              {/* Big serif title */}
              <motion.h1
                className="font-serif font-bold leading-[0.92] tracking-tight"
                style={{
                  color: "hsl(36, 28%, 90%)",
                  fontSize: "clamp(4rem, 10vw, 9rem)",
                  textShadow: "2px 4px 20px hsla(210,60%,8%,0.4)",
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              >
                Vidyalaya
              </motion.h1>

              {/* Two-column subtitle row */}
              <motion.div
                className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-10 font-sans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              >
                <span
                  style={{
                    color: "hsl(36, 25%, 82%)",
                    fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                  }}
                >
                  AI Powered Study Platform
                </span>
                <span
                  style={{
                    color: "hsl(36, 25%, 82%)",
                    fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                  }}
                >
                  Smart Learning
                </span>
              </motion.div>

              {/* Feature tags */}
              <motion.p
                className="mt-5 font-sans font-medium uppercase"
                style={{
                  color: "hsl(36, 20%, 62%)",
                  fontSize: "clamp(0.62rem, 1.1vw, 0.74rem)",
                  letterSpacing: "0.22em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
              >
                Upload Notes &bull; AI Summaries &bull; Smart Quizzes &bull;
                Exam Planner
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <a
                  href="#features"
                  id="hero-cta-primary"
                  className="inline-flex items-center font-sans font-semibold rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "hsl(36, 28%, 90%)",
                    color: "hsl(210, 48%, 22%)",
                    padding: "0.85rem 2.2rem",
                    fontSize: "0.95rem",
                    boxShadow: "0 4px 20px hsla(210,60%,8%,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "hsl(9, 70%, 54%)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "white";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "hsl(36, 28%, 90%)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "hsl(210, 48%, 22%)";
                  }}
                >
                  Explore Features
                </a>
                <a
                  href="#how-it-works"
                  id="hero-cta-secondary"
                  className="inline-flex items-center font-sans font-semibold rounded-full border-2 transition-all duration-300"
                  style={{
                    borderColor: "hsl(36, 28%, 80%)",
                    color: "hsl(36, 28%, 88%)",
                    padding: "0.85rem 2.2rem",
                    fontSize: "0.95rem",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "hsl(36, 28%, 88%)";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "hsl(210, 48%, 22%)";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLAnchorElement
                    ).style.backgroundColor = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "hsl(36, 28%, 88%)";
                  }}
                >
                  How It Works
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ zIndex: 40 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span
            className="font-sans font-medium uppercase"
            style={{
              color: "hsl(36, 20%, 68%)",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
            }}
          >
            Scroll
          </span>
          <motion.div
            className="w-px h-12 rounded-full"
            style={{ backgroundColor: "hsl(36, 20%, 68%)" }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          REMAINING SECTIONS
      ═══════════════════════════════════════ */}
      <FeaturesSection />
      <HowItWorksSection />
      <FooterSection />
    </div>
  );
};

export default Index;
