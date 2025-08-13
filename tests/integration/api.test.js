import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
  createTestUser,
  createTestCustomer,
  createTestInvoice,
  createTestPayment,
  generateTestToken,
  cleanupTestData,
} from "../utils/testHelpers.js";

// Import your app
import app from "../../index.js";

let mongoServer;

describe("API Integration Tests", () => {
  let testUser;
  let testCustomer;
  let testInvoice;
  let authToken;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    await cleanupTestData();
    testUser = await createTestUser();
    testCustomer = await createTestCustomer();
    testInvoice = await createTestInvoice();
    authToken = generateTestToken(testUser);
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("Customer API", () => {
    describe("GET /api/v1/customer/allCustomer", () => {
      it("should return all customers", async () => {
        const response = await request(app)
          .get("/api/v1/customer/allCustomer")
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200);

        expect(response.body).toHaveProperty("message", "All Customers");
        expect(response.body).toHaveProperty("customerList");
        expect(Array.isArray(response.body.customerList)).toBe(true);
      });

      it("should return 401 without authentication", async () => {
        await request(app).get("/api/v1/customer/allCustomer").expect(401);
      });
    });

    describe("GET /api/v1/customer/findCustomer/:id", () => {
      it("should return customer by ID", async () => {
        const response = await request(app)
          .get(`/api/v1/customer/findCustomer/${testCustomer._id}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200);

        expect(response.body).toHaveProperty("message", "Found Customer");
        expect(response.body).toHaveProperty("customer");
        expect(response.body.customer._id).toBe(testCustomer._id.toString());
      });

      it("should return 404 for non-existent customer", async () => {
        const fakeId = new mongoose.Types.ObjectId();
        await request(app)
          .get(`/api/v1/customer/findCustomer/${fakeId}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(404);
      });
    });

    describe("POST /api/v1/customer/addCustomer", () => {
      it("should create a new customer", async () => {
        const newCustomer = {
          first_name: "Jane",
          last_name: "Smith",
          id_Number: "987654321",
          phone_number: "+9876543210",
          joining_date: new Date(),
          city: "New City",
          email: "jane.smith@example.com",
        };

        const response = await request(app)
          .post("/api/v1/customer/addCustomer")
          .set("Authorization", `Bearer ${authToken}`)
          .send(newCustomer)
          .expect(201);

        expect(response.body).toHaveProperty("message", "Added successfully");
        expect(response.body).toHaveProperty("savedCustomer");
        expect(response.body.savedCustomer.first_name).toBe(
          newCustomer.first_name
        );
      });

      it("should return 409 for duplicate ID number", async () => {
        const duplicateCustomer = {
          ...testCustomer.toObject(),
          email: "different@example.com",
        };

        await request(app)
          .post("/api/v1/customer/addCustomer")
          .set("Authorization", `Bearer ${authToken}`)
          .send(duplicateCustomer)
          .expect(409);
      });
    });
  });

  describe("Invoice API", () => {
    describe("GET /api/v1/invoice/all", () => {
      it("should return all invoices with pagination", async () => {
        const response = await request(app)
          .get("/api/v1/invoice/all")
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200);

        expect(response.body).toHaveProperty(
          "message",
          "Invoices retrieved successfully"
        );
        expect(response.body).toHaveProperty("invoices");
        expect(response.body).toHaveProperty("pagination");
        expect(Array.isArray(response.body.invoices)).toBe(true);
      });
    });

    describe("GET /api/v1/invoice/:id", () => {
      it("should return invoice by ID with payment history", async () => {
        const response = await request(app)
          .get(`/api/v1/invoice/${testInvoice._id}`)
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200);

        expect(response.body).toHaveProperty(
          "message",
          "Invoice retrieved successfully"
        );
        expect(response.body).toHaveProperty("invoice");
        expect(response.body).toHaveProperty("payments");
        expect(response.body.invoice._id).toBe(testInvoice._id.toString());
      });
    });

    describe("POST /api/v1/invoice/create", () => {
      it("should create a new invoice", async () => {
        const newInvoice = {
          customerId: testCustomer._id.toString(),
          insurancePolicyId: new mongoose.Types.ObjectId().toString(),
          vehicleId: new mongoose.Types.ObjectId().toString(),
          totalAmount: 1500,
          description: "Test Insurance Invoice",
          notes: "Test notes",
        };

        const response = await request(app)
          .post("/api/v1/invoice/create")
          .set("Authorization", `Bearer ${authToken}`)
          .send(newInvoice)
          .expect(201);

        expect(response.body).toHaveProperty(
          "message",
          "Invoice created successfully"
        );
        expect(response.body).toHaveProperty("invoice");
        expect(response.body.invoice.totalAmount).toBe(newInvoice.totalAmount);
      });
    });
  });

  describe("Payment API", () => {
    describe("GET /api/v1/payment/all", () => {
      it("should return all payments with pagination", async () => {
        const response = await request(app)
          .get("/api/v1/payment/all")
          .set("Authorization", `Bearer ${authToken}`)
          .expect(200);

        expect(response.body).toHaveProperty(
          "message",
          "Payments retrieved successfully"
        );
        expect(response.body).toHaveProperty("payments");
        expect(response.body).toHaveProperty("pagination");
        expect(Array.isArray(response.body.payments)).toBe(true);
      });
    });

    describe("POST /api/v1/payment/create", () => {
      it("should create a new payment", async () => {
        const newPayment = {
          invoiceId: testInvoice._id.toString(),
          customerId: testCustomer._id.toString(),
          paymentMethod: "Credit Card",
          paymentAmount: 500,
          notes: "Test payment",
          referenceNumber: "REF123",
        };

        const response = await request(app)
          .post("/api/v1/payment/create")
          .set("Authorization", `Bearer ${authToken}`)
          .send(newPayment)
          .expect(201);

        expect(response.body).toHaveProperty(
          "message",
          "Payment recorded successfully"
        );
        expect(response.body).toHaveProperty("payment");
        expect(response.body.payment.paymentAmount).toBe(
          newPayment.paymentAmount
        );
      });

      it("should return 400 if payment amount exceeds balance", async () => {
        const invalidPayment = {
          invoiceId: testInvoice._id.toString(),
          customerId: testCustomer._id.toString(),
          paymentMethod: "Cash",
          paymentAmount: 2000, // More than balance due
        };

        await request(app)
          .post("/api/v1/payment/create")
          .set("Authorization", `Bearer ${authToken}`)
          .send(invalidPayment)
          .expect(400);
      });
    });
  });

  describe("Authentication", () => {
    describe("POST /api/v1/user/signUp", () => {
      it("should register a new user", async () => {
        const newUser = {
          name: "Test User",
          email: "testuser@example.com",
          password: "password123",
          role: "Employee",
          department: "Sales",
        };

        const response = await request(app)
          .post("/api/v1/user/signUp")
          .send(newUser)
          .expect(201);

        expect(response.body).toHaveProperty(
          "message",
          "User created successfully"
        );
        expect(response.body).toHaveProperty("user");
        expect(response.body.user.email).toBe(newUser.email);
      });
    });

    describe("POST /api/v1/user/signIn", () => {
      it("should sign in existing user", async () => {
        const credentials = {
          email: testUser.email,
          password: "password123",
        };

        const response = await request(app)
          .post("/api/v1/user/signIn")
          .send(credentials)
          .expect(200);

        expect(response.body).toHaveProperty("message", "Login successful");
        expect(response.body).toHaveProperty("token");
        expect(response.body).toHaveProperty("user");
      });

      it("should return 401 for invalid credentials", async () => {
        const invalidCredentials = {
          email: testUser.email,
          password: "wrongpassword",
        };

        await request(app)
          .post("/api/v1/user/signIn")
          .send(invalidCredentials)
          .expect(401);
      });
    });
  });

  describe("Error Handling", () => {
    it("should return 404 for non-existent routes", async () => {
      await request(app).get("/api/v1/nonexistent").expect(404);
    });

    it("should return 401 for protected routes without token", async () => {
      await request(app).get("/api/v1/customer/allCustomer").expect(401);
    });

    it("should return 401 for invalid token", async () => {
      await request(app)
        .get("/api/v1/customer/allCustomer")
        .set("Authorization", "Bearer invalid-token")
        .expect(401);
    });
  });
});
