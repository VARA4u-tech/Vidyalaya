import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon } from "lucide-react";
import { insforge, User } from "@/lib/insforge";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      // Avoid poking the SDK if there's no evidence of a session
      const hasSessionFlag = Object.keys(localStorage).some(key => 
        (key.includes('insforge') || key.includes('sb-')) && key.includes('auth-token')
      );
      if (!hasSessionFlag) return;

      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data) setUser(data);
      } catch (err) {
        // Silently fail for landing page
      }
    };
    fetchUser();
  }, []);





  const links = [
    { label: "Home", href: "/#home" },
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Team", href: "/#team" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "hsla(210, 55%, 22%, 0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid hsla(36, 23%, 93%, 0.08)" : "none",
        boxShadow: scrolled ? "0 4px 24px hsla(210, 60%, 10%, 0.3)" : "none",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <a
          href="/#home"
          className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
        >
          <img
            src="/logo.png"
            alt="Vidyalaya Logo"
            className="w-24 h-24 md:w-24 md:h-24 object-contain"
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans font-bold uppercase tracking-widest text-sm transition-all duration-300"
              style={{ color: "hsl(36, 23%, 85%)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "hsl(36, 23%, 100%)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "hsl(36, 23%, 85%)")
              }
            >
              {link.label}
            </a>
          ))}
          {user ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[hsl(9,70%,54%)] flex items-center justify-center text-white border-2 border-white/10 shadow-lg">
                  <UserIcon size={16} />
                </div>
                <span className="font-sans font-medium text-sm text-[hsl(36,28%,90%)] hidden md:block">
                  {user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.name || 'Student'}
                </span>
              </div>
              <a
                href="/app"
                className="font-sans font-semibold rounded-full transition-all duration-300 text-sm shadow-[0_0_20px_hsla(9,70%,54%,0.3)]"
                style={{
                  backgroundColor: "hsl(9, 73%, 56%)",
                  color: "white",
                  padding: "0.55rem 1.5rem",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "hsl(9, 68%, 48%)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "hsl(9, 73%, 56%)")
                }
              >
                Dashboard
              </a>
            </div>
          ) : (
            <>
              <a
                href="/login"
                className="font-sans font-bold uppercase tracking-widest text-sm transition-all duration-300"
                style={{ color: "hsl(36, 23%, 85%)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "hsl(36, 23%, 100%)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "hsl(36, 23%, 85%)")
                }
              >
                Sign In
              </a>
              <a
                href="/login"
                className="font-sans font-semibold rounded-full transition-all duration-300 text-sm"
                style={{
                  backgroundColor: "hsl(9, 73%, 56%)",
                  color: "white",
                  padding: "0.55rem 1.5rem",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "hsl(9, 68%, 48%)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "hsl(9, 73%, 56%)")
                }
              >
                Get Started
              </a>
            </>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-0.5 rounded-full"
              style={{ backgroundColor: "hsl(36, 23%, 90%)", width: "24px" }}
              animate={
                menuOpen
                  ? i === 0
                    ? { rotate: 45, y: 8 }
                    : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.25 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden flex flex-col gap-4 px-6 pb-8 pt-4"
            style={{ backgroundColor: "hsla(210, 55%, 18%, 0.97)" }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans font-bold uppercase tracking-widest text-sm pt-2"
                style={{ color: "hsl(36, 23%, 90%)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {user ? (
              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[hsl(9,70%,54%)] flex items-center justify-center text-white border border-white/20">
                    <UserIcon size={16} />
                  </div>
                  <span className="font-sans font-medium text-sm text-[hsl(36,28%,90%)]">
                    {user.user_metadata?.full_name || user.user_metadata?.name || 'Student Info'}
                  </span>
                </div>
                <a
                  href="/app"
                  className="font-sans font-bold uppercase tracking-widest text-sm text-[hsl(9,73%,56%)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Go To Dashboard
                </a>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                <a
                  href="/login"
                  className="font-sans font-bold uppercase tracking-widest text-sm"
                  style={{ color: "hsl(36, 23%, 90%)" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Sign In
                </a>
                <a
                  href="/login"
                  className="font-sans font-bold uppercase tracking-widest text-sm text-[hsl(9,73%,56%)]"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;
