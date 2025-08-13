import { MongoAlMashreqAccidentReportRepository } from "../repositories/MongoAlMashreqAccidentReportRepository.js";
import { CreateAlMashreqAccidentReportUseCase } from "../../application/usecases/CreateAlMashreqAccidentReportUseCase.js";
import { GetAllAlMashreqAccidentReportsUseCase } from "../../application/usecases/GetAllAlMashreqAccidentReportsUseCase.js";
import { GetAlMashreqAccidentReportByIdUseCase } from "../../application/usecases/GetAlMashreqAccidentReportByIdUseCase.js";
import { DeleteAlMashreqAccidentReportUseCase } from "../../application/usecases/DeleteAlMashreqAccidentReportUseCase.js";
import { GetAlMashreqAccidentReportStatsUseCase } from "../../application/usecases/GetAlMashreqAccidentReportStatsUseCase.js";
import { AlMashreqAccidentReportController } from "../../presentation/controllers/AlMashreqAccidentReportController.js";
import { AlMashreqAccidentReportRoutes } from "../../presentation/routes/AlMashreqAccidentReportRoutes.js";

export class AlMashreqAccidentReportContainer {
  constructor() {
    this.dependencies = new Map();
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Infrastructure Layer
    this.dependencies.set(
      "alMashreqAccidentReportRepository",
      new MongoAlMashreqAccidentReportRepository()
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
            },
          ],
        };
      },
    });

    // Application Layer - Use Cases
    this.dependencies.set(
      "createAlMashreqAccidentReportUseCase",
      new CreateAlMashreqAccidentReportUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
        customerRepository: this.dependencies.get("customerRepository"),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAllAlMashreqAccidentReportsUseCase",
      new GetAllAlMashreqAccidentReportsUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
      })
    );

    this.dependencies.set(
      "getAlMashreqAccidentReportByIdUseCase",
      new GetAlMashreqAccidentReportByIdUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
      })
    );

    this.dependencies.set(
      "deleteAlMashreqAccidentReportUseCase",
      new DeleteAlMashreqAccidentReportUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAlMashreqAccidentReportStatsUseCase",
      new GetAlMashreqAccidentReportStatsUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
      })
    );

    // Presentation Layer
    this.dependencies.set(
      "alMashreqAccidentReportController",
      new AlMashreqAccidentReportController({
        createAlMashreqAccidentReportUseCase: this.dependencies.get(
          "createAlMashreqAccidentReportUseCase"
        ),
        getAllAlMashreqAccidentReportsUseCase: this.dependencies.get(
          "getAllAlMashreqAccidentReportsUseCase"
        ),
        getAlMashreqAccidentReportByIdUseCase: this.dependencies.get(
          "getAlMashreqAccidentReportByIdUseCase"
        ),
        deleteAlMashreqAccidentReportUseCase: this.dependencies.get(
          "deleteAlMashreqAccidentReportUseCase"
        ),
        getAlMashreqAccidentReportStatsUseCase: this.dependencies.get(
          "getAlMashreqAccidentReportStatsUseCase"
        ),
      })
    );

    this.dependencies.set(
      "alMashreqAccidentReportRoutes",
      new AlMashreqAccidentReportRoutes({
        alMashreqAccidentReportController: this.dependencies.get(
          "alMashreqAccidentReportController"
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
export class AlMashreqAccidentReportContainerMinimal {
  constructor() {
    this.dependencies = new Map();
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Mock repository for testing
    this.dependencies.set("alMashreqAccidentReportRepository", {
      create: async (alMashreqAccidentReport) => {
        console.log("Mock create:", alMashreqAccidentReport.toJSON());
        return alMashreqAccidentReport;
      },
      findById: async (id) => {
        if (id === "test-id") {
          return {
            getId: () => "test-id",
            getCustomerId: () => "test-customer-id",
            getVehicle: () => ({ registrationNumber: "ABC123" }),
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
          averagePersonalInjuries: 2.0,
          averageExternalWitnesses: 1.0,
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
            },
          ],
        };
      },
    });

    // Use Cases with mock dependencies
    this.dependencies.set(
      "createAlMashreqAccidentReportUseCase",
      new CreateAlMashreqAccidentReportUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
        customerRepository: this.dependencies.get("customerRepository"),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAllAlMashreqAccidentReportsUseCase",
      new GetAllAlMashreqAccidentReportsUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
      })
    );

    this.dependencies.set(
      "getAlMashreqAccidentReportByIdUseCase",
      new GetAlMashreqAccidentReportByIdUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
      })
    );

    this.dependencies.set(
      "deleteAlMashreqAccidentReportUseCase",
      new DeleteAlMashreqAccidentReportUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAlMashreqAccidentReportStatsUseCase",
      new GetAlMashreqAccidentReportStatsUseCase({
        alMashreqAccidentReportRepository: this.dependencies.get(
          "alMashreqAccidentReportRepository"
        ),
      })
    );

    // Controller
    this.dependencies.set(
      "alMashreqAccidentReportController",
      new AlMashreqAccidentReportController({
        createAlMashreqAccidentReportUseCase: this.dependencies.get(
          "createAlMashreqAccidentReportUseCase"
        ),
        getAllAlMashreqAccidentReportsUseCase: this.dependencies.get(
          "getAllAlMashreqAccidentReportsUseCase"
        ),
        getAlMashreqAccidentReportByIdUseCase: this.dependencies.get(
          "getAlMashreqAccidentReportByIdUseCase"
        ),
        deleteAlMashreqAccidentReportUseCase: this.dependencies.get(
          "deleteAlMashreqAccidentReportUseCase"
        ),
        getAlMashreqAccidentReportStatsUseCase: this.dependencies.get(
          "getAlMashreqAccidentReportStatsUseCase"
        ),
      })
    );

    // Routes
    this.dependencies.set(
      "alMashreqAccidentReportRoutes",
      new AlMashreqAccidentReportRoutes({
        alMashreqAccidentReportController: this.dependencies.get(
          "alMashreqAccidentReportController"
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
