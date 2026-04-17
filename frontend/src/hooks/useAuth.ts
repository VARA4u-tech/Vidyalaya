import { useQuery } from "@tanstack/react-query";
import { insforge, User } from "@/lib/insforge";

export function useAuth() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async (): Promise<User | null> => {
      console.log("useAuth: Checking session...");
      try {
        const { data, error } = await insforge.auth.getCurrentUser();

        // If not authenticated, try a forced session refresh
        if (error || !data?.user) {
          console.log(
            "useAuth: Initial check failed, attempting session refresh...",
          );
          const refreshRes = await insforge.auth.refreshSession();
          if (!refreshRes.error && refreshRes.data?.user) {
            console.log("useAuth: Session refreshed successfully.");
            return refreshRes.data.user;
          }
          if (error) console.error("useAuth: Session error:", error.message);
          return null;
        }

        if (data?.user) {
          console.log("useAuth: Session found for", data.user.email);
          return data.user;
        }

        return null;
      } catch (err) {
        console.error("useAuth: Unexpected error:", err);
        return null;
      }
    },
    // We only fetch once per unauthenticated session unless they refocus
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: true,
  });
}
