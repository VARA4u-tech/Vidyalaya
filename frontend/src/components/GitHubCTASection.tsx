import { motion } from "framer-motion";
import { Github, ExternalLink, Star, GitFork, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const repoStats = [
  { icon: Star, label: "Stars", value: "⭐ 0" },
  { icon: GitFork, label: "Forks", value: "🍴 0" },
  { icon: Eye, label: "Watchers", value: "👁 1" },
];

const GitHubCTASection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="github-cta"
      className="relative py-24 md:py-28 overflow-hidden"
      style={{ backgroundColor: "hsl(210, 55%, 12%)" }}
    >
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none grain-coarse"
        style={{ opacity: 0.07, mixBlendMode: "multiply" }}
      />

      {/* Decorative radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, hsla(185,48%,50%,0.06) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsla(36,25%,90%,0.1), transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsla(36,25%,90%,0.1), transparent)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
        {/* Top label */}
        <motion.p
          className="font-sans font-bold uppercase mb-5"
          style={{
            color: "hsl(185,48%,55%)",
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Open Source · Student Project
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-serif font-bold leading-[0.95] tracking-tight mb-6"
          style={{
            color: "hsl(36,25%,95%)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          View the Code.{" "}
          <span className="italic" style={{ color: "hsl(9,70%,54%)" }}>
            Try the Demo.
          </span>
        </motion.h2>

        <motion.p
          className="font-sans max-w-2xl mx-auto mb-10 md:mb-12"
          style={{
            color: "hsl(36,15%,60%)",
            fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
            lineHeight: 1.8,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Vidyalaya is fully open-source. Browse the codebase on GitHub, star
          the repo if you find it useful, or jump straight into the live app.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://github.com/VARA4u-tech/Vidyalaya"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-7 py-3.5 rounded-2xl font-semibold text-white text-base transition-all hover:brightness-110 hover:scale-105 w-full sm:w-auto justify-center"
            style={{
              backgroundColor: "hsl(210,48%,28%)",
              border: "1px solid hsla(36,25%,90%,0.15)",
              boxShadow: "0 4px 24px hsla(210,48%,8%,0.5)",
            }}
          >
            <Github size={20} />
            View on GitHub
          </a>

          <button
            onClick={() => navigate("/app")}
            className="flex items-center gap-3 px-7 py-3.5 rounded-2xl font-bold text-white text-base transition-all hover:brightness-110 hover:scale-105 w-full sm:w-auto justify-center"
            style={{
              backgroundColor: "hsl(9,70%,54%)",
              boxShadow: "0 4px 24px hsla(9,70%,54%,0.4)",
            }}
          >
            <ExternalLink size={20} />
            Launch Live Demo
          </button>
        </motion.div>

        {/* Repo stat chips */}
        <motion.div
          className="flex items-center justify-center gap-3 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          {repoStats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border"
              style={{
                backgroundColor: "hsla(210,50%,24%,0.5)",
                borderColor: "hsla(36,25%,90%,0.08)",
                color: "hsl(36,20%,65%)",
                fontSize: "0.82rem",
              }}
            >
              <span>{s.value}</span>
              <span style={{ color: "hsl(36,15%,42%)" }}>{s.label}</span>
            </div>
          ))}

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl border"
            style={{
              backgroundColor: "hsla(142,60%,50%,0.08)",
              borderColor: "hsla(142,60%,50%,0.2)",
              color: "hsl(142,60%,60%)",
              fontSize: "0.82rem",
            }}
          >
            ● MIT License
          </div>
        </motion.div>

        {/* Tech badge row */}
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
        >
          {[
            "React",
            "TypeScript",
            "Vite",
            "Tailwind CSS",
            "Framer Motion",
            "Recharts",
          ].map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "hsla(185,48%,50%,0.1)",
                color: "hsl(185,48%,60%)",
                border: "1px solid hsla(185,48%,50%,0.2)",
              }}
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubCTASection;
