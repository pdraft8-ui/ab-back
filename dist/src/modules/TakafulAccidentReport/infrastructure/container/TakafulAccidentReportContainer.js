import { MongoTakafulAccidentReportRepository } from "../repositories/MongoTakafulAccidentReportRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { TakafulAccidentReport } from "../../domain/entities/TakafulAccidentReport.entity.js";
// Use Cases
import { CreateTakafulAccidentReportUseCase } from "../../application/usecases/CreateTakafulAccidentReportUseCase.js";
import { GetAllTakafulAccidentReportsUseCase } from "../../application/usecases/GetAllTakafulAccidentReportsUseCase.js";
import { GetTakafulAccidentReportByIdUseCase } from "../../application/usecases/GetTakafulAccidentReportByIdUseCase.js";
import { DeleteTakafulAccidentReportUseCase } from "../../application/usecases/DeleteTakafulAccidentReportUseCase.js";
import { GetTakafulAccidentReportStatsUseCase } from "../../application/usecases/GetTakafulAccidentReportStatsUseCase.js";
// Presentation
import { TakafulAccidentReportController } from "../../presentation/controllers/TakafulAccidentReportController.js";
import { TakafulAccidentReportRoutes } from "../../presentation/routes/TakafulAccidentReportRoutes.js";
export class TakafulAccidentReportContainer {
    constructor() {
        this.initializeDependencies();
    }
    initializeDependencies() {
        // Infrastructure
        this.takafulAccidentReportRepository =
            new MongoTakafulAccidentReportRepository();
        this.auditService = new AuditService();
        // Create a simple mock notification service to avoid circular dependency
        this.notificationService = {
            sendNotification: async (notificationData) => {
                console.log(`[NOTIFICATION] Sending notification: ${notificationData.message}`);
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
        };
        // Mock customer repository for now (we'll need to inject the real one later)
        this.customerRepository = {
            findByPlateNumber: async (plateNumber) => ({
                id: "customer-123",
                name: "Test Customer",
                vehicles: [{ plateNumber: plateNumber }],
            }),
        };
        // Use Cases
        this.createTakafulAccidentReportUseCase =
            new CreateTakafulAccidentReportUseCase(this.takafulAccidentReportRepository, this.customerRepository, this.auditService, this.notificationService);
        this.getAllTakafulAccidentReportsUseCase =
            new GetAllTakafulAccidentReportsUseCase(this.takafulAccidentReportRepository);
        this.getTakafulAccidentReportByIdUseCase =
            new GetTakafulAccidentReportByIdUseCase(this.takafulAccidentReportRepository);
        this.deleteTakafulAccidentReportUseCase =
            new DeleteTakafulAccidentReportUseCase(this.takafulAccidentReportRepository, this.auditService, this.notificationService);
        this.getTakafulAccidentReportStatsUseCase =
            new GetTakafulAccidentReportStatsUseCase(this.takafulAccidentReportRepository);
        // Presentation
        this.takafulAccidentReportController = new TakafulAccidentReportController(this.createTakafulAccidentReportUseCase, this.getAllTakafulAccidentReportsUseCase, this.getTakafulAccidentReportByIdUseCase, this.deleteTakafulAccidentReportUseCase, this.getTakafulAccidentReportStatsUseCase);
        this.takafulAccidentReportRoutes = new TakafulAccidentReportRoutes(this.takafulAccidentReportController);
    }
    // Getters for use cases
    getCreateTakafulAccidentReportUseCase() {
        return this.createTakafulAccidentReportUseCase;
    }
    getGetAllTakafulAccidentReportsUseCase() {
        return this.getAllTakafulAccidentReportsUseCase;
    }
    getGetTakafulAccidentReportByIdUseCase() {
        return this.getTakafulAccidentReportByIdUseCase;
    }
    getDeleteTakafulAccidentReportUseCase() {
        return this.deleteTakafulAccidentReportUseCase;
    }
    getGetTakafulAccidentReportStatsUseCase() {
        return this.getTakafulAccidentReportStatsUseCase;
    }
    // Getters for presentation
    getTakafulAccidentReportController() {
        return this.takafulAccidentReportController;
    }
    getTakafulAccidentReportRoutes() {
        return this.takafulAccidentReportRoutes;
    }
    // Getters for infrastructure
    getTakafulAccidentReportRepository() {
        return this.takafulAccidentReportRepository;
    }
    getAuditService() {
        return this.auditService;
    }
    getNotificationService() {
        return this.notificationService;
    }
}
export class TakafulAccidentReportContainerMinimal {
    constructor() {
        this.mockTakafulAccidentReportRepository = {
            create: async (data) => new TakafulAccidentReport({ id: "mock-id", ...data }),
            findById: async (id) => new TakafulAccidentReport({
                id,
                customerId: "customer-123",
                accidentInfo: {
                    reportDate: new Date(),
                    accidentDate: new Date(),
                    accidentType: "Collision",
                    accidentLocation: "Test Location",
                    accidentTime: "10:00 AM",
                    passengersCount: 2,
                    agentName: "Test Agent",
                },
                policyInfo: {
                    policyNumber: "POL-123",
                    branch: "Test Branch",
                    durationFrom: new Date(),
                    durationTo: new Date(),
                    issueDate: new Date(),
                    isFullCoverage: true,
                    fullCoverageFee: "1000",
                    isThirdParty: false,
                    thirdPartyFee: "500",
                    isMandatory: true,
                    maxAllowedPassengers: 5,
                },
                customerPerson: {
                    name: "Test Customer",
                    address: "Test Address",
                    residence: "Test Residence",
                    workAddress: "Test Work Address",
                    workPhone: "123456789",
                },
                driverInfo: {
                    name: "Test Driver",
                    idNumber: "ID-123",
                    licenseNumber: "LIC-123",
                    licenseType: "Private",
                    licenseExpiry: new Date(),
                    phoneNumber: "123456789",
                    relationToCustomer: "Self",
                },
                customerVehicle: {
                    plateNumber: 12345,
                    model: "Test Model",
                    type: "Sedan",
                    manufactureYear: 2020,
                    chassisNumber: "CH-123",
                    engineNumber: "ENG-123",
                    insuranceCompany: "Test Insurance",
                    policyNumber: "POL-123",
                    insuranceType: "Comprehensive",
                    damage: {
                        front: "Minor",
                        back: "None",
                        left: "None",
                        right: "None",
                        estimatedValue: "1000",
                        towingCompany: "Test Towing",
                        garage: "Test Garage",
                    },
                },
                policeAndWitnesses: {
                    reportedDate: new Date(),
                    policeAuthority: "Test Police",
                    sketchDrawn: true,
                    policeCame: true,
                    witnesses: [],
                },
                passengers: [],
                accidentNarration: "Test accident narration",
                notifierSignature: "Test Signature",
                receiverName: "Test Receiver",
                receiverNotes: "Test notes",
                declaration: {
                    declarerName: "Test Declarer",
                    declarationDate: new Date(),
                    documentCheckerName: "Test Checker",
                    checkerJob: "Test Job",
                    checkerSignature: "Test Signature",
                    checkerDate: new Date(),
                },
            }),
            findByCustomerId: async (customerId) => [
                new TakafulAccidentReport({
                    id: "1",
                    customerId,
                    accidentInfo: { accidentType: "Collision" },
                }),
            ],
            findByPlateNumber: async (plateNumber) => [
                new TakafulAccidentReport({
                    id: "1",
                    customerId: "customer-123",
                    customerVehicle: { plateNumber },
                }),
            ],
            findAll: async () => [
                new TakafulAccidentReport({
                    id: "1",
                    customerId: "customer-123",
                    accidentInfo: { accidentType: "Collision" },
                }),
                new TakafulAccidentReport({
                    id: "2",
                    customerId: "customer-456",
                    accidentInfo: { accidentType: "Rollover" },
                }),
            ],
            update: async (id, data) => new TakafulAccidentReport({ id, ...data }),
            delete: async (id) => new TakafulAccidentReport({
                id,
                accidentInfo: { accidentType: "Deleted" },
            }),
            getStats: async () => ({
                totalReports: 2,
                todayReports: 1,
                weeklyReports: 2,
                monthlyReports: 2,
                reportsWithWitnesses: 1,
                reportsWithPassengers: 1,
                policeReported: 2,
                averageReportsPerDay: 1,
            }),
            countAccidentReports: async () => 2,
            findByDateRange: async (startDate, endDate) => [
                new TakafulAccidentReport({
                    id: "1",
                    customerId: "customer-123",
                    accidentInfo: { accidentDate: new Date() },
                }),
            ],
            findByAccidentType: async (accidentType) => [
                new TakafulAccidentReport({
                    id: "1",
                    customerId: "customer-123",
                    accidentInfo: { accidentType },
                }),
            ],
        };
        this.mockCustomerRepository = {
            findByPlateNumber: async (plateNumber) => ({
                id: "customer-123",
                name: "Test Customer",
                vehicles: [{ plateNumber: plateNumber }],
            }),
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
        this.createTakafulAccidentReportUseCase =
            new CreateTakafulAccidentReportUseCase(this.mockTakafulAccidentReportRepository, this.mockCustomerRepository, this.mockAuditService, this.mockNotificationService);
        this.getAllTakafulAccidentReportsUseCase =
            new GetAllTakafulAccidentReportsUseCase(this.mockTakafulAccidentReportRepository);
        this.getTakafulAccidentReportByIdUseCase =
            new GetTakafulAccidentReportByIdUseCase(this.mockTakafulAccidentReportRepository);
        this.deleteTakafulAccidentReportUseCase =
            new DeleteTakafulAccidentReportUseCase(this.mockTakafulAccidentReportRepository, this.mockAuditService, this.mockNotificationService);
        this.getTakafulAccidentReportStatsUseCase =
            new GetTakafulAccidentReportStatsUseCase(this.mockTakafulAccidentReportRepository);
        // Controller with mocks
        this.takafulAccidentReportController = new TakafulAccidentReportController(this.createTakafulAccidentReportUseCase, this.getAllTakafulAccidentReportsUseCase, this.getTakafulAccidentReportByIdUseCase, this.deleteTakafulAccidentReportUseCase, this.getTakafulAccidentReportStatsUseCase);
        // Routes with mocks
        this.takafulAccidentReportRoutes = new TakafulAccidentReportRoutes(this.takafulAccidentReportController);
    }
    // Getters for use cases
    getCreateTakafulAccidentReportUseCase() {
        return this.createTakafulAccidentReportUseCase;
    }
    getGetAllTakafulAccidentReportsUseCase() {
        return this.getAllTakafulAccidentReportsUseCase;
    }
    getGetTakafulAccidentReportByIdUseCase() {
        return this.getTakafulAccidentReportByIdUseCase;
    }
    getDeleteTakafulAccidentReportUseCase() {
        return this.deleteTakafulAccidentReportUseCase;
    }
    getGetTakafulAccidentReportStatsUseCase() {
        return this.getTakafulAccidentReportStatsUseCase;
    }
    // Getters for presentation
    getTakafulAccidentReportController() {
        return this.takafulAccidentReportController;
    }
    getTakafulAccidentReportRoutes() {
        return this.takafulAccidentReportRoutes;
    }
    // Getters for mocks
    getMockTakafulAccidentReportRepository() {
        return this.mockTakafulAccidentReportRepository;
    }
    getMockCustomerRepository() {
        return this.mockCustomerRepository;
    }
    getMockAuditService() {
        return this.mockAuditService;
    }
    getMockNotificationService() {
        return this.mockNotificationService;
    }
}
//# sourceMappingURL=TakafulAccidentReportContainer.js.map