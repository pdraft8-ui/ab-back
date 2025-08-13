import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  createTestUser,
  createMockRequest,
  createMockResponse,
  createMockNext,
  cleanupTestData,
  TEST_DATA,
} from "../utils/testHelpers.js";
import * as userController from "../../src/modules/User/controller/user.controller.js";
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

describe("User Controller", () => {
  let testUser;

  beforeEach(async () => {
    await cleanupTestData();
    testUser = await createTestUser();
  });

  afterEach(async () => {
    await cleanupTestData();
  });

  describe("signUp", () => {
    it("should create a new user successfully", async () => {
      const req = createMockRequest({
        body: {
          name: "New User",
          email: "newuser@example.com",
          password: "password123",
          role: "Employee",
          department: "Sales",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.signUp(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User created successfully",
          user: expect.objectContaining({
            name: "New User",
            email: "newuser@example.com",
            role: "Employee",
          }),
        })
      );
    });

    it("should return 409 if user with same email already exists", async () => {
      const req = createMockRequest({
        body: {
          name: "Duplicate User",
          email: testUser.email, // Use existing email
          password: "password123",
          role: "Employee",
          department: "Sales",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.signUp(req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: "User already exists",
      });
    });

    it("should hash password before saving", async () => {
      const req = createMockRequest({
        body: {
          name: "Test User",
          email: "testuser@example.com",
          password: "password123",
          role: "Employee",
          department: "Sales",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.signUp(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      const savedUser = await UserModel.findOne({
        email: "testuser@example.com",
      });
      expect(savedUser).toBeTruthy();
      expect(savedUser.password).not.toBe("password123"); // Should be hashed
    });
  });

  describe("signIn", () => {
    it("should sign in user successfully with correct credentials", async () => {
      const req = createMockRequest({
        body: {
          email: testUser.email,
          password: "password123",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.signIn(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Login successful",
          token: expect.any(String),
          user: expect.objectContaining({
            email: testUser.email,
            name: testUser.name,
          }),
        })
      );
    });

    it("should return 401 if user not found", async () => {
      const req = createMockRequest({
        body: {
          email: "nonexistent@example.com",
          password: "password123",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.signIn(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email or password",
      });
    });

    it("should return 401 if password is incorrect", async () => {
      const req = createMockRequest({
        body: {
          email: testUser.email,
          password: "wrongpassword",
        },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.signIn(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid email or password",
      });
    });
  });

  describe("updateUser", () => {
    it("should update user successfully", async () => {
      const req = createMockRequest({
        params: { id: testUser._id.toString() },
        body: {
          name: "Updated Name",
          email: "updated@example.com",
          role: "Manager",
          department: "Marketing",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User updated successfully",
          user: expect.objectContaining({
            name: "Updated Name",
            email: "updated@example.com",
            role: "Manager",
          }),
        })
      );
    });

    it("should return 404 if user not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: { name: "Updated Name" },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.updateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });
  });

  describe("deleteUser", () => {
    it("should delete user successfully", async () => {
      const req = createMockRequest({
        params: { id: testUser._id.toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User deleted successfully",
          user: expect.objectContaining({
            _id: testUser._id,
          }),
        })
      );
    });

    it("should return 404 if user not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      await userController.getAllUsers(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "All users retrieved successfully",
          users: expect.arrayContaining([
            expect.objectContaining({
              _id: testUser._id,
              name: testUser.name,
              email: testUser.email,
            }),
          ]),
        })
      );
    });
  });

  describe("getUserById", () => {
    it("should return user by ID", async () => {
      const req = createMockRequest({
        params: { id: testUser._id.toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.getUserById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User retrieved successfully",
          user: expect.objectContaining({
            _id: testUser._id,
            name: testUser.name,
            email: testUser.email,
          }),
        })
      );
    });

    it("should return 404 if user not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.getUserById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });
  });

  describe("changePassword", () => {
    it("should change password successfully", async () => {
      const req = createMockRequest({
        params: { id: testUser._id.toString() },
        body: {
          currentPassword: "password123",
          newPassword: "newpassword123",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.changePassword(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Password changed successfully",
      });
    });

    it("should return 400 if current password is incorrect", async () => {
      const req = createMockRequest({
        params: { id: testUser._id.toString() },
        body: {
          currentPassword: "wrongpassword",
          newPassword: "newpassword123",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.changePassword(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Current password is incorrect",
      });
    });

    it("should return 404 if user not found", async () => {
      const req = createMockRequest({
        params: { id: new mongoose.Types.ObjectId().toString() },
        body: {
          currentPassword: "password123",
          newPassword: "newpassword123",
        },
        user: testUser,
      });
      const res = createMockResponse();
      const next = createMockNext();

      await userController.changePassword(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });
  });

  describe("getUserStats", () => {
    it("should return user statistics", async () => {
      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      await userController.getUserStats(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "User statistics retrieved successfully",
          stats: expect.objectContaining({
            totalUsers: expect.any(Number),
          }),
          roleBreakdown: expect.any(Array),
          departmentBreakdown: expect.any(Array),
        })
      );
    });
  });
});
