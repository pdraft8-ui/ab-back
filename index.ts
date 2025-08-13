/**
 * Insurance Backend Application
 * TypeScript version with enhanced monitoring and performance tracking
 */

import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import ConnectDb from "./DB/connection.js";
import * as indexRouter from "./src/modules/index.route.js";
import errorHandler from "./src/midlleWare/errorHandler.js";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import rateLimit from "express-rate-limit";
import { createRequire } from "module";

// Import monitoring
import {
  performanceMonitoringMiddleware,
  databaseMonitoringMiddleware,
  getMetrics,
  getHealthCheck,
} from "./src/monitoring/performanceMonitor.js";

// Import clean architecture routes
import PaymentRoutesV2 from "./src/presentation/routes/PaymentRoutes.js";
import TranzilaPaymentRoutesV2 from "./src/presentation/routes/TranzilaPaymentRoutes.js";
import InvoiceRoutesV2 from "./src/presentation/routes/InvoiceRoutes.js";
import CustomerRoutesV2 from "./src/presentation/routes/CustomerRoutes.js";

// Import modular clean architecture routes (v3)
import { getPaymentRoutes } from "./src/modules/Payment/index.js";
import { getInvoiceRoutes } from "./src/modules/Invoice/index.js";
import { getCustomerRoutes } from "./src/modules/Customer/index.js";
import { getTranzilaPaymentRoutes } from "./src/modules/TranzilaPayment/index.js";
import { getAuditRoutes } from "./src/modules/Audit/index.js";
import { getNotificationRoutes } from "./src/modules/Notification/index.js";
import { getUserRoutes } from "./src/modules/User/index.js";
import { getDepartmentRoutes } from "./src/modules/Department/index.js";
import { getVehicleRoutes } from "./src/modules/Vehicle/index.js";
import { getDocumentSettingsRoutes } from "./src/modules/DocumentSettings/index.js";
import { getInsuranceCompanyRoutes } from "./src/modules/InsuranceCompany/index.js";
import { getRoadServiceRoutes } from "./src/modules/RoadService/index.js";
import { getCallRoutes } from "./src/modules/Call/index.js";
import { getTakafulAccidentReportRoutes } from "./src/modules/TakafulAccidentReport/index.js";
import { getTrustAccidentReportRoutes } from "./src/modules/TrustAccidentReport/index.js";
import { getAlAhliaAccidentRoutes } from "./src/modules/AlAhliaAccident/index.js";
import { getPalestineAccidentReportRoutes } from "./src/modules/PalestineAccidentReport/index.js";
import { getAlMashreqAccidentReportRoutes } from "./src/modules/Al-MashreqAccidentReport/index.js";
import { getHolyLandsReportRoutes } from "./src/modules/HolyLandsReport/index.js";
import { getAgentRoutes } from "./src/modules/Agents/index.js";
import { getChequeRoutes } from "./src/modules/Cheque/index.js";
import statisticsRouter from "./src/modules/Statistics/Statistics.route.js";
import reportsRouter from "./src/modules/Reports/Reports.route.js";

// Import sanitization middleware
import { sanitizeRequest } from "./src/midlleWare/sanitization.js";

// Import cache middleware
import { cacheStats, clearCache } from "./src/midlleWare/cache.js";

// Import types
import { Environment } from "./src/types/index.js";

// Handle ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read swagger document
let swaggerDocument;
try {
  swaggerDocument = JSON.parse(
    readFileSync(join(__dirname, "swagger.json"), "utf8")
  );
} catch (error) {
  console.warn(
    "Warning: swagger.json not found, API documentation will not be available"
  );
  swaggerDocument = {};
}

dotenv.config();

// Set default environment variables if not loaded from .env
if (!process.env.DBURL) {
  process.env.DBURL = "mongodb://localhost:27017/AB_insurance";
}
if (!process.env.PORT) {
  process.env.PORT = "3002";
}
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "your_jwt_secret_key_here";
}
if (!process.env.JWT_EXPIRES_IN) {
  process.env.JWT_EXPIRES_IN = "7d";
}
if (!process.env.TokenSignIn) {
  process.env.TokenSignIn = "your_jwt_secret_key_here";
}

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log(" online user", socket.id);

  socket.on("registerUser", (userId: string) => {
    onlineUsers.set(userId, socket.id);
    console.log(
      `User ${userId} has been registered with Socket ID: ${socket.id}`
    );
  });

  socket.on("disconnect", () => {
    console.log(" user offline", socket.id);
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(
          `User ${userId} has been removed from the list of connected users`
        );
        break;
      }
    }
  });
});

