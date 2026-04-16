/**
 * Mock AI Service to simulate PDF processing, analysis, quiz generation, and study planning.
 * In a real application, these would call the backend APIs.
 */

export interface AnalysisResult {
  summary: string;
  concepts: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudyPlanItem {
  session: string;
  topic: string;
  duration: string;
  objective: string;
}

export const aiService = {
  /**
   * Simulates PDF text extraction and initial analysis
   */
  async uploadAndExtract(file: File): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`This is extracted text from ${file.name}. It contains information about biology, cellular structures, and the process of photosynthesis...`);
      }, 2000);
    });
  },

  /**
   * Simulates AI analysis/summarization
   */
  async generateAnalysis(text: string): Promise<AnalysisResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          summary: "This document explores the fundamental mechanisms of photosynthesis in green plants. It explains how light energy is converted into chemical energy, specifically focusing on the Light-Dependent reactions occurring in the thylakoid membranes and the Calvin cycle in the stroma.",
          concepts: [
            "Photosynthesis",
            "Chlorophyll",
            "ATP Synthesis",
            "Calvin Cycle",
            "Electron Transport Chain"
          ],
          difficulty: "Intermediate"
        });
      }, 3000);
    });
  },

  /**
   * Simulates AI quiz generation
   */
  async generateQuiz(text: string): Promise<QuizQuestion[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "1",
            question: "Where do the light-dependent reactions of photosynthesis take place?",
            options: ["Stroma", "Thylakoid Membrane", "Mitochondria", "Nucleus"],
            correctAnswer: 1,
            explanation: "Light-dependent reactions occur in the thylakoid membranes where chlorophyll absorbs light energy."
          },
          {
            id: "2",
            question: "What is the primary byproduct of the light-dependent reactions that is used in the Calvin cycle?",
            options: ["Oxygen", "Carbon Dioxide", "ATP and NADPH", "Glucose"],
            correctAnswer: 2,
            explanation: "ATP and NADPH are produced during the light reactions and provide energy for the Calvin cycle."
          },
          {
            id: "3",
            question: "Which molecule is responsible for absorbing light energy in plants?",
            options: ["Carotene", "Xanthophyll", "Chlorophyll", "Melanin"],
            correctAnswer: 2,
            explanation: "Chlorophyll is the primary pigment that captures light energy for photosynthesis."
          }
        ]);
      }, 2500);
    });
  },

  /**
   * Simulates AI study planner generation
   */
  async generateStudyPlan(text: string): Promise<{ items: StudyPlanItem[], totalDuration: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalDuration: "12 Hours",
          items: [
            {
              session: "Session 1",
              topic: "Fundamental Concepts",
              duration: "2 Hours",
              objective: "Grasp the overall equation of photosynthesis and the role of Chlorophyll."
            },
            {
              session: "Session 2",
              topic: "The Light Reactions",
              duration: "4 Hours",
              objective: "Master the electron transport chain and ATP synthesis process."
            },
            {
              session: "Session 3",
              topic: "Dark Reactions / Calvin Cycle",
              duration: "4 Hours",
              objective: "Understand carbon fixation and glucose production stages."
            },
            {
              session: "Session 4",
              topic: "Review & Quiz",
              duration: "2 Hours",
              objective: "Test knowledge with generated quizzes and revise weak areas."
            }
          ]
        });
      }, 2800);
    });
  }
};
