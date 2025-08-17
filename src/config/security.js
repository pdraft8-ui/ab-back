/**
 * Security Configuration
 * Centralized security settings for the application
 */

export const SECURITY_CONFIG = {
  // JWT Configuration
  JWT: {
    SECRET: process.env.TokenSignIn || "your-secret-key",
    EXPIRES_IN: "24h",
    REFRESH_EXPIRES_IN: "7d",
    ALGORITHM: "HS256",
    ISSUER: "insurance-api",
    AUDIENCE: "insurance-client",
  },

  // Rate Limiting Configuration - DISABLED
  // RATE_LIMIT: {
  //   GENERAL: {
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //     message: "Too many requests from this IP, please try again later.",
  //     retryAfter: "15 minutes",
  //   },
  //   AUTH: {
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 5, // limit each IP to 5 requests per windowMs
  //     message: "Too many authentication attempts, please try again later.",
  //     retryAfter: "15 minutes",
  //     },
  //   UPLOAD: {
  //     windowMs: 60 * 60 * 1000, // 1 hour
  //     max: 10, // limit each IP to 10 upload requests per hour
  //     message: "Too many file uploads, please try again later.",
  //     retryAfter: "1 hour",
  //   },
  // },

  // CORS Configuration
  CORS: {
    ORIGIN: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3002",
    ],
    CREDENTIALS: true,
    METHODS: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    ALLOWED_HEADERS: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "token",
      "Accept",
      "Origin",
    ],
    EXPOSED_HEADERS: ["Content-Range", "X-Content-Range"],
    MAX_AGE: 86400, // 24 hours
  },

  // File Upload Security
  FILE_UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_DOCUMENT_SIZE: 15 * 1024 * 1024, // 15MB
    MAX_FILES_PER_REQUEST: 10,
    ALLOWED_IMAGE_TYPES: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ],
    ALLOWED_DOCUMENT_TYPES: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    DANGEROUS_EXTENSIONS: [
      ".exe",
      ".bat",
      ".cmd",
      ".com",
      ".pif",
      ".scr",
      ".vbs",
      ".js",
      ".php",
      ".asp",
      ".aspx",
      ".jsp",
      ".jspx",
      ".pl",
      ".py",
      ".rb",
    ],
  },

  // Input Sanitization
  SANITIZATION: {
    MAX_STRING_LENGTH: 10000,
    ALLOWED_HTML_TAGS: ["b", "i", "em", "strong", "a", "p", "br"],
    ALLOWED_HTML_ATTR: ["href", "target"],
    BLOCKED_PATTERNS: [
      /javascript:/gi,
      /on\w+=/gi,
      /<script/gi,
      /<\/script>/gi,
      /<iframe/gi,
      /<\/iframe>/gi,
    ],
  },

  // Password Security
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: true,
    MAX_AGE_DAYS: 90, // Password expires after 90 days
    HISTORY_COUNT: 5, // Remember last 5 passwords
  },

  // Session Security
  SESSION: {
    MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours
    HTTP_ONLY: true,
    SECURE: process.env.NODE_ENV === "production",
    SAME_SITE: "strict",
  },

  // Database Security
  DATABASE: {
    CONNECTION_TIMEOUT: 5000,
    SOCKET_TIMEOUT: 45000,
    MAX_POOL_SIZE: 10,
    MIN_POOL_SIZE: 2,
    MAX_IDLE_TIME: 30000,
  },

  // Logging Security
  LOGGING: {
    SENSITIVE_FIELDS: ["password", "token", "secret", "key", "authorization"],
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    LOG_ROTATION: {
      MAX_SIZE: "20m",
      MAX_FILES: "14d",
    },
  },

  // API Security
  API: {
    VERSION: "v1",
    PREFIX: "/api",
    TIMEOUT: 60000, // 60 seconds
    MAX_REQUEST_SIZE: "10mb",
    COMPRESSION: true,
  },

  // Environment-specific settings
  ENVIRONMENT: {
    PRODUCTION: {
      CORS_ORIGIN: process.env.PRODUCTION_ORIGINS?.split(",") || [],
      // RATE_LIMIT_MULTIPLIER: 2, // DISABLED
      LOG_LEVEL: "warn",
      SECURE_COOKIES: true,
    },
    DEVELOPMENT: {
      CORS_ORIGIN: [
        "http://localhost:3002", 
        "https://localhost:3002",
        "http://localhost:3001", 
        "https://localhost:3001",
        "http://localhost:5173",
        "https://localhost:5173",
        "http://127.0.0.1:5173",
        "https://127.0.0.1:5173",
        "http://host.docker.internal:5173",
        "https://host.docker.internal:5173",
        "http://host.docker.internal:3002",
        "https://host.docker.internal:3002"
      ],
      // RATE_LIMIT_MULTIPLIER: 1, // DISABLED
      LOG_LEVEL: "debug",
      SECURE_COOKIES: false,
    },
  },
};

/**
 * Get security configuration for current environment
 */
export const getSecurityConfig = () => {
  const env = process.env.NODE_ENV || "development";
  const baseConfig = { ...SECURITY_CONFIG };

  if (env === "production") {
    baseConfig.CORS.ORIGIN = SECURITY_CONFIG.ENVIRONMENT.PRODUCTION.CORS_ORIGIN;
    // Rate limiting disabled
    // baseConfig.RATE_LIMIT.GENERAL.max *=
    //   SECURITY_CONFIG.ENVIRONMENT.PRODUCTION.RATE_LIMIT_MULTIPLIER;
    // baseConfig.RATE_LIMIT.AUTH.max *=
    //   SECURITY_CONFIG.ENVIRONMENT.PRODUCTION.RATE_LIMIT_MULTIPLIER;
    baseConfig.LOGGING.LOG_LEVEL =
      SECURITY_CONFIG.ENVIRONMENT.PRODUCTION.LOG_LEVEL;
    baseConfig.SESSION.SECURE =
      SECURITY_CONFIG.ENVIRONMENT.PRODUCTION.SECURE_COOKIES;
  } else {
    baseConfig.CORS.ORIGIN =
      SECURITY_CONFIG.ENVIRONMENT.DEVELOPMENT.CORS_ORIGIN;
    baseConfig.LOGGING.LOG_LEVEL =
      SECURITY_CONFIG.ENVIRONMENT.DEVELOPMENT.LOG_LEVEL;
    baseConfig.SESSION.SECURE =
      SECURITY_CONFIG.ENVIRONMENT.DEVELOPMENT.SECURE_COOKIES;
  }

  return baseConfig;
};

/**
 * Validate security configuration
 */
export const validateSecurityConfig = () => {
  const config = getSecurityConfig();
  const errors = [];

  // Validate JWT secret
  if (!config.JWT.SECRET || config.JWT.SECRET === "your-secret-key") {
    errors.push("JWT_SECRET must be set in environment variables");
  }

  // Validate CORS origins
  if (config.CORS.ORIGIN.length === 0) {
    errors.push("At least one CORS origin must be configured");
  }

  // Validate file upload limits
  if (config.FILE_UPLOAD.MAX_FILE_SIZE > 50 * 1024 * 1024) {
    errors.push("Maximum file size cannot exceed 50MB");
  }

  if (errors.length > 0) {
    throw new Error(`Security configuration errors: ${errors.join(", ")}`);
  }

  return true;
};
