export class InsuranceCompanyContainer {
    initializeDependencies(): void;
    insuranceCompanyRepository: MongoInsuranceCompanyRepository;
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
        getNotifications: (userId: any, filters?: {}) => Promise<{
            notifications: any[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        }>;
        getNotificationById: (id: any) => Promise<any>;
        markAsRead: (notificationId: any, userId: any) => Promise<any>;
        markAllAsRead: (userId: any) => Promise<{
            modifiedCount: number;
            message: string;
        }>;
        deleteNotification: (notificationId: any, userId: any) => Promise<any>;
        getNotificationStats: (userId: any) => Promise<{
            totalNotifications: number;
            unreadNotifications: number;
            readNotifications: number;
            todayNotifications: number;
            weeklyNotifications: number;
            readPercentage: number;
        }>;
    };
    createInsuranceCompanyUseCase: CreateInsuranceCompanyUseCase;
    getAllInsuranceCompaniesUseCase: GetAllInsuranceCompaniesUseCase;
    getInsuranceCompanyByIdUseCase: GetInsuranceCompanyByIdUseCase;
    updateInsuranceCompanyUseCase: UpdateInsuranceCompanyUseCase;
    deleteInsuranceCompanyUseCase: DeleteInsuranceCompanyUseCase;
    getInsuranceCompanyStatsUseCase: GetInsuranceCompanyStatsUseCase;
    insuranceCompanyController: InsuranceCompanyController;
    insuranceCompanyRoutes: InsuranceCompanyRoutes;
    getCreateInsuranceCompanyUseCase(): CreateInsuranceCompanyUseCase;
    getGetAllInsuranceCompaniesUseCase(): GetAllInsuranceCompaniesUseCase;
    getGetInsuranceCompanyByIdUseCase(): GetInsuranceCompanyByIdUseCase;
    getUpdateInsuranceCompanyUseCase(): UpdateInsuranceCompanyUseCase;
    getDeleteInsuranceCompanyUseCase(): DeleteInsuranceCompanyUseCase;
    getGetInsuranceCompanyStatsUseCase(): GetInsuranceCompanyStatsUseCase;
    getInsuranceCompanyController(): InsuranceCompanyController;
    getInsuranceCompanyRoutes(): InsuranceCompanyRoutes;
    getInsuranceCompanyRepository(): MongoInsuranceCompanyRepository;
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
        getNotifications: (userId: any, filters?: {}) => Promise<{
            notifications: any[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        }>;
        getNotificationById: (id: any) => Promise<any>;
        markAsRead: (notificationId: any, userId: any) => Promise<any>;
        markAllAsRead: (userId: any) => Promise<{
            modifiedCount: number;
            message: string;
        }>;
        deleteNotification: (notificationId: any, userId: any) => Promise<any>;
        getNotificationStats: (userId: any) => Promise<{
            totalNotifications: number;
            unreadNotifications: number;
            readNotifications: number;
            todayNotifications: number;
            weeklyNotifications: number;
            readPercentage: number;
        }>;
    };
}
export class InsuranceCompanyContainerMinimal {
    mockInsuranceCompanyRepository: {
        create: (data: any) => Promise<InsuranceCompany>;
        findById: (id: any) => Promise<InsuranceCompany>;
        findByName: (name: any) => Promise<any>;
        findAll: () => Promise<InsuranceCompany[]>;
        findByInsuranceType: (type: any) => Promise<InsuranceCompany[]>;
        update: (id: any, data: any) => Promise<InsuranceCompany>;
        delete: (id: any) => Promise<boolean>;
        addRate: (id: any, rateType: any, rateData: any) => Promise<InsuranceCompany>;
        updateRate: (id: any, rateType: any, rateData: any) => Promise<InsuranceCompany>;
        removeRate: (id: any, rateType: any) => Promise<InsuranceCompany>;
        getStats: () => Promise<{
            totalCompanies: number;
            mandatoryCompanies: number;
            comprehensiveCompanies: number;
            companiesWithRates: number;
            companiesWithoutRates: number;
        }>;
        countCompanies: () => Promise<number>;
        findCompaniesWithRates: () => Promise<InsuranceCompany[]>;
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
    createInsuranceCompanyUseCase: CreateInsuranceCompanyUseCase;
    getAllInsuranceCompaniesUseCase: GetAllInsuranceCompaniesUseCase;
    getInsuranceCompanyByIdUseCase: GetInsuranceCompanyByIdUseCase;
    updateInsuranceCompanyUseCase: UpdateInsuranceCompanyUseCase;
    deleteInsuranceCompanyUseCase: DeleteInsuranceCompanyUseCase;
    getInsuranceCompanyStatsUseCase: GetInsuranceCompanyStatsUseCase;
    insuranceCompanyController: InsuranceCompanyController;
    insuranceCompanyRoutes: InsuranceCompanyRoutes;
    getCreateInsuranceCompanyUseCase(): CreateInsuranceCompanyUseCase;
    getGetAllInsuranceCompaniesUseCase(): GetAllInsuranceCompaniesUseCase;
    getGetInsuranceCompanyByIdUseCase(): GetInsuranceCompanyByIdUseCase;
    getUpdateInsuranceCompanyUseCase(): UpdateInsuranceCompanyUseCase;
    getDeleteInsuranceCompanyUseCase(): DeleteInsuranceCompanyUseCase;
    getGetInsuranceCompanyStatsUseCase(): GetInsuranceCompanyStatsUseCase;
    getInsuranceCompanyController(): InsuranceCompanyController;
    getInsuranceCompanyRoutes(): InsuranceCompanyRoutes;
    getMockInsuranceCompanyRepository(): {
        create: (data: any) => Promise<InsuranceCompany>;
        findById: (id: any) => Promise<InsuranceCompany>;
        findByName: (name: any) => Promise<any>;
        findAll: () => Promise<InsuranceCompany[]>;
        findByInsuranceType: (type: any) => Promise<InsuranceCompany[]>;
        update: (id: any, data: any) => Promise<InsuranceCompany>;
        delete: (id: any) => Promise<boolean>;
        addRate: (id: any, rateType: any, rateData: any) => Promise<InsuranceCompany>;
        updateRate: (id: any, rateType: any, rateData: any) => Promise<InsuranceCompany>;
        removeRate: (id: any, rateType: any) => Promise<InsuranceCompany>;
        getStats: () => Promise<{
            totalCompanies: number;
            mandatoryCompanies: number;
            comprehensiveCompanies: number;
            companiesWithRates: number;
            companiesWithoutRates: number;
        }>;
        countCompanies: () => Promise<number>;
        findCompaniesWithRates: () => Promise<InsuranceCompany[]>;
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
import { MongoInsuranceCompanyRepository } from "../repositories/MongoInsuranceCompanyRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { CreateInsuranceCompanyUseCase } from "../../application/usecases/CreateInsuranceCompanyUseCase.js";
import { GetAllInsuranceCompaniesUseCase } from "../../application/usecases/GetAllInsuranceCompaniesUseCase.js";
import { GetInsuranceCompanyByIdUseCase } from "../../application/usecases/GetInsuranceCompanyByIdUseCase.js";
import { UpdateInsuranceCompanyUseCase } from "../../application/usecases/UpdateInsuranceCompanyUseCase.js";
import { DeleteInsuranceCompanyUseCase } from "../../application/usecases/DeleteInsuranceCompanyUseCase.js";
import { GetInsuranceCompanyStatsUseCase } from "../../application/usecases/GetInsuranceCompanyStatsUseCase.js";
import { InsuranceCompanyController } from "../../presentation/controllers/InsuranceCompanyController.js";
import { InsuranceCompanyRoutes } from "../../presentation/routes/InsuranceCompanyRoutes.js";
import { InsuranceCompany } from "../../domain/entities/InsuranceCompany.entity.js";
//# sourceMappingURL=InsuranceCompanyContainer.d.ts.map