import { MongoTrustAccidentReportRepository } from "../repositories/MongoTrustAccidentReportRepository.js";
import { CreateTrustAccidentReportUseCase } from "../../application/usecases/CreateTrustAccidentReportUseCase.js";
import { GetAllTrustAccidentReportsUseCase } from "../../application/usecases/GetAllTrustAccidentReportsUseCase.js";
import { GetTrustAccidentReportByIdUseCase } from "../../application/usecases/GetTrustAccidentReportByIdUseCase.js";
import { DeleteTrustAccidentReportUseCase } from "../../application/usecases/DeleteTrustAccidentReportUseCase.js";
import { GetTrustAccidentReportStatsUseCase } from "../../application/usecases/GetTrustAccidentReportStatsUseCase.js";
import { TrustAccidentReportController } from "../../presentation/controllers/TrustAccidentReportController.js";
import { TrustAccidentReportRoutes } from "../../presentation/routes/TrustAccidentReportRoutes.js";
import { TrustAccidentReport } from "../../domain/entities/TrustAccidentReport.entity.js";

export class TrustAccidentReportContainer {
  constructor() {
    this.dependencies = new Map();
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Bind repositories
    this.dependencies.set(
      "trustAccidentReportRepository",
      new MongoTrustAccidentReportRepository()
    );

    // Bind services (using mocks to avoid circular dependencies)
    this.dependencies.set("auditService", {
      logAction: async (auditData) => {
        console.log("Audit logged:", auditData);
        return { success: true };
      },
    });

    this.dependencies.set("notificationService", {
      sendNotification: async (notificationData) => {
        console.log("Notification sent:", notificationData);
        return { success: true };
      },
    });

    // Mock customer repository for testing
    this.dependencies.set("customerRepository", {
      findByPlateNumber: async (plateNumber) => {
        // Mock customer with vehicles
        return {
          getId: () => "mock-customer-id",
          getVehicles: () => [
            {
              plateNumber: plateNumber,
              type: "Car",
              model: "Toyota",
              color: "White",
              ownership: "Owner",
            },
          ],
        };
      },
    });

    // Bind use cases
    this.dependencies.set(
      "createTrustAccidentReportUseCase",
      new CreateTrustAccidentReportUseCase(
        this.dependencies.get("trustAccidentReportRepository"),
        this.dependencies.get("customerRepository"),
        this.dependencies.get("auditService"),
        this.dependencies.get("notificationService")
      )
    );

    this.dependencies.set(
      "getAllTrustAccidentReportsUseCase",
      new GetAllTrustAccidentReportsUseCase(
        this.dependencies.get("trustAccidentReportRepository")
      )
    );

    this.dependencies.set(
      "getTrustAccidentReportByIdUseCase",
      new GetTrustAccidentReportByIdUseCase(
        this.dependencies.get("trustAccidentReportRepository")
      )
    );

    this.dependencies.set(
      "deleteTrustAccidentReportUseCase",
      new DeleteTrustAccidentReportUseCase(
        this.dependencies.get("trustAccidentReportRepository"),
        this.dependencies.get("auditService"),
        this.dependencies.get("notificationService")
      )
    );

    this.dependencies.set(
      "getTrustAccidentReportStatsUseCase",
      new GetTrustAccidentReportStatsUseCase(
        this.dependencies.get("trustAccidentReportRepository")
      )
    );

    // Bind controller
    this.dependencies.set(
      "trustAccidentReportController",
      new TrustAccidentReportController(
        this.dependencies.get("createTrustAccidentReportUseCase"),
        this.dependencies.get("getAllTrustAccidentReportsUseCase"),
        this.dependencies.get("getTrustAccidentReportByIdUseCase"),
        this.dependencies.get("deleteTrustAccidentReportUseCase"),
        this.dependencies.get("getTrustAccidentReportStatsUseCase")
      )
    );

    // Bind routes
    this.dependencies.set(
      "trustAccidentReportRoutes",
      new TrustAccidentReportRoutes(
        this.dependencies.get("trustAccidentReportController")
      )
    );
  }

  get(key) {
    return this.dependencies.get(key);
  }

  getAll() {
    return this.dependencies;
  }
}

