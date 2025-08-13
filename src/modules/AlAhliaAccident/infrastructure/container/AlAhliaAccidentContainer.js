import { MongoAlAhliaAccidentRepository } from "../repositories/MongoAlAhliaAccidentRepository.js";
import { CreateAlAhliaAccidentUseCase } from "../../application/usecases/CreateAlAhliaAccidentUseCase.js";
import { GetAllAlAhliaAccidentsUseCase } from "../../application/usecases/GetAllAlAhliaAccidentsUseCase.js";
import { GetAlAhliaAccidentByIdUseCase } from "../../application/usecases/GetAlAhliaAccidentByIdUseCase.js";
import { DeleteAlAhliaAccidentUseCase } from "../../application/usecases/DeleteAlAhliaAccidentUseCase.js";
import { GetAlAhliaAccidentStatsUseCase } from "../../application/usecases/GetAlAhliaAccidentStatsUseCase.js";
import { AlAhliaAccidentController } from "../../presentation/controllers/AlAhliaAccidentController.js";
import { AlAhliaAccidentRoutes } from "../../presentation/routes/AlAhliaAccidentRoutes.js";

export class AlAhliaAccidentContainer {
  constructor() {
    this.dependencies = new Map();
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Infrastructure layer
    this.dependencies.set(
      "alAhliaAccidentRepository",
      new MongoAlAhliaAccidentRepository()
    );

    // Mock services to avoid circular dependencies
    this.dependencies.set("auditService", {
      logAction: async (data) => {
        console.log("Mock AuditService.logAction:", data);
      },
    });

    this.dependencies.set("notificationService", {
      sendNotification: async (data) => {
        console.log("Mock NotificationService.sendNotification:", data);
      },
    });

    this.dependencies.set("customerRepository", {
      findByPlateNumber: async (plateNumber) => {
        // Mock customer with vehicles
        return {
          getId: () => "mock-customer-id",
          getFullName: () => "Mock Customer",
          getVehicles: () => [
            {
              getPlateNumber: () => plateNumber,
              getType: () => "Car",
              getLastTest: () => new Date(),
              getLicenseExpiry: () => new Date(),
            },
          ],
        };
      },
    });

    // Application layer - Use cases
    this.dependencies.set(
      "createAlAhliaAccidentUseCase",
      new CreateAlAhliaAccidentUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
        customerRepository: this.dependencies.get("customerRepository"),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAllAlAhliaAccidentsUseCase",
      new GetAllAlAhliaAccidentsUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
      })
    );

    this.dependencies.set(
      "getAlAhliaAccidentByIdUseCase",
      new GetAlAhliaAccidentByIdUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
      })
    );

    this.dependencies.set(
      "deleteAlAhliaAccidentUseCase",
      new DeleteAlAhliaAccidentUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAlAhliaAccidentStatsUseCase",
      new GetAlAhliaAccidentStatsUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
      })
    );

    // Presentation layer
    this.dependencies.set(
      "alAhliaAccidentController",
      new AlAhliaAccidentController({
        createAlAhliaAccidentUseCase: this.dependencies.get(
          "createAlAhliaAccidentUseCase"
        ),
        getAllAlAhliaAccidentsUseCase: this.dependencies.get(
          "getAllAlAhliaAccidentsUseCase"
        ),
        getAlAhliaAccidentByIdUseCase: this.dependencies.get(
          "getAlAhliaAccidentByIdUseCase"
        ),
        deleteAlAhliaAccidentUseCase: this.dependencies.get(
          "deleteAlAhliaAccidentUseCase"
        ),
        getAlAhliaAccidentStatsUseCase: this.dependencies.get(
          "getAlAhliaAccidentStatsUseCase"
        ),
      })
    );

    this.dependencies.set(
      "alAhliaAccidentRoutes",
      new AlAhliaAccidentRoutes(
        this.dependencies.get("alAhliaAccidentController")
      )
    );
  }

  get(key) {
    return this.dependencies.get(key);
  }
}

