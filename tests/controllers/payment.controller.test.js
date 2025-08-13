import mongoose from "mongoose";
import {
  createTestUser,
  createTestCustomer,
  createTestInvoice,
  createTestPayment,
  createMockRequest,
  createMockResponse,
  createMockNext,
  cleanupTestData,
  TEST_DATA,
} from "../utils/testHelpers.js";
import * as paymentController from "../../src/modules/Payment/controller/Payment.controller.js";
import Payment from "../../DB/models/Payment.model.js";
import Invoice from "../../DB/models/Invoice.model.js";
import Customer from "../../DB/models/Customer.model.js";
import UserModel from "../../DB/models/user.model.js";

// Mock external dependencies
jest.mock(
  "../../src/modules/notification/controller/notification.controller.js",
  () => ({
    sendNotificationLogic: jest.fn().mockResolvedValue(true),
  })
);

describe("Payment Controller", () => {
  let testUser;
  let testCustomer;
  let testInvoice;
  let testPayment;

  beforeEach(async () => {
    await cleanupTestData();
    testUser = await createTestUser();
    testCustomer = await createTestCustomer();
    testInvoice = await createTestInvoice();
    testPayment = await createTestPayment();
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  describe("createPayment", () => {
    it("should create a new payment successfully", async () => {
      const req = createMockRequest({
        body: {
          invoiceId: testInvoice._id.toString(),
          customerId: testCustomer._id.toString(),
          paymentMethod: "Credit Card",
          paymentAmount: 500,
          paymentDate: new Date(),
          notes: "Test payment",
          referenceNumber: "REF123",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.createPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Payment recorded successfully",
          payment: expect.objectContaining({
            invoice: testInvoice._id,
            customer: testCustomer._id,
            paymentMethod: "Credit Card",
            paymentAmount: 500,
          }),
        })
      );
    });

    it("should return 404 if invoice not found", async () => {
      const req = createMockRequest({
        body: {
          invoiceId: new mongoose.Types.ObjectId().toString(),
          customerId: testCustomer._id.toString(),
          paymentMethod: "Cash",
          paymentAmount: 500,
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.createPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invoice not found",
      });
    });

    it("should return 404 if customer not found", async () => {
      const req = createMockRequest({
        body: {
          invoiceId: testInvoice._id.toString(),
          customerId: new mongoose.Types.ObjectId().toString(),
          paymentMethod: "Cash",
          paymentAmount: 500,
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.createPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer not found",
      });
    });

    it("should return 400 if payment amount exceeds remaining balance", async () => {
      const req = createMockRequest({
        body: {
          invoiceId: testInvoice._id.toString(),
          customerId: testCustomer._id.toString(),
          paymentMethod: "Cash",
          paymentAmount: 2000, // More than balance due
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.createPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining("exceeds remaining balance"),
      });
    });

    it("should return 400 if invoice is already fully paid", async () => {
      // Create a fully paid invoice
      const paidInvoice = await Invoice.create({
        customer: testCustomer._id,
        insurancePolicy: new mongoose.Types.ObjectId(),
        vehicle: new mongoose.Types.ObjectId(),
        totalAmount: 1000,
        balanceDue: 0, // Fully paid
        description: "Paid Invoice",
        createdBy: testUser._id,
      });

      const req = createMockRequest({
        body: {
          invoiceId: paidInvoice._id.toString(),
          customerId: testCustomer._id.toString(),
          paymentMethod: "Cash",
          paymentAmount: 100,
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.createPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invoice is already fully paid",
      });
    });
  });

  describe("getAllPayments", () => {
    it("should return all payments with pagination", async () => {
      const req = createMockRequest({
        query: {
          page: 1,
          limit: 10,
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.getAllPayments(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Payments retrieved successfully",
          payments: expect.any(Array),
          pagination: expect.objectContaining({
            currentPage: 1,
            totalPages: expect.any(Number),
            totalItems: expect.any(Number),
            itemsPerPage: 10,
          }),
        })
      );
    });

    it("should filter payments by status", async () => {
      const req = createMockRequest({
        query: {
          status: "Completed",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.getAllPayments(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          payments: expect.any(Array),
        })
      );
    });

    it("should filter payments by payment method", async () => {
      const req = createMockRequest({
        query: {
          paymentMethod: "Cash",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.getAllPayments(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          payments: expect.any(Array),
        })
      );
    });
  });

  describe("getPaymentById", () => {
    it("should return payment by ID", async () => {
      const req = createMockRequest({
        params: { id: testPayment._id.toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.getPaymentById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Payment retrieved successfully",
          payment: expect.objectContaining({
            _id: testPayment._id,
          }),
        })
      );
    });

    it("should return 404 if payment not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.getPaymentById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Payment not found",
      });
    });
  });

  describe("updatePayment", () => {
    it("should update payment successfully", async () => {
      const req = createMockRequest({
        params: { id: testPayment._id.toString() },
        body: {
          paymentMethod: "Bank Transfer",
          paymentAmount: 600,
          notes: "Updated payment notes",
          referenceNumber: "UPDATED123",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.updatePayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Payment updated successfully",
          payment: expect.objectContaining({
            paymentMethod: "Bank Transfer",
            paymentAmount: 600,
          }),
        })
      );
    });

    it("should return 404 if payment not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: { paymentAmount: 600 },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.updatePayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Payment not found",
      });
    });
  });

  describe("deletePayment", () => {
    it("should delete payment successfully", async () => {
      const req = createMockRequest({
        params: { id: testPayment._id.toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.deletePayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Payment deleted successfully",
          payment: expect.objectContaining({
            _id: testPayment._id,
          }),
        })
      );
    });

    it("should return 404 if payment not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.deletePayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Payment not found",
      });
    });

    it("should return 400 if payment is completed", async () => {
      // Update payment to completed status
      await Payment.findByIdAndUpdate(testPayment._id, {
        status: "Completed",
      });

      const req = createMockRequest({
        params: { id: testPayment._id.toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.deletePayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Cannot delete completed payments",
      });
    });
  });

  describe("getPaymentsByCustomer", () => {
    it("should return payments for specific customer", async () => {
      const req = createMockRequest({
        params: { customerId: testCustomer._id.toString() },
        query: { page: 1, limit: 10 },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.getPaymentsByCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Customer payments retrieved successfully",
          payments: expect.any(Array),
          pagination: expect.objectContaining({
            currentPage: 1,
            totalPages: expect.any(Number),
            totalItems: expect.any(Number),
            itemsPerPage: 10,
          }),
        })
      );
    });
  });

  describe("getPaymentsByInvoice", () => {
    it("should return payments for specific invoice", async () => {
      const req = createMockRequest({
        params: { invoiceId: testInvoice._id.toString() },
        query: { page: 1, limit: 10 },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.getPaymentsByInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invoice payments retrieved successfully",
          payments: expect.any(Array),
          pagination: expect.objectContaining({
            currentPage: 1,
            totalPages: expect.any(Number),
            totalItems: expect.any(Number),
            itemsPerPage: 10,
          }),
        })
      );
    });
  });

  describe("getPaymentStats", () => {
    it("should return payment statistics", async () => {
      const req = createMockRequest({
        query: {
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          paymentMethod: "Cash",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.getPaymentStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Payment statistics retrieved successfully",
          stats: expect.objectContaining({
            totalPayments: expect.any(Number),
            totalAmount: expect.any(Number),
            averageAmount: expect.any(Number),
          }),
          methodBreakdown: expect.any(Array),
          dailyStats: expect.any(Array),
        })
      );
    });
  });

  describe("refundPayment", () => {
    it("should refund payment successfully", async () => {
      // Update payment to completed status
      await Payment.findByIdAndUpdate(testPayment._id, {
        status: "Completed",
      });

      const req = createMockRequest({
        params: { id: testPayment._id.toString() },
        body: {
          refundAmount: 200,
          reason: "Customer request",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.refundPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Payment refunded successfully",
          payment: expect.objectContaining({
            status: "Refunded",
          }),
        })
      );
    });

    it("should return 404 if payment not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: {
          refundAmount: 200,
          reason: "Customer request",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.refundPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Payment not found",
      });
    });

    it("should return 400 if payment is not completed", async () => {
      const req = createMockRequest({
        params: { id: testPayment._id.toString() },
        body: {
          refundAmount: 200,
          reason: "Customer request",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.refundPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Only completed payments can be refunded",
      });
    });

    it("should return 400 if refund amount exceeds original payment", async () => {
      // Update payment to completed status
      await Payment.findByIdAndUpdate(testPayment._id, {
        status: "Completed",
      });

      const req = createMockRequest({
        params: { id: testPayment._id.toString() },
        body: {
          refundAmount: 1000, // More than original payment amount
          reason: "Customer request",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await paymentController.refundPayment(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Refund amount cannot exceed original payment amount",
      });
    });
  });
});
