#!/usr/bin/env node

import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("🧪 Running Insurance System Tests...\n");

try {
  // Run unit tests
  console.log("📋 Running Unit Tests...");
  execSync("npm test", {
    stdio: "inherit",
    cwd: join(__dirname, ".."),
  });

  // Run integration tests
  console.log("\n🔗 Running Integration Tests...");
  execSync("npm run test:integration", {
    stdio: "inherit",
    cwd: join(__dirname, ".."),
  });

  // Generate coverage report
  console.log("\n📊 Generating Coverage Report...");
  execSync("npm run test:coverage", {
    stdio: "inherit",
    cwd: join(__dirname, ".."),
  });

  console.log("\n✅ All tests completed successfully!");
} catch (error) {
  console.error("\n❌ Tests failed:", error.message);
  process.exit(1);
}
