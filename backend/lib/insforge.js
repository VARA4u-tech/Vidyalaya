const { createClient } = require("@insforge/sdk");
require("dotenv").config();

/**
 * Initialize InsForge client
 */
const insforge = createClient({
  baseUrl: process.env.INSFORGE_URL || "http://localhost:7130",
  anonKey: process.env.INSFORGE_ANON_KEY || "",
  isServerMode: true // Recommended for Node.js backends
});

module.exports = { insforge };
