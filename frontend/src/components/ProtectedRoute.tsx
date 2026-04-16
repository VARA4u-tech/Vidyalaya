import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { insforge } from "@/lib/insforge";
import { toast } from "sonner";

/**
 * Higher-order component/Wrapper to protect dashboard routes.
 * Checks for an active session with InsForge.
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Local check to reduce 401 noise when definitely not logged in
      const hasToken = Object.keys(localStorage).some(k => k.includes('auth-token'));
      if (!hasToken) {
        setIsChecking(false);
        navigate("/login");
        return;
      }

      try {
        const { data } = await insforge.auth.getCurrentUser();
        
        if (!data?.user) {
          throw new Error("User not authenticated");
        }
      } catch (error) {
        // Show the beautiful notification
        toast.error("Access Protected", {
          description: "Please sign in with Google to access your dashboard.",
          duration: 5000,
          style: {
            background: "hsl(210, 48%, 20%)",
            border: "1px solid hsla(9, 70%, 54%, 0.4)",
            color: "hsl(36, 28%, 95%)",
            borderRadius: "1.5rem",
            padding: "1rem",
          },
        });
        navigate("/login");
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);


  if (isChecking) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[hsl(210,48%,15%)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[hsla(9,70%,54%,0.2)] border-t-[hsl(9,70%,54%)] rounded-full animate-spin" />
          <p className="font-sans text-[hsl(36,15%,55%)] text-sm tracking-widest uppercase">
            Securing Session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
