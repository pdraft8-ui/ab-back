import {
  sanitizeRequestBody,
  sanitizeQueryParams,
  sanitizeInput,
} from "../utils/sanitizer.js";

/**
 * Middleware to sanitize request body
 */
export const sanitizeBody = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeRequestBody(req.body);
  }
  next();
};

/**
 * Middleware to sanitize query parameters
 */
export const sanitizeQuery = (req, res, next) => {
  if (req.query) {
    req.query = sanitizeQueryParams(req.query);
  }
  next();
};

/**
 * Middleware to sanitize URL parameters
 */
export const sanitizeParams = (req, res, next) => {
  if (req.params) {
    const sanitizedParams = {};
    for (const [key, value] of Object.entries(req.params)) {
      if (typeof value === "string") {
        sanitizedParams[key] = sanitizeInput(value, "text");
      } else {
        sanitizedParams[key] = value;
      }
    }
    req.params = sanitizedParams;
  }
  next();
};

/**
 * Comprehensive sanitization middleware for all request data
 */
export const sanitizeRequest = (req, res, next) => {
  // Sanitize body
  if (req.body) {
    req.body = sanitizeRequestBody(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeQueryParams(req.query);
  }

  // Sanitize URL parameters
  if (req.params) {
    const sanitizedParams = {};
    for (const [key, value] of Object.entries(req.params)) {
      if (typeof value === "string") {
        sanitizedParams[key] = sanitizeInput(value, "text");
      } else {
        sanitizedParams[key] = value;
      }
    }
    req.params = sanitizedParams;
  }

  // Sanitize headers (excluding sensitive ones)
  if (req.headers) {
    const sanitizedHeaders = {};
    const sensitiveHeaders = ["authorization", "cookie", "x-api-key", "token"];

    for (const [key, value] of Object.entries(req.headers)) {
      if (sensitiveHeaders.includes(key.toLowerCase())) {
        sanitizedHeaders[key] = value;
      } else if (typeof value === "string") {
        sanitizedHeaders[key] = sanitizeInput(value, "text");
      } else {
        sanitizedHeaders[key] = value;
      }
    }
    req.headers = sanitizedHeaders;
  }

  next();
};

/**
 * Middleware to sanitize specific fields
 */
export const sanitizeFields = (fields = []) => {
  return (req, res, next) => {
    if (req.body && fields.length > 0) {
      for (const field of fields) {
        if (req.body[field] && typeof req.body[field] === "string") {
          req.body[field] = sanitizeInput(req.body[field], "text");
        }
      }
    }
    next();
  };
};

/**
 * Middleware to sanitize file uploads
 */
export const sanitizeFiles = (req, res, next) => {
  if (req.files) {
    if (Array.isArray(req.files)) {
      req.files = req.files.map((file) => {
        if (file && file.originalname) {
          file.originalname = file.originalname
            .replace(/[^a-zA-Z0-9.-]/g, "_")
            .replace(/_{2,}/g, "_");
        }
        return file;
      });
    } else if (req.files.constructor === Object) {
      for (const [key, file] of Object.entries(req.files)) {
        if (file && file.originalname) {
          file.originalname = file.originalname
            .replace(/[^a-zA-Z0-9.-]/g, "_")
            .replace(/_{2,}/g, "_");
        }
      }
    }
  }
  next();
};
