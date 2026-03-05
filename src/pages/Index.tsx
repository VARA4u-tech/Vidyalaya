import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-beige flex items-center">
      {/* Paper grain overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Large teal shape - fills most of the left/center like a rounded diamond */}
      <motion.div
        className="absolute bg-teal"
        style={{
          width: "85vw",
          height: "120vh",
          top: "-10vh",
          left: "-10vw",
          borderRadius: "0 40% 0 40%",
          transform: "rotate(-5deg)",
        }}
        animate={{ rotate: [-5, -3, -5] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Coral red circle - right side, partially clipped */}
      <motion.div
        className="absolute rounded-full bg-coral"
        style={{
          width: "55vmin",
          height: "55vmin",
          bottom: "-5%",
          right: "2%",
        }}
        animate={{ x: [0, -8, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan diagonal shape - top right */}
      <motion.div
        className="absolute bg-cyan"
        style={{
          width: "45vmin",
          height: "80vmin",
          top: "-15%",
          right: "-2%",
          transform: "rotate(-25deg)",
          borderRadius: "8px",
        }}
        animate={{ rotate: [-25, -22, -25] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Second cyan sliver - lower right area */}
      <motion.div
        className="absolute bg-cyan opacity-80"
        style={{
          width: "20vmin",
          height: "60vmin",
          bottom: "5%",
          right: "18%",
          transform: "rotate(-25deg)",
          borderRadius: "8px",
        }}
        animate={{ rotate: [-25, -20, -25] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Beige peek-through on the far right edge */}
      <div
        className="absolute bg-beige"
        style={{
          width: "15vw",
          height: "40vh",
          top: "10%",
          right: "-2%",
          borderRadius: "50% 0 0 50%",
        }}
      />

      {/* Content - white text on teal */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
        <motion.h1
          className="text-7xl sm:text-8xl md:text-[9rem] font-black tracking-tight text-primary-foreground leading-[0.9]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Vidyalaya
        </motion.h1>

        <motion.div
          className="mt-10 flex gap-12 text-primary-foreground/80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <p className="text-lg sm:text-xl font-medium tracking-wide">
            AI Powered Study Platform
          </p>
        </motion.div>

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
