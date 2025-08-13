import { MongoUserRepository } from "../repositories/MongoUserRepository.js";
import { UserService } from "../services/UserService.js";
import { CreateUserUseCase } from "../../application/usecases/CreateUserUseCase.js";
import { AuthenticateUserUseCase } from "../../application/usecases/AuthenticateUserUseCase.js";
import { GetAllUsersUseCase } from "../../application/usecases/GetAllUsersUseCase.js";
import { UpdateUserUseCase } from "../../application/usecases/UpdateUserUseCase.js";
import { ChangePasswordUseCase } from "../../application/usecases/ChangePasswordUseCase.js";
import { AddEmployeeToDepartmentUseCase } from "../../application/usecases/AddEmployeeToDepartmentUseCase.js";
import { GetEmployeesByDepartmentUseCase } from "../../application/usecases/GetEmployeesByDepartmentUseCase.js";
import { ToggleUserStatusUseCase } from "../../application/usecases/ToggleUserStatusUseCase.js";
import { GetUserStatsUseCase } from "../../application/usecases/GetUserStatsUseCase.js";
import { UserController } from "../../presentation/controllers/UserController.js";
import { UserRoutes } from "../../presentation/routes/UserRoutes.js";

export class UserContainer {
  constructor() {
    this.container = new Map();
    this.setupBindings();
  }

  setupBindings() {
    // Bind repositories
    this.container.set("userRepository", new MongoUserRepository());

    // Bind services
    this.container.set(
      "userService",
      new UserService(this.container.get("userRepository"))
    );

    // Bind use cases
    this.container.set(
      "createUserUseCase",
      new CreateUserUseCase(this.container.get("userService"))
    );

    this.container.set(
      "authenticateUserUseCase",
      new AuthenticateUserUseCase(this.container.get("userService"))
    );

    this.container.set(
      "getAllUsersUseCase",
      new GetAllUsersUseCase(this.container.get("userService"))
    );

    this.container.set(
      "updateUserUseCase",
      new UpdateUserUseCase(this.container.get("userService"))
    );

    this.container.set(
      "changePasswordUseCase",
      new ChangePasswordUseCase(this.container.get("userService"))
    );

    this.container.set(
      "addEmployeeToDepartmentUseCase",
      new AddEmployeeToDepartmentUseCase(this.container.get("userService"))
    );

    this.container.set(
      "getEmployeesByDepartmentUseCase",
      new GetEmployeesByDepartmentUseCase(this.container.get("userService"))
    );

    this.container.set(
      "toggleUserStatusUseCase",
      new ToggleUserStatusUseCase(this.container.get("userService"))
    );

    this.container.set(
      "getUserStatsUseCase",
      new GetUserStatsUseCase(this.container.get("userService"))
    );

    // Bind controller
    this.container.set(
      "userController",
      new UserController(
        this.container.get("createUserUseCase"),
        this.container.get("authenticateUserUseCase"),
        this.container.get("getAllUsersUseCase"),
        this.container.get("updateUserUseCase"),
        this.container.get("changePasswordUseCase"),
        this.container.get("addEmployeeToDepartmentUseCase"),
        this.container.get("getEmployeesByDepartmentUseCase"),
        this.container.get("toggleUserStatusUseCase"),
        this.container.get("getUserStatsUseCase")
      )
    );

    // Bind routes
    this.container.set(
      "userRoutes",
      new UserRoutes(this.container.get("userController"))
    );
  }

  get(key) {
    return this.container.get(key);
  }

  getAll() {
    return Object.fromEntries(this.container);
  }
}

// Minimal container for testing with mock services
export class UserContainerMinimal {
  constructor() {
    this.container = new Map();
    this.setupMinimalBindings();
  }

