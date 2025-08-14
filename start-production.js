#!/usr/bin/env node

/**
 * Production Startup Script
 * This script sets up the production environment and starts the application
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set production environment
process.env.NODE_ENV = "production";

// Set production defaults
process.env.LOG_LEVEL = process.env.LOG_LEVEL || "warn";
process.env.ENABLE_MONITORING = process.env.ENABLE_MONITORING || "true";
process.env.ENABLE_CACHE = process.env.ENABLE_CACHE || "true";
process.env.ENABLE_RATE_LIMITING = "false"; // DISABLED

console.log("🚀 Starting Insurance Backend in Production Mode");
console.log("Environment:", process.env.NODE_ENV);
console.log("Log Level:", process.env.LOG_LEVEL);

// Check if dist folder exists
import { existsSync } from "fs";
const distPath = join(__dirname, "dist");

if (!existsSync(distPath)) {
  console.log("📦 Building project for production...");

  // Build the project first
  const buildProcess = spawn("npm", ["run", "build"], {
    stdio: "inherit",
    shell: true,
  });

  buildProcess.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Build completed successfully");
      startProduction();
    } else {
      console.error("❌ Build failed with code:", code);
      process.exit(1);
    }
  });
} else {
  startProduction();
}

function startProduction() {
  console.log("🚀 Starting production server...");

  // Start the production server
  const serverProcess = spawn("node", ["dist/index.js"], {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  });

  serverProcess.on("close", (code) => {
    console.log(`Server process exited with code: ${code}`);
    process.exit(code);
  });

  serverProcess.on("error", (error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

  // Handle graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully...");
    serverProcess.kill("SIGTERM");
  });

  process.on("SIGINT", () => {
    console.log("SIGINT received, shutting down gracefully...");
    serverProcess.kill("SIGINT");
  });
}
