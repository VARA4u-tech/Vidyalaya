require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const { insforge } = require("./lib/insforge");

// ... (top of the file)
const app = express();
const PORT = process.env.PORT || 5000;

// OpenRouter configuration
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Vidyalaya AI Backend API (InsForge Integrated)" });
});

// Stats Route with InsForge Database integration
app.get("/api/stats", async (req, res) => {
  try {
    const { data: stats, error } = await insforge.database
      .from("dashboard_stats")
      .select("*")
      .order("label", { ascending: true });

    if (error || !stats || stats.length === 0) {
      console.warn("Falling back to mock stats:", error?.message);
      return res.json([
        { label: "Study Streak", value: "8 days", color: "hsl(9,70%,54%)" },
        { label: "Cards Reviewed", value: "256", color: "hsl(185,48%,50%)" },
        { label: "Quiz Score Avg", value: "88%", color: "hsl(34,60%,55%)" },
        { label: "Goals Met", value: "15", color: "hsl(142,60%,50%)" },
      ]);
    }
    
    res.json(stats);
  } catch (err) {
    console.error("InsForge Stats Fetch Error:", err);
    res.json([
      { label: "Study Streak", value: "8 days", color: "hsl(9,70%,54%)" },
      { label: "Cards Reviewed", value: "256", color: "hsl(185,48%,50%)" },
      { label: "Quiz Score Avg", value: "88%", color: "hsl(34,60%,55%)" },
      { label: "Goals Met", value: "15", color: "hsl(142,60%,50%)" },
    ]);
  }
});

// AI Summarization Route with OpenRouter
app.post("/api/summarize", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a professional teaching assistant. Your goal is to provide a clear, educational summary of the provided text. Return your response in JSON format with two keys: 'summary' (a string) and 'concepts' (an array of strings).",
        },
        {
          role: "user",
          content: `Please summarize the following educational content and identify the key concepts:\n\n${text}`,
        },
      ],
      response_format: { type: "json_object" }, // Many OpenRouter models support this
    });

    const responseContent = JSON.parse(completion.choices[0].message.content);
    
    // Log the request to InsForge (fire and forget)
    insforge.database.from("ai_logs").insert([
      {
        input_text: text,
        summary: responseContent.summary,
        concepts: responseContent.concepts,
        model: process.env.OPENROUTER_MODEL,
        timestamp: new Date()
      }
    ]).then(({ error }) => {
      if (error) console.error("InsForge logging failed:", error.message);
    });

    // We expect the LLM to return a JSON with { summary, concepts }
    res.json({
      summary: responseContent.summary || "Summary generation failure.",
      concepts: responseContent.concepts || [],
    });
  } catch (error) {
    console.error("OpenRouter Error:", error);
    res.status(500).json({ 
      error: "AI summarization failed. Check your API key and quota.",
      details: error.message 
    });
  }
});

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
