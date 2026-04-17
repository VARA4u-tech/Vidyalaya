import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { X, Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", section: "home" },
  { label: "Features", section: "features" },
  { label: "How It Works", section: "how-it-works" },
  { label: "Team", section: "team" },
  { label: "Contact", section: "contact" },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Scroll to section — works from any route
  const scrollToSection = useCallback((section: string) => {
    setMenuOpen(false);

    const doScroll = () => {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    // If we're not on home page, navigate first then scroll
    if (location.pathname !== "/") {
      navigate("/");
      // Small delay to let React render the page before scrolling
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[999] transition-all duration-500"
        style={{
          backgroundColor: scrolled || menuOpen ? "hsla(210, 55%, 22%, 0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid hsla(36, 23%, 93%, 0.08)" : "none",
          boxShadow: scrolled ? "0 4px 24px hsla(210, 60%, 10%, 0.3)" : "none",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] focus:outline-none"
          >
            <img
              src="/logo.png"
              alt="Vidyalaya Logo"
              className="w-20 h-20 md:w-24 md:h-24 object-contain"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.section)}
                className="font-sans font-bold uppercase tracking-widest text-sm transition-all duration-300 focus:outline-none"
                style={{ color: "hsl(36, 23%, 85%)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "hsl(36, 23%, 100%)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "hsl(36, 23%, 85%)")}
              >
                {link.label}
              </button>
            ))}

            {user ? (
              <a
                href="/app"
                className="font-sans font-semibold rounded-full transition-all duration-300 text-sm shadow-[0_0_20px_hsla(9,70%,54%,0.3)]"
                style={{ backgroundColor: "hsl(9, 73%, 56%)", color: "white", padding: "0.55rem 1.5rem" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "hsl(9, 68%, 48%)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "hsl(9, 73%, 56%)")}
              >
                Dashboard
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="font-sans font-bold uppercase tracking-widest text-sm transition-all duration-300"
                  style={{ color: "hsl(36, 23%, 85%)" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "hsl(36, 23%, 100%)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "hsl(36, 23%, 85%)")}
                >
                  Sign In
                </a>
                <a
                  href="/login"
                  className="font-sans font-semibold rounded-full transition-all duration-300 text-sm"
                  style={{ backgroundColor: "hsl(9, 73%, 56%)", color: "white", padding: "0.55rem 1.5rem" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "hsl(9, 68%, 48%)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "hsl(9, 73%, 56%)")}
                >
                  Get Started
                </a>
              </>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl focus:outline-none z-[1000] relative"
            style={{ color: "hsl(36, 23%, 90%)" }}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer — seamless, attached to header */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              className="md:hidden overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="flex flex-col px-6 pb-8 pt-2 gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.section)}
                    className="w-full text-left font-sans font-bold uppercase tracking-widest text-sm py-4 border-b border-white/10 transition-colors duration-200 focus:outline-none active:opacity-70"
                    style={{ color: "hsl(36, 23%, 88%)" }}
                  >
                    {link.label}
                  </button>
                ))}

                <div className="flex flex-col gap-3 pt-5">
                  {user ? (
                    <a
                      href="/app"
                      className="w-full text-center font-sans font-bold text-sm py-3.5 rounded-2xl"
                      style={{ backgroundColor: "hsl(9, 73%, 56%)", color: "white" }}
                      onClick={() => setMenuOpen(false)}
                    >
                      Go To Dashboard →
                    </a>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="w-full text-center font-sans font-bold uppercase tracking-widest text-sm py-3.5 rounded-2xl border border-white/15"
                        style={{ color: "hsl(36, 23%, 88%)" }}
                        onClick={() => setMenuOpen(false)}
                      >
                        Sign In
                      </a>
                      <a
                        href="/login"
                        className="w-full text-center font-sans font-bold text-sm py-3.5 rounded-2xl"
                        style={{ backgroundColor: "hsl(9, 73%, 56%)", color: "white" }}
                        onClick={() => setMenuOpen(false)}
                      >
                        Get Started →
                      </a>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Full-screen dimming backdrop — sits below header, above content */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[998] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
