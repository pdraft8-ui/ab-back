import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";
// Configure DOMPurify with a custom window
const window = new JSDOM("").window;
const purify = DOMPurify(window);
/**
 * Sanitizes input to prevent XSS and injection attacks
 * @param {any} input - The input to sanitize
 * @param {string} type - The type of sanitization ('html', 'text', 'sql', 'url')
 * @returns {any} - The sanitized input
 */
export const sanitizeInput = (input, type = "text") => {
    if (input === null || input === undefined) {
        return input;
    }
    if (typeof input === "string") {
        switch (type) {
            case "html":
                return purify.sanitize(input, {
                    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br"],
                    ALLOWED_ATTR: ["href", "target"],
                });
            case "text":
                return input
                    .replace(/[<>]/g, "") // Remove < and >
                    .replace(/javascript:/gi, "") // Remove javascript: protocol
                    .replace(/on\w+=/gi, "") // Remove event handlers
                    .trim();
            case "sql":
                return input
                    .replace(/['";\\]/g, "") // Remove SQL injection characters
                    .replace(/--/g, "") // Remove SQL comments
                    .replace(/\/\*/g, "") // Remove SQL block comments
                    .replace(/\*\//g, "")
                    .trim();
            case "url":
                try {
                    const url = new URL(input);
                    return url.toString();
                }
                catch {
                    return "";
                }
            default:
                return input.trim();
        }
    }
    if (typeof input === "object") {
        if (Array.isArray(input)) {
            return input.map((item) => sanitizeInput(item, type));
        }
        const sanitized = {};
        for (const [key, value] of Object.entries(input)) {
            sanitized[key] = sanitizeInput(value, type);
        }
        return sanitized;
    }
    return input;
};
/**
 * Sanitizes request body to prevent injection attacks
 * @param {object} body - The request body
 * @returns {object} - The sanitized request body
 */
export const sanitizeRequestBody = (body) => {
    if (!body || typeof body !== "object") {
        return body;
    }
    const sanitized = {};
    for (const [key, value] of Object.entries(body)) {
        // Skip sensitive fields that shouldn't be sanitized
        if (["password", "token", "secret", "key"].includes(key.toLowerCase())) {
            sanitized[key] = value;
            continue;
        }
        // Sanitize based on field type
        if (typeof value === "string") {
            if (key.toLowerCase().includes("email")) {
                sanitized[key] = sanitizeInput(value, "text");
            }
            else if (key.toLowerCase().includes("url") ||
                key.toLowerCase().includes("link")) {
                sanitized[key] = sanitizeInput(value, "url");
            }
            else if (key.toLowerCase().includes("html") ||
                key.toLowerCase().includes("content")) {
                sanitized[key] = sanitizeInput(value, "html");
            }
            else {
                sanitized[key] = sanitizeInput(value, "text");
            }
        }
        else if (typeof value === "object") {
            sanitized[key] = sanitizeRequestBody(value);
        }
        else {
            sanitized[key] = value;
        }
    }
    return sanitized;
};
/**
 * Sanitizes query parameters
 * @param {object} query - The query parameters
 * @returns {object} - The sanitized query parameters
 */
export const sanitizeQueryParams = (query) => {
    if (!query || typeof query !== "object") {
        return query;
    }
    const sanitized = {};
    for (const [key, value] of Object.entries(query)) {
        if (typeof value === "string") {
            sanitized[key] = sanitizeInput(value, "text");
        }
        else if (Array.isArray(value)) {
            sanitized[key] = value.map((item) => typeof item === "string" ? sanitizeInput(item, "text") : item);
        }
        else {
            sanitized[key] = value;
        }
    }
    return sanitized;
};
/**
 * Validates and sanitizes file uploads
 * @param {object} file - The uploaded file
 * @param {array} allowedTypes - Array of allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 * @returns {object} - The validated file or null if invalid
 */
export const validateAndSanitizeFile = (file, allowedTypes = [], maxSize = 10 * 1024 * 1024) => {
    if (!file) {
        return null;
    }
    // Check file size
    if (file.size > maxSize) {
        throw new Error(`File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`);
    }
    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
        throw new Error(`File type ${file.mimetype} is not allowed`);
    }
    // Sanitize filename
    const sanitizedFilename = file.originalname
        .replace(/[^a-zA-Z0-9.-]/g, "_")
        .replace(/_{2,}/g, "_");
    return {
        ...file,
        originalname: sanitizedFilename,
    };
};
/**
 * Sanitizes MongoDB ObjectId
 * @param {string} id - The ID to sanitize
 * @returns {string|null} - The sanitized ID or null if invalid
 */
export const sanitizeObjectId = (id) => {
    if (!id || typeof id !== "string") {
        return null;
    }
    // Check if it's a valid MongoDB ObjectId format
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    if (!objectIdPattern.test(id)) {
        return null;
    }
    return id;
};
/**
 * Sanitizes email addresses
 * @param {string} email - The email to sanitize
 * @returns {string|null} - The sanitized email or null if invalid
 */
export const sanitizeEmail = (email) => {
    if (!email || typeof email !== "string") {
        return null;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const sanitizedEmail = email.toLowerCase().trim();
    if (!emailPattern.test(sanitizedEmail)) {
        return null;
    }
    return sanitizedEmail;
};
/**
 * Sanitizes phone numbers
 * @param {string} phone - The phone number to sanitize
 * @returns {string|null} - The sanitized phone number or null if invalid
 */
export const sanitizePhone = (phone) => {
    if (!phone || typeof phone !== "string") {
        return null;
    }
    // Remove all non-digit characters except + and -
    const sanitized = phone.replace(/[^\d+\-()\s]/g, "");
    // Check if it has at least 7 digits
    const digitCount = (sanitized.match(/\d/g) || []).length;
    if (digitCount < 7) {
        return null;
    }
    return sanitized.trim();
};
//# sourceMappingURL=sanitizer.js.map