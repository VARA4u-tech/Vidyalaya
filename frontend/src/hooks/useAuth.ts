import { useQuery } from "@tanstack/react-query";
import { insforge, User } from "@/lib/insforge";

export function useAuth() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async (): Promise<User | null> => {
      console.log("useAuth: Checking session...");
      try {
        const { data, error } = await insforge.auth.getCurrentUser();
        if (error) {
          console.error("useAuth: Session error:", error.message);
          return null;
        }
        if (data?.user) {
          console.log("useAuth: Session found for", data.user.email);
          return data.user;
        }
        console.warn("useAuth: No session in data.");
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
