export function getVehicleRoutes(): Promise<import("./index.js").VehicleRoutes>;
export { Vehicle } from "./domain/entities/Vehicle.entity.js";
export { IVehicleRepository } from "./domain/interfaces/IVehicleRepository.js";
export { CreateVehicleUseCase } from "./application/usecases/CreateVehicleUseCase.js";
export { GetAllVehiclesUseCase } from "./application/usecases/GetAllVehiclesUseCase.js";
export { GetVehicleByIdUseCase } from "./application/usecases/GetVehicleByIdUseCase.js";
export { UpdateVehicleUseCase } from "./application/usecases/UpdateVehicleUseCase.js";
export { DeleteVehicleUseCase } from "./application/usecases/DeleteVehicleUseCase.js";
export { GetVehiclesByCustomerUseCase } from "./application/usecases/GetVehiclesByCustomerUseCase.js";
export { AddInsuranceToVehicleUseCase } from "./application/usecases/AddInsuranceToVehicleUseCase.js";
export { GetVehicleStatsUseCase } from "./application/usecases/GetVehicleStatsUseCase.js";
export { MongoVehicleRepository } from "./infrastructure/repositories/MongoVehicleRepository.js";
export { VehicleController } from "./presentation/controllers/VehicleController.js";
export { VehicleRoutes } from "./presentation/routes/VehicleRoutes.js";
export { VehicleContainer, VehicleContainerMinimal } from "./infrastructure/container/VehicleContainer.js";
//# sourceMappingURL=index.d.ts.map