// Minimal container for testing
export class TrustAccidentReportContainerMinimal {
  constructor() {
    this.dependencies = new Map();
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Mock repository
    const mockTrustAccidentReportRepository = {
      create: async (trustAccidentReport) => {
        console.log("Mock create called with:", trustAccidentReport.toJSON());
        return trustAccidentReport;
      },
      findById: async (id) => {
        if (id === "non-existent-id") return null;
        return TrustAccidentReport.create({
          id,
          customerId: "mock-customer-id",
          accidentDetails: {
            location: "Test Location",
            date: new Date(),
            time: "10:00 AM",
            accidentType: "Collision",
            reportDate: new Date(),
          },
          customerVehicle: {
            plateNumber: "ABC123",
            type: "Car",
            model: "Toyota",
            color: "White",
            ownership: "Owner",
            usage: "Personal",
            manufactureYear: "2020",
            chassisNumber: "CHASSIS123",
            testExpiry: new Date(),
            insuranceCompany: "Test Insurance",
            policyNumber: "POL123",
            insuranceType: "Comprehensive",
            insurancePeriod: {
              from: new Date(),
              to: new Date(),
            },
          },
          driverDetails: {
            name: "John Doe",
            birthDate: new Date(),
            address: "Test Address",
            licenseNumber: "LIC123",
            licenseType: "B",
            licenseExpiry: new Date(),
            relationToCustomer: "Self",
          },
          damages: {
            front: "Minor damage",
            back: "No damage",
            right: "No damage",
            left: "No damage",
            estimatedCost: "5000",
            garageName: "Test Garage",
            towCompany: "Test Tow",
          },
          otherVehicle: {
            plateNumber: "XYZ789",
            type: "Car",
            model: "Honda",
            color: "Black",
            insuranceCompany: "Other Insurance",
            driverName: "Jane Smith",
            driverAddress: "Other Address",
            licenseNumber: "LIC456",
            damageDescription: "Minor damage",
          },
          witnesses: [
            {
              name: "Witness 1",
              address: "Witness Address",
              phone: "123456789",
            },
          ],
          policeReport: {
            reportDate: new Date(),
            authority: "Test Police",
            sketchDrawn: true,
            officersPresent: true,
          },
          narration: "Test accident description",
          signature: "Test Signature",
          declaration: {
            declarerName: "John Doe",
            declarationDate: new Date(),
            reviewerName: "Reviewer",
            reviewerSignature: "Reviewer Signature",
            reviewDate: new Date(),
          },
        });
      },
      findAll: async () => {
        return [
          TrustAccidentReport.create({
            id: "report-1",
            customerId: "customer-1",
            accidentDetails: {
              location: "Test Location 1",
              date: new Date(),
              time: "10:00 AM",
              accidentType: "Collision",
              reportDate: new Date(),
            },
            customerVehicle: {
              plateNumber: "ABC123",
              type: "Car",
              model: "Toyota",
              color: "White",
              ownership: "Owner",
              usage: "Personal",
              manufactureYear: "2020",
              chassisNumber: "CHASSIS123",
              testExpiry: new Date(),
              insuranceCompany: "Test Insurance",
              policyNumber: "POL123",
              insuranceType: "Comprehensive",
              insurancePeriod: {
                from: new Date(),
                to: new Date(),
              },
            },
            driverDetails: {
              name: "John Doe",
              birthDate: new Date(),
              address: "Test Address",
              licenseNumber: "LIC123",
              licenseType: "B",
              licenseExpiry: new Date(),
              relationToCustomer: "Self",
            },
            damages: {
              front: "Minor damage",
              back: "No damage",
              right: "No damage",
              left: "No damage",
              estimatedCost: "5000",
              garageName: "Test Garage",
              towCompany: "Test Tow",
            },
            otherVehicle: {
              plateNumber: "XYZ789",
              type: "Car",
              model: "Honda",
              color: "Black",
              insuranceCompany: "Other Insurance",
              driverName: "Jane Smith",
              driverAddress: "Other Address",
              licenseNumber: "LIC456",
              damageDescription: "Minor damage",
            },
            witnesses: [
              {
                name: "Witness 1",
                address: "Witness Address",
                phone: "123456789",
              },
            ],
            policeReport: {
              reportDate: new Date(),
              authority: "Test Police",
              sketchDrawn: true,
              officersPresent: true,
            },
            narration: "Test accident description",
            signature: "Test Signature",
            declaration: {
              declarerName: "John Doe",
              declarationDate: new Date(),
              reviewerName: "Reviewer",
              reviewerSignature: "Reviewer Signature",
              reviewDate: new Date(),
            },
          }),
        ];
      },
      delete: async (id) => {
        if (id === "non-existent-id") return null;
        return TrustAccidentReport.create({
          id,
          customerId: "mock-customer-id",
          accidentDetails: {
            location: "Test Location",
            date: new Date(),
            time: "10:00 AM",
            accidentType: "Collision",
            reportDate: new Date(),
          },
          customerVehicle: {
            plateNumber: "ABC123",
            type: "Car",
            model: "Toyota",
            color: "White",
            ownership: "Owner",
            usage: "Personal",
            manufactureYear: "2020",
            chassisNumber: "CHASSIS123",
            testExpiry: new Date(),
            insuranceCompany: "Test Insurance",
            policyNumber: "POL123",
            insuranceType: "Comprehensive",
            insurancePeriod: {
              from: new Date(),
              to: new Date(),
            },
          },
          driverDetails: {
            name: "John Doe",
            birthDate: new Date(),
            address: "Test Address",
            licenseNumber: "LIC123",
            licenseType: "B",
            licenseExpiry: new Date(),
            relationToCustomer: "Self",
          },
          damages: {
            front: "Minor damage",
            back: "No damage",
            right: "No damage",
            left: "No damage",
            estimatedCost: "5000",
            garageName: "Test Garage",
            towCompany: "Test Tow",
          },
          otherVehicle: {
            plateNumber: "XYZ789",
            type: "Car",
            model: "Honda",
            color: "Black",
            insuranceCompany: "Other Insurance",
            driverName: "Jane Smith",
            driverAddress: "Other Address",
            licenseNumber: "LIC456",
            damageDescription: "Minor damage",
          },
          witnesses: [
            {
              name: "Witness 1",
              address: "Witness Address",
              phone: "123456789",
            },
          ],
          policeReport: {
            reportDate: new Date(),
            authority: "Test Police",
            sketchDrawn: true,
            officersPresent: true,
          },
          narration: "Test accident description",
          signature: "Test Signature",
          declaration: {
            declarerName: "John Doe",
            declarationDate: new Date(),
            reviewerName: "Reviewer",
            reviewerSignature: "Reviewer Signature",
            reviewDate: new Date(),
          },
        });
      },
      getStats: async () => {
        return {
          totalReports: 1,
          reportsThisMonth: 1,
          accidentTypes: [{ _id: "Collision", count: 1 }],
          monthlyStats: [
            {
              _id: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
              },
              count: 1,
            },
          ],
          averageReportsPerMonth: "1.00",
        };
      },
    };

