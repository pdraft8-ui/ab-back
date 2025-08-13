import { MongoInsuranceCompanyRepository } from "../repositories/MongoInsuranceCompanyRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { InsuranceCompany } from "../../domain/entities/InsuranceCompany.entity.js";

// Use Cases
import { CreateInsuranceCompanyUseCase } from "../../application/usecases/CreateInsuranceCompanyUseCase.js";
import { GetAllInsuranceCompaniesUseCase } from "../../application/usecases/GetAllInsuranceCompaniesUseCase.js";
import { GetInsuranceCompanyByIdUseCase } from "../../application/usecases/GetInsuranceCompanyByIdUseCase.js";
import { UpdateInsuranceCompanyUseCase } from "../../application/usecases/UpdateInsuranceCompanyUseCase.js";
import { DeleteInsuranceCompanyUseCase } from "../../application/usecases/DeleteInsuranceCompanyUseCase.js";
import { GetInsuranceCompanyStatsUseCase } from "../../application/usecases/GetInsuranceCompanyStatsUseCase.js";

// Presentation
import { InsuranceCompanyController } from "../../presentation/controllers/InsuranceCompanyController.js";
import { InsuranceCompanyRoutes } from "../../presentation/routes/InsuranceCompanyRoutes.js";

export class InsuranceCompanyContainer {
  constructor() {
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Infrastructure
    this.insuranceCompanyRepository = new MongoInsuranceCompanyRepository();
    this.auditService = new AuditService();

    // Create a simple mock notification service to avoid circular dependency
    this.notificationService = {
      sendNotification: async (notificationData) => {
        console.log(
          `[NOTIFICATION] Sending notification: ${notificationData.message}`
        );
        return [
          {
            id: "notification-id",
            recipient: notificationData.recipients?.[0] || "user-123",
            sender: notificationData.senderId,
            message: notificationData.message,
            isRead: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      },
      getNotifications: async (userId, filters = {}) => ({
        notifications: [],
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      }),
      getNotificationById: async (id) => null,
      markAsRead: async (notificationId, userId) => null,
      markAllAsRead: async (userId) => ({
        modifiedCount: 0,
        message: "No notifications to mark as read",
      }),
      deleteNotification: async (notificationId, userId) => null,
      getNotificationStats: async (userId) => ({
        totalNotifications: 0,
        unreadNotifications: 0,
        readNotifications: 0,
        todayNotifications: 0,
        weeklyNotifications: 0,
        readPercentage: 0,
      }),
    };

    // Use Cases
    this.createInsuranceCompanyUseCase = new CreateInsuranceCompanyUseCase(
      this.insuranceCompanyRepository,
      this.auditService,
      this.notificationService
    );
    this.getAllInsuranceCompaniesUseCase = new GetAllInsuranceCompaniesUseCase(
      this.insuranceCompanyRepository
    );
    this.getInsuranceCompanyByIdUseCase = new GetInsuranceCompanyByIdUseCase(
      this.insuranceCompanyRepository
    );
    this.updateInsuranceCompanyUseCase = new UpdateInsuranceCompanyUseCase(
      this.insuranceCompanyRepository,
      this.auditService
    );
    this.deleteInsuranceCompanyUseCase = new DeleteInsuranceCompanyUseCase(
      this.insuranceCompanyRepository,
      this.auditService
    );
    this.getInsuranceCompanyStatsUseCase = new GetInsuranceCompanyStatsUseCase(
      this.insuranceCompanyRepository
    );

    // Presentation
    this.insuranceCompanyController = new InsuranceCompanyController(
      this.createInsuranceCompanyUseCase,
      this.getAllInsuranceCompaniesUseCase,
      this.getInsuranceCompanyByIdUseCase,
      this.updateInsuranceCompanyUseCase,
      this.deleteInsuranceCompanyUseCase,
      this.getInsuranceCompanyStatsUseCase
    );
    this.insuranceCompanyRoutes = new InsuranceCompanyRoutes(
      this.insuranceCompanyController
    );
  }

  // Getters for use cases
  getCreateInsuranceCompanyUseCase() {
    return this.createInsuranceCompanyUseCase;
  }

  getGetAllInsuranceCompaniesUseCase() {
    return this.getAllInsuranceCompaniesUseCase;
  }

  getGetInsuranceCompanyByIdUseCase() {
    return this.getInsuranceCompanyByIdUseCase;
  }

  getUpdateInsuranceCompanyUseCase() {
    return this.updateInsuranceCompanyUseCase;
  }

  getDeleteInsuranceCompanyUseCase() {
    return this.deleteInsuranceCompanyUseCase;
  }

  getGetInsuranceCompanyStatsUseCase() {
    return this.getInsuranceCompanyStatsUseCase;
  }

  // Getters for presentation
  getInsuranceCompanyController() {
    return this.insuranceCompanyController;
  }

  getInsuranceCompanyRoutes() {
    return this.insuranceCompanyRoutes;
  }

  // Getters for infrastructure
  getInsuranceCompanyRepository() {
    return this.insuranceCompanyRepository;
  }

  getAuditService() {
    return this.auditService;
  }

  getNotificationService() {
    return this.notificationService;
  }
}

export class InsuranceCompanyContainerMinimal {
  constructor() {
    this.mockInsuranceCompanyRepository = {
      create: async (data) => new InsuranceCompany({ id: "mock-id", ...data }),
      findById: async (id) =>
        new InsuranceCompany({
          id,
          name: "Mock Insurance Co",
          insuranceType: "mandatory",
        }),
      findByName: async (name) => null, // Return null to indicate no existing company with this name
      findAll: async () => [
        new InsuranceCompany({
          id: "1",
          name: "Mock Insurance Co 1",
          insuranceType: "mandatory",
        }),
        new InsuranceCompany({
          id: "2",
          name: "Mock Insurance Co 2",
          insuranceType: "thirdPartyComprehensive",
        }),
      ],
      findByInsuranceType: async (type) => [
        new InsuranceCompany({
          id: "1",
          name: "Mock Insurance Co",
          insuranceType: type,
        }),
      ],
      update: async (id, data) => new InsuranceCompany({ id, ...data }),
      delete: async (id) => true,
      addRate: async (id, rateType, rateData) =>
        new InsuranceCompany({ id, rates: { [rateType]: rateData } }),
      updateRate: async (id, rateType, rateData) =>
        new InsuranceCompany({ id, rates: { [rateType]: rateData } }),
      removeRate: async (id, rateType) =>
        new InsuranceCompany({ id, rates: {} }),
      getStats: async () => ({
        totalCompanies: 2,
        mandatoryCompanies: 1,
        comprehensiveCompanies: 1,
        companiesWithRates: 1,
        companiesWithoutRates: 1,
      }),
      countCompanies: async () => 2,
      findCompaniesWithRates: async () => [
        new InsuranceCompany({
          id: "1",
          name: "Mock Insurance Co",
          insuranceType: "thirdPartyComprehensive",
          rates: { test: {} },
        }),
      ],
    };

    this.mockAuditService = {
      logAction: async (data) => ({ success: true, message: "Audit logged" }),
    };

    this.mockNotificationService = {
      sendNotification: async (data) => ({
        success: true,
        message: "Notification sent",
      }),
    };

    // Use Cases with mocks
    this.createInsuranceCompanyUseCase = new CreateInsuranceCompanyUseCase(
      this.mockInsuranceCompanyRepository,
      this.mockAuditService,
      this.mockNotificationService
    );
    this.getAllInsuranceCompaniesUseCase = new GetAllInsuranceCompaniesUseCase(
      this.mockInsuranceCompanyRepository
    );
    this.getInsuranceCompanyByIdUseCase = new GetInsuranceCompanyByIdUseCase(
      this.mockInsuranceCompanyRepository
    );
    this.updateInsuranceCompanyUseCase = new UpdateInsuranceCompanyUseCase(
      this.mockInsuranceCompanyRepository,
      this.mockAuditService
    );
    this.deleteInsuranceCompanyUseCase = new DeleteInsuranceCompanyUseCase(
      this.mockInsuranceCompanyRepository,
      this.mockAuditService
    );
    this.getInsuranceCompanyStatsUseCase = new GetInsuranceCompanyStatsUseCase(
      this.mockInsuranceCompanyRepository
    );

    // Controller with mocks
    this.insuranceCompanyController = new InsuranceCompanyController(
      this.createInsuranceCompanyUseCase,
      this.getAllInsuranceCompaniesUseCase,
      this.getInsuranceCompanyByIdUseCase,
      this.updateInsuranceCompanyUseCase,
      this.deleteInsuranceCompanyUseCase,
      this.getInsuranceCompanyStatsUseCase
    );

    // Routes with mocks
    this.insuranceCompanyRoutes = new InsuranceCompanyRoutes(
      this.insuranceCompanyController
    );
  }

  // Getters for use cases
  getCreateInsuranceCompanyUseCase() {
    return this.createInsuranceCompanyUseCase;
  }

  getGetAllInsuranceCompaniesUseCase() {
    return this.getAllInsuranceCompaniesUseCase;
  }

  getGetInsuranceCompanyByIdUseCase() {
    return this.getInsuranceCompanyByIdUseCase;
  }

  getUpdateInsuranceCompanyUseCase() {
    return this.updateInsuranceCompanyUseCase;
  }

  getDeleteInsuranceCompanyUseCase() {
    return this.deleteInsuranceCompanyUseCase;
  }

  getGetInsuranceCompanyStatsUseCase() {
    return this.getInsuranceCompanyStatsUseCase;
  }

  // Getters for presentation
  getInsuranceCompanyController() {
    return this.insuranceCompanyController;
  }

  getInsuranceCompanyRoutes() {
    return this.insuranceCompanyRoutes;
  }

  // Getters for mocks
  getMockInsuranceCompanyRepository() {
    return this.mockInsuranceCompanyRepository;
  }

  getMockAuditService() {
    return this.mockAuditService;
  }

  getMockNotificationService() {
    return this.mockNotificationService;
  }
}
