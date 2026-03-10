import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, Sparkles } from "lucide-react";

const DynamicScrollBot = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolling state
      setIsScrolling(true);

      // Calculate progress
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Reset timeout
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500); // Wait 1.5s after stop to transform
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed right-6 bottom-6 z-[100] flex flex-col items-center">
      <AnimatePresence mode="wait">
        {isScrolling && !isChatOpen ? (
          /* SCROLL BAR MODE */
          <motion.div
            key="scrollbar"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative h-48 w-1.5 rounded-full overflow-hidden bg-white/10 backdrop-blur-md border border-white/10"
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-full"
              style={{
                height: `${scrollProgress}%`,
                backgroundColor: "hsl(9, 70%, 54%)",
                boxShadow: "0 0 15px hsla(9, 70%, 54%, 0.5)",
              }}
              layoutId="active-part"
            />
          </motion.div>
        ) : (
          /* CHATBOT MODE */
          <motion.div
            key="chatbot"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative"
          >
            {/* Chat Window */}
            <AnimatePresence>
              {isChatOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                    x: 20,
                    transformOrigin: "bottom right",
                  }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20, x: 20 }}
                  className="absolute bottom-20 right-0 w-[320px] md:w-[380px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-[hsl(210,48%,20%)] flex flex-col"
                  style={{ maxHeight: "500px" }}
                >
                  {/* Grain */}
                  <div className="absolute inset-0 pointer-events-none grain-fine opacity-10" />

                  {/* Header */}
                  <div className="relative p-6 bg-coral/10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-coral flex items-center justify-center">
                        <Bot className="text-white w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white text-lg leading-tight text-left">
                          Vidya Guru
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">
                            AI assistant Online
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="p-2 rounded-full hover:bg-white/5 text-white/50 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-grow p-6 space-y-4 overflow-y-auto font-sans scrollbar-hide">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-lg bg-coral/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="text-coral w-4 h-4" />
                      </div>
                      <div className="bg-white/5 rounded-2xl rounded-tl-none p-4 text-sm text-[hsl(36,25%,85%)] leading-relaxed text-left">
                        Hello there! I'm your AI study guide. How can I help you
                        navigate Vidyalaya today?
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-black/20 border-t border-white/5">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Ask about features, pricing..."
                        className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 pr-12 text-sm text-white focus:outline-none focus:border-coral/50 transition-all placeholder:text-white/20"
                      />
                      <button className="absolute right-2 p-2 bg-coral rounded-full text-white shadow-lg hover:bg-coral/80 transition-all">
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all"
              style={{
                backgroundColor: isChatOpen ? "white" : "hsl(9, 70%, 54%)",
                color: isChatOpen ? "hsl(210, 48%, 20%)" : "white",
              }}
            >
              {/* Outer Ring Progress */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="188.4"
                  strokeDashoffset={188.4 - (188.4 * scrollProgress) / 100}
                  className="opacity-20 transition-all duration-300"
                />
              </svg>

              <AnimatePresence mode="wait">
                {isChatOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X size={28} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                  >
                    <MessageSquare size={28} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicScrollBot;
