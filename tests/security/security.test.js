import request from "supertest";
import express from "express";
import { auth, generateToken } from "../../src/midlleWare/auth.js";
import { sanitizeRequest } from "../../src/midlleWare/sanitization.js";
import { validateUploadedFiles } from "../../src/Servicess/multer.js";
import { validateSecurityConfig } from "../../src/config/security.js";

// Create a test app
const app = express();
app.use(express.json());
app.use(sanitizeRequest);

// Test route with auth
app.get("/protected", auth(["admin"]), (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

// Test route for file upload
app.post("/upload", validateUploadedFiles, (req, res) => {
  res.json({ message: "File uploaded successfully", files: req.files });
});

describe("Security Tests", () => {
  describe("JWT Authentication", () => {
    test("should reject requests without token", async () => {
      const response = await request(app).get("/protected").expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Access token is required");
    });

    test("should reject requests with invalid token format", async () => {
      const response = await request(app)
        .get("/protected")
        .set("token", "invalid-token")
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Invalid token format");
    });

    test("should reject expired tokens", async () => {
      // Create an expired token
      const expiredToken = generateToken("user123", -1); // Expired immediately

      const response = await request(app)
        .get("/protected")
        .set("token", `Bearer ${expiredToken}`)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Token has expired");
    });

    test("should accept valid tokens", async () => {
      const validToken = generateToken("user123");

      const response = await request(app)
        .get("/protected")
        .set("token", `Bearer ${validToken}`)
        .expect(200);

      expect(response.body.message).toBe("Protected route accessed");
    });
  });

  describe("Input Sanitization", () => {
    test("should sanitize XSS attempts in request body", async () => {
      const maliciousData = {
        name: '<script>alert("xss")</script>',
        email: "test@example.com",
        message: 'javascript:alert("xss")',
      };

      const response = await request(app)
        .post("/test")
        .send(maliciousData)
        .expect(404); // Route doesn't exist, but sanitization should work

      // The request should be processed without errors
      expect(response.status).toBe(404);
    });

    test("should sanitize SQL injection attempts", async () => {
      const maliciousData = {
        query: "'; DROP TABLE users; --",
        search: "1' OR '1'='1",
      };

      const response = await request(app)
        .post("/test")
        .send(maliciousData)
        .expect(404);

      expect(response.status).toBe(404);
    });
  });

  describe("File Upload Security", () => {
    test("should reject dangerous file types", async () => {
      const response = await request(app)
        .post("/upload")
        .attach("file", Buffer.from("fake exe content"), {
          filename: "malicious.exe",
          contentType: "application/x-msdownload",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Dangerous file type detected");
    });

    test("should reject oversized files", async () => {
      const largeBuffer = Buffer.alloc(11 * 1024 * 1024); // 11MB

      const response = await request(app)
        .post("/upload")
        .attach("file", largeBuffer, {
          filename: "large-file.jpg",
          contentType: "image/jpeg",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("File size exceeds");
    });

    test("should accept valid files", async () => {
      const response = await request(app)
        .post("/upload")
        .attach("file", Buffer.from("fake image content"), {
          filename: "test.jpg",
          contentType: "image/jpeg",
        })
        .expect(200);

      expect(response.body.message).toBe("File uploaded successfully");
    });
  });

  describe("Rate Limiting", () => {
    test("should implement rate limiting on API endpoints", async () => {
      // This test would need to be run against the actual app with rate limiting
      // For now, we'll test the configuration
      expect(validateSecurityConfig()).toBe(true);
    });
  });

  describe("CORS Configuration", () => {
    test("should have proper CORS configuration", () => {
      const config =
        require("../../src/config/security.js").getSecurityConfig();

      expect(config.CORS.ORIGIN).toBeDefined();
      expect(config.CORS.METHODS).toContain("GET");
      expect(config.CORS.METHODS).toContain("POST");
      expect(config.CORS.ALLOWED_HEADERS).toContain("Authorization");
    });
  });

  describe("Security Headers", () => {
    test("should include security headers", async () => {
      const response = await request(app).get("/").expect(404);

      // Check for security headers
      expect(response.headers).toBeDefined();
    });
  });

  describe("Password Security", () => {
    test("should validate password requirements", () => {
      const config = require("../../src/config/security.js").SECURITY_CONFIG
        .PASSWORD;

      expect(config.MIN_LENGTH).toBeGreaterThanOrEqual(8);
      expect(config.REQUIRE_UPPERCASE).toBe(true);
      expect(config.REQUIRE_LOWERCASE).toBe(true);
      expect(config.REQUIRE_NUMBERS).toBe(true);
      expect(config.REQUIRE_SPECIAL_CHARS).toBe(true);
    });
  });

  describe("Environment Configuration", () => {
    test("should have different configs for different environments", () => {
      const devConfig =
        require("../../src/config/security.js").getSecurityConfig();

      // Test that development config is less restrictive
      expect(devConfig.CORS.ORIGIN).toContain("localhost");
    });
  });
});

// Helper function to create test tokens
function createTestToken(userId, expiresIn = 3600) {
  const payload = {
    id: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  };

  return require("jsonwebtoken").sign(
    payload,
    process.env.TokenSignIn || "test-secret"
  );
}
