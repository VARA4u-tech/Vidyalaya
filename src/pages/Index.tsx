import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background paper-grain flex items-center">
      {/* Geometric shapes */}
      
      {/* Large teal circle - top right */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-teal opacity-90"
        style={{ top: "-10%", right: "-5%" }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Coral red circle - bottom left */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-coral opacity-85"
        style={{ bottom: "-15%", left: "10%" }}
        animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan diagonal shape - center right */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-cyan opacity-70"
        style={{ top: "20%", right: "15%", transform: "rotate(45deg)" }}
        animate={{ rotate: [45, 50, 45], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small teal circle - mid left */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full bg-teal opacity-50"
        style={{ top: "60%", left: "35%" }}
        animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Cyan triangle-ish shape top left */}
      <motion.div
        className="absolute w-[300px] h-[300px] bg-cyan opacity-40"
        style={{ top: "-5%", left: "5%", transform: "rotate(-15deg)", borderRadius: "0 0 100% 0" }}
        animate={{ rotate: [-15, -10, -15] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-4xl">
        <motion.h1
          className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-foreground leading-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Vidyalaya
        </motion.h1>

        <motion.p
          className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground/80 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          AI Powered Study Platform
        </motion.p>

        <motion.p
          className="mt-6 text-base sm:text-lg text-muted-foreground tracking-wide font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Upload Notes &bull; AI Summaries &bull; Smart Quizzes &bull; Exam Planner
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
