import mongoose from "mongoose";
import {
  createTestUser,
  createTestCustomer,
  createTestInvoice,
  createMockRequest,
  createMockResponse,
  createMockNext,
  cleanupTestData,
  TEST_DATA,
} from "../utils/testHelpers.js";
import * as invoiceController from "../../src/modules/Invoice/controller/Invoice.controller.js";
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

describe("Invoice Controller", () => {
  let testUser;
  let testCustomer;
  let testInvoice;

  beforeEach(async () => {
    await cleanupTestData();
    testUser = await createTestUser();
    testCustomer = await createTestCustomer();
    testInvoice = await createTestInvoice();
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  describe("createInvoice", () => {
    it("should create a new invoice successfully", async () => {
      const req = createMockRequest({
        body: {
          customerId: testCustomer._id.toString(),
          insurancePolicyId: new mongoose.Types.ObjectId().toString(),
          vehicleId: new mongoose.Types.ObjectId().toString(),
          totalAmount: 1500,
          description: "Test Insurance Invoice",
          notes: "Test notes",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.createInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invoice created successfully",
          invoice: expect.objectContaining({
            customer: testCustomer._id,
            totalAmount: 1500,
            balanceDue: 1500,
            description: "Test Insurance Invoice",
          }),
        })
      );
    });

    it("should return 404 if customer not found", async () => {
      const req = createMockRequest({
        body: {
          customerId: new mongoose.Types.ObjectId().toString(),
          insurancePolicyId: new mongoose.Types.ObjectId().toString(),
          vehicleId: new mongoose.Types.ObjectId().toString(),
          totalAmount: 1500,
          description: "Test Insurance Invoice",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.createInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer not found",
      });
    });

    it("should return 409 if invoice already exists for insurance policy", async () => {
      const insurancePolicyId = new mongoose.Types.ObjectId();

      // Create first invoice
      await Invoice.create({
        customer: testCustomer._id,
        insurancePolicy: insurancePolicyId,
        vehicle: new mongoose.Types.ObjectId(),
        totalAmount: 1000,
        balanceDue: 1000,
        description: "First Invoice",
        createdBy: testUser._id,
      });

      // Try to create second invoice with same insurance policy
      const req = createMockRequest({
        body: {
          customerId: testCustomer._id.toString(),
          insurancePolicyId: insurancePolicyId.toString(),
          vehicleId: new mongoose.Types.ObjectId().toString(),
          totalAmount: 1500,
          description: "Second Invoice",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.createInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invoice already exists for this insurance policy",
      });
    });
  });

  describe("getAllInvoices", () => {
    it("should return all invoices with pagination", async () => {
      const req = createMockRequest({
        query: {
          page: 1,
          limit: 10,
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.getAllInvoices(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invoices retrieved successfully",
          invoices: expect.any(Array),
          pagination: expect.objectContaining({
            currentPage: 1,
            totalPages: expect.any(Number),
            totalItems: expect.any(Number),
            itemsPerPage: 10,
          }),
        })
      );
    });

    it("should filter invoices by status", async () => {
      const req = createMockRequest({
        query: {
          status: "Pending",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.getAllInvoices(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          invoices: expect.any(Array),
        })
      );
    });

    it("should filter invoices by customer ID", async () => {
      const req = createMockRequest({
        query: {
          customerId: testCustomer._id.toString(),
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.getAllInvoices(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          invoices: expect.any(Array),
        })
      );
    });
  });

  describe("getInvoiceById", () => {
    it("should return invoice by ID with payment history", async () => {
      const req = createMockRequest({
        params: { id: testInvoice._id.toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.getInvoiceById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invoice retrieved successfully",
          invoice: expect.objectContaining({
            _id: testInvoice._id,
          }),
          payments: expect.any(Array),
        })
      );
    });

    it("should return 404 if invoice not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.getInvoiceById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invoice not found",
      });
    });
  });

  describe("updateInvoice", () => {
    it("should update invoice successfully", async () => {
      const req = createMockRequest({
        params: { id: testInvoice._id.toString() },
        body: {
          totalAmount: 2000,
          description: "Updated Invoice Description",
          notes: "Updated notes",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.updateInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invoice updated successfully",
          invoice: expect.objectContaining({
            totalAmount: 2000,
            description: "Updated Invoice Description",
          }),
        })
      );
    });

    it("should return 404 if invoice not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: { totalAmount: 2000 },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.updateInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invoice not found",
      });
    });
  });

  describe("deleteInvoice", () => {
    it("should delete invoice successfully", async () => {
      const req = createMockRequest({
        params: { id: testInvoice._id.toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.deleteInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invoice deleted successfully",
          invoice: expect.objectContaining({
            _id: testInvoice._id,
          }),
        })
      );
    });

    it("should return 404 if invoice not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.deleteInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invoice not found",
      });
    });

    it("should return 400 if invoice has payments", async () => {
      // Create a payment for the invoice
      const { paymentModel } = await import("../../DB/models/Payment.model.js");
      await paymentModel.create({
        invoice: testInvoice._id,
        customer: testCustomer._id,
        paymentMethod: "Cash",
        paymentAmount: 500,
        createdBy: testUser._id,
      });

      const req = createMockRequest({
        params: { id: testInvoice._id.toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.deleteInvoice(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Cannot delete invoice with existing payments",
      });
    });
  });

  describe("getInvoicesByCustomer", () => {
    it("should return invoices for specific customer", async () => {
      const req = createMockRequest({
        params: { customerId: testCustomer._id.toString() },
        query: { page: 1, limit: 10 },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.getInvoicesByCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Customer invoices retrieved successfully",
          invoices: expect.any(Array),
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

  describe("getInvoiceStats", () => {
    it("should return invoice statistics", async () => {
      const req = createMockRequest({
        query: {
          startDate: "2024-01-01",
          endDate: "2024-12-31",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.getInvoiceStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Invoice statistics retrieved successfully",
          stats: expect.objectContaining({
            totalInvoices: expect.any(Number),
            totalAmount: expect.any(Number),
            totalBalance: expect.any(Number),
          }),
          statusBreakdown: expect.any(Array),
        })
      );
    });
  });

  describe("markOverdueInvoices", () => {
    it("should mark overdue invoices successfully", async () => {
      // Create an overdue invoice
      await Invoice.create({
        customer: testCustomer._id,
        insurancePolicy: new mongoose.Types.ObjectId(),
        vehicle: new mongoose.Types.ObjectId(),
        totalAmount: 1000,
        balanceDue: 1000,
        description: "Overdue Invoice",
        dueDate: new Date("2023-01-01"), // Past date
        status: "Pending",
        createdBy: testUser._id,
      });

      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      await invoiceController.markOverdueInvoices(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: expect.stringContaining("invoices marked as overdue"),
          count: expect.any(Number),
        })
      );
    });
  });
});
