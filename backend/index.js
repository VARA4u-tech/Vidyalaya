require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Vidyalaya AI Backend API" });
});

// Mock Dashboard Stats
app.get("/api/stats", (req, res) => {
  res.json([
    { label: "Study Streak", value: "8 days", color: "hsl(9,70%,54%)" },
    { label: "Cards Reviewed", value: "256", color: "hsl(185,48%,50%)" },
    { label: "Quiz Score Avg", value: "88%", color: "hsl(34,60%,55%)" },
    { label: "Goals Met", value: "15", color: "hsl(142,60%,50%)" },
  ]);
});

// Mock Summarization Route
app.post("/api/summarize", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  // Mocking AI processing delay
  setTimeout(() => {
    res.json({
      summary: `This is a high-level AI summary of your notes: "${text.substring(0, 50)}...". The key concepts identified include effective study habits, temporal spacing, and active recall.`,
      concepts: ["Active Recall", "Spaced Repetition", "Feynman Technique"],
    });
  }, 1000);
});

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
