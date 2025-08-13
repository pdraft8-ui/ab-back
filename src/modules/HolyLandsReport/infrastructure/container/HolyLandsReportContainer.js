import { MongoHolyLandsReportRepository } from "../repositories/MongoHolyLandsReportRepository.js";
import { CreateHolyLandsReportUseCase } from "../../application/usecases/CreateHolyLandsReportUseCase.js";
import { GetAllHolyLandsReportsUseCase } from "../../application/usecases/GetAllHolyLandsReportsUseCase.js";
import { GetHolyLandsReportByIdUseCase } from "../../application/usecases/GetHolyLandsReportByIdUseCase.js";
import { DeleteHolyLandsReportUseCase } from "../../application/usecases/DeleteHolyLandsReportUseCase.js";
import { GetHolyLandsReportStatsUseCase } from "../../application/usecases/GetHolyLandsReportStatsUseCase.js";
import { HolyLandsReportController } from "../../presentation/controllers/HolyLandsReportController.js";
import { HolyLandsReportRoutes } from "../../presentation/routes/HolyLandsReportRoutes.js";

export class HolyLandsReportContainer {
  constructor() {
    this.dependencies = new Map();
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Infrastructure Layer
    this.dependencies.set(
      "holyLandsReportRepository",
      new MongoHolyLandsReportRepository()
    );

    // Mock services to avoid circular dependencies
    this.dependencies.set("auditService", {
      logAction: async (data) => {
        console.log("Mock AuditService.logAction:", data);
        return { success: true };
      },
    });

    this.dependencies.set("notificationService", {
      sendNotification: async (data) => {
        console.log("Mock NotificationService.sendNotification:", data);
        return { success: true };
      },
    });

    this.dependencies.set("customerRepository", {
      findByPlateNumber: async (plateNumber) => {
        // Mock customer for testing
        return {
          getId: () => "mock-customer-id",
          getFullName: () => "Mock Customer",
          getPhoneNumber: () => "+1234567890",
          getCity: () => "Mock City",
          getVehicles: () => [
            {
              getPlateNumber: () => plateNumber,
              getType: () => "Sedan",
              getMake: () => "Toyota",
              getModel: () => "Camry",
              getYear: () => 2020,
              getColor: () => "White",
              getUsage: () => "Personal",
              getLicenseExpiry: () => new Date("2025-12-31"),
              getModelNumber: () => 2020,
              getOwnership: () => "Personal",
            },
          ],
        };
      },
    });

    // Application Layer - Use Cases
    this.dependencies.set(
      "createHolyLandsReportUseCase",
      new CreateHolyLandsReportUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
        customerRepository: this.dependencies.get("customerRepository"),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAllHolyLandsReportsUseCase",
      new GetAllHolyLandsReportsUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
      })
    );

    this.dependencies.set(
      "getHolyLandsReportByIdUseCase",
      new GetHolyLandsReportByIdUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
      })
    );

    this.dependencies.set(
      "deleteHolyLandsReportUseCase",
      new DeleteHolyLandsReportUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getHolyLandsReportStatsUseCase",
      new GetHolyLandsReportStatsUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
      })
    );

    // Presentation Layer
    this.dependencies.set(
      "holyLandsReportController",
      new HolyLandsReportController({
        createHolyLandsReportUseCase: this.dependencies.get(
          "createHolyLandsReportUseCase"
        ),
        getAllHolyLandsReportsUseCase: this.dependencies.get(
          "getAllHolyLandsReportsUseCase"
        ),
        getHolyLandsReportByIdUseCase: this.dependencies.get(
          "getHolyLandsReportByIdUseCase"
        ),
        deleteHolyLandsReportUseCase: this.dependencies.get(
          "deleteHolyLandsReportUseCase"
        ),
        getHolyLandsReportStatsUseCase: this.dependencies.get(
          "getHolyLandsReportStatsUseCase"
        ),
      })
    );

    this.dependencies.set(
      "holyLandsReportRoutes",
      new HolyLandsReportRoutes({
        holyLandsReportController: this.dependencies.get(
          "holyLandsReportController"
        ),
      })
    );
  }

  get(dependencyName) {
    return this.dependencies.get(dependencyName);
  }

  getAll() {
    return this.dependencies;
  }
}

