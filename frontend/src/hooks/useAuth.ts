import { useQuery } from "@tanstack/react-query";
import { insforge, User } from "@/lib/insforge";

export function useAuth() {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async (): Promise<User | null> => {
      try {
        const { data, error } = await insforge.auth.getCurrentUser();
        if (!error && data?.user) {
          return data.user;
        }
        return null;
      } catch {
        return null;
      }
    },
    // We only fetch once per unauthenticated session unless they refocus
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: true,
  });
}
