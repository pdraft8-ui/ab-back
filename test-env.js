import dotenv from "dotenv";

console.log("Loading environment variables...");
dotenv.config();

console.log("Environment variables:");
console.log("DBURL:", process.env.DBURL);
console.log("PORT:", process.env.PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

console.log("Current directory:", process.cwd());
console.log("Files in current directory:");
import { readdirSync } from "fs";
try {
  const files = readdirSync(".");
  console.log(files);
} catch (error) {
  console.error("Error reading directory:", error);
}
