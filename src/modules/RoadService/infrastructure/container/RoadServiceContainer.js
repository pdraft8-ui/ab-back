import { MongoRoadServiceRepository } from "../repositories/MongoRoadServiceRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { RoadService } from "../../domain/entities/RoadService.entity.js";

// Use Cases
import { CreateRoadServiceUseCase } from "../../application/usecases/CreateRoadServiceUseCase.js";
import { GetAllRoadServicesUseCase } from "../../application/usecases/GetAllRoadServicesUseCase.js";
import { GetRoadServiceByIdUseCase } from "../../application/usecases/GetRoadServiceByIdUseCase.js";
import { UpdateRoadServiceUseCase } from "../../application/usecases/UpdateRoadServiceUseCase.js";
import { DeleteRoadServiceUseCase } from "../../application/usecases/DeleteRoadServiceUseCase.js";
import { GetRoadServiceStatsUseCase } from "../../application/usecases/GetRoadServiceStatsUseCase.js";

// Presentation
import { RoadServiceController } from "../../presentation/controllers/RoadServiceController.js";
import { RoadServiceRoutes } from "../../presentation/routes/RoadServiceRoutes.js";

export class RoadServiceContainer {
  constructor() {
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Infrastructure
    this.roadServiceRepository = new MongoRoadServiceRepository();
    this.auditService = new AuditService();

    // Use Cases
    this.createRoadServiceUseCase = new CreateRoadServiceUseCase(
      this.roadServiceRepository,
      this.auditService
    );
    this.getAllRoadServicesUseCase = new GetAllRoadServicesUseCase(
      this.roadServiceRepository
    );
    this.getRoadServiceByIdUseCase = new GetRoadServiceByIdUseCase(
      this.roadServiceRepository
    );
    this.updateRoadServiceUseCase = new UpdateRoadServiceUseCase(
      this.roadServiceRepository,
      this.auditService
    );
    this.deleteRoadServiceUseCase = new DeleteRoadServiceUseCase(
      this.roadServiceRepository,
      this.auditService
    );
    this.getRoadServiceStatsUseCase = new GetRoadServiceStatsUseCase(
      this.roadServiceRepository
    );

    // Presentation
    this.roadServiceController = new RoadServiceController(
      this.createRoadServiceUseCase,
      this.getAllRoadServicesUseCase,
      this.getRoadServiceByIdUseCase,
      this.updateRoadServiceUseCase,
      this.deleteRoadServiceUseCase,
      this.getRoadServiceStatsUseCase
    );
    this.roadServiceRoutes = new RoadServiceRoutes(this.roadServiceController);
  }

  // Getters for use cases
  getCreateRoadServiceUseCase() {
    return this.createRoadServiceUseCase;
  }

  getGetAllRoadServicesUseCase() {
    return this.getAllRoadServicesUseCase;
  }

  getGetRoadServiceByIdUseCase() {
    return this.getRoadServiceByIdUseCase;
  }

  getUpdateRoadServiceUseCase() {
    return this.updateRoadServiceUseCase;
  }

  getDeleteRoadServiceUseCase() {
    return this.deleteRoadServiceUseCase;
  }

  getGetRoadServiceStatsUseCase() {
    return this.getRoadServiceStatsUseCase;
  }

  // Getters for presentation
  getRoadServiceController() {
    return this.roadServiceController;
  }

  getRoadServiceRoutes() {
    return this.roadServiceRoutes;
  }

  // Getters for infrastructure
  getRoadServiceRepository() {
    return this.roadServiceRepository;
  }

  getAuditService() {
    return this.auditService;
  }
}

export class RoadServiceContainerMinimal {
  constructor() {
    this.mockRoadServiceRepository = {
      create: async (data) => new RoadService({ id: "mock-id", ...data }),
      findById: async (id) =>
        new RoadService({
          id,
          companyName: "Mock Road Service",
          serviceType: "خدمات طريق",
          amount: 1000,
          amountUnder2007: 1500,
        }),
      findByName: async (name) => null, // Return null to indicate no existing service
      findAll: async () => [
        new RoadService({
          id: "1",
          companyName: "Mock Road Service 1",
          serviceType: "خدمات طريق",
          amount: 1000,
          amountUnder2007: 1500,
        }),
        new RoadService({
          id: "2",
          companyName: "Mock Road Service 2",
          serviceType: "خدمات طريق",
          amount: 2000,
          amountUnder2007: 2500,
        }),
      ],
      update: async (id, data) => new RoadService({ id, ...data }),
      delete: async (id) =>
        new RoadService({ id, companyName: "Deleted Service" }),
      getStats: async () => ({
        totalServices: 2,
        servicesUnder2007: 1,
        servicesOver2007: 1,
        averageAmount: 1500,
        averageAmountUnder2007: 2000,
      }),
      countServices: async () => 2,
    };

    this.mockAuditService = {
      logAction: async (data) => ({ success: true, message: "Audit logged" }),
    };

    // Use Cases with mocks
    this.createRoadServiceUseCase = new CreateRoadServiceUseCase(
      this.mockRoadServiceRepository,
      this.mockAuditService
    );
    this.getAllRoadServicesUseCase = new GetAllRoadServicesUseCase(
      this.mockRoadServiceRepository
    );
    this.getRoadServiceByIdUseCase = new GetRoadServiceByIdUseCase(
      this.mockRoadServiceRepository
    );
    this.updateRoadServiceUseCase = new UpdateRoadServiceUseCase(
      this.mockRoadServiceRepository,
      this.mockAuditService
    );
    this.deleteRoadServiceUseCase = new DeleteRoadServiceUseCase(
      this.mockRoadServiceRepository,
      this.mockAuditService
    );
    this.getRoadServiceStatsUseCase = new GetRoadServiceStatsUseCase(
      this.mockRoadServiceRepository
    );

    // Controller with mocks
    this.roadServiceController = new RoadServiceController(
      this.createRoadServiceUseCase,
      this.getAllRoadServicesUseCase,
      this.getRoadServiceByIdUseCase,
      this.updateRoadServiceUseCase,
      this.deleteRoadServiceUseCase,
      this.getRoadServiceStatsUseCase
    );

    // Routes with mocks
    this.roadServiceRoutes = new RoadServiceRoutes(this.roadServiceController);
  }

  // Getters for use cases
  getCreateRoadServiceUseCase() {
    return this.createRoadServiceUseCase;
  }

  getGetAllRoadServicesUseCase() {
    return this.getAllRoadServicesUseCase;
  }

  getGetRoadServiceByIdUseCase() {
    return this.getRoadServiceByIdUseCase;
  }

  getUpdateRoadServiceUseCase() {
    return this.updateRoadServiceUseCase;
  }

  getDeleteRoadServiceUseCase() {
    return this.deleteRoadServiceUseCase;
  }

  getGetRoadServiceStatsUseCase() {
    return this.getRoadServiceStatsUseCase;
  }

  // Getters for presentation
  getRoadServiceController() {
    return this.roadServiceController;
  }

  getRoadServiceRoutes() {
    return this.roadServiceRoutes;
  }

  // Getters for mocks
  getMockRoadServiceRepository() {
    return this.mockRoadServiceRepository;
  }

  getMockAuditService() {
    return this.mockAuditService;
  }
}
