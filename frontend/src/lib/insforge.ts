import { createClient } from "@insforge/sdk";

const insforgeUrl =
  import.meta.env.VITE_INSFORGE_URL || "http://localhost:7130";
const insforgeAnonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || "";

export interface User {
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Initialize InsForge client for the frontend
 */
export const insforge = createClient({
  baseUrl: insforgeUrl,
  anonKey: insforgeAnonKey,
  isServerMode: false, // Web mode for automatic session management
});
