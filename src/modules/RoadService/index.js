import {
  RoadServiceContainer,
  RoadServiceContainerMinimal,
} from "./infrastructure/container/RoadServiceContainer.js";

// Export container getters
export const getRoadServiceContainer = () => new RoadServiceContainer();
export const getRoadServiceContainerMinimal = () =>
  new RoadServiceContainerMinimal();

// Export route factory
export const getRoadServiceRoutes = async () => {
  const container = new RoadServiceContainer();
  return container.getRoadServiceRoutes();
};

// Export individual components for direct import in tests
export { RoadService } from "./domain/entities/RoadService.entity.js";
export { CreateRoadServiceUseCase } from "./application/usecases/CreateRoadServiceUseCase.js";
export { GetAllRoadServicesUseCase } from "./application/usecases/GetAllRoadServicesUseCase.js";
export { GetRoadServiceByIdUseCase } from "./application/usecases/GetRoadServiceByIdUseCase.js";
export { UpdateRoadServiceUseCase } from "./application/usecases/UpdateRoadServiceUseCase.js";
export { DeleteRoadServiceUseCase } from "./application/usecases/DeleteRoadServiceUseCase.js";
export { GetRoadServiceStatsUseCase } from "./application/usecases/GetRoadServiceStatsUseCase.js";
export { RoadServiceController } from "./presentation/controllers/RoadServiceController.js";
export { RoadServiceRoutes } from "./presentation/routes/RoadServiceRoutes.js";
export { MongoRoadServiceRepository } from "./infrastructure/repositories/MongoRoadServiceRepository.js";