export { io, onlineUsers };

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Simple CORS middleware for development - runs before other middleware
if (process.env.NODE_ENV !== "production") {
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    next();
  });
}

// Enhanced CORS configuration with security
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:3000"]
      : "*", // Allow all origins in development
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "token",
    "Accept",
    "Origin",
    "X-API-Version",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
};
app.use(cors(corsOptions));

// Enhanced security headers
app.use(
  helmet({
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
  })
);

// Rate limiting configuration
const generalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour (changed from 15 minutes)
  max: 1000, // limit each IP to 1000 requests per hour (changed from 100 per 15 minutes)
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "1 hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many requests from this IP, please try again later.",
      retryAfter: "1 hour",
    });
  },
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour (changed from 15 minutes)
  max: 50, // limit each IP to 50 authentication attempts per hour (changed from 5 per 15 minutes)
  message: {
    error: "Too many authentication attempts, please try again later.",
    retryAfter: "1 hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many authentication attempts, please try again later.",
      retryAfter: "1 hour",
    });
  },
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 upload requests per hour
  message: {
    error: "Too many file uploads, please try again later.",
    retryAfter: "1 hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: "Too many file uploads, please try again later.",
      retryAfter: "1 hour",
    });
  },
});

// Apply rate limiting
app.use("/api/", generalLimiter);
app.use("/api/v1/user/signin", authLimiter);
app.use("/api/v1/user/signup", authLimiter);
app.use("/api/v1/user/forgetPassword", authLimiter);
app.use("/api/v1/user/verifyCode", authLimiter);
app.use("/api/v1/user/resetPassword", authLimiter);
app.use("/api/v1/customer/addInsurance", uploadLimiter);
app.use("/api/v1/cheques/upload", uploadLimiter);

// Apply sanitization middleware to all API routes
app.use("/api/", sanitizeRequest);

// Apply performance monitoring middleware
app.use(performanceMonitoringMiddleware);
app.use(databaseMonitoringMiddleware);

// Swagger UI setup
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Insurance Company API Documentation",
  })
);

// Add timeout middleware to prevent hanging requests
app.use((req: Request, res: Response, next: NextFunction) => {
  // Set a 60-second timeout for all requests
  const timeout = setTimeout(() => {
    if (!res.headersSent) {
      res.status(408).json({
        message: "Request timeout - the operation took too long to complete",
        error: "TIMEOUT",
      });
    }
  }, 60000);

  // Clear timeout when response is sent
  res.on("finish", () => {
    clearTimeout(timeout);
  });

  next();
});

