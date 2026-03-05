import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  Loader2,
  Copy,
  Check,
  FileText,
  X,
} from "lucide-react";

const sampleResult = {
  original:
    "The process of photosynthesis involves two main stages: the light-dependent reactions & the Calvin cycle. In the light reactions, chlorophyll absorbs sunlight → produces ATP + NADPH. The Calvin cycle uses CO₂ + ATP + NADPH to produce glucose (C₆H₁₂O₆).",
  structured: [
    {
      heading: "Photosynthesis Overview",
      body: "Two-stage process: Light-dependent reactions + Calvin Cycle",
    },
    {
      heading: "Light Reactions",
      body: "Chlorophyll absorbs sunlight → produces ATP + NADPH",
    },
    {
      heading: "Calvin Cycle",
      body: "Uses CO₂ + ATP + NADPH → produces glucose (C₆H₁₂O₆)",
    },
  ],
};

const HandwritingPage = () => {
  const [stage, setStage] = useState<"idle" | "processing" | "done">("idle");
  const [copied, setCopied] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setStage("processing");
      setTimeout(() => setStage("done"), 2500);
    };
    reader.readAsDataURL(file);
  };

  const copy = () => {
    navigator.clipboard.writeText(sampleResult.original);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStage("idle");
    setPreview(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
          Handwriting OCR
        </h1>
        <p className="text-[hsl(36,15%,58%)] text-sm">
          Upload a photo of handwritten notes and convert to editable text.
        </p>
      </div>

      {stage === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Upload area */}
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            className="rounded-3xl border-2 border-dashed border-[hsla(36,25%,90%,0.15)] hover:border-[hsl(185,48%,50%)] transition-all cursor-pointer p-16 flex flex-col items-center gap-4 mb-4"
            style={{ backgroundColor: "hsla(210,50%,24%,0.4)" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-[hsla(185,48%,50%,0.12)] flex items-center justify-center">
              <Camera size={28} className="text-[hsl(185,48%,55%)]" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-[hsl(36,25%,82%)] mb-1">
                Drop image here or click to upload
              </p>
              <p className="text-[hsl(36,15%,48%)] text-sm">
                Supports JPG, PNG, WEBP. Max 10MB.
              </p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-[hsla(185,48%,50%,0.15)] text-[hsl(185,48%,60%)] hover:bg-[hsla(185,48%,50%,0.25)] transition-all">
              <Upload size={15} /> Choose File
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />

          {/* Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              "Good lighting reduces errors",
              "Keep image straight (not tilted)",
              "High resolution gives better results",
            ].map((tip, i) => (
              <div
                key={i}
                className="rounded-xl p-3.5 border border-[hsla(36,25%,90%,0.07)] text-center"
                style={{ backgroundColor: "hsla(210,50%,24%,0.4)" }}
              >
                <p className="text-[hsl(36,15%,55%)] text-xs leading-relaxed">
                  💡 {tip}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {stage === "processing" && (
        <div className="flex flex-col items-center py-20 gap-5">
          {preview && (
            <img
              src={preview}
              alt="uploaded"
              className="w-40 h-32 object-contain rounded-2xl border border-[hsla(36,25%,90%,0.1)] opacity-50"
            />
          )}
          <Loader2 size={36} className="text-[hsl(185,48%,50%)] animate-spin" />
          <div className="text-center">
            <p className="text-[hsl(36,25%,82%)] font-semibold mb-1">
              Processing your image…
            </p>
            <p className="text-[hsl(36,15%,50%)] text-sm">
              AI is extracting text from your handwriting
            </p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {stage === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Image preview */}
            <div
              className="rounded-2xl overflow-hidden border border-[hsla(36,25%,90%,0.08)]"
              style={{ backgroundColor: "hsla(210,50%,24%,0.4)" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[hsla(36,25%,90%,0.07)]">
                <p className="text-[hsl(36,20%,70%)] text-sm font-semibold">
                  Original
                </p>
                <button
                  onClick={reset}
                  className="text-[hsl(36,15%,50%)] hover:text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
              {preview && (
                <img
                  src={preview}
                  alt="original"
                  className="w-full object-contain max-h-72 p-4"
                />
              )}
            </div>

            {/* OCR Result */}
            <div
              className="rounded-2xl border border-[hsla(36,25%,90%,0.08)] flex flex-col"
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[hsla(36,25%,90%,0.07)]">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-[hsl(185,48%,55%)]" />
                  <p className="text-[hsl(36,20%,70%)] text-sm font-semibold">
                    Extracted Text
                  </p>
                </div>
                <button
                  onClick={copy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-[hsl(185,48%,60%)] hover:text-white bg-[hsla(185,48%,50%,0.1)] transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={11} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={11} /> Copy
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto">
                <p className="text-[hsl(36,20%,72%)] text-sm leading-relaxed mb-5">
                  {sampleResult.original}
                </p>
                <p className="text-[hsl(36,15%,55%)] text-xs font-semibold uppercase tracking-wider mb-3">
                  Structured Notes
                </p>
                {sampleResult.structured.map((s, i) => (
                  <div key={i} className="mb-3">
                    <p className="text-[hsl(185,48%,60%)] text-xs font-bold mb-1">
                      {s.heading}
                    </p>
                    <p className="text-[hsl(36,20%,68%)] text-sm">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HandwritingPage;
