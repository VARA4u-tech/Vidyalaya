import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  ChevronLeft, 
  Upload, 
  FileText, 
  Brain, 
  CheckCircle2, 
  Calendar,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Menu,
  History as HistoryIcon,
  Search,
  ExternalLink,
  ChevronRight,
  User as UserIcon,
  X,
  Trash2
} from "lucide-react";
import { insforge, User } from "@/lib/insforge";
import { aiService, AnalysisResult, QuizQuestion, StudyPlanItem, DocumentRecord } from "@/lib/ai-service";

type DashboardStep = "upload" | "analysis" | "quiz" | "planner" | "history";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeStep, setActiveStep] = useState<DashboardStep>("upload");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Data State
  const [uploadedFile, setUploadedFile] = useState<{ name: string, id: string } | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [studyPlan, setStudyPlan] = useState<{ items: StudyPlanItem[], totalDuration: string } | null>(null);
  const [history, setHistory] = useState<DocumentRecord[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await insforge.auth.getCurrentUser();
        if (data?.user) {
          setUser(data.user);
          loadHistory();
        }
      } catch (err) {
        console.log("Dashboard auth check failed:", err);
      }
    };
    fetchUser();
  }, []);

  const loadHistory = async () => {
    const docs = await aiService.getHistory();
    setHistory(docs);
  };

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
    setIsProcessing(true);
    try {
      const { text, documentId } = await aiService.uploadAndExtract(file);
      setUploadedFile({ name: file.name, id: documentId });
      setExtractedText(text);
      setActiveStep("analysis");
      await loadHistory();
      await handleStartAnalysis(text, documentId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartAnalysis = async (text: string, documentId: string) => {
    setIsProcessing(true);
    try {
      const result = await aiService.generateAnalysis(text, documentId);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLoadFromHistory = async (doc: DocumentRecord) => {
    setIsProcessing(true);
    setIsProfileOpen(false); // Close profile if open
    setUploadedFile({ name: doc.name, id: doc.id });
    setExtractedText(`Restored text for ${doc.name}...`);
    
    // Check for cached data
    const cachedAnalysis = await aiService.getCachedAnalysis(doc.id);
    const cachedQuiz = await aiService.getCachedQuiz(doc.id);
    const cachedPlan = await aiService.getCachedPlan(doc.id);

    setAnalysis(cachedAnalysis);
    setQuiz(cachedQuiz);
    setStudyPlan(cachedPlan);

    if (cachedAnalysis) {
      setActiveStep("analysis");
    } else {
      setActiveStep("analysis");
      await handleStartAnalysis(`Extracted text for ${doc.name}`, doc.id);
    }
    setIsProcessing(false);
  };

  const handleGenerateQuiz = async () => {
    if (!extractedText || !uploadedFile) return;
    setIsProcessing(true);
    try {
      const questions = await aiService.generateQuiz(extractedText, uploadedFile.id);
      setQuiz(questions);
      setActiveStep("quiz");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document from your library?")) return;
    try {
      const success = await aiService.deleteDocument(id);
      if (success) {
        await loadHistory();
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleGeneratePlan = async () => {
    if (!extractedText || !uploadedFile) return;
    setIsProcessing(true);
    try {
      const plan = await aiService.generateStudyPlan(extractedText, uploadedFile.id);
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
    { id: "upload", label: "Upload New", icon: Upload },
    { id: "history", label: "Library", icon: HistoryIcon },
    { id: "analysis", label: "AI Analysis", icon: Brain, disabled: !uploadedFile },
    { id: "quiz", label: "Study Quiz", icon: CheckCircle2, disabled: !uploadedFile },
    { id: "planner", label: "Exam Plan", icon: Calendar, disabled: !uploadedFile },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[hsl(210,48%,10%)] text-[hsl(36,25%,90%)] font-sans">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 w-0 lg:w-20"
        } fixed lg:relative h-full transition-all duration-500 border-r border-white/5 bg-[hsl(210,48%,14%)] flex flex-col overflow-hidden shadow-2xl z-[50]`}
      >
        <Link 
          to="/" 
          className="flex items-center gap-3 p-6 mb-8 whitespace-nowrap group/logo hover:opacity-80 transition-all active:scale-95"
        >
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shadow-lg shadow-coral-500/10 group-hover/logo:shadow-coral-500/30 transition-shadow overflow-hidden">
            <img src="/favicon.png" alt="Vidyalaya Logo" className="w-full h-full object-cover" />
          </div>
          {isSidebarOpen && (
            <span className="font-serif font-bold text-2xl tracking-tight text-white group-hover/logo:text-coral-400 transition-colors">
              Vidyalaya
            </span>
          )}
        </Link>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              disabled={item.disabled}
              onClick={() => setActiveStep(item.id as DashboardStep)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group relative ${
                item.disabled ? "opacity-30 cursor-not-allowed" : ""
              } ${
                activeStep === item.id 
                  ? "bg-[hsl(9,70%,54%)] text-white shadow-xl shadow-coral-500/20" 
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon size={20} className={activeStep === item.id ? "text-white" : "group-hover:text-coral-400"} />
              {isSidebarOpen && <span className="text-sm font-bold whitespace-nowrap">{item.label}</span>}
              {activeStep === item.id && (
                <motion.div layoutId="nav-active" className="absolute left-0 w-1 h-6 bg-white rounded-r-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button onClick={() => navigate("/")} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-white/40 hover:text-white hover:bg-white/5 transition-all">
            <ChevronLeft size={20} />
            {isSidebarOpen && <span>Exit</span>}
          </button>
          <button onClick={handleSignOut} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-[hsl(9,70%,60%)] hover:bg-[hsla(9,70%,54%,0.1)] transition-all">
            <LogOut size={20} />
            {isSidebarOpen && <span className="font-bold">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full bg-[hsl(210,48%,10%)] relative overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-[hsl(210,48%,12%)]/80 backdrop-blur-xl sticky top-0 z-20 shadow-lg">
          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-white/5 text-white/60">
              <Menu size={20} />
            </button>
            {/* Vidyalaya Logo → Home (Hidden on larger screens where sidebar is enough) */}
            <Link
              to="/"
              className="flex lg:hidden items-center gap-2.5 group/hlogo hover:opacity-80 transition-all active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center shadow-md overflow-hidden">
                <img src="/favicon.png" alt="Vidyalaya Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-serif font-bold text-lg tracking-tight text-white hidden sm:block">
                Vidyalaya
              </span>
            </Link>
            <div className="w-px h-6 bg-white/10 hidden lg:block" />
            <h2 className="text-lg md:text-xl font-serif font-bold text-white/90 capitalize tracking-tight truncate max-w-[100px] sm:max-w-none">
              {navItems.find(n => n.id === activeStep)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-4 relative">
             <AnimatePresence>
               {uploadedFile && activeStep !== 'upload' && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral-500/10 border border-coral-500/30"
                 >
                   <FileText size={14} className="text-coral-400" />
                   <span className="text-xs font-black text-coral-400 max-w-[180px] truncate uppercase tracking-tighter">{uploadedFile.name}</span>
                 </motion.div>
               )}
             </AnimatePresence>
             
             {/* Profile Trigger */}
             <button 
               onClick={() => setIsProfileOpen(!isProfileOpen)}
               className={`group flex items-center gap-3 p-1.5 pr-4 rounded-full border transition-all duration-300 ${
                 isProfileOpen ? "bg-white/10 border-white/20" : "bg-white/5 border-white/5"
               }`}
             >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-coral-500 to-coral-600 flex items-center justify-center font-black text-sm text-white shadow-lg ring-2 ring-white/10 group-hover:ring-coral-500/50 transition-all">
                  {user?.user_metadata?.full_name?.charAt(0) || user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || "S"}
                </div>
                <div className="hidden sm:flex flex-col items-start leading-none gap-1">
                   <span className="text-xs font-bold text-white/90">My Profile</span>
                   <span className={`text-[9px] font-black uppercase tracking-widest ${isProfileOpen ? "text-coral-400" : "text-white/30"}`}>Account</span>
                </div>
             </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-thin scrollbar-thumb-white/10">
           <AnimatePresence mode="wait">
             <motion.div
               key={activeStep}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4 }}
               className="max-w-6xl mx-auto"
             >
                {/* ── STEP: UPLOAD ── */}
                {activeStep === "upload" && (
                  <div className="flex flex-col items-center justify-center min-h-[65vh]">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-16"
                     >
                       <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent">
                         Ignite Your Knowledge.
                       </h1>
                       <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed font-medium">
                         Your study transformation starts here. Drop a PDF to begin the AI deep-dive.
                       </p>
                     </motion.div>

                     <div 
                        onClick={() => !isProcessing && document.getElementById('file-upload')?.click()}
                        className={`relative w-full max-w-2xl aspect-video md:aspect-[21/9] rounded-[3rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center gap-6 group cursor-pointer overflow-hidden ${
                          isProcessing ? "border-coral-500/50 bg-coral-500/5" : "border-white/10 hover:border-coral-500/40 hover:bg-white/[0.04] active:scale-[0.98]"
                        }`}
                     >
                       <input id="file-upload" type="file" className="hidden" accept=".pdf" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
                       {isProcessing ? (
                         <div className="flex flex-col items-center gap-6">
                            <div className="w-16 h-16 border-4 border-coral-500/10 border-t-coral-500 rounded-full animate-spin shadow-[0_0_20px_rgba(244,63,94,0.2)]" />
                            <p className="font-black text-coral-500 animate-pulse tracking-[0.3em] text-[10px] uppercase">Powering Up Neural Engines</p>
                         </div>
                       ) : (
                         <>
                           <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-coral-500/20 transition-all duration-500 border border-white/5 shadow-2xl group-hover:border-coral-500/30">
                             <Upload size={40} className="text-white/30 group-hover:text-coral-500" />
                           </div>
                           <div className="text-center">
                             <p className="text-2xl font-bold mb-1">Select Study PDF</p>
                             <p className="text-[10px] text-white/20 tracking-[0.4em] uppercase font-black">Ready for Analysis</p>
                           </div>
                         </>
                       )}
                     </div>

                     <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                        {[
                          { icon: ShieldCheck, title: "Private & Secure", desc: "Enterprise-grade encryption for all uploads." },
                          { icon: Zap, title: "Instant Mastery", desc: "Complex logic broken down into bite-sized bits." },
                          { icon: Clock, title: "Optimized Path", desc: "Build a plan based on real learning science." },
                        ].map((feat, i) => (
                          <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-all flex flex-col gap-4">
                             <div className="w-10 h-10 rounded-xl bg-coral-500/10 flex items-center justify-center text-coral-400">
                                <feat.icon size={20} />
                             </div>
                             <h4 className="font-bold text-base">{feat.title}</h4>
                             <p className="text-sm text-white/40 leading-relaxed font-medium">{feat.desc}</p>
                          </div>
                        ))}
                     </div>
                  </div>
                )}

                {/* ── STEP: LIBRARY/HISTORY ── */}
                {activeStep === "history" && (
                  <div className="space-y-12 pb-20">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/5">
                        <div className="text-center md:text-left">
                          <h2 className="text-5xl font-serif font-bold mb-2">Knowledge Library</h2>
                          <p className="text-white/40 font-medium">Revisit and refine your previous study sessions.</p>
                        </div>
                        <div className="relative group w-full md:w-auto mt-4 md:mt-0">
                           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-coral-400 transition-colors" size={18} />
                           <input 
                              type="text" 
                              placeholder="Search..." 
                              className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm focus:outline-none focus:border-coral-500/50 transition-all w-full md:w-64 shadow-2xl"
                           />
                        </div>
                     </div>

                     {history.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                           {history.map((doc, i) => (
                             <motion.div 
                                key={doc.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 + 0.2 }}
                                className="group p-8 rounded-[3rem] bg-white/5 border border-white/5 hover:border-coral-500/40 hover:bg-white/[0.07] transition-all relative overflow-hidden shadow-xl"
                             >
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                   <div className="flex gap-2">
                                     <button className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-coral-400 hover:bg-coral-500/10 active:scale-90 transition-all">
                                        <ExternalLink size={16} />
                                     </button>
                                     <button 
                                       onClick={(e) => { e.stopPropagation(); handleDeleteDocument(doc.id); }}
                                       className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-red-500 hover:bg-red-500/10 active:scale-90 transition-all"
                                     >
                                        <Trash2 size={16} />
                                     </button>
                                   </div>
                                </div>
                                
                                <div className="w-16 h-16 rounded-3xl bg-coral-500/10 flex items-center justify-center text-coral-500 mb-8 border border-coral-500/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                   <FileText size={32} />
                                </div>

                                <h3 className="font-bold text-xl mb-3 truncate pr-10">{doc.name}</h3>
                                
                                <div className="space-y-4">
                                   <div className="flex items-center gap-3 text-xs font-bold text-white/30 tracking-tight">
                                      <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/20 text-white/50">
                                         <Clock size={14} /> {doc.date}
                                      </div>
                                      <div className="px-2 py-1 rounded bg-white/5 text-white/40 uppercase tracking-widest text-[9px] font-black">
                                         {doc.size}
                                      </div>
                                   </div>
                                   <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/5">
                                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest ring-1 ring-green-500/30">
                                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                         {doc.status}
                                      </span>
                                      <button 
                                        onClick={() => handleLoadFromHistory(doc)}
                                        className="text-xs font-black uppercase tracking-widest text-coral-400 flex items-center gap-2 group/btn hover:text-coral-300 transition-colors"
                                      >
                                        Resume <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                      </button>
                                   </div>
                                </div>
                             </motion.div>
                           ))}
                        </div>
                     ) : (
                       <div className="flex flex-col items-center justify-center py-32 gap-6 text-white/10">
                          <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/5 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                             <HistoryIcon size={64} />
                          </div>
                          <p className="text-2xl font-serif italic">Your library awaits its first document.</p>
                       </div>
                     )}
                  </div>
                )}

                {/* ── STEP: ANALYSIS ── */}
                {activeStep === "analysis" && (
                   <div className="space-y-10 pb-20">
                      {isProcessing ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-8">
                           <div className="w-20 h-20 border-4 border-coral-500/20 border-t-coral-500 rounded-full animate-spin" />
                           <div className="text-center">
                              <h2 className="text-3xl font-serif font-bold mb-2">Distilling Neural Paths</h2>
                              <p className="text-white/30 uppercase tracking-[0.4em] text-[10px] font-black">AI is simplifying your content...</p>
                           </div>
                        </div>
                      ) : analysis && (
                        <div className="flex flex-col lg:flex-row gap-10 items-start">
                           <div className="flex-1 space-y-10">
                              <section className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 relative shadow-2xl group">
                                 <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none">
                                   <Brain size={240} />
                                 </div>
                                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-coral-500 mb-10 flex items-center gap-4">
                                   <div className="w-8 h-[1px] bg-coral-500/50" />
                                   <Sparkles size={16} /> AI Executive Summary
                                 </h3>
                                 <p className="text-2xl md:text-3xl font-serif leading-[1.6] text-white/90 selection:bg-coral-500/30">
                                   {analysis.summary}
                                 </p>
                              </section>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                 <div className="p-10 rounded-[3rem] bg-[hsl(185,48%,15%)] border border-[hsl(185,48%,50%,0.2)] shadow-2xl">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[hsl(185,48%,50%)] mb-8 flex items-center justify-between">
                                       Cognitive Map <span>{analysis.concepts.length} nodes</span>
                                    </h4>
                                    <div className="flex flex-wrap gap-2.5">
                                       {analysis.concepts.map(c => (
                                          <span key={c} className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-default shadow-sm">
                                             {c}
                                          </span>
                                       ))}
                                    </div>
                                 </div>
                                 <div className="p-10 rounded-[3rem] bg-white/5 border border-white/5 flex items-center justify-between shadow-xl">
                                    <div>
                                       <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-3">Material Depth</h4>
                                       <p className="text-3xl font-bold tracking-tight">{analysis.difficulty}</p>
                                    </div>
                                    <div className="w-16 h-16 rounded-3xl bg-coral-500/10 flex items-center justify-center text-coral-500 ring-4 ring-coral-500/5 shadow-2xl">
                                       <Zap size={32} />
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <aside className="w-full lg:w-80 flex flex-col gap-6 sticky top-24">
                              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-coral-500 to-coral-600 shadow-[0_20px_50px_rgba(244,63,94,0.3)]">
                                 <h3 className="font-serif font-bold text-3xl mb-4">Ascend.</h3>
                                 <p className="text-sm font-medium text-white/80 leading-relaxed mb-10">Leverage AI to master this content. Choose your next cognitive operation.</p>
                                 <div className="space-y-4">
                                    <button 
                                       onClick={handleGenerateQuiz}
                                       className="w-full h-16 rounded-[1.5rem] bg-white text-coral-600 font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:scale-[1.04] active:scale-95 transition-all shadow-xl"
                                    >
                                       Begin Quiz <CheckCircle2 size={18} />
                                    </button>
                                    <button 
                                       onClick={handleGeneratePlan}
                                       className="w-full h-16 rounded-[1.5rem] border-2 border-white/30 text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-white/10 transition-all"
                                    >
                                       Create Plan <Calendar size={18} />
                                    </button>
                                 </div>
                              </div>
                           </aside>
                        </div>
                      )}
                   </div>
                )}

                {/* ── STEP: QUIZ ── */}
                {activeStep === "quiz" && (
                   <div className="max-w-4xl mx-auto py-10">
                      <header className="text-center mb-20">
                         <div className="w-20 h-20 rounded-3xl bg-coral-500/10 flex items-center justify-center text-coral-500 mx-auto mb-8 border border-coral-500/20 shadow-2xl">
                            <CheckCircle2 size={40} />
                         </div>
                         <h2 className="text-5xl font-serif font-bold mb-4 tracking-tight">Active Recall Challenge</h2>
                         <p className="text-white/40 max-w-lg mx-auto font-medium text-lg leading-relaxed">Neural reinforcement through customized questions. Don't look at the text!</p>
                      </header>

                      {quiz ? (
                         <div className="space-y-10 pb-32 px-4">
                            {quiz.map((q, idx) => (
                               <motion.div 
                                 key={idx}
                                 initial={{ opacity: 0, x: -30 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: idx * 0.15 + 0.3 }}
                                 className="p-10 rounded-[3.5rem] bg-white/[0.04] border border-white/5 space-y-10 shadow-2xl relative"
                               >
                                  <div className="flex gap-8">
                                     <span className="w-12 h-12 rounded-2xl bg-coral-500/10 text-coral-500 font-black flex items-center justify-center shrink-0 border border-coral-500/30 text-lg shadow-inner">
                                        {idx + 1}
                                     </span>
                                     <h4 className="text-2xl font-bold pr-6 leading-snug">{q.question}</h4>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-20">
                                     {q.options.map((opt, i) => (
                                       <button key={i} className="group flex items-center justify-between text-left px-8 py-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-coral-500/60 hover:bg-coral-500/10 active:scale-95 transition-all text-sm font-bold text-white/50 hover:text-white shadow-sm">
                                          <span className="max-w-[85%]">{opt}</span>
                                          <div className="w-5 h-5 rounded-full border-2 border-white/10 group-hover:border-coral-500 transition-colors shrink-0" />
                                       </button>
                                     ))}
                                  </div>
                               </motion.div>
                            ))}
                            <div className="flex justify-center pt-16">
                               <button className="px-16 py-6 rounded-[2.5rem] bg-coral-500 text-white font-black text-xs uppercase tracking-[0.4em] shadow-[0_25px_50px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all">
                                  Submit Assessment
                               </button>
                            </div>
                         </div>
                      ) : (
                         <div className="flex flex-col items-center py-20 gap-8 grayscale opacity-10">
                            <Sparkles size={80} />
                            <p className="font-serif text-2xl italic">Recall mechanisms are locked.</p>
                         </div>
                      )}
                   </div>
                )}

                {/* ── STEP: PLANNER ── */}
                {activeStep === "planner" && (
                   <div className="space-y-16 pb-32">
                      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-12 border-b border-white/10">
                         <div className="max-w-2xl">
                            <h2 className="text-6xl font-serif font-bold mb-6 tracking-tighter">Strategic Path.</h2>
                            <p className="text-white/40 text-xl font-medium leading-relaxed">AI-calculated study nodes optimized for long-term memory encoding and exam readiness.</p>
                         </div>
                         <div className="p-10 rounded-[3.5rem] bg-white/5 border border-white/10 flex flex-col items-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-coral-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-3 relative">Neural Budget</span>
                            <span className="text-4xl font-black text-coral-400 relative tracking-tighter">{studyPlan?.totalDuration || "--"}</span>
                         </div>
                      </header>

                      {studyPlan ? (
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-8">
                               {studyPlan.items.map((item, idx) => (
                                 <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.15 + 0.2 }}
                                    className="p-10 rounded-[3.5rem] bg-white/[0.04] border border-white/5 flex gap-10 group hover:bg-white/[0.08] transition-all relative overflow-hidden shadow-2xl"
                                 >
                                    <div className="flex flex-col items-center">
                                       <div className="w-14 h-14 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-base font-black text-white/20 group-hover:text-coral-500 group-hover:border-coral-500/40 group-hover:bg-coral-500/5 transition-all duration-500">
                                          {idx + 1}
                                       </div>
                                       <div className="flex-1 w-0.5 bg-gradient-to-b from-white/20 to-transparent mt-6" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                       <div className="flex items-center justify-between">
                                          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-coral-500/80">{item.session}</h4>
                                          <div className="flex items-center gap-3 px-4 py-1.5 rounded-xl bg-black/40 text-[10px] font-black text-white/40 tracking-[0.2em] border border-white/5">
                                             <Clock size={14} className="text-coral-400" /> {item.duration}
                                          </div>
                                       </div>
                                       <h3 className="text-3xl font-serif font-bold tracking-tight">{item.topic}</h3>
                                       <p className="text-base text-white/50 leading-relaxed font-medium max-w-lg">{item.objective}</p>
                                    </div>
                                 </motion.div>
                               ))}
                            </div>
                            
                            <aside className="space-y-8 flex flex-col items-center lg:items-stretch">
                               <div className="p-12 rounded-[4rem] bg-[hsl(210,48%,14%)] border border-white/5 space-y-10 shadow-3xl sticky top-24">
                                  <h3 className="text-3xl font-serif font-bold tracking-tight">AI Strategy</h3>
                                  <div className="space-y-8">
                                     {[
                                       "Focus 70% of effort on Stage 2 content.",
                                       "Cross-reference Session 1 with previous PDF notes.",
                                       "Simulate the Quiz in a Distraction-Free environment."
                                     ].map((tip, i) => (
                                       <div key={i} className="flex gap-5">
                                          <div className="w-8 h-8 rounded-xl bg-coral-500/10 flex items-center justify-center text-coral-500 shrink-0 mt-1 shadow-inner ring-1 ring-coral-500/20">
                                             <ShieldCheck size={18} />
                                          </div>
                                          <p className="text-sm text-white/60 leading-[1.7] font-bold">{tip}</p>
                                       </div>
                                     ))}
                                  </div>
                                  <button className="w-full h-16 rounded-[2rem] bg-coral-500 text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-coral-500/40 hover:scale-[1.03] transition-all">
                                     Export Timeline
                                  </button>
                               </div>
                            </aside>
                         </div>
                      ) : (
                         <div className="text-center py-32 opacity-5 grayscale">
                            <Calendar size={120} className="mx-auto" />
                            <p className="font-serif mt-10 italic text-3xl">Strategic pathing is initializing...</p>
                         </div>
                      )}
                   </div>
                )}
             </motion.div>
           </AnimatePresence>
        </div>

        {/* ── PROFILE SLIDE-OVER PANEL ── */}
        <AnimatePresence>
          {isProfileOpen && (
             <>
               {/* Backdrop */}
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsProfileOpen(false)}
                 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
               />
               {/* Panel */}
               <motion.div 
                 initial={{ x: "100%" }}
                 animate={{ x: 0 }}
                 exit={{ x: "100%" }}
                 transition={{ type: "spring", damping: 30, stiffness: 200 }}
                 className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-[hsl(210,48%,12%)] border-l border-white/10 z-[110] shadow-[-20px_0_60px_rgba(0,0,0,0.6)] flex flex-col"
               >
                  {/* Panel Header */}
                  <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-coral-500/10 flex items-center justify-center text-coral-500 border border-coral-500/20">
                           <UserIcon size={24} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold">Account Profile</h3>
                     </div>
                     <button 
                        onClick={() => setIsProfileOpen(false)}
                        className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                     >
                        <X size={20} />
                     </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-white/10">
                     {/* User Identity */}
                     <div className="p-10 rounded-[3rem] bg-gradient-to-br from-coral-500 to-coral-600 shadow-2xl shadow-coral-500/30 mb-10 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                           <Sparkles size={80} />
                        </div>
                        <div className="flex items-center gap-6 relative z-10">
                           <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-[hsl(9,70%,54%)] text-3xl font-black shadow-2xl border-4 border-white/20">
                              {user?.user_metadata?.full_name?.charAt(0) || user?.user_metadata?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || "S"}
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-2xl font-serif font-bold text-white pr-4 leading-tight">
                                 {user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || "Active Student"}
                              </h4>
                              <p className="text-sm font-medium text-white/70">{user?.email}</p>
                           </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/20 flex items-center justify-between">
                           <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Last Active</span>
                              <span className="text-xs font-bold text-white flex items-center gap-2">
                                 <Clock size={12} /> {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                           </div>
                           <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                              Premium Member
                           </div>
                        </div>
                     </div>

                     {/* Recent Activity Mini-List */}
                     <div className="space-y-6">
                        <div className="flex items-center justify-between">
                           <h5 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/30">Library Overview</h5>
                           <button 
                             onClick={() => { setIsProfileOpen(false); setActiveStep('history'); }}
                             className="text-[10px] font-black uppercase tracking-widest text-coral-400 hover:text-coral-300 transition-colors"
                           >
                              View All
                           </button>
                        </div>

                        {history.length > 0 ? (
                           <div className="space-y-4">
                              {history.slice(0, 4).map((doc, i) => (
                                 <div 
                                    key={doc.id}
                                    className="group p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-coral-500/30 transition-all flex items-center justify-between shadow-sm"
                                 >
                                    <div className="flex items-center gap-4 min-w-0">
                                       <div className="w-10 h-10 rounded-xl bg-coral-500/10 flex items-center justify-center text-coral-500 shrink-0 group-hover:scale-110 transition-transform">
                                          <FileText size={18} />
                                       </div>
                                       <div className="min-w-0">
                                          <p className="text-sm font-bold truncate pr-4 text-white/90">{doc.name}</p>
                                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-0.5">{doc.date}</p>
                                       </div>
                                    </div>
                                    
                                    <div className="flex gap-2">
                                       <button 
                                          onClick={() => handleLoadFromHistory(doc)}
                                          title="Analyze & Quiz"
                                          className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-coral-400 hover:bg-coral-500/10 transition-all active:scale-90"
                                       >
                                          <Sparkles size={14} />
                                       </button>
                                       <button 
                                          title="View File"
                                          className="p-2.5 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                                       >
                                          <ExternalLink size={14} />
                                       </button>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="p-10 text-center border-2 border-dashed border-white/5 rounded-[2.5rem]">
                              <p className="text-sm text-white/20 font-bold">No items in history yet.</p>
                           </div>
                        )}
                     </div>

                     <div className="mt-12 space-y-3">
                        <button 
                           onClick={handleSignOut}
                           className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[hsl(9,70%,54%,0.1)] text-[hsl(9,70%,64%)] font-black text-[11px] uppercase tracking-[0.3em] border border-[hsl(9,70%,54%,0.2)] hover:bg-[hsl(9,70%,54%,0.2)] transition-all"
                        >
                           <LogOut size={16} /> Sign Out of Platform
                        </button>
                     </div>
                  </div>
               </motion.div>
             </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
