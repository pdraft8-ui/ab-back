import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs";
import path from "path";
import { validateAndSanitizeFile } from "../utils/sanitizer.js";

// Ensure the upload directory exists
const insuranceFilesDir = path.join(
  process.cwd(),
  "uploads/Customer/InsuranceFiles/"
);
if (!fs.existsSync(insuranceFilesDir)) {
  try {
    fs.mkdirSync(insuranceFilesDir, { recursive: true });
  } catch (error) {
    console.warn(`Warning: Could not create directory ${insuranceFilesDir}: ${error.message}`);
    console.warn(`This might be due to permission issues. The application will continue to run.`);
  }
}

// Define allowed file types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];

const ALLOWED_DOCUMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const ALLOWED_ALL_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES];

// File size limits
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_DOCUMENT_SIZE = 15 * 1024 * 1024; // 15MB

export function myMulter(
  customValidation = null,
  destination = "uploads/general",
  maxFileSize = MAX_FILE_SIZE,
  allowedTypes = ALLOWED_ALL_TYPES
) {
  // Ensure the destination directory exists
  const destPath = path.join(process.cwd(), destination);
  if (!fs.existsSync(destPath)) {
    try {
      fs.mkdirSync(destPath, { recursive: true });
    } catch (error) {
      console.warn(`Warning: Could not create directory ${destPath}: ${error.message}`);
      console.warn(`This might be due to permission issues. The application will continue to run.`);
    }
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destPath);
    },
    filename: function (req, file, cb) {
      // Generate secure filename
      const timestamp = Date.now();
      const uniqueId = nanoid(16);
      const sanitizedOriginalName = file.originalname
        .replace(/[^a-zA-Z0-9.-]/g, "_")
        .replace(/_{2,}/g, "_");
      const extension = path.extname(sanitizedOriginalName);
      const filename = `${timestamp}_${uniqueId}_${sanitizedOriginalName}`;
      cb(null, filename);
    },
  });

  function fileFilter(req, file, cb) {
    // Check file size
    if (file.size > maxFileSize) {
      return cb(
        new Error(
          `File size exceeds maximum allowed size of ${
            maxFileSize / (1024 * 1024)
          }MB`
        ),
        false
      );
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
      return cb(new Error(`File type ${file.mimetype} is not allowed`), false);
    }

    // Additional security checks
    if (file.originalname) {
      const extension = path.extname(file.originalname).toLowerCase();
      const dangerousExtensions = [
        ".exe",
        ".bat",
        ".cmd",
        ".com",
        ".pif",
        ".scr",
        ".vbs",
        ".js",
      ];

      if (dangerousExtensions.includes(extension)) {
        return cb(new Error("Dangerous file type detected"), false);
      }
    }

    // If no custom validation is provided, accept all files that pass basic checks
    if (!customValidation || customValidation.length === 0) {
      return cb(null, true);
    } else if (customValidation.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error("File type not supported"), false);
    }
  }

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: maxFileSize,
      files: 10, // Maximum 10 files per request
      fieldSize: 1024 * 1024, // 1MB for field data
    },
  });

  return upload;
}

// Specialized upload functions for different file types
export function myMulterImages(destination = "uploads/images") {
  return myMulter(
    ALLOWED_IMAGE_TYPES,
    destination,
    MAX_IMAGE_SIZE,
    ALLOWED_IMAGE_TYPES
  );
}

export function myMulterDocuments(destination = "uploads/documents") {
  return myMulter(
    ALLOWED_DOCUMENT_TYPES,
    destination,
    MAX_DOCUMENT_SIZE,
    ALLOWED_DOCUMENT_TYPES
  );
}

export function myMulterAllFiles(destination = "uploads/general") {
  return myMulter(
    ALLOWED_ALL_TYPES,
    destination,
    MAX_FILE_SIZE,
    ALLOWED_ALL_TYPES
  );
}

export function myMulterInsuranceFiles(
  destination = "uploads/Customer/InsuranceFiles"
) {
  return myMulter(
    ALLOWED_DOCUMENT_TYPES,
    destination,
    MAX_DOCUMENT_SIZE,
    ALLOWED_DOCUMENT_TYPES
  );
}

// Handle Multer Errors (HME)
export const HME = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File too large",
        error: err.message,
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files",
        error: err.message,
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected file field",
        error: err.message,
      });
    }
  }

  if (err) {
    return res.status(400).json({
      success: false,
      message: "File upload error",
      error: err.message,
    });
  }

  next();
};

// Enhanced file validation middleware
export const validateUploadedFiles = (req, res, next) => {
  if (!req.files && !req.file) {
    return next();
  }

  try {
    const files = req.files || [req.file];

    for (const file of files) {
      if (!file) continue;

      // Validate file using our sanitizer
      const validatedFile = validateAndSanitizeFile(
        file,
        ALLOWED_ALL_TYPES,
        MAX_FILE_SIZE
      );

      if (!validatedFile) {
        return res.status(400).json({
          success: false,
          message: "Invalid file uploaded",
        });
      }

      // Additional security checks
      const extension = path.extname(file.originalname).toLowerCase();
      const dangerousExtensions = [
        ".exe",
        ".bat",
        ".cmd",
        ".com",
        ".pif",
        ".scr",
        ".vbs",
        ".js",
      ];

      if (dangerousExtensions.includes(extension)) {
        return res.status(400).json({
          success: false,
          message: "Dangerous file type detected",
        });
      }

      // Check for null bytes in filename (potential path traversal)
      if (file.originalname.includes("\0")) {
        return res.status(400).json({
          success: false,
          message: "Invalid filename",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "File validation failed",
    });
  }
};

// File validation configuration
export const fileValidation = {
  imag: {
    fileFilter: (req, file, cb) => {
      if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed"), false);
      }
    },
    limits: {
      fileSize: MAX_IMAGE_SIZE,
    },
  },
  pdf: {
    fileFilter: (req, file, cb) => {
      if (ALLOWED_DOCUMENT_TYPES.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only document files are allowed"), false);
      }
    },
    limits: {
      fileSize: MAX_DOCUMENT_SIZE,
    },
  },
};

// Cleanup function for failed uploads
export const cleanupFailedUploads = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    // If response indicates failure, cleanup uploaded files
    if (res.statusCode >= 400 && (req.files || req.file)) {
      const files = req.files || [req.file];

      files.forEach((file) => {
        if (file && file.path && fs.existsSync(file.path)) {
          try {
            fs.unlinkSync(file.path);
          } catch (error) {
            console.error("Failed to cleanup file:", error);
          }
        }
      });
    }

    return originalSend.call(this, data);
  };

  next();
};