    // Mock services
    const mockAuditService = {
      logAction: async (auditData) => {
        console.log("Mock audit logged:", auditData);
        return { success: true };
      },
    };

    const mockNotificationService = {
      sendNotification: async (notificationData) => {
        console.log("Mock notification sent:", notificationData);
        return { success: true };
      },
    };

    const mockCustomerRepository = {
      findByPlateNumber: async (plateNumber) => {
        return {
          getId: () => "mock-customer-id",
          getVehicles: () => [
            {
              plateNumber: plateNumber,
              type: "Car",
              model: "Toyota",
              color: "White",
              ownership: "Owner",
            },
          ],
        };
      },
    };

    // Bind dependencies
    this.dependencies.set(
      "trustAccidentReportRepository",
      mockTrustAccidentReportRepository
    );
    this.dependencies.set("auditService", mockAuditService);
    this.dependencies.set("notificationService", mockNotificationService);
    this.dependencies.set("customerRepository", mockCustomerRepository);

    // Bind use cases
    this.dependencies.set(
      "createTrustAccidentReportUseCase",
      new CreateTrustAccidentReportUseCase(
        mockTrustAccidentReportRepository,
        mockCustomerRepository,
        mockAuditService,
        mockNotificationService
      )
    );

    this.dependencies.set(
      "getAllTrustAccidentReportsUseCase",
      new GetAllTrustAccidentReportsUseCase(mockTrustAccidentReportRepository)
    );

    this.dependencies.set(
      "getTrustAccidentReportByIdUseCase",
      new GetTrustAccidentReportByIdUseCase(mockTrustAccidentReportRepository)
    );

    this.dependencies.set(
      "deleteTrustAccidentReportUseCase",
      new DeleteTrustAccidentReportUseCase(
        mockTrustAccidentReportRepository,
        mockAuditService,
        mockNotificationService
      )
    );

    this.dependencies.set(
      "getTrustAccidentReportStatsUseCase",
      new GetTrustAccidentReportStatsUseCase(mockTrustAccidentReportRepository)
    );

    // Bind controller
    this.dependencies.set(
      "trustAccidentReportController",
      new TrustAccidentReportController(
        this.dependencies.get("createTrustAccidentReportUseCase"),
        this.dependencies.get("getAllTrustAccidentReportsUseCase"),
        this.dependencies.get("getTrustAccidentReportByIdUseCase"),
        this.dependencies.get("deleteTrustAccidentReportUseCase"),
        this.dependencies.get("getTrustAccidentReportStatsUseCase")
      )
    );

    // Bind routes
    this.dependencies.set(
      "trustAccidentReportRoutes",
      new TrustAccidentReportRoutes(
        this.dependencies.get("trustAccidentReportController")
      )
    );
  }

  get(key) {
    return this.dependencies.get(key);
  }

  getAll() {
    return this.dependencies;
  }
}
