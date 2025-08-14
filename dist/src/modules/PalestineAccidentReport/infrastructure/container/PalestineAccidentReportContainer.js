import { MongoPalestineAccidentReportRepository } from "../repositories/MongoPalestineAccidentReportRepository.js";
import { CreatePalestineAccidentReportUseCase } from "../../application/usecases/CreatePalestineAccidentReportUseCase.js";
import { GetAllPalestineAccidentReportsUseCase } from "../../application/usecases/GetAllPalestineAccidentReportsUseCase.js";
import { GetPalestineAccidentReportByIdUseCase } from "../../application/usecases/GetPalestineAccidentReportByIdUseCase.js";
import { DeletePalestineAccidentReportUseCase } from "../../application/usecases/DeletePalestineAccidentReportUseCase.js";
import { GetPalestineAccidentReportStatsUseCase } from "../../application/usecases/GetPalestineAccidentReportStatsUseCase.js";
import { PalestineAccidentReportController } from "../../presentation/controllers/PalestineAccidentReportController.js";
import { PalestineAccidentReportRoutes } from "../../presentation/routes/PalestineAccidentReportRoutes.js";
export class PalestineAccidentReportContainer {
    constructor() {
        this.dependencies = new Map();
        this.initializeDependencies();
    }
    initializeDependencies() {
        // Infrastructure Layer
        this.dependencies.set("palestineAccidentReportRepository", new MongoPalestineAccidentReportRepository());
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
        this.dependencies.set("createPalestineAccidentReportUseCase", new CreatePalestineAccidentReportUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
            customerRepository: this.dependencies.get("customerRepository"),
            auditService: this.dependencies.get("auditService"),
            notificationService: this.dependencies.get("notificationService"),
        }));
        this.dependencies.set("getAllPalestineAccidentReportsUseCase", new GetAllPalestineAccidentReportsUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
        }));
        this.dependencies.set("getPalestineAccidentReportByIdUseCase", new GetPalestineAccidentReportByIdUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
        }));
        this.dependencies.set("deletePalestineAccidentReportUseCase", new DeletePalestineAccidentReportUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
            auditService: this.dependencies.get("auditService"),
            notificationService: this.dependencies.get("notificationService"),
        }));
        this.dependencies.set("getPalestineAccidentReportStatsUseCase", new GetPalestineAccidentReportStatsUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
        }));
        // Presentation Layer
        this.dependencies.set("palestineAccidentReportController", new PalestineAccidentReportController({
            createPalestineAccidentReportUseCase: this.dependencies.get("createPalestineAccidentReportUseCase"),
            getAllPalestineAccidentReportsUseCase: this.dependencies.get("getAllPalestineAccidentReportsUseCase"),
            getPalestineAccidentReportByIdUseCase: this.dependencies.get("getPalestineAccidentReportByIdUseCase"),
            deletePalestineAccidentReportUseCase: this.dependencies.get("deletePalestineAccidentReportUseCase"),
            getPalestineAccidentReportStatsUseCase: this.dependencies.get("getPalestineAccidentReportStatsUseCase"),
        }));
        this.dependencies.set("palestineAccidentReportRoutes", new PalestineAccidentReportRoutes({
            palestineAccidentReportController: this.dependencies.get("palestineAccidentReportController"),
        }));
    }
    get(dependencyName) {
        return this.dependencies.get(dependencyName);
    }
    getAll() {
        return this.dependencies;
    }
}
// Minimal container for testing
export class PalestineAccidentReportContainerMinimal {
    constructor() {
        this.dependencies = new Map();
        this.initializeDependencies();
    }
    initializeDependencies() {
        // Mock repository for testing
        this.dependencies.set("palestineAccidentReportRepository", {
            create: async (palestineAccidentReport) => {
                console.log("Mock create:", palestineAccidentReport.toJSON());
                return palestineAccidentReport;
            },
            findById: async (id) => {
                if (id === "test-id") {
                    return {
                        getId: () => "test-id",
                        getCustomerId: () => "test-customer-id",
                        getVehicleInfo: () => ({ vehicleNumber: "ABC123" }),
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
                    averageInjuries: 1.5,
                    averageWitnesses: 2.0,
                    averagePassengers: 1.0,
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
        this.dependencies.set("createPalestineAccidentReportUseCase", new CreatePalestineAccidentReportUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
            customerRepository: this.dependencies.get("customerRepository"),
            auditService: this.dependencies.get("auditService"),
            notificationService: this.dependencies.get("notificationService"),
        }));
        this.dependencies.set("getAllPalestineAccidentReportsUseCase", new GetAllPalestineAccidentReportsUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
        }));
        this.dependencies.set("getPalestineAccidentReportByIdUseCase", new GetPalestineAccidentReportByIdUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
        }));
        this.dependencies.set("deletePalestineAccidentReportUseCase", new DeletePalestineAccidentReportUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
            auditService: this.dependencies.get("auditService"),
            notificationService: this.dependencies.get("notificationService"),
        }));
        this.dependencies.set("getPalestineAccidentReportStatsUseCase", new GetPalestineAccidentReportStatsUseCase({
            palestineAccidentReportRepository: this.dependencies.get("palestineAccidentReportRepository"),
        }));
        // Controller
        this.dependencies.set("palestineAccidentReportController", new PalestineAccidentReportController({
            createPalestineAccidentReportUseCase: this.dependencies.get("createPalestineAccidentReportUseCase"),
            getAllPalestineAccidentReportsUseCase: this.dependencies.get("getAllPalestineAccidentReportsUseCase"),
            getPalestineAccidentReportByIdUseCase: this.dependencies.get("getPalestineAccidentReportByIdUseCase"),
            deletePalestineAccidentReportUseCase: this.dependencies.get("deletePalestineAccidentReportUseCase"),
            getPalestineAccidentReportStatsUseCase: this.dependencies.get("getPalestineAccidentReportStatsUseCase"),
        }));
        // Routes
        this.dependencies.set("palestineAccidentReportRoutes", new PalestineAccidentReportRoutes({
            palestineAccidentReportController: this.dependencies.get("palestineAccidentReportController"),
        }));
    }
    get(dependencyName) {
        return this.dependencies.get(dependencyName);
    }
    getAll() {
        return this.dependencies;
    }
}
//# sourceMappingURL=PalestineAccidentReportContainer.js.map