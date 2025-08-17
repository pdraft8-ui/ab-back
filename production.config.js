// Production Configuration
export default {
  NODE_ENV: "production",
  PORT: process.env.PORT || 3002,

  // Database Configuration
  DBURL:
    process.env.DBURL || "mongodb://localhost:27017/AB_insurance_production",

  // JWT Configuration
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "your_secure_jwt_secret_key_here_change_in_production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  TokenSignIn:
    process.env.TokenSignIn ||
    "your_secure_token_signing_key_here_change_in_production",

  // CORS Configuration
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(",") || [
    "https://yourdomain.com",
  ],
  PRODUCTION_ORIGINS: process.env.PRODUCTION_ORIGINS?.split(",") || [
    "https://yourdomain.com",
  ],

  // Security Configuration
  LOG_LEVEL: process.env.LOG_LEVEL || "warn",
  // RATE_LIMIT_MULTIPLIER: parseInt(process.env.RATE_LIMIT_MULTIPLIER) || 2, // DISABLED

  // Redis Configuration
  REDIS_ENABLED: process.env.REDIS_ENABLED !== "false",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",

  // Email Configuration
  GMAIL_USER: process.env.GMAIL_USER || "your_email@gmail.com",
  GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD || "your_app_password",
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Insurance Management System",

  // SMS Configuration
  SMS_API_URL: process.env.SMS_API_URL || "https://www.019sms.co.il:8090/api",
  SMS_USERNAME: process.env.SMS_USERNAME || "ab.stop",
  SMS_PASSWORD: process.env.SMS_PASSWORD || "3ssX1Ud0:6",
  SMS_SOURCE: process.env.SMS_SOURCE || "0546060886",

  // Tranzila Payment Configuration
  TRANZILA_API_URL:
    process.env.TRANZILA_API_URL || "https://secure5.tranzila.com",
  TRANZILA_SUPPLIER_ID: process.env.TRANZILA_SUPPLIER_ID || "your_supplier_id",
  TRANZILA_TERMINAL_ID: process.env.TRANZILA_TERMINAL_ID || "your_terminal_id",
  TRANZILA_PASSWORD: process.env.TRANZILA_PASSWORD || "your_password",

  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL || "https://yourdomain.com",

  // Monitoring and Performance
  ENABLE_MONITORING: process.env.ENABLE_MONITORING !== "false",
  ENABLE_CACHE: process.env.ENABLE_CACHE !== "false",
  ENABLE_RATE_LIMITING: false, // DISABLED

  // Security Headers
  SECURITY_HEADERS: {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginOpenerPolicy: false,
  },

  // Rate Limiting - DISABLED
  // RATE_LIMITS: {
  //   windowMs: 15 * 60 * 1000, // 15 minutes
  //   max: 100, // limit each IP to 100 requests per windowMs
  //   message: "Too many requests from this IP, please try again later.",
  //   standardHeaders: true,
  //   legacyHeaders: false,
  // },
};
