export class RoadServiceContainer {
    initializeDependencies(): void;
    roadServiceRepository: MongoRoadServiceRepository;
    auditService: AuditService;
    createRoadServiceUseCase: CreateRoadServiceUseCase;
    getAllRoadServicesUseCase: GetAllRoadServicesUseCase;
    getRoadServiceByIdUseCase: GetRoadServiceByIdUseCase;
    updateRoadServiceUseCase: UpdateRoadServiceUseCase;
    deleteRoadServiceUseCase: DeleteRoadServiceUseCase;
    getRoadServiceStatsUseCase: GetRoadServiceStatsUseCase;
    roadServiceController: RoadServiceController;
    roadServiceRoutes: RoadServiceRoutes;
    getCreateRoadServiceUseCase(): CreateRoadServiceUseCase;
    getGetAllRoadServicesUseCase(): GetAllRoadServicesUseCase;
    getGetRoadServiceByIdUseCase(): GetRoadServiceByIdUseCase;
    getUpdateRoadServiceUseCase(): UpdateRoadServiceUseCase;
    getDeleteRoadServiceUseCase(): DeleteRoadServiceUseCase;
    getGetRoadServiceStatsUseCase(): GetRoadServiceStatsUseCase;
    getRoadServiceController(): RoadServiceController;
    getRoadServiceRoutes(): RoadServiceRoutes;
    getRoadServiceRepository(): MongoRoadServiceRepository;
    getAuditService(): AuditService;
}
export class RoadServiceContainerMinimal {
    mockRoadServiceRepository: {
        create: (data: any) => Promise<RoadService>;
        findById: (id: any) => Promise<RoadService>;
        findByName: (name: any) => Promise<any>;
        findAll: () => Promise<RoadService[]>;
        update: (id: any, data: any) => Promise<RoadService>;
        delete: (id: any) => Promise<RoadService>;
        getStats: () => Promise<{
            totalServices: number;
            servicesUnder2007: number;
            servicesOver2007: number;
            averageAmount: number;
            averageAmountUnder2007: number;
        }>;
        countServices: () => Promise<number>;
    };
    mockAuditService: {
        logAction: (data: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
    createRoadServiceUseCase: CreateRoadServiceUseCase;
    getAllRoadServicesUseCase: GetAllRoadServicesUseCase;
    getRoadServiceByIdUseCase: GetRoadServiceByIdUseCase;
    updateRoadServiceUseCase: UpdateRoadServiceUseCase;
    deleteRoadServiceUseCase: DeleteRoadServiceUseCase;
    getRoadServiceStatsUseCase: GetRoadServiceStatsUseCase;
    roadServiceController: RoadServiceController;
    roadServiceRoutes: RoadServiceRoutes;
    getCreateRoadServiceUseCase(): CreateRoadServiceUseCase;
    getGetAllRoadServicesUseCase(): GetAllRoadServicesUseCase;
    getGetRoadServiceByIdUseCase(): GetRoadServiceByIdUseCase;
    getUpdateRoadServiceUseCase(): UpdateRoadServiceUseCase;
    getDeleteRoadServiceUseCase(): DeleteRoadServiceUseCase;
    getGetRoadServiceStatsUseCase(): GetRoadServiceStatsUseCase;
    getRoadServiceController(): RoadServiceController;
    getRoadServiceRoutes(): RoadServiceRoutes;
    getMockRoadServiceRepository(): {
        create: (data: any) => Promise<RoadService>;
        findById: (id: any) => Promise<RoadService>;
        findByName: (name: any) => Promise<any>;
        findAll: () => Promise<RoadService[]>;
        update: (id: any, data: any) => Promise<RoadService>;
        delete: (id: any) => Promise<RoadService>;
        getStats: () => Promise<{
            totalServices: number;
            servicesUnder2007: number;
            servicesOver2007: number;
            averageAmount: number;
            averageAmountUnder2007: number;
        }>;
        countServices: () => Promise<number>;
    };
    getMockAuditService(): {
        logAction: (data: any) => Promise<{
            success: boolean;
            message: string;
        }>;
    };
}
import { MongoRoadServiceRepository } from "../repositories/MongoRoadServiceRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { CreateRoadServiceUseCase } from "../../application/usecases/CreateRoadServiceUseCase.js";
import { GetAllRoadServicesUseCase } from "../../application/usecases/GetAllRoadServicesUseCase.js";
import { GetRoadServiceByIdUseCase } from "../../application/usecases/GetRoadServiceByIdUseCase.js";
import { UpdateRoadServiceUseCase } from "../../application/usecases/UpdateRoadServiceUseCase.js";
import { DeleteRoadServiceUseCase } from "../../application/usecases/DeleteRoadServiceUseCase.js";
import { GetRoadServiceStatsUseCase } from "../../application/usecases/GetRoadServiceStatsUseCase.js";
import { RoadServiceController } from "../../presentation/controllers/RoadServiceController.js";
import { RoadServiceRoutes } from "../../presentation/routes/RoadServiceRoutes.js";
import { RoadService } from "../../domain/entities/RoadService.entity.js";
//# sourceMappingURL=RoadServiceContainer.d.ts.map