export class AlAhliaAccidentContainerMinimal {
  constructor() {
    this.dependencies = new Map();
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Mock repository
    const mockAlAhliaAccidentRepository = {
      create: async (alAhliaAccident) => {
        console.log(
          "Mock AlAhliaAccidentRepository.create:",
          alAhliaAccident.toJSON()
        );
        return alAhliaAccident;
      },
      findById: async (id) => {
        console.log("Mock AlAhliaAccidentRepository.findById:", id);
        return null; // Return null to simulate not found
      },
      findByCustomerId: async (customerId) => {
        console.log(
          "Mock AlAhliaAccidentRepository.findByCustomerId:",
          customerId
        );
        return [];
      },
      findByPlateNumber: async (plateNumber) => {
        console.log(
          "Mock AlAhliaAccidentRepository.findByPlateNumber:",
          plateNumber
        );
        return [];
      },
      findAll: async () => {
        console.log("Mock AlAhliaAccidentRepository.findAll");
        return [];
      },
      update: async (id, alAhliaAccident) => {
        console.log(
          "Mock AlAhliaAccidentRepository.update:",
          id,
          alAhliaAccident.toJSON()
        );
        return alAhliaAccident;
      },
      delete: async (id) => {
        console.log("Mock AlAhliaAccidentRepository.delete:", id);
        return { id };
      },
      getStats: async () => {
        console.log("Mock AlAhliaAccidentRepository.getStats");
        return {
          totalReports: 0,
          reportsThisMonth: 0,
          reportsThisYear: 0,
          accidentTypeDistribution: [],
          averageThirdPartyVehicles: 0,
          averageThirdPartyInjuries: 0,
        };
      },
      countAccidentReports: async () => {
        console.log("Mock AlAhliaAccidentRepository.countAccidentReports");
        return 0;
      },
      findByDateRange: async (startDate, endDate) => {
        console.log(
          "Mock AlAhliaAccidentRepository.findByDateRange:",
          startDate,
          endDate
        );
        return [];
      },
      findByAccidentType: async (accidentType) => {
        console.log(
          "Mock AlAhliaAccidentRepository.findByAccidentType:",
          accidentType
        );
        return [];
      },
    };

    this.dependencies.set(
      "alAhliaAccidentRepository",
      mockAlAhliaAccidentRepository
    );

    // Mock services
    this.dependencies.set("auditService", {
      logAction: async (data) => {
        console.log("Mock AuditService.logAction:", data);
      },
    });

    this.dependencies.set("notificationService", {
      sendNotification: async (data) => {
        console.log("Mock NotificationService.sendNotification:", data);
      },
    });

    this.dependencies.set("customerRepository", {
      findByPlateNumber: async (plateNumber) => {
        console.log("Mock CustomerRepository.findByPlateNumber:", plateNumber);
        return {
          getId: () => "mock-customer-id",
          getFullName: () => "Mock Customer",
          getVehicles: () => [
            {
              getPlateNumber: () => plateNumber,
              getType: () => "Car",
              getLastTest: () => new Date(),
              getLicenseExpiry: () => new Date(),
            },
          ],
        };
      },
    });

    // Application layer - Use cases
    this.dependencies.set(
      "createAlAhliaAccidentUseCase",
      new CreateAlAhliaAccidentUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
        customerRepository: this.dependencies.get("customerRepository"),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAllAlAhliaAccidentsUseCase",
      new GetAllAlAhliaAccidentsUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
      })
    );

    this.dependencies.set(
      "getAlAhliaAccidentByIdUseCase",
      new GetAlAhliaAccidentByIdUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
      })
    );

    this.dependencies.set(
      "deleteAlAhliaAccidentUseCase",
      new DeleteAlAhliaAccidentUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
        auditService: this.dependencies.get("auditService"),
        notificationService: this.dependencies.get("notificationService"),
      })
    );

    this.dependencies.set(
      "getAlAhliaAccidentStatsUseCase",
      new GetAlAhliaAccidentStatsUseCase({
        alAhliaAccidentRepository: this.dependencies.get(
          "alAhliaAccidentRepository"
        ),
      })
    );

    // Presentation layer
    this.dependencies.set(
      "alAhliaAccidentController",
      new AlAhliaAccidentController({
        createAlAhliaAccidentUseCase: this.dependencies.get(
          "createAlAhliaAccidentUseCase"
        ),
        getAllAlAhliaAccidentsUseCase: this.dependencies.get(
          "getAllAlAhliaAccidentsUseCase"
        ),
        getAlAhliaAccidentByIdUseCase: this.dependencies.get(
          "getAlAhliaAccidentByIdUseCase"
        ),
        deleteAlAhliaAccidentUseCase: this.dependencies.get(
          "deleteAlAhliaAccidentUseCase"
        ),
        getAlAhliaAccidentStatsUseCase: this.dependencies.get(
          "getAlAhliaAccidentStatsUseCase"
        ),
      })
    );

    this.dependencies.set(
      "alAhliaAccidentRoutes",
      new AlAhliaAccidentRoutes(
        this.dependencies.get("alAhliaAccidentController")
      )
    );
  }

  get(key) {
    return this.dependencies.get(key);
  }
}
