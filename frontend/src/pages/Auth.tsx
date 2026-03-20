import { useState, useEffect } from "react";
import { insforge } from "@/lib/insforge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogIn,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  CheckCircle2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/NavBar";

/* Reusing GrainOverlay from Index.tsx logic */
const GrainOverlay = () => (
  <>
    <div
      className="absolute inset-0 pointer-events-none grain-coarse"
      style={{ opacity: 0.12, mixBlendMode: "color-burn", zIndex: 5 }}
    />
    <div
      className="absolute inset-0 pointer-events-none grain-fine"
      style={{ opacity: 0.08, mixBlendMode: "soft-light", zIndex: 6 }}
    />
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(160deg, hsla(34,60%,55%,0.04) 0%, transparent 50%, hsla(34,60%,45%,0.05) 100%)",
        zIndex: 7,
      }}
    />
  </>
);

const Auth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await insforge.auth.signInWithOAuth({
        provider: 'google',
        redirectTo: window.location.origin + "/app",
      });
      if (error) throw error;
    } catch (err: unknown) {
      toast.error(`Google login failed: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "hsl(210, 48%, 26%)" }}
    >
      <GrainOverlay />

      {/* Hero-like background bands */}
      <motion.div
        className="absolute w-[180vw] md:w-[70vw] lg:w-[50vw] h-full -top-[10%] -right-[60vw] md:-right-[8vw]"
        style={{
          backgroundColor: "hsl(9, 75%, 58%)",
          transform: "rotate(-22deg)",
          transformOrigin: "top right",
          zIndex: 1,
        }}
        animate={{
          rotate: [-22, -19.5, -22],
          backgroundColor: "hsl(9, 80%, 62%)",
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Simplified Header */}
        <header className="flex-shrink-0 h-16 md:h-20 flex items-center justify-between px-6 md:px-12 max-w-[90rem] mx-auto w-full">
          <Link to="/" className="transition-transform hover:scale-110">
            <img
              src="/logo.png"
              alt="Vidyalaya"
              className="w-16 h-16 md:w-28 md:h-28 object-contain"
            />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 font-sans font-bold uppercase tracking-widest text-[12px] md:text-xs hover:text-white transition-all group"
            style={{ color: "hsla(0, 0%, 0%, 1.00)" }}
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-1 group-hover:translate-x-0">
              ⬅
            </span>
            Back to Home
          </Link>
        </header>

        <div className="flex-grow flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-[90rem] flex items-center justify-center lg:justify-between gap-12 h-full">
            {/* Desktop Left Side: Features */}
            <div className="hidden lg:flex flex-col gap-6 w-[28%]">
              {[
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Instant Summaries",
                  desc: "Turn long notes into concise AI summaries in seconds.",
                },
                {
                  icon: <Lock className="w-6 h-6" />,
                  title: "Secure Storage",
                  desc: "Your study materials are encrypted and safe with us.",
                },
                {
                  icon: <CheckCircle2 className="w-6 h-6" />,
                  title: "Smart Planner",
                  desc: "Let AI organize your revision schedule for maximum impact.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                  className="p-6 rounded-[2rem] border border-[hsla(36,25%,90%,0.1)] bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3.5 rounded-2xl bg-coral/20 text-coral flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-[hsla(0, 31%, 94%, 1.00)] text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[hsl(36,15%,65%)] text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Auth Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md lg:max-w-lg"
            >
              <div
                className="rounded-[3rem] shadow-2xl border border-[hsla(36,25%,90%,0.2)] relative overflow-hidden text-center"
                style={{ backgroundColor: "hsl(210, 48%, 20%)" }}
              >
                {/* Inner Grain */}
                <div
                  className="absolute inset-0 pointer-events-none grain-coarse"
                  style={{
                    opacity: 0.1,
                    mixBlendMode: "color-burn",
                    borderRadius: "inherit",
                  }}
                />

                <div className="relative z-10 p-8 md:p-14 transition-all duration-500">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                  >
                    <h1
                      className="font-serif font-bold leading-tight tracking-tight mb-2"
                      style={{
                        color: "hsl(36, 28%, 95%)",
                        fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                      }}
                    >
                      Welcome
                    </h1>
                    <p
                      className="font-sans font-medium uppercase tracking-[0.3em]"
                      style={{
                        color: "hsl(36, 20%, 62%)",
                        fontSize: "0.75rem",
                      }}
                    >
                      Start your smart learning journey
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <Button
                      onClick={handleGoogleLogin}
                      disabled={loading}
                      className="w-full h-16 md:h-20 rounded-full bg-white text-black hover:bg-[hsl(36,28%,90%)] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.15)] group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <div className="flex items-center justify-center gap-4 relative z-10 w-full">
                        {loading ? (
                          <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                        ) : (
                          <>
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                              <Chrome className="w-5 h-5 md:w-6 md:h-6 text-[#4285F4]" />
                            </div>
                            <span className="font-sans font-bold text-lg md:text-xl tracking-tight">
                              Continue with Google
                            </span>
                          </>
                        )}
                      </div>
                    </Button>
                  </motion.div>

                  <p
                    className="mt-8 font-sans font-medium text-xs md:text-sm max-w-[280px] mx-auto leading-relaxed"
                    style={{ color: "hsl(36, 15%, 55%)" }}
                  >
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Desktop Right Side: Stats/Social */}
            <div className="hidden lg:flex flex-col gap-6 w-[28%]">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="p-10 rounded-[3rem] border border-[hsla(36,25%,90%,0.1)] bg-coral/10 backdrop-blur-md relative overflow-hidden text-center group"
              >
                <div className="relative z-10">
                  <h2 className="font-serif font-bold text-6xl text-black mb-3">
                    12K+
                  </h2>
                  <p className="font-sans font-bold uppercase tracking-[0.2em] text-[0.8rem] text-black">
                    Active Learners
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="p-10 rounded-[3rem] border border-[hsla(36,25%,90%,0.1)] bg-white/5 backdrop-blur-md relative"
              >
                <p className="font-serif italic text-black text-[1.4rem] leading-relaxed text-center quote-mark">
                  "The smartest way to master your curriculum."
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
