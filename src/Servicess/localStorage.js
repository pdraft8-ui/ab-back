import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

// Create base directories
const createDirectories = () => {
  const baseDir = path.join(process.cwd(), "uploads");
  const documentSettingsDir = path.join(baseDir, "document-settings");
  const headersDir = path.join(documentSettingsDir, "headers");
  const footersDir = path.join(documentSettingsDir, "footers");
  const signaturesDir = path.join(documentSettingsDir, "signatures");

  [baseDir, documentSettingsDir, headersDir, footersDir, signaturesDir].forEach(
    (dir) => {
      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir, { recursive: true });
        } catch (error) {
          // Log warning but don't crash the application
          console.warn(`Warning: Could not create directory ${dir}: ${error.message}`);
          console.warn(`This might be due to permission issues. The application will continue to run.`);
        }
      }
    }
  );
};

// Initialize directories
createDirectories();

class LocalStorageService {
  constructor() {
    // Force use of port 3002 for the main application
    this.baseUrl = "http://localhost:3002";
  }

  // Convert relative path to full URL
  getFullUrl(relativePath) {
    if (!relativePath) return null;

    // If it's already a full URL, return as is
    if (
      relativePath.startsWith("http://") ||
      relativePath.startsWith("https://")
    ) {
      return relativePath;
    }

    // Remove leading slash if present
    const cleanPath = relativePath.startsWith("/")
      ? relativePath.slice(1)
      : relativePath;
    return `${this.baseUrl}/${cleanPath}`;
  }

  // Convert array of relative paths to full URLs
  getFullUrls(relativePaths) {
    if (!Array.isArray(relativePaths)) return [];
    return relativePaths
      .map((path) => this.getFullUrl(path))
      .filter((url) => url !== null);
  }

  // Upload file to local storage
  async upload(file, folder = "general") {
    try {
      if (!file) {
        throw new Error("No file provided");
      }

      const fileName = `${Date.now()}_${nanoid()}_${file.originalname}`;
      const folderPath = path.join(process.cwd(), "uploads", folder);

      // Create folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        try {
          fs.mkdirSync(folderPath, { recursive: true });
        } catch (error) {
          console.warn(`Warning: Could not create folder ${folderPath}: ${error.message}`);
          // Continue with upload attempt - the folder might already exist or be writable
        }
      }

      const filePath = path.join(folderPath, fileName);

      // Move file to destination
      await fs.promises.copyFile(file.path, filePath);

      // Clean up temporary file
      await fs.promises.unlink(file.path);

      const url = `${this.baseUrl}/uploads/${folder}/${fileName}`;

      return {
        url,
        publicId: `${folder}/${fileName}`,
        secure_url: url,
        public_id: `${folder}/${fileName}`,
      };
    } catch (error) {
      console.error("Error uploading file to local storage:", error);
      throw error;
    }
  }

  // Delete file from local storage
  async destroy(publicId) {
    try {
      if (!publicId) {
        return;
      }

      const filePath = path.join(process.cwd(), "uploads", publicId);

      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
        console.log(`File deleted: ${publicId}`);
      } else {
        console.log(`File not found: ${publicId}`);
      }
    } catch (error) {
      console.error("Error deleting file from local storage:", error);
      // Don't throw error to avoid breaking the application
    }
  }

  // Upload image specifically
  async uploadImage(file, folder = "images") {
    return this.upload(file, folder);
  }

  // Upload document specifically
  async uploadDocument(file, folder = "documents") {
    return this.upload(file, folder);
  }
}

// Create singleton instance
const localStorageService = new LocalStorageService();

export default localStorageService;
