import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, Loader2, ListChecks, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface SummaryResponse {
  summary: string;
  concepts: string[];
}

export const SmartSummarizer = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SummaryResponse | null>(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to summarize.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to summarize text");
      }

      const data = await response.json();
      setResult(data);
      toast.success("AI Summarization Complete!");
    } catch (error) {
      console.error(error);
      toast.error("AI service error. Check your backend and API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-[hsla(36,25%,90%,0.07)] bg-[hsla(210,50%,24%,0.4)] overflow-hidden shadow-2xl backdrop-blur-md">
      <CardHeader className="pb-4 border-b border-[hsla(36,25%,90%,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[hsla(210,50%,60%,0.2)] flex items-center justify-center text-blue-400">
            <Brain size={24} />
          </div>
          <div>
            <CardTitle className="text-xl font-serif text-[hsl(36,28%,94%)]">Vidyalaya AI Assistant</CardTitle>
            <CardDescription className="text-[hsl(36,15%,65%)]">Powered by OpenRouter</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[hsl(36,25%,85%)]">Your Study Material</label>
          <Textarea
            placeholder="Paste your notes or some text you want summarized..."
            className="min-h-[140px] bg-black/20 border-[hsla(36,25%,90%,0.1)] text-[hsl(36,28%,90%)] placeholder:text-[hsla(36,25%,90%,0.2)] focus-visible:ring-blue-500/50"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <Button 
          onClick={handleSummarize} 
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-6 rounded-xl transition-all shadow-lg group"
        >
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          )}
          {loading ? "AI is processing..." : "Generate AI Insights"}
        </Button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-[hsla(36,25%,90%,0.05)] space-y-6"
            >
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                  <CheckCircle2 size={16} /> Key Summary
                </h4>
                <p className="text-[hsl(36,15%,75%)] text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  {result.summary}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-indigo-400 flex items-center gap-2">
                  <ListChecks size={16} /> Core Concepts
                </h4>
                <div className="flex flex-wrap gap-2">
                  {result.concepts.map((concept, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 transition-colors py-1 px-3"
                    >
                      {concept}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
