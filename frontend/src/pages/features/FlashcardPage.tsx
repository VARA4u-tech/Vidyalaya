import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trash2,
  Check,
  X,
} from "lucide-react";

interface Card {
  id: number;
  front: string;
  back: string;
}

const sampleCards: Card[] = [];

const PageHeader = ({ title, desc }: { title: string; desc: string }) => (
  <div className="mb-6 md:mb-8">
    <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
      {title}
    </h1>
    <p className="text-[hsl(36,15%,58%)] text-sm">{desc}</p>
  </div>
);

const FlashcardPage = () => {
  const [cards, setCards] = useState<Card[]>(sampleCards);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [mode, setMode] = useState<"browse" | "quiz">("browse");
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  const addCard = () => {
    if (!front.trim() || !back.trim()) return;
    setCards([...cards, { id: Date.now(), front, back }]);
    setFront("");
    setBack("");
    setShowForm(false);
  };

  const deleteCard = (id: number) => {
    const remaining = cards.filter((c) => c.id !== id);
    setCards(remaining);
    if (current >= remaining.length)
      setCurrent(Math.max(0, remaining.length - 1));
  };

  const next = () => {
    setFlipped(false);
    setCurrent((c) => (c + 1) % cards.length);
  };
  const prev = () => {
    setFlipped(false);
    setCurrent((c) => (c - 1 + cards.length) % cards.length);
  };

  const markCorrect = () => {
    setScore((s) => ({ ...s, correct: s.correct + 1 }));
    next();
  };
  const markWrong = () => {
    setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    next();
  };

  if (cards.length === 0)
    return (
      <div className="max-w-3xl mx-auto">
        <PageHeader
          title="Flashcard Generator"
          desc="Create and study with AI-powered flashcards."
        />
        <div
          className="rounded-2xl border border-dashed border-[hsla(36,25%,90%,0.2)] p-16 text-center"
          style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
        >
          <p className="text-[hsl(36,15%,55%)] mb-4">No flashcards yet!</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
            style={{ backgroundColor: "hsl(9,70%,54%)" }}
          >
            Create First Card
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Flashcard Generator"
        desc="Create and study with AI-powered flashcards."
      />

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        {(["browse", "quiz"] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setScore({ correct: 0, wrong: 0 });
              setCurrent(0);
              setFlipped(false);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${mode === m ? "bg-[hsl(9,70%,54%)] text-white" : "bg-[hsla(210,50%,24%,0.5)] text-[hsl(36,20%,65%)] hover:text-white"}`}
          >
            {m === "browse" ? "Browse Mode" : "Quiz Mode"}
          </button>
        ))}
        <button
          onClick={() => setShowForm(!showForm)}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[hsla(185,48%,50%,0.15)] text-[hsl(185,48%,65%)] hover:bg-[hsla(185,48%,50%,0.25)] transition-all"
        >
          <Plus size={15} /> Add Card
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 rounded-2xl p-5 border border-[hsla(36,25%,90%,0.1)]"
            style={{ backgroundColor: "hsla(210,50%,24%,0.6)" }}
          >
            <p className="font-semibold text-[hsl(36,25%,85%)] mb-4">
              New Flashcard
            </p>
            <input
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="Front (Question)"
              className="w-full mb-3 px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,45%)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
            />
            <textarea
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="Back (Answer)"
              rows={3}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,45%)] text-sm outline-none focus:border-[hsl(185,48%,50%)] resize-none"
            />
            <div className="flex gap-2">
              <button
                onClick={addCard}
                className="px-4 py-2 rounded-xl bg-[hsl(9,70%,54%)] text-white text-sm font-semibold hover:bg-[hsl(9,70%,46%)] transition-all"
              >
                Save Card
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-[hsl(36,15%,55%)] text-sm hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz score bar */}
      {mode === "quiz" && (
        <div className="flex gap-3 mb-5">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsla(142,60%,50%,0.12)] text-[hsl(142,60%,65%)] text-sm font-semibold">
            <Check size={14} /> {score.correct} Correct
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[hsla(9,70%,54%,0.12)] text-[hsl(9,70%,70%)] text-sm font-semibold">
            <X size={14} /> {score.wrong} Wrong
          </div>
          <span className="ml-auto text-[hsl(36,15%,55%)] text-sm self-center">
            {current + 1} / {cards.length}
          </span>
        </div>
      )}

      {/* Card */}
      <div
        className="perspective-1000 mb-6 cursor-pointer"
        onClick={() => setFlipped(!flipped)}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="relative rounded-3xl border border-[hsla(36,25%,90%,0.1)]"
          style={{
            minHeight: "260px",
            transformStyle: "preserve-3d",
            backgroundColor: "hsla(210,50%,24%,0.5)",
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring", damping: 20 }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(185,48%,55%)] mb-4">
              Front
            </p>
            <p className="text-[hsl(36,25%,90%)] font-serif text-xl md:text-2xl font-bold leading-snug">
              {cards[current]?.front}
            </p>
            <p className="mt-6 text-[hsl(36,15%,45%)] text-xs">Click to flip</p>
          </div>
          {/* Back */}
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
            <p className="text-[hsl(36,25%,90%)] text-lg md:text-xl leading-relaxed">
              {cards[current]?.back}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={prev}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[hsl(36,20%,65%)] hover:text-white bg-[hsla(210,50%,24%,0.5)] hover:bg-[hsla(210,50%,28%,0.6)] transition-all"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {mode === "quiz" && flipped ? (
          <div className="flex gap-2">
            <button
              onClick={markCorrect}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[hsla(142,60%,50%,0.15)] text-[hsl(142,60%,65%)] hover:bg-[hsla(142,60%,50%,0.25)] transition-all"
            >
              <Check size={14} /> Got it
            </button>
            <button
              onClick={markWrong}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[hsla(9,70%,54%,0.15)] text-[hsl(9,70%,70%)] hover:bg-[hsla(9,70%,54%,0.25)] transition-all"
            >
              <X size={14} /> Missed
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFlipped(false);
                setCurrent(0);
              }}
              className="p-2.5 rounded-xl text-[hsl(36,20%,55%)] hover:text-white bg-[hsla(210,50%,24%,0.5)] transition-all"
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={() => deleteCard(cards[current]?.id)}
              className="p-2.5 rounded-xl text-[hsl(9,70%,60%)] hover:text-[hsl(9,70%,80%)] bg-[hsla(9,70%,54%,0.1)] hover:bg-[hsla(9,70%,54%,0.2)] transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        <button
          onClick={next}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-[hsl(36,20%,65%)] hover:text-white bg-[hsla(210,50%,24%,0.5)] hover:bg-[hsla(210,50%,28%,0.6)] transition-all"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>

      {/* Card list */}
      <div className="mt-8">
        <p className="font-semibold text-[hsl(36,20%,70%)] text-sm mb-3">
          All Cards ({cards.length})
        </p>
        <div className="flex flex-col gap-2">
          {cards.map((c, i) => (
            <div
              key={c.id}
              onClick={() => {
                setCurrent(i);
                setFlipped(false);
              }}
              className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer border transition-all ${i === current ? "border-[hsl(9,70%,54%)] bg-[hsla(9,70%,54%,0.08)]" : "border-[hsla(36,25%,90%,0.07)] bg-[hsla(210,50%,24%,0.4)] hover:border-[hsla(36,25%,90%,0.15)]"}`}
            >
              <span className="text-xs font-bold text-[hsl(36,15%,45%)] w-5">
                {i + 1}
              </span>
              <span className="text-[hsl(36,25%,85%)] text-sm flex-1 truncate">
                {c.front}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardPage;
