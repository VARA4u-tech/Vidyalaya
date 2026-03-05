import { motion } from "framer-motion";

const FooterSection = () => {
  return (
    <footer className="relative py-20 overflow-hidden">
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Small coral accent */}
      <motion.div
        className="absolute rounded-full bg-coral opacity-15"
        style={{ width: "20vmin", height: "20vmin", top: "-5%", left: "50%" }}
        animate={{ x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="text-4xl font-black text-foreground tracking-tight">Vidyalaya</h3>
            <p className="text-muted-foreground mt-2">AI Powered Study Platform</p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground font-medium uppercase tracking-widest">
            <span className="hover:text-foreground transition-colors cursor-pointer">About</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Features</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Contact</span>
          </div>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground/60 tracking-wide">
            &copy; 2026 Vidyalaya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
