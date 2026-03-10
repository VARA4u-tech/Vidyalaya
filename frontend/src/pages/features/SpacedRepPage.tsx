import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronRight, RotateCcw, Brain } from "lucide-react";

interface Card {
  id: number;
  front: string;
  back: string;
  due: string;
  interval: number;
  ease: number;
  repetitions: number;
}

const initialCards: Card[] = [
  {
    id: 1,
    front: "Define osmosis",
    back: "Movement of water molecules through a semipermeable membrane from a region of lower solute concentration to higher.",
    due: "today",
    interval: 1,
    ease: 2.5,
    repetitions: 0,
  },
  {
    id: 2,
    front: "What is the Krebs Cycle?",
    back: "A series of biochemical reactions used by aerobic organisms to release stored energy through the oxidation of acetyl-CoA.",
    due: "today",
    interval: 1,
    ease: 2.5,
    repetitions: 0,
  },
  {
    id: 3,
    front: "Newton's First Law",
    back: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.",
    due: "today",
    interval: 1,
    ease: 2.5,
    repetitions: 0,
  },
];

const RATINGS = [
  { label: "Again", color: "hsl(9,70%,54%)", days: 0 },
  { label: "Hard", color: "hsl(34,60%,55%)", days: 1 },
  { label: "Good", color: "hsl(185,48%,50%)", days: 3 },
  { label: "Easy", color: "hsl(142,60%,50%)", days: 7 },
];

const SpacedRepPage = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const dueCards = cards.filter((c) => !reviewed.includes(c.id));

  const rate = (days: number, label: string) => {
    const card = dueCards[current];
    setReviewed((r) => [...r, card.id]);
    if (label === "Again") {
      setCards((cs) =>
        cs.map((c) =>
          c.id === card.id ? { ...c, interval: 1, repetitions: 0 } : c,
        ),
      );
    } else {
      setCards((cs) =>
        cs.map((c) =>
          c.id === card.id
            ? { ...c, interval: days, repetitions: c.repetitions + 1 }
            : c,
        ),
      );
    }
    setFlipped(false);
    if (current >= dueCards.length - 1) setDone(true);
    else setCurrent((i) => i + 1);
  };

  const reset = () => {
    setReviewed([]);
    setCurrent(0);
    setFlipped(false);
    setDone(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
          Spaced Repetition
        </h1>
        <p className="text-[hsl(36,15%,58%)] text-sm">
          Review cards at the optimal time to maximize memory retention.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="px-4 py-2 rounded-xl text-sm font-semibold bg-[hsla(185,48%,50%,0.12)] text-[hsl(185,48%,65%)]">
          <Brain size={13} className="inline mr-1.5" />
          {dueCards.length} Due
        </div>
        <div className="px-4 py-2 rounded-xl text-sm font-semibold bg-[hsla(142,60%,50%,0.12)] text-[hsl(142,60%,65%)]">
          <Check size={13} className="inline mr-1.5" />
          {reviewed.length} Done
        </div>
        <button
          onClick={reset}
          className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-[hsl(36,15%,55%)] hover:text-white bg-[hsla(210,50%,24%,0.4)] transition-all"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      {done ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl flex flex-col items-center py-20 gap-4 border border-[hsla(36,25%,90%,0.08)]"
          style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
        >
          <div className="w-16 h-16 rounded-2xl bg-[hsla(142,60%,50%,0.15)] flex items-center justify-center mb-2">
            <Check size={32} className="text-[hsl(142,60%,55%)]" />
          </div>
          <p className="font-serif font-bold text-[hsl(36,28%,92%)] text-2xl">
            All Caught Up!
          </p>
          <p className="text-[hsl(36,15%,55%)] text-sm text-center px-6">
            You've reviewed all due cards. Cards will be scheduled based on your
            ratings.
          </p>
          <button
            onClick={reset}
            className="mt-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm"
            style={{ backgroundColor: "hsl(9,70%,54%)" }}
          >
            Review Again
          </button>
        </motion.div>
      ) : (
        <>
          <p className="text-[hsl(36,15%,50%)] text-xs mb-4 text-center">
            {current + 1} of {dueCards.length} cards
          </p>

          {/* Card */}
          <div
            className="cursor-pointer mb-6"
            onClick={() => setFlipped(!flipped)}
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative rounded-3xl border border-[hsla(36,25%,90%,0.1)]"
              style={{
                minHeight: "240px",
                transformStyle: "preserve-3d",
                backgroundColor: "hsla(210,50%,24%,0.5)",
              }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, type: "spring", damping: 20 }}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(185,48%,55%)] mb-4">
                  Question
                </p>
                <p className="text-[hsl(36,25%,90%)] font-serif text-xl font-bold leading-snug">
                  {dueCards[current]?.front}
                </p>
                <p className="mt-5 text-[hsl(36,15%,43%)] text-xs">
                  Tap to see answer
                </p>
              </div>
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(9,70%,65%)] mb-4">
                  Answer
                </p>
                <p className="text-[hsl(36,20%,75%)] text-base leading-relaxed">
                  {dueCards[current]?.back}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Rating buttons */}
          <AnimatePresence>
            {flipped && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p className="text-center text-[hsl(36,15%,50%)] text-xs mb-3">
                  How well did you recall this?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {RATINGS.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => rate(r.days, r.label)}
                      className="flex flex-col items-center py-3 px-2 rounded-2xl border border-transparent hover:border-white/10 transition-all"
                      style={{ backgroundColor: r.color + "18" }}
                    >
                      <span
                        className="font-bold text-sm mb-0.5"
                        style={{ color: r.color }}
                      >
                        {r.label}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: r.color + "aa" }}
                      >
                        {r.days === 0 ? "< 1d" : `${r.days}d`}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default SpacedRepPage;