  setupMinimalBindings() {
    // Mock repository for testing
    const mockUserRepository = {
      create: async (userData) => ({ id: "user123", ...userData }),
      findById: async (id) => ({
        id,
        name: "Test User",
        email: "test@example.com",
      }),
      findByEmail: async (email) => ({
        id: "user123",
        name: "Test User",
        email,
      }),
      findAll: async () => ({
        users: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      }),
      update: async (id, updateData) => ({ id, ...updateData }),
      delete: async (id) => ({ id }),
      findByDepartment: async () => [],
      findByRole: async () => [],
      findByStatus: async () => [],
      findHeadOfDepartment: async () => null,
      findEmployeesByDepartment: async () => [],
      updatePassword: async () => ({ id: "user123" }),
      updateSendCode: async () => ({ id: "user123" }),
      toggleStatus: async () => ({ id: "user123", status: "active" }),
      getStats: async () => ({ total: 0, active: 0, inactive: 0, byRole: {} }),
      countByRole: async () => 0,
      countByDepartment: async () => 0,
    };

    // Mock service for testing
    const mockUserService = {
      createUser: async (userData) => ({ id: "user123", ...userData }),
      getUserById: async (id) => ({
        id,
        name: "Test User",
        email: "test@example.com",
      }),
      getUserByEmail: async (email) => ({
        id: "user123",
        name: "Test User",
        email,
      }),
      getAllUsers: async () => ({
        users: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      }),
      updateUser: async (id, updateData) => ({ id, ...updateData }),
      deleteUser: async (id) => ({ id }),
      authenticateUser: async () => ({
        success: true,
        message: "Authentication successful",
        user: {},
        token: "mock-token",
      }),
      changePassword: async () => ({
        success: true,
        message: "Password changed successfully",
      }),
      resetPassword: async () => ({
        success: true,
        message: "Password reset email sent",
      }),
      sendVerificationCode: async () => ({
        success: true,
        message: "Verification code sent",
      }),
      verifyCode: async () => ({
        success: true,
        message: "Code verified successfully",
      }),
      addEmployeeToDepartment: async () => ({ id: "emp123", role: "employee" }),
      removeEmployeeFromDepartment: async () => ({ id: "emp123" }),
      getEmployeesByDepartment: async () => [],
      addHeadOfDepartmentToDepartment: async () => ({
        id: "user123",
        role: "headOfDepartment",
      }),
      removeHeadOfDepartmentFromDepartment: async () => ({ id: "user123" }),
      getHeadOfDepartment: async () => null,
      toggleUserStatus: async () => ({ id: "user123", status: "active" }),
      getUserStats: async () => ({
        total: 0,
        active: 0,
        inactive: 0,
        byRole: {},
      }),
      sendEmail: async () => ({
        success: true,
        message: "Email sent successfully",
      }),
      sendBulkEmails: async () => ({
        success: true,
        message: "Bulk emails sent successfully",
      }),
      getInboxEmails: async () => ({ emails: [], total: 0 }),
      getEmailById: async () => ({ email: null }),
      markEmailAsRead: async () => ({ success: true }),
      deleteEmail: async () => ({ success: true }),
      getInboxStats: async () => ({ total: 0, unread: 0, read: 0 }),
      logAudit: async () => {},
    };

    // Bind mock services
    this.container.set("userRepository", mockUserRepository);
    this.container.set("userService", mockUserService);

    // Bind use cases with mock service
    this.container.set(
      "createUserUseCase",
      new CreateUserUseCase(mockUserService)
    );
    this.container.set(
      "authenticateUserUseCase",
      new AuthenticateUserUseCase(mockUserService)
    );
    this.container.set(
      "getAllUsersUseCase",
      new GetAllUsersUseCase(mockUserService)
    );
    this.container.set(
      "updateUserUseCase",
      new UpdateUserUseCase(mockUserService)
    );
    this.container.set(
      "changePasswordUseCase",
      new ChangePasswordUseCase(mockUserService)
    );
    this.container.set(
      "addEmployeeToDepartmentUseCase",
      new AddEmployeeToDepartmentUseCase(mockUserService)
    );
    this.container.set(
      "getEmployeesByDepartmentUseCase",
      new GetEmployeesByDepartmentUseCase(mockUserService)
    );
    this.container.set(
      "toggleUserStatusUseCase",
      new ToggleUserStatusUseCase(mockUserService)
    );
    this.container.set(
      "getUserStatsUseCase",
      new GetUserStatsUseCase(mockUserService)
    );

    // Bind controller
    this.container.set(
      "userController",
      new UserController(
        this.container.get("createUserUseCase"),
        this.container.get("authenticateUserUseCase"),
        this.container.get("getAllUsersUseCase"),
        this.container.get("updateUserUseCase"),
        this.container.get("changePasswordUseCase"),
        this.container.get("addEmployeeToDepartmentUseCase"),
        this.container.get("getEmployeesByDepartmentUseCase"),
        this.container.get("toggleUserStatusUseCase"),
        this.container.get("getUserStatsUseCase")
      )
    );

    // Bind routes
    this.container.set(
      "userRoutes",
      new UserRoutes(this.container.get("userController"))
    );
  }

  get(key) {
    return this.container.get(key);
  }

  getAll() {
    return Object.fromEntries(this.container);
  }
}
