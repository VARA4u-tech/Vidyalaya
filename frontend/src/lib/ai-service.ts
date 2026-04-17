/**
 * AI Service to handle PDF processing, analysis, quiz generation, and study planning.
 * Now integrated with InsForge Database for persistence.
 */
import { insforge } from "./insforge";
import * as pdfjsLib from 'pdfjs-dist';

// Use a direct unpkg CDN link without '?' to avoid Vite dynamic import interception
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

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

    // Extract text from PDF
    let text = "";
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pagesToExtract = Math.min(pdf.numPages, 10); // Limit to first 10 pages for demo
      
      for (let i = 1; i <= pagesToExtract; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => ('str' in item ? item.str : "")).join(" ");
        text += pageText + "\n\n";
      }
      text = text.trim();
      
      if (!text) {
        text = `Extracted document text block. No readable content found in ${file.name}.`;
      }
    } catch (parseError) {
      console.error("PDF Parsing failed:", parseError);
      text = `This is a fallback extracted text for ${file.name} because standard parsing failed...`;
    }

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

      if (documentId && !documentId.startsWith('mock-')) {
        try {
          let responseContent;
          try {
            responseContent = {
              summary: result.summary,
              concepts: result.concepts
            };
          } catch (parseErr) {
            console.error("AI returned invalid JSON");
            responseContent = {
              summary: "AI summary generation failed.",
              concepts: []
            };
          }
          
          const analysisData = {
            document_id: documentId,
            summary: responseContent.summary,
            concepts: responseContent.concepts,
            difficulty: result.difficulty
          };
          
          const { data: existing } = await insforge.database.from("ai_analysis").select("id").eq("document_id", documentId).single();
          
          if (existing) {
            await insforge.database.from("ai_analysis").update(analysisData).eq("id", existing.id);
          } else {
            const { error: insertErr } = await insforge.database.from("ai_analysis").insert([analysisData]);
            if (insertErr) console.error("Could not insert analysis (FK or schema error?):", insertErr.message);
          }
        } catch (dbErr) {
          console.error("Database save failed for analysis:", dbErr);
        }
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
    try {
      const response = await fetch(`${BACKEND_URL}/api/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Quiz generation failed");
      const questions = await response.json();

      if (documentId && !documentId.startsWith('mock-')) {
        try {
          const quizData = {
            document_id: documentId,
            questions: questions
          };
          const { data: existing } = await insforge.database.from("ai_quizzes").select("id").eq("document_id", documentId).single();
          if (existing) {
            await insforge.database.from("ai_quizzes").update(quizData).eq("id", existing.id);
          } else {
            await insforge.database.from("ai_quizzes").insert([quizData]);
          }
        } catch (dbErr) {
          console.error("Database save failed for quiz:", dbErr);
        }
      }

      return questions;
    } catch (err) {
      console.error("AI Quiz Error:", err);
      return [];
    }
  },

  /**
   * AI study planner generation
   */
  async generateStudyPlan(text: string, documentId?: string): Promise<{ items: StudyPlanItem[], totalDuration: string }> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Plan generation failed");
      const result = await response.json();

      if (documentId && !documentId.startsWith('mock-')) {
        try {
          const planData = {
            document_id: documentId,
            plan_data: result
          };
          const { data: existing } = await insforge.database.from("ai_plans").select("id").eq("document_id", documentId).single();
          if (existing) {
            await insforge.database.from("ai_plans").update(planData).eq("id", existing.id);
          } else {
            await insforge.database.from("ai_plans").insert([planData]);
          }
        } catch (dbErr) {
          console.error("Database save failed for plan:", dbErr);
        }
      }

      return result;
    } catch (err) {
      console.error("AI Plan Error:", err);
      return { totalDuration: "N/A", items: [] };
    }
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
