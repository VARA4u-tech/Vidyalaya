import { createClient } from "@insforge/sdk";
import dotenv from "dotenv";

dotenv.config();

/**
 * Initialize InsForge client
 */
export const insforge = createClient({
  baseUrl: process.env.INSFORGE_URL || "http://localhost:7130",
  anonKey: process.env.INSFORGE_ANON_KEY || "",
  isServerMode: true, // Recommended for Node.js backends
});
