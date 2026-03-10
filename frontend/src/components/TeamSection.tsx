import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "DV Prasad",
    role: "Full-Stack Developer",
    avatar: "D",
    color: "hsl(9,70%,54%)",
    bio: "Led end-to-end development of Vidyalaya. Passionate about building tools that make learning more effective and accessible.",
    skills: ["React", "TypeScript", "UI Design"],
    github: "#",
    linkedin: "#",
    email: "#",
  },
];

const advisors = [
  { label: "Built with", value: "React + TypeScript" },
  { label: "Project type", value: "Academic / Personal Project" },
  { label: "Duration", value: "24 hrs" },
  { label: "Purpose", value: "Student Learning Platform" },
];

const TeamSection = () => (
  <section
    id="team"
    className="relative py-24 md:py-32 overflow-hidden"
    style={{ backgroundColor: "hsl(34, 32%, 84%)" }}
  >
    {/* Grain */}
    <div
      className="absolute inset-0 pointer-events-none grain-fine"
      style={{ opacity: 0.1, mixBlendMode: "multiply" }}
    />

    {/* Vignette */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 55%, hsla(28,30%,12%,0.1) 100%)",
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
      {/* Header */}
      <motion.div
        className="mb-14 md:mb-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p
          className="font-sans font-bold uppercase mb-3"
          style={{
            color: "hsl(9,68%,48%)",
            fontSize: "0.72rem",
            letterSpacing: "0.28em",
          }}
        >
          The Maker
        </p>
        <h2
          className="font-serif font-bold leading-[0.95] tracking-tight"
          style={{
            color: "hsl(210,48%,20%)",
            fontSize: "clamp(2.6rem, 6vw, 5rem)",
          }}
        >
          Meet the{" "}
          <span className="italic" style={{ color: "hsl(9,70%,54%)" }}>
            Developer
          </span>
        </h2>
        <motion.div
          className="mt-5 h-1 rounded-full"
          style={{ backgroundColor: "hsl(9,68%,52%)", width: "0%" }}
          whileInView={{ width: "64px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Main developer card */}
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            className="rounded-3xl overflow-hidden border border-[hsla(210,48%,20%,0.1)] shadow-xl"
            style={{ backgroundColor: "hsl(210,48%,24%)" }}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Color header bar */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: member.color }}
            />

            <div className="p-7 md:p-8">
              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold font-serif flex-shrink-0 shadow-lg"
                  style={{
                    backgroundColor: member.color,
                    fontSize: "2.2rem",
                    boxShadow: `0 8px 24px ${member.color}55`,
                  }}
                >
                  {member.avatar}
                </div>
                <div>
                  <h3
                    className="font-serif font-bold text-[hsl(36,28%,93%)]"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="font-sans font-semibold mt-1"
                    style={{ color: member.color, fontSize: "0.85rem" }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p
                className="font-sans leading-relaxed mb-6"
                style={{
                  color: "hsl(36,18%,65%)",
                  fontSize: "0.95rem",
                  lineHeight: 1.75,
                }}
              >
                {member.bio}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: member.color + "20",
                      color: member.color,
                      border: `1px solid ${member.color}35`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social links */}
              <div className="flex gap-3 pt-5 border-t border-[hsla(36,25%,90%,0.08)]">
                <a
                  href={member.github}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-[hsla(36,25%,90%,0.08)]"
                  style={{ color: "hsl(36,20%,65%)" }}
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href={member.linkedin}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-[hsla(36,25%,90%,0.08)]"
                  style={{ color: "hsl(36,20%,65%)" }}
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <a
                  href={member.email}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-[hsla(36,25%,90%,0.08)]"
                  style={{ color: "hsl(36,20%,65%)" }}
                >
                  <Mail size={15} /> Email
                </a>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Right: Project info + quote */}
        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Project info card */}
          <div
            className="rounded-3xl p-6 border border-[hsla(210,48%,20%,0.1)]"
            style={{ backgroundColor: "hsl(210,48%,24%)" }}
          >
            <p
              className="font-sans font-bold uppercase text-xs tracking-widest mb-4"
              style={{ color: "hsl(185,48%,55%)" }}
            >
              Project Info
            </p>
            <div className="flex flex-col gap-3">
              {advisors.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center justify-between py-2.5 border-b border-[hsla(36,25%,90%,0.07)] last:border-0"
                >
                  <span
                    className="font-sans text-sm"
                    style={{ color: "hsl(36,15%,55%)" }}
                  >
                    {a.label}
                  </span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "hsl(36,25%,85%)" }}
                  >
                    {a.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dev quote */}
          <motion.div
            className="rounded-3xl p-6 border"
            style={{
              backgroundColor: "hsla(9,70%,54%,0.06)",
              borderColor: "hsla(9,70%,54%,0.2)",
            }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
          >
            <p
              className="font-serif italic leading-relaxed text-lg mb-4"
              style={{ color: "hsla(237, 80%, 40%, 1.00)" }}
            >
              "I built Vidyalaya because I wanted a smarter way to study — one
              that uses AI to do the heavy lifting so you can focus on
              understanding, not memorising."
            </p>
            <p
              className="font-sans font-semibold text-sm"
              style={{ color: "hsl(9,70%,65%)" }}
            >
              — DV Prasad, Developer
            </p>
          </motion.div>

          {/* Contribution CTA */}
          <motion.a
            href="#"
            className="flex items-center justify-between gap-3 rounded-2xl p-4 border transition-all hover:border-[hsl(9,70%,54%)] group"
            style={{
              backgroundColor: "hsl(210,48%,24%)",
              borderColor: "hsla(36,25%,90%,0.1)",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Github size={20} style={{ color: "hsl(36,25%,70%)" }} />
              <div>
                <p className="font-semibold text-[hsl(36,25%,85%)] text-sm">
                  View Source Code
                </p>
                <p className="text-[hsl(36,15%,50%)] text-xs">
                  Open source on GitHub
                </p>
              </div>
            </div>
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                backgroundColor: "hsl(9,70%,54%)",
                color: "white",
              }}
            >
              ⭐ Star
            </span>
          </motion.a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default TeamSection;
