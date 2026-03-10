import { useState, useEffect } from "react";
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
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  // Sync state with URL if needed, or just use state
  useEffect(() => {
    if (location.pathname === "/signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location.pathname]);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  const toggleAuth = () => {
    const nextState = !isLogin;
    setIsLogin(nextState);
    navigate(nextState ? "/login" : "/signup");
  };

  return (
    <div
      className="relative h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: "hsl(210, 48%, 26%)" }}
    >
      <GrainOverlay />

      {/* Hero-like background bands - More vibrant for dark bg */}
      <motion.div
        className="absolute w-[180vw] md:w-[70vw] lg:w-[50vw] h-full -top-[10%] -right-[60vw] md:-right-[8vw]"
        style={{
          backgroundColor: isLogin ? "hsl(9, 75%, 58%)" : "hsl(185, 55%, 55%)",
          transform: "rotate(-22deg)",
          transformOrigin: "top right",
          zIndex: 1,
        }}
        animate={{
          rotate: [-22, -19.5, -22],
          backgroundColor: isLogin ? "hsl(9, 80%, 62%)" : "hsl(185, 65%, 60%)",
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-[60vw] md:w-[30vw] lg:w-[15vw] h-full -top-[10%] right-[10vw] md:right-[28vw]"
        style={{
          backgroundColor: isLogin ? "hsl(185, 55%, 55%)" : "hsl(9, 75%, 58%)",
          transform: "rotate(-22deg)",
          transformOrigin: "top right",
          zIndex: 2,
        }}
        animate={{
          rotate: [-22, -18.5, -22],
          backgroundColor: isLogin ? "hsl(185, 65%, 60%)" : "hsl(9, 80%, 62%)",
        }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col h-screen overflow-hidden">
        {/* Simplified Header for Auth pages to save space */}
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

        <div className="flex-grow flex items-center justify-center px-4 py-2 min-h-0">
          <div className="w-full max-w-[90rem] flex items-center justify-between gap-8 h-full">
            {/* Desktop Left Side: Features */}
            <div className="hidden lg:flex flex-col gap-5 w-[22%]">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  title: "Instant Summaries",
                  desc: "Turn long notes into concise AI summaries in seconds.",
                },
                {
                  icon: <Lock className="w-5 h-5" />,
                  title: "Secure Storage",
                  desc: "Your study materials are encrypted and safe with us.",
                },
                {
                  icon: <CheckCircle2 className="w-5 h-5" />,
                  title: "Smart Planner",
                  desc: "Let AI organize your revision schedule for maximum impact.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                  className="p-5 rounded-3xl border border-[hsla(36,25%,90%,0.1)] bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-coral/20 text-coral flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-[hsla(0, 31%, 94%, 1.00)] text-sm mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-[hsl(36,15%,65%)] text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Auth Card */}
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md"
            >
              <div
                className="rounded-[2.5rem] shadow-2xl border border-[hsla(36,25%,90%,0.2)] relative overflow-hidden"
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

                <div className="relative z-10 p-6 md:p-10 transition-all duration-500">
                  <div className="text-center mb-6 overflow-hidden h-[90px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      {isLogin ? (
                        <motion.div
                          key="login-header"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <h1
                            className="font-serif font-bold leading-tight tracking-tight mb-1"
                            style={{
                              color: "hsl(36, 28%, 95%)",
                              fontSize: "clamp(2rem, 5vw, 2.8rem)",
                            }}
                          >
                            Welcome Back
                          </h1>
                          <p
                            className="font-sans font-medium uppercase tracking-[0.2em]"
                            style={{
                              color: "hsl(36, 20%, 62%)",
                              fontSize: "0.65rem",
                            }}
                          >
                            Enter into your learning space
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="signup-header"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <h1
                            className="font-serif font-bold leading-tight tracking-tight mb-1"
                            style={{
                              color: "hsl(36, 28%, 95%)",
                              fontSize: "clamp(2rem, 5vw, 2.8rem)",
                            }}
                          >
                            Join Vidyalaya
                          </h1>
                          <p
                            className="font-sans font-medium uppercase tracking-[0.2em]"
                            style={{
                              color: "hsl(36, 20%, 62%)",
                              fontSize: "0.65rem",
                            }}
                          >
                            Start your smart learning journey
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative overflow-visible">
                    <AnimatePresence mode="wait">
                      {isLogin ? (
                        <motion.div
                          key="login-form"
                          initial={{ x: 50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -100, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "circOut" }}
                        >
                          <form
                            onSubmit={handleLoginSubmit}
                            className="space-y-4"
                          >
                            <div className="space-y-1.5">
                              <Label
                                htmlFor="login-email"
                                style={{
                                  color: "hsl(36, 25%, 82%)",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Email Address
                              </Label>
                              <div className="relative">
                                <Mail
                                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                                  style={{ color: "hsl(36, 15%, 48%)" }}
                                />
                                <Input
                                  id="login-email"
                                  type="email"
                                  placeholder="name@example.com"
                                  autoComplete="email"
                                  className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-12 rounded-xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                                  value={loginData.email}
                                  onChange={(e) =>
                                    setLoginData({
                                      ...loginData,
                                      email: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <Label
                                  htmlFor="login-password"
                                  style={{
                                    color: "hsl(36, 25%, 82%)",
                                    fontSize: "0.8rem",
                                  }}
                                >
                                  Password
                                </Label>
                                <button
                                  type="button"
                                  className="text-[10px] font-semibold hover:text-white transition-colors"
                                  style={{ color: "hsl(185, 48%, 50%)" }}
                                >
                                  Forgot password?
                                </button>
                              </div>
                              <div className="relative">
                                <Lock
                                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                                  style={{ color: "hsl(36, 15%, 48%)" }}
                                />
                                <Input
                                  id="login-password"
                                  type="password"
                                  placeholder="••••••••"
                                  autoComplete="current-password"
                                  className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-12 rounded-xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                                  value={loginData.password}
                                  onChange={(e) =>
                                    setLoginData({
                                      ...loginData,
                                      password: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <Button
                              type="submit"
                              className="w-full h-12 font-sans font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl mt-2"
                              style={{
                                backgroundColor: "hsl(9, 70%, 54%)",
                                color: "white",
                                fontSize: "0.85rem",
                              }}
                            >
                              Sign In <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </form>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="signup-form"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 100, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "circOut" }}
                        >
                          <form
                            onSubmit={handleSignupSubmit}
                            className="space-y-3"
                          >
                            <div className="space-y-1">
                              <Label
                                htmlFor="signup-name"
                                style={{
                                  color: "hsl(36, 25%, 82%)",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Full Name
                              </Label>
                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(36,15%,48%)] transition-colors" />
                                <Input
                                  id="signup-name"
                                  type="text"
                                  placeholder="John Doe"
                                  autoComplete="name"
                                  className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-11 rounded-xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                                  value={signupData.name}
                                  onChange={(e) =>
                                    setSignupData({
                                      ...signupData,
                                      name: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label
                                htmlFor="signup-email"
                                style={{
                                  color: "hsl(36, 25%, 82%)",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Email Address
                              </Label>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(36,15%,48%)] transition-colors" />
                                <Input
                                  id="signup-email"
                                  type="email"
                                  placeholder="name@example.com"
                                  autoComplete="email"
                                  className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-11 rounded-xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                                  value={signupData.email}
                                  onChange={(e) =>
                                    setSignupData({
                                      ...signupData,
                                      email: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <Label
                                htmlFor="signup-password"
                                style={{
                                  color: "hsl(36, 25%, 82%)",
                                  fontSize: "0.8rem",
                                }}
                              >
                                Password
                              </Label>
                              <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(36,15%,48%)] transition-colors" />
                                <Input
                                  id="signup-password"
                                  type="password"
                                  placeholder="••••••••"
                                  autoComplete="new-password"
                                  className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-11 rounded-xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                                  value={signupData.password}
                                  onChange={(e) =>
                                    setSignupData({
                                      ...signupData,
                                      password: e.target.value,
                                    })
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="pt-1">
                              <Button
                                type="submit"
                                className="w-full h-12 font-sans font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl"
                                style={{
                                  backgroundColor: "hsl(185, 48%, 50%)",
                                  color: "white",
                                  fontSize: "0.85rem",
                                }}
                              >
                                Create Account{" "}
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </Button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-6">
                    <div className="relative mb-6 flex items-center gap-4">
                      <div
                        className="h-px flex-1"
                        style={{ backgroundColor: "hsla(36,25%,90%,0.1)" }}
                      />
                      <span
                        className="font-sans font-medium uppercase tracking-widest text-[0.6rem]"
                        style={{ color: "hsl(36, 15%, 48%)" }}
                      >
                        Or continue with
                      </span>
                      <div
                        className="h-px flex-1"
                        style={{ backgroundColor: "hsla(36,25%,90%,0.1)" }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="h-10 border-[hsla(36,25%,90%,0.15)] bg-transparent text-[hsl(36,25%,85%)] hover:bg-white/5 rounded-xl transition-all text-xs"
                      >
                        <Chrome className="mr-2 w-4 h-4" /> Google
                      </Button>
                      <Button
                        variant="outline"
                        className="h-10 border-[hsla(36,25%,90%,0.15)] bg-transparent text-[hsl(36,25%,85%)] hover:bg-white/5 rounded-xl transition-all text-xs"
                      >
                        <Github className="mr-2 w-4 h-4" /> GitHub
                      </Button>
                    </div>
                  </div>

                  <p
                    className="text-center mt-6 font-sans font-medium text-xs"
                    style={{ color: "hsl(36, 15%, 55%)" }}
                  >
                    {isLogin ? "New here? " : "Already have an account? "}
                    <button
                      onClick={toggleAuth}
                      className="font-bold transition-all hover:text-white"
                      style={{
                        color: isLogin
                          ? "hsl(9, 70%, 54%)"
                          : "hsl(185, 48%, 50%)",
                      }}
                    >
                      {isLogin ? "Create Account" : "Sign In"}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Desktop Right Side: Stats/Social */}
            <div className="hidden lg:flex flex-col gap-6 w-[22%]">
              {/* Stats Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="p-8 rounded-[3rem] border border-[hsla(36,25%,90%,0.1)] bg-coral/10 backdrop-blur-md relative overflow-hidden text-center group"
              >
                <div className="absolute inset-0 bg-coral/5 group-hover:bg-coral/10 transition-colors" />

                <div className="relative z-10">
                  <h2 className="font-serif font-bold text-5xl text-black mb-2">
                    12K+
                  </h2>

                  <p className="font-sans font-bold uppercase tracking-[0.2em] text-[0.75rem] text-black">
                    Students Tested
                  </p>

                  <div className="mt-5 flex justify-center -space-x-2">
                    {["A", "B", "C", "D"].map((letter, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-full border-2 border-[hsl(210,48%,20%)] bg-[hsl(210,48%,30%)] flex items-center justify-center text-xs text-white font-bold backdrop-blur-sm"
                      >
                        {letter}
                      </div>
                    ))}

                    <div className="w-9 h-9 rounded-full border-2 border-[hsl(210,48%,20%)] bg-coral flex items-center justify-center text-xs text-white font-bold">
                      +
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial Card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="p-8 rounded-[3rem] border border-[hsla(36,25%,90%,0.1)] bg-white/5 backdrop-blur-md relative"
              >
                <p className="font-serif italic text-black text-[1.2rem] leading-relaxed text-center quote-mark">
                  "Vidyans helps students organize their notes efficiently and
                  revise key concepts quickly before exams."
                </p>

                <p className="text-center text-black font-bold text-sm mt-4 uppercase tracking-widest">
                  — Student Beta Tester
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
