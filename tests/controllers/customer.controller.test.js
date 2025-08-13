import mongoose from "mongoose";
import {
  createTestUser,
  createTestCustomer,
  createMockRequest,
  createMockResponse,
  createMockNext,
  cleanupTestData,
  TEST_DATA,
} from "../utils/testHelpers.js";
import * as customerController from "../../src/modules/customers/controller/customer.controller.js";
import Customer from "../../DB/models/Customer.model.js";
import UserModel from "../../DB/models/user.model.js";

// Mock external dependencies
jest.mock("../../src/Servicess/localStorage.js", () => ({
  default: {
    upload: jest.fn().mockResolvedValue({
      url: "http://localhost:5000/uploads/test-image.jpg",
    }),
    destroy: jest.fn().mockResolvedValue(true),
  },
}));

jest.mock(
  "../../src/modules/notification/controller/notification.controller.js",
  () => ({
    sendNotificationLogic: jest.fn().mockResolvedValue(true),
  })
);

describe("Customer Controller", () => {
  let testUser;
  let testCustomer;

  beforeEach(async () => {
    await cleanupTestData();
    testUser = await createTestUser();
    testCustomer = await createTestCustomer();
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  describe("addCustomer", () => {
    it("should create a new customer successfully", async () => {
      const req = createMockRequest({
        body: {
          first_name: "Jane",
          last_name: "Smith",
          id_Number: "987654321",
          phone_number: "+9876543210",
          joining_date: new Date(),
          city: "New City",
          email: "jane.smith@example.com",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.addCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Added successfully",
          savedCustomer: expect.objectContaining({
            first_name: "Jane",
            last_name: "Smith",
            id_Number: "987654321",
          }),
        })
      );
    });

    it("should return 409 if customer with same ID number already exists", async () => {
      const req = createMockRequest({
        body: {
          ...TEST_DATA.CUSTOMER,
          id_Number: testCustomer.id_Number, // Use existing ID number
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.addCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer already exists",
      });
    });

    it("should handle errors and call next", async () => {
      const req = createMockRequest({
        body: { invalid: "data" },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.addCustomer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("allCustomer", () => {
    it("should return all customers", async () => {
      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.allCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "All Customers",
          customerList: expect.arrayContaining([
            expect.objectContaining({
              first_name: testCustomer.first_name,
              last_name: testCustomer.last_name,
            }),
          ]),
        })
      );
    });

    it("should handle errors and call next", async () => {
      // Mock the find method to throw an error
      jest.spyOn(Customer, "find").mockImplementationOnce(() => {
        throw new Error("Database error");
      });

      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.allCustomer(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("showById", () => {
    it("should return customer by ID", async () => {
      const req = createMockRequest({
        params: { id: testCustomer._id.toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.showById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Found Customer",
          customer: expect.objectContaining({
            _id: testCustomer._id,
            first_name: testCustomer.first_name,
          }),
        })
      );
    });

    it("should return 404 if customer not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.showById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer not found",
      });
    });
  });

  describe("updateCustomer", () => {
    it("should update customer successfully", async () => {
      const req = createMockRequest({
        params: { id: testCustomer._id.toString() },
        body: {
          first_name: "Updated",
          last_name: "Name",
          phone_number: "+1111111111",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.updateCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Updated successfully",
          updatedCustomer: expect.objectContaining({
            first_name: "Updated",
            last_name: "Name",
          }),
        })
      );
    });

    it("should return 409 if customer not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: { first_name: "Updated" },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.updateCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer not found",
      });
    });
  });

  describe("deleteCustomer", () => {
    it("should delete customer successfully", async () => {
      const req = createMockRequest({
        params: { id: testCustomer._id.toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.deleteCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Deleted successfully",
          deletedCustomer: expect.objectContaining({
            _id: testCustomer._id,
          }),
        })
      );
    });

    it("should return 404 if customer not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.deleteCustomer(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer not found",
      });
    });
  });

  describe("getAllVehicleInsurances", () => {
    it("should return all vehicle insurances", async () => {
      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.getAllVehicleInsurances(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "All vehicle insurances retrieved successfully",
          data: expect.any(Array),
        })
      );
    });
  });

  describe("getCustomerInsurances", () => {
    it("should return insurances for specific customer", async () => {
      const req = createMockRequest({
        params: { customerId: testCustomer._id.toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.getCustomerInsurances(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Customer insurances retrieved successfully",
          customer: expect.objectContaining({
            _id: testCustomer._id,
            first_name: testCustomer.first_name,
          }),
          insurances: expect.any(Array),
        })
      );
    });

    it("should return 404 if customer not found", async () => {
      const req = createMockRequest({
        params: { customerId: new mongoose.Types.ObjectId().toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.getCustomerInsurances(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Customer not found",
      });
    });
  });

  describe("getTotalCustomerCount", () => {
    it("should return total customer count", async () => {
      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.getTotalCustomerCount(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        total: expect.any(Number),
      });
    });
  });

  describe("getCustomerByMonth", () => {
    it("should return customer count by month", async () => {
      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      await customerController.getCustomerByMonth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: expect.any(Array),
      });
    });
  });
});
