import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  LayoutDashboard, 
  ChevronLeft, 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Menu,
  X
} from "lucide-react";
import { insforge, User } from "@/lib/insforge";
import { aiService, AnalysisResult, QuizQuestion, StudyPlanItem } from "@/lib/ai-service";

// Types for the dashboard state
type DashboardStep = "upload" | "analysis" | "quiz" | "planner";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeStep, setActiveStep] = useState<DashboardStep>("upload");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Data State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [studyPlan, setStudyPlan] = useState<{ items: StudyPlanItem[], totalDuration: string } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data) setUser(data);
      } catch (err) {
        console.log("Dashboard auth check failed");
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await insforge.auth.signOut();
    } catch (err) {
      console.error("Unexpected error signing out:", err);
    } finally {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  // ── HANDLERS ──

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    try {
      const text = await aiService.uploadAndExtract(file);
      setExtractedText(text);
      setActiveStep("analysis"); // Move to next step automatically
      await handleStartAnalysis(text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartAnalysis = async (text: string) => {
    setIsProcessing(true);
    try {
      const result = await aiService.generateAnalysis(text);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!extractedText) return;
    setIsProcessing(true);
    try {
      const questions = await aiService.generateQuiz(extractedText);
      setQuiz(questions);
      setActiveStep("quiz");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!extractedText) return;
    setIsProcessing(true);
    try {
      const plan = await aiService.generateStudyPlan(extractedText);
      setStudyPlan(plan);
      setActiveStep("planner");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // ── RENDER HELPERS ──

  const navItems = [
    { id: "upload", label: "Upload PDF", icon: Upload, completed: !!uploadedFile },
    { id: "analysis", label: "AI Analysis", icon: Brain, completed: !!analysis },
    { id: "quiz", label: "AI Quiz", icon: CheckCircle2, completed: !!quiz },
    { id: "planner", label: "Exam Planner", icon: Calendar, completed: !!studyPlan },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[hsl(210,48%,12%)] text-[hsl(36,25%,90%)] font-sans">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? "w-72" : "w-0 md:w-20"} transition-all duration-300 border-r border-white/5 bg-[hsl(210,48%,16%)] flex flex-col overflow-hidden relative`}
      >
        <div className="flex items-center gap-3 p-6 mb-8 whitespace-nowrap">
          <div className="w-10 h-10 rounded-xl bg-[hsl(9,70%,54%)] flex items-center justify-center shadow-lg shadow-coral-500/20">
            <Sparkles className="text-white" size={20} />
          </div>
          {isSidebarOpen && <span className="font-serif font-bold text-2xl tracking-tight">Vidyalaya</span>}
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveStep(item.id as DashboardStep)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                activeStep === item.id 
                  ? "bg-[hsl(9,70%,54%)] text-white shadow-xl shadow-coral-500/20" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} className={activeStep === item.id ? "text-white" : "group-hover:text-coral-400"} />
              {isSidebarOpen && (
                <div className="flex flex-col items-start whitespace-nowrap overflow-hidden">
                  <span className="text-sm font-bold">{item.label}</span>
                  {item.completed && <span className="text-[10px] opacity-60">Ready</span>}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button 
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all group"
          >
            <ChevronLeft size={20} />
            {isSidebarOpen && <span>Exit Dashboard</span>}
          </button>
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-[hsl(9,70%,60%)] hover:bg-[hsl(9,70%,54%,0.1)] transition-all group"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-bold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[hsl(210,48%,14%)]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/5 text-white/60"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-serif font-bold text-white/90">
              {navItems.find(n => n.id === activeStep)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4">
             {uploadedFile && (
               <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                 <FileText size={14} className="text-coral-400" />
                 <span className="text-xs font-medium text-white/70 max-w-[120px] truncate">{uploadedFile.name}</span>
               </div>
             )}
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center font-bold text-sm shadow-lg">
                {user?.user_metadata?.full_name?.charAt(0) || "S"}
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeStep}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
               className="max-w-5xl mx-auto"
             >
                {/* ── STEP 1: UPLOAD ── */}
                {activeStep === "upload" && (
                  <div className="flex flex-col items-center justify-center min-h-[60vh]">
                     <div className="text-center mb-12">
                       <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                         Ready to Master Your Notes?
                       </h1>
                       <p className="text-white/50 text-lg max-w-xl mx-auto">
                         Upload your study material in PDF format. Our AI will analyze, summarize, and help you prepare for exams instantly.
                       </p>
                     </div>

                     <div 
                        className={`relative w-full max-w-2xl aspect-[16/9] md:aspect-[21/9] rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-6 group cursor-pointer ${
                          isProcessing ? "border-coral-500/50 bg-coral-500/5" : "border-white/10 hover:border-coral-500/30 hover:bg-white/5"
                        }`}
                        onClick={() => !isProcessing && document.getElementById('file-upload')?.click()}
                     >
                       <input 
                         id="file-upload" 
                         type="file" 
                         className="hidden" 
                         accept=".pdf"
                         onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                       />
                       
                       {isProcessing ? (
                         <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-4 border-coral-500/30 border-t-coral-500 rounded-full animate-spin" />
                            <p className="font-bold text-coral-400 animate-pulse">Extracting Knowledge...</p>
                         </div>
                       ) : (
                         <>
                           <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-coral-500/10 transition-all duration-500">
                             <Upload size={32} className="text-white/40 group-hover:text-coral-500" />
                           </div>
                           <div className="text-center">
                             <p className="text-xl font-bold mb-1">Click to browse or drag & drop</p>
                             <p className="text-sm text-white/30 tracking-widest uppercase">Only PDF files supported</p>
                           </div>
                         </>
                       )}
                     </div>

                     <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                        {[
                          { icon: ShieldCheck, title: "Secure Processing", desc: "Your files are encrypted and private." },
                          { icon: Zap, title: "Instant Analysis", desc: "Complex topics simplified in seconds." },
                          { icon: Clock, title: "Time Saver", desc: "Slash your study time by 60%." },
                        ].map((feat, i) => (
                          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
                             <feat.icon size={20} className="text-coral-400" />
                             <h4 className="font-bold text-sm">{feat.title}</h4>
                             <p className="text-xs text-white/40 leading-relaxed">{feat.desc}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                )}

                {/* ── STEP 2: ANALYSIS ── */}
                {activeStep === "analysis" && (
                  <div className="space-y-8">
                    {!analysis && isProcessing ? (
                      <div className="flex flex-col items-center justify-center py-20 gap-6">
                        <div className="w-20 h-20 border-4 border-coral-500/30 border-t-coral-500 rounded-full animate-spin" />
                        <div className="text-center">
                          <h3 className="text-2xl font-serif font-bold mb-2">Generating AI Summary</h3>
                          <p className="text-white/40">Using neural engines to distill your content...</p>
                        </div>
                      </div>
                    ) : analysis ? (
                      <>
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="flex-1 space-y-6">
                             <div className="p-8 rounded-3xl bg-white/5 border border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                  <Brain size={120} />
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-coral-400 mb-6 flex items-center gap-2">
                                  <Sparkles size={16} /> AI Summary & Simplification
                                </h3>
                                <p className="text-xl md:text-2xl font-serif leading-relaxed text-white/90">
                                  {analysis.summary}
                                </p>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="p-6 rounded-3xl bg-[hsl(185,48%,20%,0.2)] border border-[hsl(185,48%,50%,0.1)]">
                                  <h4 className="text-xs font-black uppercase tracking-widest text-[hsl(185,48%,50%)] mb-4">Key Concepts Detected</h4>
                                  <div className="flex flex-wrap gap-2">
                                     {analysis.concepts.map(concept => (
                                       <span key={concept} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-xs font-medium">
                                          {concept}
                                       </span>
                                     ))}
                                  </div>
                               </div>
                               <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-between">
                                  <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-white/30 mb-1">Content Depth</h4>
                                    <p className="text-lg font-bold">{analysis.difficulty}</p>
                                  </div>
                                  <div className="w-12 h-12 rounded-2xl bg-coral-500/10 flex items-center justify-center text-coral-500">
                                    <LayoutDashboard size={24} />
                                  </div>
                               </div>
                             </div>
                          </div>

                          <aside className="w-full md:w-80 space-y-4">
                             <div className="p-6 rounded-3xl bg-gradient-to-br from-coral-500 to-coral-600 shadow-xl shadow-coral-500/20">
                                <h3 className="font-serif font-bold text-xl mb-4">Next Steps</h3>
                                <p className="text-sm text-white/80 mb-6">Test your knowledge with a custom quiz or build your study schedule.</p>
                                <div className="space-y-3">
                                  <button 
                                    onClick={handleGenerateQuiz}
                                    className="w-full h-12 rounded-xl bg-white text-[hsl(9,70%,54%)] font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                  >
                                    Take AI Quiz <ArrowRight size={16} />
                                  </button>
                                  <button 
                                    onClick={handleGeneratePlan}
                                    className="w-full h-12 rounded-xl border border-white/30 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                                  >
                                    Design Study Plan
                                  </button>
                                </div>
                             </div>
                             
                             <div className="p-6 rounded-3xl border border-white/5 bg-white/5">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3 text-center">Reference File</h4>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-black/20">
                                   <FileText size={20} className="text-coral-400" />
                                   <div className="min-w-0">
                                      <p className="text-xs font-bold truncate">{uploadedFile?.name}</p>
                                      <p className="text-[10px] text-white/40">PDF Document</p>
                                   </div>
                                </div>
                             </div>
                          </aside>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 gap-4">
                         <Brain size={48} className="text-white/20" />
                         <p className="text-white/40">Upload a PDF to see the analysis.</p>
                         <button onClick={() => setActiveStep("upload")} className="px-6 py-2 rounded-xl bg-coral-500 text-white font-bold text-sm">Upload Now</button>
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 3: QUIZ ── */}
                {activeStep === "quiz" && (
                   <div className="max-w-3xl mx-auto py-10">
                     {isProcessing ? (
                       <div className="flex flex-col items-center gap-6">
                         <div className="w-16 h-16 border-4 border-coral-500/30 border-t-coral-500 rounded-full animate-spin" />
                         <p className="font-serif italic text-xl">Crafting your personalized quiz...</p>
                       </div>
                     ) : quiz ? (
                       <div className="space-y-12">
                          <header className="text-center">
                            <h2 className="text-4xl font-serif font-bold mb-4">Quiz Time</h2>
                            <p className="text-white/50">Based on your uploaded content. 3 Questions to master.</p>
                          </header>

                          <div className="space-y-10">
                            {quiz.map((q, qIndex) => (
                              <div key={q.id} className="p-8 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                                <div className="flex items-start gap-4">
                                  <span className="w-8 h-8 rounded-lg bg-coral-500/20 text-coral-500 flex items-center justify-center font-bold text-sm shrink-0">
                                    {qIndex + 1}
                                  </span>
                                  <h4 className="text-lg font-bold pt-1">{q.question}</h4>
                                </div>
                                <div className="grid grid-cols-1 gap-3 pl-12">
                                  {q.options.map((opt, optIndex) => (
                                    <button 
                                      key={optIndex}
                                      className="text-left px-5 py-4 rounded-xl bg-white/5 border border-white/10 hover:border-coral-500/50 hover:bg-coral-500/5 transition-all text-sm font-medium"
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-10 flex justify-center">
                             <button className="px-12 py-4 rounded-2xl bg-coral-500 text-white font-bold shadow-xl shadow-coral-500/20 hover:scale-105 active:scale-95 transition-all">
                               Submit Quiz Answers
                             </button>
                          </div>
                       </div>
                     ) : (
                       <div className="text-center space-y-4">
                         <CheckCircle2 size={48} className="mx-auto text-white/10" />
                         <h3 className="text-2xl font-serif font-bold">No Quiz Generated</h3>
                         <p className="text-white/40">Analysis must be completed before generating a quiz.</p>
                         <button onClick={handleGenerateQuiz} className="px-8 py-3 rounded-xl bg-coral-500 text-white font-bold">Generate Quiz Now</button>
                       </div>
                     )}
                   </div>
                )}

                {/* ── STEP 4: PLANNER ── */}
                {activeStep === "planner" && (
                   <div className="space-y-10">
                      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                        <div className="max-w-xl">
                           <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Study Strategy</h2>
                           <p className="text-white/50 text-lg">We've broken down your content into a structured learning path with estimated durations.</p>
                        </div>
                        <div className="px-6 py-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center">
                           <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">Total Preparation</span>
                           <span className="text-2xl font-black text-coral-400">{studyPlan?.totalDuration || "--"}</span>
                        </div>
                      </header>

                      {isProcessing ? (
                         <div className="flex flex-col items-center py-20 gap-6">
                           <div className="w-16 h-16 border-4 border-[hsl(185,48%,30%)] border-t-[hsl(185,48%,50%)] rounded-full animate-spin" />
                           <p className="text-lg text-[hsl(185,48%,50%)] font-bold animate-pulse">Calculating Your Optimal Path...</p>
                         </div>
                      ) : studyPlan ? (
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                               {studyPlan.items.map((item, idx) => (
                                 <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-6 group hover:bg-white/[0.08] transition-all"
                                 >
                                    <div className="flex flex-col items-center gap-2">
                                       <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-white/20 group-hover:text-coral-500 group-hover:border-coral-500/50 transition-colors">
                                         {idx + 1}
                                       </div>
                                       <div className="flex-1 w-px bg-white/10" />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                       <div className="flex items-center justify-between">
                                         <h4 className="font-bold text-coral-400">{item.session}</h4>
                                         <span className="flex items-center gap-1.5 text-[10px] font-bold py-1 px-2 rounded-lg bg-black/30 text-white/40">
                                            <Clock size={12} /> {item.duration}
                                         </span>
                                       </div>
                                       <h3 className="text-xl font-serif font-bold">{item.topic}</h3>
                                       <p className="text-sm text-white/50 leading-relaxed">{item.objective}</p>
                                    </div>
                                 </motion.div>
                               ))}
                            </div>

                            <aside className="space-y-6">
                               <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-[hsl(210,48%,20%)] to-[hsl(210,48%,15%)] border border-white/5 space-y-6">
                                  <h3 className="text-2xl font-serif font-bold">Preparation Tips</h3>
                                  <div className="space-y-4">
                                     {[
                                       "Focus on 'The Light Reactions' first as it forms the foundation.",
                                       "Use the generated quiz after Session 3 for maximum retention.",
                                       "Break Session 2 into two 2-hour blocks with a 20min break."
                                     ].map((tip, i) => (
                                       <div key={i} className="flex gap-3 text-sm text-white/60">
                                          <Sparkles size={16} className="text-coral-500 shrink-0 mt-1" />
                                          <p>{tip}</p>
                                       </div>
                                     ))}
                                  </div>
                                  <button className="w-full py-4 rounded-2xl bg-white text-[hsl(210,48%,15%)] font-bold shadow-xl hover:bg-coral-50 transition-colors">
                                     Add to Calendar
                                  </button>
                               </div>

                               <div className="p-8 rounded-[2.5rem] bg-coral-500/5 border border-coral-500/10 flex flex-col items-center text-center gap-4">
                                  <Zap className="text-coral-500" size={32} />
                                  <h4 className="font-bold">Next Milestone</h4>
                                  <p className="text-sm text-white/40">Once you complete the planner, you'll be 85% ready for your exam.</p>
                               </div>
                            </aside>
                         </div>
                      ) : (
                        <div className="text-center py-20">
                           <Calendar size={48} className="mx-auto text-white/5 mb-4" />
                           <p className="text-white/30">Analysis needed to build your custom plan.</p>
                        </div>
                      )}
                   </div>
                )}
             </motion.div>
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
