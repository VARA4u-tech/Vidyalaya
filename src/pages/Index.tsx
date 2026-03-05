import { motion } from "framer-motion";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="bg-beige">
      {/* === HERO SECTION === */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* Paper grain overlay */}
        <div
          className="absolute inset-0 z-30 pointer-events-none opacity-[0.15] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        {/* Cyan diagonal bands — behind everything */}
        <motion.div
          className="absolute bg-cyan"
          style={{
            width: "55vw",
            height: "160vh",
            top: "-30vh",
            right: "-10vw",
            transform: "rotate(-22deg)",
          }}
          animate={{ rotate: [-22, -19, -22] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bg-cyan opacity-80"
          style={{
            width: "15vw",
            height: "130vh",
            top: "-15vh",
            right: "25vw",
            transform: "rotate(-22deg)",
          }}
          animate={{ rotate: [-22, -18, -22] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Coral circle — right side */}
        <motion.div
          className="absolute rounded-full bg-coral"
          style={{
            width: "55vmin",
            height: "55vmin",
            bottom: "-8%",
            right: "-2%",
          }}
          animate={{ x: [0, -5, 0], y: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main teal organic shape — SVG with smooth curves */}
        <div className="absolute inset-0 z-[5]">
          <svg
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M -50,-50
                 C 350,-50 100,100 80,200
                 C 50,340 80,500 120,600
                 C 170,720 250,850 -50,950
                 L -50,950
                 Z"
              fill="hsl(193, 57%, 29%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M -50,-50
                 L 1200,-50
                 C 950,50 880,180 860,300
                 C 830,460 870,600 1050,750
                 C 1100,790 1200,850 1200,950
                 L -50,950
                 C 250,850 170,720 120,600
                 C 80,500 50,340 80,200
                 C 100,100 350,-50 -50,-50
                 Z"
              fill="hsl(193, 57%, 29%)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </svg>
        </div>

        {/* Beige cutout — top-left organic curve */}
        <motion.div
          className="absolute bg-beige z-[6] rounded-full"
          style={{
            width: "35vmin",
            height: "35vmin",
            top: "-10%",
            left: "-8%",
          }}
          animate={{ x: [0, 4, 0], y: [0, 4, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Beige cutout — right side peek */}
        <motion.div
          className="absolute bg-beige z-[6]"
          style={{
            width: "22vw",
            height: "55vh",
            top: "5%",
            right: "-5%",
            borderRadius: "50% 0 0 50%",
          }}
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Content */}
        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
          <motion.h1
            className="text-7xl sm:text-8xl md:text-[9rem] font-black tracking-tight text-primary-foreground leading-[0.9]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Vidyalaya
          </motion.h1>

          <motion.p
            className="mt-10 text-lg sm:text-xl font-medium tracking-wide text-primary-foreground/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            AI Powered Study Platform
          </motion.p>

          <motion.p
            className="mt-4 text-sm sm:text-base text-primary-foreground/60 tracking-widest font-medium uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            Upload Notes &bull; AI Summaries &bull; Smart Quizzes &bull; Exam Planner
          </motion.p>
        </div>
      </section>

      {/* === ADDITIONAL SECTIONS === */}
      <FeaturesSection />
      <HowItWorksSection />
      <FooterSection />
    </div>
  );
};

export default Index;
