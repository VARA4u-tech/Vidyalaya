import { useState, useEffect } from "react";
import { insforge } from "@/lib/insforge";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";
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

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const { data, error } = await insforge.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data) {
        toast.success("Welcome Back", {
          description: "Login successful. Redirecting to your dashboard.",
          duration: 3000,
        });
        navigate("/app");
      }
    } catch (err: unknown) {
      toast.error("Login Failed", {
        description:
          (err as Error).message || "Invalid credentials. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "hsl(34, 35%, 82%)" }}
    >
      <NavBar />
      <GrainOverlay />

      {/* Hero-like background bands */}
      <motion.div
        className="absolute w-[150vw] md:w-[60vw] h-[150vh] -top-[20vh] -right-[40vw] md:-right-[10vw]"
        style={{
          backgroundColor: "hsl(9, 70%, 54%)",
          transform: "rotate(-22deg)",
          zIndex: 1,
        }}
        animate={{ rotate: [-22, -19, -22] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[40vw] md:w-[20vw] h-[150vh] -top-[10vh] right-[10vw] md:right-[30vw]"
        style={{
          backgroundColor: "hsl(185, 48%, 50%)",
          transform: "rotate(-22deg)",
          zIndex: 2,
        }}
        animate={{ rotate: [-22, -18, -22] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-24 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg"
        >
          <div
            className="rounded-[3rem] p-8 md:p-12 shadow-2xl border border-[hsla(36,25%,90%,0.1)] relative"
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
                  Welcome Back
                </h1>
                <p
                  className="font-sans font-medium uppercase tracking-[0.2em]"
                  style={{ color: "hsl(36, 20%, 62%)", fontSize: "0.75rem" }}
                >
                  Enter into your learning space
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ color: "hsl(36, 25%, 82%)" }}>
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: "hsl(36, 15%, 48%)" }}
                    />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-14 rounded-2xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="password"
                      style={{ color: "hsl(36, 25%, 82%)" }}
                    >
                      Password
                    </Label>
                    <Link
                      to="#"
                      className="text-xs font-semibold hover:text-white transition-colors"
                      style={{ color: "hsl(185, 48%, 50%)" }}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                      style={{ color: "hsl(36, 15%, 48%)" }}
                    />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 bg-white/5 border-[hsla(36,25%,90%,0.15)] text-white h-14 rounded-2xl focus:ring-coral/40 focus:border-coral/40 transition-all font-sans"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
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
                      Sign In <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
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
                    Or Login with
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
                New here?{" "}
                <Link
                  to="/signup"
                  className="font-bold transition-all hover:text-white"
                  style={{ color: "hsl(9, 70%, 54%)" }}
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
