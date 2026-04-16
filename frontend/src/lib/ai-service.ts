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

export interface DocumentRecord {
  id: string;
  name: string;
  date: string;
  status: string;
  size: string;
}

const MOCK_DB = {
  documents: [] as DocumentRecord[],
  analysis: {} as Record<string, AnalysisResult>,
  quizzes: {} as Record<string, QuizQuestion[]>,
  plans: {} as Record<string, { items: StudyPlanItem[], totalDuration: string }>,
};

export const aiService = {
  /**
   * Simulates saving a document to history
   */
  async saveToHistory(file: File, id: string) {
    MOCK_DB.documents.unshift({
      id,
      name: file.name,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Completed',
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    });
  },

  /**
   * Fetches all documents from history
   */
  async getHistory() {
     return new Promise<DocumentRecord[]>((resolve) => {
       setTimeout(() => resolve(MOCK_DB.documents), 500);
     });
  },

  /**
   * Simulates PDF text extraction and initial analysis
   */
  async uploadAndExtract(file: File): Promise<{ text: string, documentId: string }> {
    const id = Math.random().toString(36).substring(7);
    await this.saveToHistory(file, id);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          text: `This is extracted text from ${file.name}. It contains information about biology...`,
          documentId: id
        });
      }, 1500);
    });
  },

  /**
   * Simulates AI analysis/summarization
   */
  async generateAnalysis(text: string, documentId?: string): Promise<AnalysisResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = {
          summary: "This document explores the fundamental mechanisms of photosynthesis in green plants. It explains how light energy is converted into chemical energy, specifically focusing on the Light-Dependent reactions occurring in the thylakoid membranes and the Calvin cycle in the stroma.",
          concepts: [
            "Photosynthesis",
            "Chlorophyll",
            "ATP Synthesis",
            "Calvin Cycle",
            "Electron Transport Chain"
          ],
          difficulty: "Intermediate" as const
        };
        if(documentId) MOCK_DB.analysis[documentId] = result;
        resolve(result);
      }, 2000);
    });
  },
  
  async getCachedAnalysis(id: string) { return MOCK_DB.analysis[id] || null; },
  async getCachedQuiz(id: string) { return MOCK_DB.quizzes[id] || null; },
  async getCachedPlan(id: string) { return MOCK_DB.plans[id] || null; },

  /**
   * Simulates AI quiz generation
   */
  async generateQuiz(text: string, documentId?: string): Promise<QuizQuestion[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = [
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
          }
        ];
        if(documentId) MOCK_DB.quizzes[documentId] = result;
        resolve(result);
      }, 2000);
    });
  },

  /**
   * Simulates AI study planner generation
   */
  async generateStudyPlan(text: string, documentId?: string): Promise<{ items: StudyPlanItem[], totalDuration: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = {
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
            }
          ]
        };
        if(documentId) MOCK_DB.plans[documentId] = result;
        resolve(result);
      }, 2000);
    });
  }
};
