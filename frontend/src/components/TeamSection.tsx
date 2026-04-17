import { motion } from "framer-motion";
import { Github, Code, Database, Server, Cpu } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  skills: string[];
}

const frontendTeam: TeamMember[] = [
  {
    name: "P. Durga Vara Prasad",
    role: "Lead UI/UX & Database Architect",
    avatar: "DP",
    skills: ["React", "TypeScript", "UI Design", "Database Orchestration"],
  },
  {
    name: "T. Revanth Sai",
    role: "Frontend Engineer",
    avatar: "RS",
    skills: ["Framer Motion", "State Management", "Responsive Design"],
  },
];

const backendTeam: TeamMember[] = [
  {
    name: "R. Jayaveer",
    role: "Backend System Architect",
    avatar: "RJ",
    skills: ["Node.js", "Express", "REST APIs"],
  },
  {
    name: "S. Girish",
    role: "AI Integration Engineer",
    avatar: "SG",
    skills: ["OpenRouter", "LLM Pipelines", "Security"],
  },
];

const MemberCard = ({ member, color }: { member: TeamMember; color: string }) => (
  <motion.div
    className="relative group p-6 rounded-[2.5rem] border border-white/10 transition-all duration-500 hover:shadow-2xl overflow-hidden"
    style={{ backgroundColor: "hsl(210, 48%, 24%)" }}
    whileHover={{ y: -8 }}
  >
    {/* Subtle gradient background on hover */}
    <div 
      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
      style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
    />
    
    <div className="relative z-10">
      <div className="flex items-center gap-5 mb-6">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg transform transition-transform group-hover:scale-110"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 8px 20px ${color}44`
          }}
        >
          {member.avatar}
        </div>
        <div>
          <h4 className="font-serif font-bold text-xl text-white leading-tight">{member.name}</h4>
          <p className="font-sans font-medium text-xs mt-1 uppercase tracking-wider" style={{ color: color }}>
            {member.role}
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {member.skills.map(skill => (
          <span 
            key={skill}
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5 bg-white/5 text-white/60"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const DepartmentBlock = ({ title, icon: Icon, members, color, delay }: { title: string; icon: React.ElementType; members: TeamMember[]; color: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="flex flex-col gap-6"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/80">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-serif font-bold text-2xl text-[hsl(210,48%,20%)]">{title}</h3>
        <div className="h-1 w-12 rounded-full mt-1" style={{ backgroundColor: color }} />
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
      {members.map(member => (
        <MemberCard key={member.name} member={member} color={color} />
      ))}
    </div>
  </motion.div>
);

const TeamSection = () => {
  return (
    <section 
      id="team" 
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "hsl(34, 32%, 84%)" }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-sans font-bold uppercase tracking-[0.3em] text-coral-600 text-[10px]">Development Force</span>
          <h2 className="font-serif font-bold text-4xl md:text-6xl text-[hsl(210,48%,20%)] mt-4">
            Meet <span className="italic text-coral-500 underline decoration-coral-500/30 underline-offset-8">Team Varanasi</span>
          </h2>
          <p className="font-sans text-[hsl(210,48%,30%)] mt-6 max-w-2xl mx-auto opacity-70 leading-relaxed">
            A collaborative powerhouse of four dedicated engineers working together to redefine 
            the student learning experience through AI innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          <DepartmentBlock 
            title="Frontend & Database" 
            icon={Database} 
            members={frontendTeam} 
            color="hsl(185, 48%, 50%)" 
            delay={0.1}
          />
          <DepartmentBlock 
            title="Backend Systems" 
            icon={Server} 
            members={backendTeam} 
            color="hsl(9, 70%, 54%)" 
            delay={0.3}
          />
        </div>

        {/* Unified Project Vision Badge */}
        <motion.div 
          className="mt-24 p-8 rounded-[3rem] border border-coral-500/20 bg-coral-500/5 text-center max-w-4xl mx-auto backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-serif italic text-xl md:text-2xl text-[hsl(210,48%,22%)] leading-relaxed">
            "Designed and Engineered with ❤️ for Students by Team Varanasi."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
