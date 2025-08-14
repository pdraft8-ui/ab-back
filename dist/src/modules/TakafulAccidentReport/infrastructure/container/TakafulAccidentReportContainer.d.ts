export class TakafulAccidentReportContainer {
    initializeDependencies(): void;
    takafulAccidentReportRepository: MongoTakafulAccidentReportRepository;
    auditService: AuditService;
    notificationService: {
        sendNotification: (notificationData: any) => Promise<{
            id: string;
            recipient: any;
            sender: any;
            message: any;
            isRead: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[]>;
    };
    customerRepository: {
        findByPlateNumber: (plateNumber: any) => Promise<{
            id: string;
            name: string;
            vehicles: {
                plateNumber: any;
            }[];
        }>;
    };
    createTakafulAccidentReportUseCase: CreateTakafulAccidentReportUseCase;
    getAllTakafulAccidentReportsUseCase: GetAllTakafulAccidentReportsUseCase;
    getTakafulAccidentReportByIdUseCase: GetTakafulAccidentReportByIdUseCase;
    deleteTakafulAccidentReportUseCase: DeleteTakafulAccidentReportUseCase;
    getTakafulAccidentReportStatsUseCase: GetTakafulAccidentReportStatsUseCase;
    takafulAccidentReportController: TakafulAccidentReportController;
    takafulAccidentReportRoutes: TakafulAccidentReportRoutes;
    getCreateTakafulAccidentReportUseCase(): CreateTakafulAccidentReportUseCase;
    getGetAllTakafulAccidentReportsUseCase(): GetAllTakafulAccidentReportsUseCase;
    getGetTakafulAccidentReportByIdUseCase(): GetTakafulAccidentReportByIdUseCase;
    getDeleteTakafulAccidentReportUseCase(): DeleteTakafulAccidentReportUseCase;
    getGetTakafulAccidentReportStatsUseCase(): GetTakafulAccidentReportStatsUseCase;
    getTakafulAccidentReportController(): TakafulAccidentReportController;
    getTakafulAccidentReportRoutes(): TakafulAccidentReportRoutes;
    getTakafulAccidentReportRepository(): MongoTakafulAccidentReportRepository;
    getAuditService(): AuditService;
    getNotificationService(): {
        sendNotification: (notificationData: any) => Promise<{
            id: string;
            recipient: any;
            sender: any;
            message: any;
            isRead: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[]>;
    };
}
export class TakafulAccidentReportContainerMinimal {
    mockTakafulAccidentReportRepository: {
        create: (data: any) => Promise<TakafulAccidentReport>;
        findById: (id: any) => Promise<TakafulAccidentReport>;
        findByCustomerId: (customerId: any) => Promise<TakafulAccidentReport[]>;
        findByPlateNumber: (plateNumber: any) => Promise<TakafulAccidentReport[]>;
        findAll: () => Promise<TakafulAccidentReport[]>;
        update: (id: any, data: any) => Promise<TakafulAccidentReport>;
        delete: (id: any) => Promise<TakafulAccidentReport>;
        getStats: () => Promise<{
            totalReports: number;
            todayReports: number;
            weeklyReports: number;
            monthlyReports: number;
            reportsWithWitnesses: number;
            reportsWithPassengers: number;
            policeReported: number;
            averageReportsPerDay: number;
        }>;
        countAccidentReports: () => Promise<number>;
        findByDateRange: (startDate: any, endDate: any) => Promise<TakafulAccidentReport[]>;
        findByAccidentType: (accidentType: any) => Promise<TakafulAccidentReport[]>;
    };
    mockCustomerRepository: {
        findByPlateNumber: (plateNumber: any) => Promise<{
            id: string;
            name: string;
            vehicles: {
                plateNumber: any;
            }[];
        }>;
    };
    mockAuditService: {
        logAction: (data: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    mockNotificationService: {
        sendNotification: (data: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    createTakafulAccidentReportUseCase: CreateTakafulAccidentReportUseCase;
    getAllTakafulAccidentReportsUseCase: GetAllTakafulAccidentReportsUseCase;
    getTakafulAccidentReportByIdUseCase: GetTakafulAccidentReportByIdUseCase;
    deleteTakafulAccidentReportUseCase: DeleteTakafulAccidentReportUseCase;
    getTakafulAccidentReportStatsUseCase: GetTakafulAccidentReportStatsUseCase;
    takafulAccidentReportController: TakafulAccidentReportController;
    takafulAccidentReportRoutes: TakafulAccidentReportRoutes;
    getCreateTakafulAccidentReportUseCase(): CreateTakafulAccidentReportUseCase;
    getGetAllTakafulAccidentReportsUseCase(): GetAllTakafulAccidentReportsUseCase;
    getGetTakafulAccidentReportByIdUseCase(): GetTakafulAccidentReportByIdUseCase;
    getDeleteTakafulAccidentReportUseCase(): DeleteTakafulAccidentReportUseCase;
    getGetTakafulAccidentReportStatsUseCase(): GetTakafulAccidentReportStatsUseCase;
    getTakafulAccidentReportController(): TakafulAccidentReportController;
    getTakafulAccidentReportRoutes(): TakafulAccidentReportRoutes;
    getMockTakafulAccidentReportRepository(): {
        create: (data: any) => Promise<TakafulAccidentReport>;
        findById: (id: any) => Promise<TakafulAccidentReport>;
        findByCustomerId: (customerId: any) => Promise<TakafulAccidentReport[]>;
        findByPlateNumber: (plateNumber: any) => Promise<TakafulAccidentReport[]>;
        findAll: () => Promise<TakafulAccidentReport[]>;
        update: (id: any, data: any) => Promise<TakafulAccidentReport>;
        delete: (id: any) => Promise<TakafulAccidentReport>;
        getStats: () => Promise<{
            totalReports: number;
            todayReports: number;
            weeklyReports: number;
            monthlyReports: number;
            reportsWithWitnesses: number;
            reportsWithPassengers: number;
            policeReported: number;
            averageReportsPerDay: number;
        }>;
        countAccidentReports: () => Promise<number>;
        findByDateRange: (startDate: any, endDate: any) => Promise<TakafulAccidentReport[]>;
        findByAccidentType: (accidentType: any) => Promise<TakafulAccidentReport[]>;
    };
    getMockCustomerRepository(): {
        findByPlateNumber: (plateNumber: any) => Promise<{
            id: string;
            name: string;
            vehicles: {
                plateNumber: any;
            }[];
        }>;
    };
    getMockAuditService(): {
        logAction: (data: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    getMockNotificationService(): {
        sendNotification: (data: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
}
import { MongoTakafulAccidentReportRepository } from "../repositories/MongoTakafulAccidentReportRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { CreateTakafulAccidentReportUseCase } from "../../application/usecases/CreateTakafulAccidentReportUseCase.js";
import { GetAllTakafulAccidentReportsUseCase } from "../../application/usecases/GetAllTakafulAccidentReportsUseCase.js";
import { GetTakafulAccidentReportByIdUseCase } from "../../application/usecases/GetTakafulAccidentReportByIdUseCase.js";
import { DeleteTakafulAccidentReportUseCase } from "../../application/usecases/DeleteTakafulAccidentReportUseCase.js";
import { GetTakafulAccidentReportStatsUseCase } from "../../application/usecases/GetTakafulAccidentReportStatsUseCase.js";
import { TakafulAccidentReportController } from "../../presentation/controllers/TakafulAccidentReportController.js";
import { TakafulAccidentReportRoutes } from "../../presentation/routes/TakafulAccidentReportRoutes.js";
import { TakafulAccidentReport } from "../../domain/entities/TakafulAccidentReport.entity.js";
//# sourceMappingURL=TakafulAccidentReportContainer.d.ts.map