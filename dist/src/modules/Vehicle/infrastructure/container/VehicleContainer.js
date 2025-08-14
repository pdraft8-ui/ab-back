import { MongoVehicleRepository } from "../repositories/MongoVehicleRepository.js";
import { MongoCustomerRepository } from "../../../Customer/infrastructure/repositories/MongoCustomerRepository.js";
import { AuditService } from "../../../Audit/infrastructure/services/AuditService.js";
import { Vehicle } from "../../domain/entities/Vehicle.entity.js";
// Use Cases
import { CreateVehicleUseCase } from "../../application/usecases/CreateVehicleUseCase.js";
import { GetAllVehiclesUseCase } from "../../application/usecases/GetAllVehiclesUseCase.js";
import { GetVehicleByIdUseCase } from "../../application/usecases/GetVehicleByIdUseCase.js";
import { UpdateVehicleUseCase } from "../../application/usecases/UpdateVehicleUseCase.js";
import { DeleteVehicleUseCase } from "../../application/usecases/DeleteVehicleUseCase.js";
import { GetVehiclesByCustomerUseCase } from "../../application/usecases/GetVehiclesByCustomerUseCase.js";
import { AddInsuranceToVehicleUseCase } from "../../application/usecases/AddInsuranceToVehicleUseCase.js";
import { GetVehicleStatsUseCase } from "../../application/usecases/GetVehicleStatsUseCase.js";
// Controller
import { VehicleController } from "../../presentation/controllers/VehicleController.js";
// Routes
import { VehicleRoutes } from "../../presentation/routes/VehicleRoutes.js";
export class VehicleContainer {
    constructor() {
        this.vehicleRepository = new MongoVehicleRepository();
        this.customerRepository = new MongoCustomerRepository();
        this.auditService = new AuditService();
        // Initialize use cases
        this.createVehicleUseCase = new CreateVehicleUseCase(this.vehicleRepository, this.customerRepository, this.auditService);
        this.getAllVehiclesUseCase = new GetAllVehiclesUseCase(this.vehicleRepository);
        this.getVehicleByIdUseCase = new GetVehicleByIdUseCase(this.vehicleRepository);
        this.updateVehicleUseCase = new UpdateVehicleUseCase(this.vehicleRepository, this.auditService);
        this.deleteVehicleUseCase = new DeleteVehicleUseCase(this.vehicleRepository, this.auditService);
        this.getVehiclesByCustomerUseCase = new GetVehiclesByCustomerUseCase(this.vehicleRepository, this.customerRepository);
        this.addInsuranceToVehicleUseCase = new AddInsuranceToVehicleUseCase(this.vehicleRepository, this.auditService);
        this.getVehicleStatsUseCase = new GetVehicleStatsUseCase(this.vehicleRepository);
        // Initialize controller
        this.vehicleController = new VehicleController(this.createVehicleUseCase, this.getAllVehiclesUseCase, this.getVehicleByIdUseCase, this.updateVehicleUseCase, this.deleteVehicleUseCase, this.getVehiclesByCustomerUseCase, this.addInsuranceToVehicleUseCase, this.getVehicleStatsUseCase);
        // Initialize routes
        this.vehicleRoutes = new VehicleRoutes(this.vehicleController);
    }
    getVehicleRepository() {
        return this.vehicleRepository;
    }
    getCreateVehicleUseCase() {
        return this.createVehicleUseCase;
    }
    getGetAllVehiclesUseCase() {
        return this.getAllVehiclesUseCase;
    }
    getGetVehicleByIdUseCase() {
        return this.getVehicleByIdUseCase;
    }
    getUpdateVehicleUseCase() {
        return this.updateVehicleUseCase;
    }
    getDeleteVehicleUseCase() {
        return this.deleteVehicleUseCase;
    }
    getGetVehiclesByCustomerUseCase() {
        return this.getVehiclesByCustomerUseCase;
    }
    getAddInsuranceToVehicleUseCase() {
        return this.addInsuranceToVehicleUseCase;
    }
    getGetVehicleStatsUseCase() {
        return this.getVehicleStatsUseCase;
    }
    getVehicleController() {
        return this.vehicleController;
    }
    getVehicleRoutes() {
        return this.vehicleRoutes;
    }
}
// Minimal container for testing with mock dependencies
export class VehicleContainerMinimal {
    constructor() {
        this.mockVehicleRepository = {
            create: async (data) => new Vehicle({ id: "mock-id", ...data }),
            findById: async (id) => new Vehicle({
                id,
                plateNumber: 12345,
                model: "Mock Model",
                type: "Car",
                ownership: "Private",
                modelNumber: "MOCK123",
                licenseExpiry: new Date(),
                lastTest: new Date(),
                color: "Red",
                price: 50000,
                customerId: "mock-customer-id",
            }),
            findByPlateNumber: async (plateNumber) => null,
            findAll: async () => [
                new Vehicle({
                    id: "1",
                    plateNumber: 12345,
                    model: "Toyota Camry",
                    type: "Car",
                    ownership: "Private",
                    modelNumber: "CAM123",
                    licenseExpiry: new Date(),
                    lastTest: new Date(),
                    color: "Red",
                    price: 50000,
                    customerId: "customer-1",
                }),
                new Vehicle({
                    id: "2",
                    plateNumber: 67890,
                    model: "Honda Civic",
                    type: "Car",
                    ownership: "Private",
                    modelNumber: "CIV456",
                    licenseExpiry: new Date(),
                    lastTest: new Date(),
                    color: "Blue",
                    price: 45000,
                    customerId: "customer-2",
                }),
            ],
            findByCustomerId: async (customerId) => [
                new Vehicle({
                    id: "1",
                    plateNumber: 12345,
                    model: "Toyota Camry",
                    type: "Car",
                    ownership: "Private",
                    modelNumber: "CAM123",
                    licenseExpiry: new Date(),
                    lastTest: new Date(),
                    color: "Red",
                    price: 50000,
                    customerId,
                }),
            ],
            update: async (id, data) => new Vehicle({ id, ...data }),
            delete: async (id) => new Vehicle({ id, plateNumber: 12345, model: "Deleted Vehicle" }),
            addInsuranceToVehicle: async (vehicleId, insuranceData) => new Vehicle({ id: vehicleId, insurance: [insuranceData] }),
            getStats: async () => ({
                totalVehicles: 2,
                vehiclesWithInsurance: 1,
                vehiclesWithExpiredLicense: 0,
                vehiclesWithExpiredTest: 0,
                vehiclesWithoutInsurance: 1,
            }),
        };
        this.mockCustomerRepository = {
            findById: async (id) => ({ id, name: "Mock Customer" }),
        };
        this.mockAuditService = {
            logAction: async (data) => console.log("Audit logged:", data),
        };
        // Initialize use cases with mock dependencies
        this.createVehicleUseCase = new CreateVehicleUseCase(this.mockVehicleRepository, this.mockCustomerRepository, this.mockAuditService);
        this.getAllVehiclesUseCase = new GetAllVehiclesUseCase(this.mockVehicleRepository);
        this.getVehicleByIdUseCase = new GetVehicleByIdUseCase(this.mockVehicleRepository);
        this.updateVehicleUseCase = new UpdateVehicleUseCase(this.mockVehicleRepository, this.mockAuditService);
        this.deleteVehicleUseCase = new DeleteVehicleUseCase(this.mockVehicleRepository, this.mockAuditService);
        this.getVehiclesByCustomerUseCase = new GetVehiclesByCustomerUseCase(this.mockVehicleRepository, this.mockCustomerRepository);
        this.addInsuranceToVehicleUseCase = new AddInsuranceToVehicleUseCase(this.mockVehicleRepository, this.mockAuditService);
        this.getVehicleStatsUseCase = new GetVehicleStatsUseCase(this.mockVehicleRepository);
        // Initialize controller
        this.vehicleController = new VehicleController(this.createVehicleUseCase, this.getAllVehiclesUseCase, this.getVehicleByIdUseCase, this.updateVehicleUseCase, this.deleteVehicleUseCase, this.getVehiclesByCustomerUseCase, this.addInsuranceToVehicleUseCase, this.getVehicleStatsUseCase);
        // Initialize routes
        this.vehicleRoutes = new VehicleRoutes(this.vehicleController);
    }
    getVehicleRepository() {
        return this.mockVehicleRepository;
    }
    getCreateVehicleUseCase() {
        return this.createVehicleUseCase;
    }
    getGetAllVehiclesUseCase() {
        return this.getAllVehiclesUseCase;
    }
    getGetVehicleByIdUseCase() {
        return this.getVehicleByIdUseCase;
    }
    getUpdateVehicleUseCase() {
        return this.updateVehicleUseCase;
    }
    getDeleteVehicleUseCase() {
        return this.deleteVehicleUseCase;
    }
    getGetVehiclesByCustomerUseCase() {
        return this.getVehiclesByCustomerUseCase;
    }
    getAddInsuranceToVehicleUseCase() {
        return this.addInsuranceToVehicleUseCase;
    }
    getGetVehicleStatsUseCase() {
        return this.getVehicleStatsUseCase;
    }
    getVehicleController() {
        return this.vehicleController;
    }
    getVehicleRoutes() {
        return this.vehicleRoutes;
    }
}
//# sourceMappingURL=VehicleContainer.js.map