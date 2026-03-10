import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Square,
  Play,
  Pause,
  Trash2,
  FileText,
  Loader2,
} from "lucide-react";

interface AudioNote {
  id: number;
  title: string;
  duration: string;
  transcript: string;
  date: string;
}

const sampleNotes: AudioNote[] = [
  {
    id: 1,
    title: "Physics Lecture – Waves",
    duration: "4:32",
    transcript:
      "Today we discussed wave propagation in different media. Sound waves are longitudinal waves that require a medium to travel through. The speed of sound in air at room temperature is approximately 343 m/s...",
    date: "Mar 4",
  },
  {
    id: 2,
    title: "Chemistry – Organic Reactions",
    duration: "6:18",
    transcript:
      "Organic chemistry deals with carbon-containing compounds. Functional groups such as alcohols, aldehydes, and ketones determine the properties and reactions of organic molecules...",
    date: "Mar 3",
  },
];

const AudioNotesPage = () => {
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [notes, setNotes] = useState<AudioNote[]>(sampleNotes);
  const [playing, setPlaying] = useState<number | null>(null);
  const [transcribing, setTranscribing] = useState(false);
  const [selected, setSelected] = useState<AudioNote | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = () => {
    setRecording(true);
    setRecordingTime(0);
    timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
  };

  const stopRecording = async () => {
    clearInterval(timerRef.current!);
    setRecording(false);
    setTranscribing(true);
    await new Promise((r) => setTimeout(r, 2000));
    const mins = Math.floor(recordingTime / 60);
    const secs = recordingTime % 60;
    const newNote: AudioNote = {
      id: Date.now(),
      title: `New Recording – ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
      duration: `${mins}:${String(secs).padStart(2, "0")}`,
      transcript:
        "AI-generated transcript: This recording has been processed and transcribed. The audio content covers study material that was spoken during the session. Key concepts were mentioned including the fundamentals of the subject matter.",
      date: "Just now",
    };
    setNotes((n) => [newNote, ...n]);
    setTranscribing(false);
  };

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const deleteNote = (id: number) => {
    setNotes((n) => n.filter((x) => x.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
          Audio Notes
        </h1>
        <p className="text-[hsl(36,15%,58%)] text-sm">
          Record voice notes and get AI transcriptions instantly.
        </p>
      </div>

      {/* Recorder */}
      <div
        className="rounded-3xl p-6 md:p-8 border border-[hsla(36,25%,90%,0.08)] mb-6 flex flex-col items-center"
        style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
      >
        {/* Visualizer */}
        <div className="flex items-center gap-1 h-14 mb-6">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-full"
              style={{
                backgroundColor: recording
                  ? "hsl(9,70%,54%)"
                  : "hsla(36,25%,90%,0.15)",
              }}
              animate={
                recording
                  ? { height: [8, Math.random() * 40 + 10, 8] }
                  : { height: 8 }
              }
              transition={{
                duration: 0.5 + Math.random() * 0.3,
                repeat: Infinity,
                delay: i * 0.04,
              }}
            />
          ))}
        </div>

        {recording && (
          <p className="font-mono text-[hsl(9,70%,65%)] text-2xl font-bold mb-2">
            {fmt(recordingTime)}
          </p>
        )}
        {transcribing && (
          <div className="flex items-center gap-2 mb-4 text-[hsl(185,48%,60%)] text-sm">
            <Loader2 size={15} className="animate-spin" /> Transcribing audio…
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={recording ? stopRecording : startRecording}
            disabled={transcribing}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50"
            style={{
              backgroundColor: recording ? "hsl(9,70%,40%)" : "hsl(9,70%,54%)",
            }}
          >
            {recording ? <Square size={22} /> : <Mic size={22} />}
          </button>
        </div>
        <p className="text-[hsl(36,15%,45%)] text-xs mt-4">
          {recording ? "Click to stop recording" : "Click to start recording"}
        </p>
      </div>

      {/* Notes List + Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-[hsl(36,15%,55%)] text-xs font-semibold uppercase tracking-wider mb-1">
            Recordings ({notes.length})
          </p>
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(note)}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${selected?.id === note.id ? "border-[hsl(9,70%,54%)] bg-[hsla(9,70%,54%,0.08)]" : "border-[hsla(36,25%,90%,0.07)] bg-[hsla(210,50%,24%,0.5)] hover:border-[hsla(36,25%,90%,0.15)]"}`}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[hsla(9,70%,54%,0.15)]">
                <Mic size={15} className="text-[hsl(9,70%,65%)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[hsl(36,25%,85%)] text-sm font-semibold truncate">
                  {note.title}
                </p>
                <p className="text-[hsl(36,15%,48%)] text-xs">
                  {note.date} · {note.duration}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPlaying(playing === note.id ? null : note.id);
                  }}
                  className="p-1.5 text-[hsl(185,48%,55%)] hover:text-white transition-colors"
                >
                  {playing === note.id ? (
                    <Pause size={14} />
                  ) : (
                    <Play size={14} />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  className="p-1.5 text-[hsl(36,15%,40%)] hover:text-[hsl(9,70%,65%)] transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transcript Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl p-5 border border-[hsla(36,25%,90%,0.08)]"
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText size={15} className="text-[hsl(185,48%,55%)]" />
                <p className="font-semibold text-[hsl(36,25%,85%)] text-sm">
                  AI Transcript
                </p>
              </div>
              <p className="text-[hsl(36,20%,68%)] text-sm leading-relaxed">
                {selected.transcript}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AudioNotesPage;
