import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-beige flex items-center">
      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 z-30 pointer-events-none opacity-[0.15] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* === LAYER 1: Cyan diagonal bands (behind everything) === */}
      {/* Top-right cyan band */}
      <motion.div
        className="absolute bg-cyan"
        style={{
          width: "50vw",
          height: "140vh",
          top: "-20vh",
          right: "-8vw",
          transform: "rotate(-20deg)",
          transformOrigin: "center center",
        }}
        animate={{ rotate: [-20, -18, -20] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Second cyan sliver */}
      <motion.div
        className="absolute bg-cyan opacity-90"
        style={{
          width: "18vw",
          height: "120vh",
          top: "-10vh",
          right: "22vw",
          transform: "rotate(-20deg)",
          transformOrigin: "center center",
        }}
        animate={{ rotate: [-20, -17, -20] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === LAYER 2: Coral circle (right side) === */}
      <motion.div
        className="absolute rounded-full bg-coral"
        style={{
          width: "60vmin",
          height: "60vmin",
          bottom: "-10%",
          right: "-3%",
        }}
        animate={{ x: [0, -6, 0], y: [0, 8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* === LAYER 3: Main teal shape — large lens/eye shape === */}
      {/* This creates the dominant teal area with concave curves on left and right */}
      <div className="absolute inset-0 z-[5]">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M -100,0
               C 200,150 250,350 200,450
               C 150,550 180,700 -100,900
               L 1100,900
               C 850,700 800,550 820,450
               C 840,350 870,150 1100,0
               Z"
            fill="hsl(193, 57%, 29%)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </svg>
      </div>

      {/* Small beige cutout circle on top-left to break up teal */}
      <motion.div
        className="absolute rounded-full bg-beige z-[6]"
        style={{
          width: "30vmin",
          height: "30vmin",
          top: "-8%",
          left: "-6%",
        }}
        animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content — white text on teal */}
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
    </div>
  );
};

export default Index;
