import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, Book, Rocket } from "lucide-react";
import AnimatedIcon from "@/components/AnimatedIcon";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FooterSection from "@/components/FooterSection";
import NavBar from "@/components/NavBar";

import TechStackSection from "@/components/TechStackSection";
import TeamSection from "@/components/TeamSection";
import ProblemStatementSection from "@/components/ProblemStatementSection";
import GitHubCTASection from "@/components/GitHubCTASection";
import DynamicScrollBot from "@/components/DynamicScrollBot";

/* Inline grain overlay component — reused in every section */
const GrainOverlay = ({
  opacity1 = 0.08,
  opacity2 = 0.12,
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
        mixBlendMode: "color-burn",
        zIndex,
      }}
    />
    {/* Fine surface dust layer */}
    <div
      className="absolute inset-0 pointer-events-none grain-fine"
      style={{
        opacity: opacity2,
        mixBlendMode: "soft-light",
        zIndex: zIndex + 1,
      }}
    />
    {/* Extremely light amber tint wash */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(160deg, hsla(34,60%,55%,0.04) 0%, transparent 50%, hsla(34,60%,45%,0.05) 100%)",
        zIndex: zIndex + 2,
      }}
    />
  </>
);

import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const navigate = useNavigate();
  const { data: user } = useAuth();

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
              "radial-gradient(ellipse at center, transparent 45%, hsla(210,60%,8%,0.15) 100%)",
            zIndex: 35,
          }}
        />

        {/* ── ANIMATED GLOW ORB — CSS-only, GPU-accelerated ── */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "520px",
            height: "520px",
            top: "50%",
            left: "30%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, hsla(185,48%,50%,0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 6,
            animation: "orbPulse 6s ease-in-out infinite",
          }}
        />
        {/* Coral accent orb bottom-right */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "340px",
            height: "340px",
            bottom: "10%",
            right: "8%",
            background: "radial-gradient(circle, hsla(9,70%,54%,0.18) 0%, transparent 70%)",
            borderRadius: "50%",
            zIndex: 6,
            animation: "orbPulse 8s ease-in-out infinite reverse",
          }}
        />

        {/* ── RIGHT SIDE DIAGONAL BANDS ── */}

        {/* Coral / Red main band — static on mobile, animated on md+ */}
        <div
          className="absolute w-[180vw] md:w-[70vw] lg:w-[52vw] h-[150vh] md:h-[180vh] -top-[10vh] md:-top-[40vh] -right-[60vw] md:-right-[8vw] hidden md:block"
          style={{
            backgroundColor: "hsl(9, 70%, 54%)",
            transform: "rotate(-22deg)",
            transformOrigin: "top right",
            zIndex: 2,
          }}
        />
        {/* Mobile-only static coral band (no animation) */}
        <div
          className="absolute w-[180vw] h-[150vh] -top-[10vh] -right-[60vw] md:hidden"
          style={{
            backgroundColor: "hsl(9, 70%, 54%)",
            transform: "rotate(-22deg)",
            transformOrigin: "top right",
            zIndex: 2,
          }}
        />

        {/* Cyan band — hidden on mobile */}
        <div
          className="absolute hidden md:block w-[30vw] lg:w-[18vw] h-[180vh] -top-[40vh] right-[28vw]"
          style={{
            backgroundColor: "hsl(185, 48%, 50%)",
            transform: "rotate(-22deg)",
            transformOrigin: "top right",
            zIndex: 3,
          }}
        />

        {/* Slate / gray strip — hidden on mobile */}
        <div
          className="absolute hidden md:block w-[15vw] lg:w-[9vw] h-[180vh] -top-[40vh] right-[44vw]"
          style={{
            backgroundColor: "hsl(210, 12%, 60%)",
            transform: "rotate(-22deg)",
            transformOrigin: "top right",
            zIndex: 4,
          }}
        />


        {/* ── BACKGROUND FLOATING ICONS — desktop only for performance ── */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block"
          style={{ zIndex: 1 }}
        >
          <AnimatedIcon
            icon={Sparkles}
            size={40}
            color="hsla(185, 48%, 50%, 0.2)"
            animationType="float"
            className="absolute top-[15%] left-[5%]"
          />
          <AnimatedIcon
            icon={Brain}
            size={60}
            color="hsla(9, 70%, 54%, 0.15)"
            animationType="tilt"
            className="absolute top-[65%] left-[85%]"
            delay={1}
          />
          <AnimatedIcon
            icon={Book}
            size={35}
            color="hsla(36, 28%, 90%, 0.1)"
            animationType="bounce"
            className="absolute top-[80%] left-[40%]"
            delay={0.5}
          />
          <AnimatedIcon
            icon={Rocket}
            size={50}
            color="hsla(185, 48%, 50%, 0.1)"
            animationType="pulse"
            className="absolute top-[20%] left-[75%]"
            delay={2}
          />
        </div>


        {/* Grain on right bands too */}
        <div
          className="absolute inset-0 pointer-events-none grain-coarse"
          style={{ opacity: 0.1, mixBlendMode: "color-burn", zIndex: 5 }}
        />

        {/* ── MAIN TEAL BLOB (left side) ── */}
        <div className="absolute inset-0 z-10 flex items-center md:items-center items-start pt-28 md:pt-0">
          <motion.div
            className="relative flex flex-col justify-center w-[94%] sm:w-[85%] md:w-[75%] lg:w-[62%] min-h-[60vh] md:min-h-[76vh]"
            style={{
              backgroundColor: "hsl(210, 48%, 26%)",
              borderRadius: "0 3rem 3rem 0",
              paddingLeft: "clamp(1.5rem, 6vw, 7rem)",
              paddingRight: "clamp(1.5rem, 5vw, 5rem)",
              paddingTop: "3rem",
              paddingBottom: "4rem",
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
                opacity: 0.12,
                mixBlendMode: "color-burn",
                zIndex: 1,
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none grain-fine"
              style={{
                borderRadius: "inherit",
                opacity: 0.1,
                mixBlendMode: "soft-light",
                zIndex: 2,
              }}
            />
            {/* Warm amber wash on blob */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "inherit",
                background:
                  "linear-gradient(140deg, hsla(34,55%,50%,0.04) 0%, hsla(28,50%,45%,0.02) 60%, hsla(34,55%,40%,0.05) 100%)",
                zIndex: 3,
              }}
            />

            {/* ── Text content ── */}
            <div className="relative" style={{ zIndex: 10 }}>

              {/* Live badge chip */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{
                  background: "hsla(9,70%,54%,0.15)",
                  border: "1px solid hsla(9,70%,54%,0.35)",
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "hsl(9,70%,64%)",
                    boxShadow: "0 0 6px hsla(9,70%,54%,0.8)",
                    animation: "orbPulse 2s ease-in-out infinite",
                  }}
                />
                <span
                  className="font-sans font-bold uppercase tracking-widest"
                  style={{ color: "hsl(9,70%,74%)", fontSize: "0.6rem" }}
                >
                  AI-Powered · Hackathon 2026
                </span>
              </motion.div>

              {/* Big serif title */}
              <motion.h1
                className="font-serif font-bold leading-[1.05] tracking-tight"
                style={{
                  color: "hsl(36, 28%, 95%)",
                  fontSize: "clamp(3rem, 12vw, 9rem)",
                  textShadow: "0 0 80px hsla(185,48%,50%,0.25), 2px 4px 12px hsla(210,60%,8%,0.2)",
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
                className="mt-5 font-sans font-medium uppercase leading-relaxed"
                style={{
                  color: "hsl(36, 20%, 62%)",
                  fontSize: "clamp(0.6rem, 2.5vw, 0.74rem)",
                  letterSpacing: "0.15em",
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
                className="mt-8 flex flex-wrap gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <a
                  href="#features"
                  id="hero-cta-primary"
                  className="inline-flex items-center font-sans font-semibold rounded-full transition-all duration-300 w-full sm:w-auto justify-center"
                  style={{
                    backgroundColor: "hsl(36, 28%, 90%)",
                    color: "hsl(210, 48%, 22%)",
                    padding: "0.85rem 1.8rem",
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
                  className="inline-flex items-center font-sans font-semibold rounded-full border-2 transition-all duration-300 w-full sm:w-auto justify-center"
                  style={{
                    borderColor: "hsl(36, 28%, 80%)",
                    color: "hsl(36, 28%, 88%)",
                    padding: "0.85rem 1.8rem",
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
                <button
                  id="hero-cta-launch"
                  onClick={() => navigate(user ? "/app" : "/login")}
                  className="inline-flex items-center font-sans font-bold rounded-full transition-all duration-300 w-full sm:w-auto justify-center"
                  style={{
                    backgroundColor: "hsl(9, 70%, 54%)",
                    color: "white",
                    padding: "0.85rem 1.8rem",
                    fontSize: "0.95rem",
                    boxShadow: "0 4px 20px hsla(9,70%,54%,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "hsl(9, 70%, 44%)";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "hsl(9, 70%, 54%)";
                  }}
                >
                  {user ? "Dashboard Access" : "🚀 Launch App"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
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
      <ProblemStatementSection />
      <FeaturesSection />

      <HowItWorksSection />
      <TechStackSection />
      <TeamSection />
      <GitHubCTASection />
      <FooterSection />
      <DynamicScrollBot />
    </div>
  );
};

export default Index;