// Minimal container for testing
export class HolyLandsReportContainerMinimal {
  constructor() {
    this.dependencies = new Map();
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Mock repository for testing
    this.dependencies.set("holyLandsReportRepository", {
      create: async (holyLandsReport) => {
        console.log("Mock create:", holyLandsReport.toJSON());
        return holyLandsReport;
      },
      findById: async (id) => {
        if (id === "test-id") {
          return {
            getId: () => "test-id",
            getCustomerId: () => "test-customer-id",
            getVehicleDetails: () => ({ plateNumber: "ABC123" }),
            toJSON: () => ({ id: "test-id", customerId: "test-customer-id" }),
            isValid: () => true,
          };
        }
        return null;
      },
      findAll: async () => {
        return [
          {
            getId: () => "test-id-1",
            toJSON: () => ({ id: "test-id-1" }),
          },
          {
            getId: () => "test-id-2",
            toJSON: () => ({ id: "test-id-2" }),
          },
        ];
      },
      delete: async (id) => {
        console.log("Mock delete:", id);
        return { message: "Deleted successfully" };
      },
      getStats: async () => {
        return {
          totalReports: 10,
          reportsThisMonth: 2,
          reportsThisYear: 5,
          accidentTypeDistribution: [],
          averageOtherVehicles: 1.5,
          averageInjuries: 2.0,
        };
      },
    });

    // Mock services
    this.dependencies.set("auditService", {
      logAction: async (data) => {
        console.log("Mock AuditService.logAction:", data);
        return { success: true };
      },
    });

    this.dependencies.set("notificationService", {
      sendNotification: async (data) => {
        console.log("Mock NotificationService.sendNotification:", data);
        return { success: true };
      },
    });

    this.dependencies.set("customerRepository", {
      findByPlateNumber: async (plateNumber) => {
        return {
          getId: () => "mock-customer-id",
          getFullName: () => "Mock Customer",
          getPhoneNumber: () => "+1234567890",
          getCity: () => "Mock City",
          getVehicles: () => [
            {
              getPlateNumber: () => plateNumber,
              getType: () => "Sedan",
              getMake: () => "Toyota",
              getModel: () => "Camry",
              getYear: () => 2020,
              getColor: () => "White",
              getUsage: () => "Personal",
              getLicenseExpiry: () => new Date("2025-12-31"),
              getModelNumber: () => 2020,
              getOwnership: () => "Personal",
            },
          ],
        };
      },
    });

    // Use Cases with mock dependencies
    this.dependencies.set(
      "createHolyLandsReportUseCase",
      new CreateHolyLandsReportUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
        customerRepository: this.dependencies.get("customerRepository"),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAllHolyLandsReportsUseCase",
      new GetAllHolyLandsReportsUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
      })
    );

    this.dependencies.set(
      "getHolyLandsReportByIdUseCase",
      new GetHolyLandsReportByIdUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
      })
    );

    this.dependencies.set(
      "deleteHolyLandsReportUseCase",
      new DeleteHolyLandsReportUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getHolyLandsReportStatsUseCase",
      new GetHolyLandsReportStatsUseCase({
        holyLandsReportRepository: this.dependencies.get(
          "holyLandsReportRepository"
        ),
      })
    );

    // Controller
    this.dependencies.set(
      "holyLandsReportController",
      new HolyLandsReportController({
        createHolyLandsReportUseCase: this.dependencies.get(
          "createHolyLandsReportUseCase"
        ),
        getAllHolyLandsReportsUseCase: this.dependencies.get(
          "getAllHolyLandsReportsUseCase"
        ),
        getHolyLandsReportByIdUseCase: this.dependencies.get(
          "getHolyLandsReportByIdUseCase"
        ),
        deleteHolyLandsReportUseCase: this.dependencies.get(
          "deleteHolyLandsReportUseCase"
        ),
        getHolyLandsReportStatsUseCase: this.dependencies.get(
          "getHolyLandsReportStatsUseCase"
        ),
      })
    );

    // Routes
    this.dependencies.set(
      "holyLandsReportRoutes",
      new HolyLandsReportRoutes({
        holyLandsReportController: this.dependencies.get(
          "holyLandsReportController"
        ),
      })
    );
  }

  get(dependencyName) {
    return this.dependencies.get(dependencyName);
  }

  getAll() {
    return this.dependencies;
  }
}
