import { useState, useEffect } from "react";
import { insforge } from "@/lib/insforge";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  CheckCircle2,
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

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // If user is already logged in, redirect to app
    const checkUser = async () => {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data?.user) navigate("/app");
      } catch {
        // No session
      }
    };
    checkUser();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await insforge.auth.signInWithOAuth({
        provider: "google",
        redirectTo: window.location.origin + "/app",
      });
      if (error) throw error;
    } catch (err: unknown) {
      toast.error(`Google login failed: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    try {
      const { error } = await insforge.auth.signInWithOAuth({
        provider: "github",
        redirectTo: window.location.origin + "/app",
      });
      if (error) throw error;
    } catch (err: unknown) {
      toast.error(`GitHub login failed: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use a more specific type than any to comply with lint rules
      const { data, error } = await (
        insforge.auth.signUp as (args: {
          email: string;
          password: string;
          options?: {
            data?: Record<string, unknown>;
            emailRedirectTo?: string;
          };
        }) => Promise<{ data: unknown; error: Error | null }>
      )({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          },
        },
      });

      if (error) throw error;

      if (data) {
        toast.success("Account Created!", {
          description:
            "Welcome to Vidyalaya. Your learning journey begins now.",
          duration: 5000,
        });
        navigate("/app");
      }
    } catch (err: unknown) {
      toast.error("Registration Failed", {
        description:
          (err as Error).message ||
          "An unexpected error occurred during signup.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "hsl(34, 35%, 82%)" }}
    >
      <NavBar />
      <GrainOverlay />

      {/* Hero-like background bands — inverse of Login for variety */}
      <motion.div
        className="absolute w-[150vw] md:w-[60vw] h-[150vh] -bottom-[20vh] -left-[40vw] md:-left-[10vw]"
        style={{
          backgroundColor: "hsl(185, 48%, 50%)",
          transform: "rotate(22deg)",
          zIndex: 1,
        }}
        animate={{ rotate: [22, 19, 22] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[40vw] md:w-[20vw] h-[150vh] -bottom-[10vh] left-[10vw] md:left-[30vw]"
        style={{
          backgroundColor: "hsl(9, 70%, 54%)",
          transform: "rotate(22deg)",
          zIndex: 2,
        }}
        animate={{ rotate: [22, 25, 22] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-24 md:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-xl"
        >
          <div
            className="rounded-[3rem] p-8 md:p-14 shadow-2xl border border-[hsla(36,25%,90%,0.1)] relative"
            style={{ backgroundColor: "hsl(210, 48%, 26%)" }}
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

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h1
                  className="font-serif font-bold leading-tight tracking-tight mb-3"
                  style={{
                    color: "hsl(36, 28%, 95%)",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  }}
                >
                  Join Vidyalaya
                </h1>
                <p
                  className="font-sans font-medium uppercase tracking-[0.2em]"
                  style={{ color: "hsl(36, 20%, 62%)", fontSize: "0.75rem" }}
                >
                  Start your smart learning journey
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
              >
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name" style={{ color: "hsl(36, 25%, 82%)" }}>
                    Full Name
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(36,15%,48%)] group-focus-within:text-coral transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-14 rounded-2xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="email" style={{ color: "hsl(36, 25%, 82%)" }}>
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(36,15%,48%)] group-focus-within:text-coral transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-14 rounded-2xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-1">
                  <Label
                    htmlFor="password"
                    style={{ color: "hsl(36, 25%, 82%)" }}
                  >
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(36,15%,48%)] group-focus-within:text-coral transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-14 rounded-2xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2 pt-4">
                  <div className="flex items-start gap-4 mb-8 p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p
                      className="font-sans text-xs leading-relaxed"
                      style={{ color: "hsl(36, 15%, 65%)" }}
                    >
                      By creating an account, you agree to Vidyalaya's{" "}
                      <span style={{ color: "hsl(185, 48%, 50%)" }}>
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span style={{ color: "hsl(185, 48%, 50%)" }}>
                        Privacy Policy
                      </span>
                      .
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 font-sans font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl"
                    style={{
                      backgroundColor: "hsl(9, 70%, 54%)",
                      color: "white",
                    }}
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <div className="mt-10">
                <div className="relative mb-8 flex items-center gap-4">
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "hsla(36,25%,90%,0.1)" }}
                  />
                  <span
                    className="font-sans font-medium uppercase tracking-widest text-[0.65rem]"
                    style={{ color: "hsl(36, 15%, 48%)" }}
                  >
                    Or Sign up with
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "hsla(36,25%,90%,0.1)" }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="h-12 border-[hsla(36,25%,90%,0.15)] bg-transparent text-[hsl(36,25%,85%)] hover:bg-white/5 rounded-2xl transition-all"
                  >
                    <Chrome className="mr-2 w-5 h-5" /> Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGithubLogin}
                    disabled={loading}
                    className="h-12 border-[hsla(36,25%,90%,0.15)] bg-transparent text-[hsl(36,25%,85%)] hover:bg-white/5 rounded-2xl transition-all"
                  >
                    <Github className="mr-2 w-5 h-5" /> GitHub
                  </Button>
                </div>
              </div>

              <p
                className="text-center mt-10 font-sans font-medium"
                style={{ color: "hsl(36, 15%, 55%)" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold transition-all hover:text-white"
                  style={{ color: "hsl(9, 70%, 54%)" }}
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
