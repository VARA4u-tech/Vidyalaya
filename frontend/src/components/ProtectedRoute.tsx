import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { insforge } from "@/lib/insforge";
import { toast } from "sonner";

/**
 * Higher-order component/Wrapper to protect dashboard routes.
 * Checks for an active session with InsForge.
 * 
 * NOTE: The InsForge SDK uses httpOnly cookies for session refresh and
 * sessionStorage for PKCE verifiers. Do NOT use localStorage checks here —
 * getCurrentUser() already handles waiting for pending OAuth callbacks internally.
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // SDK automatically handles PKCE OAuth callback (insforge_code param)
        // and waits for it to complete before resolving. Trust it.
        const { data, error } = await insforge.auth.getCurrentUser();

        if (error || !data?.user) {
          console.warn("ProtectedRoute: No valid session found, redirecting to login.");
          toast.error("Session Expired", {
            description: "Please sign in again to access your dashboard.",
            duration: 4000,
            style: {
              background: "hsl(210, 48%, 20%)",
              border: "1px solid hsla(9, 70%, 54%, 0.4)",
              color: "hsl(36, 28%, 95%)",
              borderRadius: "1.5rem",
              padding: "1rem",
            },
          });
          navigate("/login");
          return;
        }

        // User is authenticated — allow access
        console.log("ProtectedRoute: Session valid for", data.user.email);
      } catch (err) {
        console.error("ProtectedRoute: Unexpected error during auth check:", err);
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
            Verifying Session...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
