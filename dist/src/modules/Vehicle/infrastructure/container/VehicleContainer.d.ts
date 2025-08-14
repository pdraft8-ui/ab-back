export class VehicleContainer {
    vehicleRepository: MongoVehicleRepository;
    customerRepository: MongoCustomerRepository;
    auditService: AuditService;
    createVehicleUseCase: CreateVehicleUseCase;
    getAllVehiclesUseCase: GetAllVehiclesUseCase;
    getVehicleByIdUseCase: GetVehicleByIdUseCase;
    updateVehicleUseCase: UpdateVehicleUseCase;
    deleteVehicleUseCase: DeleteVehicleUseCase;
    getVehiclesByCustomerUseCase: GetVehiclesByCustomerUseCase;
    addInsuranceToVehicleUseCase: AddInsuranceToVehicleUseCase;
    getVehicleStatsUseCase: GetVehicleStatsUseCase;
    vehicleController: VehicleController;
    vehicleRoutes: VehicleRoutes;
    getVehicleRepository(): MongoVehicleRepository;
    getCreateVehicleUseCase(): CreateVehicleUseCase;
    getGetAllVehiclesUseCase(): GetAllVehiclesUseCase;
    getGetVehicleByIdUseCase(): GetVehicleByIdUseCase;
    getUpdateVehicleUseCase(): UpdateVehicleUseCase;
    getDeleteVehicleUseCase(): DeleteVehicleUseCase;
    getGetVehiclesByCustomerUseCase(): GetVehiclesByCustomerUseCase;
    getAddInsuranceToVehicleUseCase(): AddInsuranceToVehicleUseCase;
    getGetVehicleStatsUseCase(): GetVehicleStatsUseCase;
    getVehicleController(): VehicleController;
    getVehicleRoutes(): VehicleRoutes;
}
export class VehicleContainerMinimal {
    mockVehicleRepository: {
        create: (data: any) => Promise<Vehicle>;
        findById: (id: any) => Promise<Vehicle>;
        findByPlateNumber: (plateNumber: any) => Promise<any>;
        findAll: () => Promise<Vehicle[]>;
        findByCustomerId: (customerId: any) => Promise<Vehicle[]>;
        update: (id: any, data: any) => Promise<Vehicle>;
        delete: (id: any) => Promise<Vehicle>;
        addInsuranceToVehicle: (vehicleId: any, insuranceData: any) => Promise<Vehicle>;
        getStats: () => Promise<{
            totalVehicles: number;
            vehiclesWithInsurance: number;
            vehiclesWithExpiredLicense: number;
            vehiclesWithExpiredTest: number;
            vehiclesWithoutInsurance: number;
        }>;
    };
    mockCustomerRepository: {
        findById: (id: any) => Promise<{
            id: any;
            name: string;
        }>;
    };
    mockAuditService: {
        logAction: (data: any) => Promise<void>;
    };
    createVehicleUseCase: CreateVehicleUseCase;
    getAllVehiclesUseCase: GetAllVehiclesUseCase;
    getVehicleByIdUseCase: GetVehicleByIdUseCase;
    updateVehicleUseCase: UpdateVehicleUseCase;
    deleteVehicleUseCase: DeleteVehicleUseCase;
    getVehiclesByCustomerUseCase: GetVehiclesByCustomerUseCase;
    addInsuranceToVehicleUseCase: AddInsuranceToVehicleUseCase;
    getVehicleStatsUseCase: GetVehicleStatsUseCase;
    vehicleController: VehicleController;
    vehicleRoutes: VehicleRoutes;
    getVehicleRepository(): {
        create: (data: any) => Promise<Vehicle>;
        findById: (id: any) => Promise<Vehicle>;
        findByPlateNumber: (plateNumber: any) => Promise<any>;
        findAll: () => Promise<Vehicle[]>;
        findByCustomerId: (customerId: any) => Promise<Vehicle[]>;
        update: (id: any, data: any) => Promise<Vehicle>;
        delete: (id: any) => Promise<Vehicle>;
        addInsuranceToVehicle: (vehicleId: any, insuranceData: any) => Promise<Vehicle>;
        getStats: () => Promise<{
            totalVehicles: number;
            vehiclesWithInsurance: number;
            vehiclesWithExpiredLicense: number;
            vehiclesWithExpiredTest: number;
            vehiclesWithoutInsurance: number;
        }>;
    };
    getCreateVehicleUseCase(): CreateVehicleUseCase;
    getGetAllVehiclesUseCase(): GetAllVehiclesUseCase;
    getGetVehicleByIdUseCase(): GetVehicleByIdUseCase;
    getUpdateVehicleUseCase(): UpdateVehicleUseCase;
    getDeleteVehicleUseCase(): DeleteVehicleUseCase;
    getGetVehiclesByCustomerUseCase(): GetVehiclesByCustomerUseCase;
    getAddInsuranceToVehicleUseCase(): AddInsuranceToVehicleUseCase;
    getGetVehicleStatsUseCase(): GetVehicleStatsUseCase;
    getVehicleController(): VehicleController;
    getVehicleRoutes(): VehicleRoutes;
}
import { MongoVehicleRepository } from "../repositories/MongoVehicleRepository.js";
import { MongoCustomerRepository } from "../../../Customer/infrastructure/repositories/MongoCustomerRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { CreateVehicleUseCase } from "../../application/usecases/CreateVehicleUseCase.js";
import { GetAllVehiclesUseCase } from "../../application/usecases/GetAllVehiclesUseCase.js";
import { GetVehicleByIdUseCase } from "../../application/usecases/GetVehicleByIdUseCase.js";
import { UpdateVehicleUseCase } from "../../application/usecases/UpdateVehicleUseCase.js";
import { DeleteVehicleUseCase } from "../../application/usecases/DeleteVehicleUseCase.js";
import { GetVehiclesByCustomerUseCase } from "../../application/usecases/GetVehiclesByCustomerUseCase.js";
import { AddInsuranceToVehicleUseCase } from "../../application/usecases/AddInsuranceToVehicleUseCase.js";
import { GetVehicleStatsUseCase } from "../../application/usecases/GetVehicleStatsUseCase.js";
import { VehicleController } from "../../presentation/controllers/VehicleController.js";
import { VehicleRoutes } from "../../presentation/routes/VehicleRoutes.js";
import { Vehicle } from "../../domain/entities/Vehicle.entity.js";
//# sourceMappingURL=VehicleContainer.d.ts.map