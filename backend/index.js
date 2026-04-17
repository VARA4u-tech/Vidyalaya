require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const rateLimit = require("express-rate-limit");

const { insforge } = require("./lib/insforge");

// ... (top of the file)
const app = express();
const PORT = process.env.PORT || 5000;

// Rate Limiting Configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes",
    status: 429
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", apiLimiter); // Apply rate limiter to all /api routes

// OpenRouter configuration
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

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

    if (error) {
      console.error("InsForge Stats Error:", error.message);
      return res.status(500).json({ error: "Failed to fetch stats" });
    }
    
    res.json(stats || []);
  } catch (err) {
    console.error("InsForge Stats Fetch Error:", err);
    res.status(500).json({ error: "Internal Server Error while fetching stats" });
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
      response_format: { type: "json_object" },
    });

    let responseContent;
    try {
      const rawContent = completion.choices[0].message.content;
      console.log("Raw AI Response:", rawContent);
      responseContent = JSON.parse(rawContent);
    } catch (parseErr) {
      console.error("AI returned invalid JSON:", completion.choices[0].message.content);
      // Fallback for missing/bad JSON
      responseContent = {
        summary: completion.choices[0].message.content || "AI summary generation failed.",
        concepts: []
      };
    }
    
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

    res.json({
      summary: responseContent.summary || "Summary generation failure.",
      concepts: responseContent.concepts || [],
    });
  } catch (error) {
    console.error("OpenRouter Error Details:", error.response?.data || error.message);
    res.status(500).json({ 
      error: "AI summarization failed. Check API key and quota.",
      details: error.message 
    });
  }
});

// AI Quiz Generation Route
app.post("/api/quiz", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are an expert educator. Create a quiz based on the provided text. Return your response in JSON format as an array of objects. Each object should have: 'question' (string), 'options' (array of 4 strings), 'correctAnswer' (number, 0-3), and 'explanation' (string).",
        },
        {
          role: "user",
          content: `Create a 5-question quiz for the following content:\n\n${text}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const responseContent = JSON.parse(completion.choices[0].message.content);
    // OpenRouter might return { "quiz": [...] } or just the array depending on the model
    const questions = responseContent.quiz || responseContent.questions || (Array.isArray(responseContent) ? responseContent : []);

    res.json(questions);
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

// AI Study Plan Generation Route
app.post("/api/plan", async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are a study strategist. Create a structured study plan based on the provided text. Return your response in JSON format with 'totalDuration' (string) and 'items' (array of objects). Each object should have: 'session' (string), 'topic' (string), 'duration' (string), and 'objective' (string).",
        },
        {
          role: "user",
          content: `Create a comprehensive study plan for the following content:\n\n${text}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const responseContent = JSON.parse(completion.choices[0].message.content);
    res.json(responseContent);
  } catch (error) {
    console.error("Plan Generation Error:", error);
    res.status(500).json({ error: "Failed to generate study plan" });
  }
});

// General Chat Route with OpenRouter (Vidya Guru)
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: "You are 'Vidya Guru', the official AI study guide for Vidyalaya. Vidyalaya is an AI-powered study platform that helps students upload notes, get AI summaries, generate smart quizzes, and plan exams. Your tone is helpful, encouraging, and knowledgeable. Answer questions about the platform and provide general study advice. Keep your responses concise (under 3 sentences unless asked for more details).",
        },
        ...messages,
      ],
    });

    const responseText = completion.choices[0].message.content;

    insforge.database.from("chat_logs").insert([
      {
        conversation: messages,
        response: responseText,
        model: process.env.OPENROUTER_MODEL,
        timestamp: new Date()
      }
    ]).then(({ error }) => {
      if (error) console.error("InsForge chat logging failed:", error.message);
    });

    res.json({ message: responseText });
  } catch (error) {
    console.error("OpenRouter Chat Error:", error);
    res.status(500).json({
      error: "Chat failed. Please try again later.",
      details: error.message
    });
  }
});



// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;
