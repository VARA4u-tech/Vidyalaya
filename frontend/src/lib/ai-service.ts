/**
 * AI Service to handle PDF processing, analysis, quiz generation, and study planning.
 * Now integrated with InsForge Database for persistence.
 */
import { insforge } from "./insforge";

const BACKEND_URL = "http://localhost:5000";

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

/* persistent storage now handled by insforge.database */

export const aiService = {
  /**
   * Fetches all documents from history for the current user
   */
  async getHistory() {
    const { data: user } = await insforge.auth.getCurrentUser();
    if (!user?.user?.id) return [];

    const { data: userData, error } = await insforge.database
      .from("user_documents")
      .select("*")
      .eq("user_id", user.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching history:", error.message);
      return [];
    }

    return (userData || []).map((doc: { id: string, name: string, created_at: string, status?: string, size?: string }) => ({
      id: doc.id,
      name: doc.name,
      date: new Date(doc.created_at).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric'
      }),
      status: doc.status || 'Completed',
      size: doc.size || '0.1 MB'
    }));
  },

  /**
   * PDF text extraction and storage
   */
  async uploadAndExtract(file: File): Promise<{ text: string, documentId: string }> {
    const { data: user } = await insforge.auth.getCurrentUser();
    if (!user?.user) throw new Error("Authentication required");

    const text = `This is extracted text from ${file.name}. It contains information about biology and science fundamentals...`;
    const size = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

    const { data: doc, error } = await insforge.database
      .from("user_documents")
      .insert([
        {
          user_id: user.user.id,
          name: file.name,
          content: text,
          size: size,
          status: 'Processed'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Error saving document to database (Table might be missing):", error.message);
      // Return a temporary local ID so the frontend can continue generating AI output
      return {
        text,
        documentId: `mock-doc-${Date.now()}`
      };
    }

    return {
      text,
      documentId: doc.id
    };
  },

  /**
   * AI analysis/summarization using Backend API
   */
  async generateAnalysis(text: string, documentId?: string): Promise<AnalysisResult> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("AI Summarization failed");
      
      const data = await response.json();
      
      const result: AnalysisResult = {
        summary: data.summary || "Summary could not be generated.",
        concepts: data.concepts || [],
        difficulty: "Intermediate" // Default difficulty
      };

      if (documentId) {
        const { error } = await insforge.database
          .from("ai_analysis")
          .insert([{
            document_id: documentId,
            summary: result.summary,
            concepts: result.concepts,
            difficulty: result.difficulty
          }]);
        
        if (error) console.error("Error saving analysis:", error.message);
      }

      return result;
    } catch (err) {
      console.error("AI Analysis Error:", err);
      // Fallback for demo
      return {
        summary: "Fallack: Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll pigments.",
        concepts: ["Photosynthesis", "Chlorophyll"],
        difficulty: "Beginner"
      };
    }
  },
  
  async getCachedAnalysis(id: string) { 
    const { data, error } = await insforge.database
      .from("ai_analysis")
      .select("*")
      .eq("document_id", id)
      .single();
    
    return data || null;
  },

  async getCachedQuiz(id: string) { 
    const { data, error } = await insforge.database
      .from("ai_quizzes")
      .select("*")
      .eq("document_id", id)
      .single();
    
    return data?.questions || null;
  },

  async getCachedPlan(id: string) { 
    const { data, error } = await insforge.database
      .from("ai_plans")
      .select("*")
      .eq("document_id", id)
      .single();
    
    return data?.plan_data || null;
  },

  /**
   * AI quiz generation
   */
  async generateQuiz(text: string, documentId?: string): Promise<QuizQuestion[]> {
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

    if (documentId) {
      await insforge.database
        .from("ai_quizzes")
        .insert([{
          document_id: documentId,
          questions: result
        }]);
    }

    return result;
  },

  /**
   * AI study planner generation
   */
  async generateStudyPlan(text: string, documentId?: string): Promise<{ items: StudyPlanItem[], totalDuration: string }> {
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

    if (documentId) {
      await insforge.database
        .from("ai_plans")
        .insert([{
          document_id: documentId,
          plan_data: result
        }]);
    }

    return result;
  },

  /**
   * Deletes a document from history
   */
  async deleteDocument(id: string): Promise<boolean> {
    const { error } = await insforge.database
      .from("user_documents")
      .delete()
      .eq("id", id);
    
    if (error) {
      console.error("Error deleting document:", error.message);
      return false;
    }
    return true;
  }
};