// Serve static files from uploads directory with CORS headers for images
app.use(
  "/uploads",
  (req: Request, res: Response, next: NextFunction) => {
    // Add CORS headers specifically for image requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static("uploads")
);

ConnectDb();

// Legacy routes (v1)
app.use("/api/v1/user", indexRouter.userRouter);
app.use("/api/v1/department", indexRouter.departmentRouter);
app.use("/api/v1/customer", indexRouter.customerRouter);
app.use("/api/v1/company", indexRouter.insuranceCompanyRouter);
app.use("/api/v1/road", indexRouter.RoadServiceRouter);
app.use("/api/v1/notification", indexRouter.NotificationRouter);
app.use(
  "/api/v1/TakafulAccidentReport",
  indexRouter.TakafulAccidentReportRouter
);
app.use("/api/v1/cheques", indexRouter.chequeRouter);
app.use("/api/v1/agents", indexRouter.AgentRouter);
app.use("/api/v1/call", indexRouter.callRouter);
app.use("/api/v1/trust-accident-report", indexRouter.TrustAccidentReportRouter);
app.use("/api/v1/al-ahlia-accident", indexRouter.AlAhliaAccidentRouter);
app.use(
  "/api/v1/palestine-accident-report",
  indexRouter.PalestineAccidentReportRouter
);
app.use(
  "/api/v1/al-mashreq-accident-report",
  indexRouter.Al_MashreqAccidentReportRouter
);
app.use("/api/v1/holy-lands-report", indexRouter.HolyLandsReportRouter);
app.use("/api/v1/audit", indexRouter.auditsRouter);
app.use("/api/v1/invoice", indexRouter.InvoiceRouter);
app.use("/api/v1/payment", indexRouter.PaymentRouter);
app.use("/api/v1/vehicle", indexRouter.vehicleRouter);
app.use("/api/v1/document-settings", indexRouter.documentSettingsRouter);
app.use("/api/v1/tranzila-payment", indexRouter.tranzilaPaymentRouter);

// Statistics routes
app.use("/api/v1/statistics", statisticsRouter);

// Reports routes
app.use("/api/v1/reports", reportsRouter);

// Clean Architecture Routes (v2)
app.use("/api/v1/payment-v2", PaymentRoutesV2);
app.use("/api/v1/tranzila-payment-v2", TranzilaPaymentRoutesV2);
app.use("/api/v1/invoice-v2", InvoiceRoutesV2);
app.use("/api/v1/customer-v2", CustomerRoutesV2);

// v1 routes using clean architecture logic (no v3 endpoints)
app.use("/api/v1/payment", getPaymentRoutes().getRouter());
app.use("/api/v1/invoice", getInvoiceRoutes().getRouter());
app.use("/api/v1/customer", getCustomerRoutes().getRouter());
app.use("/api/v1/tranzila-payment", getTranzilaPaymentRoutes().getRouter());
app.use("/api/v1/audit", getAuditRoutes().getRouter());
app.use("/api/v1/notification", getNotificationRoutes().getRouter());

// Initialize async routes for remaining modules
(async () => {
  try {
    console.log("🔄 Initializing async routes...");

    console.log("📝 Registering user routes...");
    app.use("/api/v1/user", (await getUserRoutes()).getRouter());

    console.log("📝 Registering department routes...");
    app.use("/api/v1/department", (await getDepartmentRoutes()).getRouter());

    console.log("📝 Registering vehicle routes...");
    app.use("/api/v1/vehicle", (await getVehicleRoutes()).getRouter());

    console.log("📝 Registering document settings routes...");
    app.use(
      "/api/v1/document-settings",
      (await getDocumentSettingsRoutes()).getRouter()
    );

    console.log("📝 Registering insurance company routes...");
    app.use(
      "/api/v1/insurance-company",
      (await getInsuranceCompanyRoutes()).getRouter()
    );

    console.log("📝 Registering road service routes...");
    app.use("/api/v1/road-service", (await getRoadServiceRoutes()).getRouter());

    console.log("📝 Registering call routes...");
    app.use("/api/v1/call", (await getCallRoutes()).getRouter());

    console.log("📝 Registering takaful accident report routes...");
    app.use(
      "/api/v1/takaful-accident-report",
      (await getTakafulAccidentReportRoutes()).getRouter()
    );

    console.log("📝 Registering cheque routes...");
    app.use("/api/v1/cheque", (await getChequeRoutes()).getRouter());

    console.log("📝 Registering trust accident report routes...");
    app.use(
      "/api/v1/trust-accident-report",
      (await getTrustAccidentReportRoutes()).getRouter()
    );

    console.log("📝 Registering al ahlia accident routes...");
    app.use(
      "/api/v1/al-ahlia-accident",
      (await getAlAhliaAccidentRoutes()).getRouter()
    );

    console.log("📝 Registering palestine accident report routes...");
    app.use(
      "/api/v1/palestine-accident-report",
      (await getPalestineAccidentReportRoutes()).getRouter()
    );

    console.log("📝 Registering al mashreq accident report routes...");
    app.use(
      "/api/v1/al-mashreq-accident-report",
      (await getAlMashreqAccidentReportRoutes()).getRouter()
    );

    console.log("📝 Registering holy lands report routes...");
    app.use(
      "/api/v1/holy-lands-report",
      (await getHolyLandsReportRoutes()).getRouter()
    );

    console.log("📝 Registering agents routes...");
    app.use("/api/v1/agents", (await getAgentRoutes()).getRouter());

    console.log("✅ All async routes initialized successfully!");
  } catch (error) {
    console.error("❌ Error initializing async routes:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
  }
})();

// Cache management routes
app.get("/api/v1/cache/stats", cacheStats);
app.post("/api/v1/cache/clear", clearCache);

// Monitoring and health check routes
app.get("/api/v1/health", getHealthCheck);
app.get("/metrics", getMetrics);

app.use(errorHandler);
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Incorrect route" });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Metrics available at http://localhost:${PORT}/metrics`);
  console.log(`🏥 Health check at http://localhost:${PORT}/api/v1/health`);
  console.log(`📚 API Documentation at http://localhost:${PORT}/api-docs`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
    process.exit(0);
  });
});

export default app;
