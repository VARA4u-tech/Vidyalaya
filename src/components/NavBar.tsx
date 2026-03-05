import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
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
          href="#home"
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
          <a
            href="#features"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;
