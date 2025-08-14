export function getRoadServiceContainer(): RoadServiceContainer;
export function getRoadServiceContainerMinimal(): RoadServiceContainerMinimal;
export function getRoadServiceRoutes(): Promise<import("./index.js").RoadServiceRoutes>;
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
import { RoadServiceContainer } from "./infrastructure/container/RoadServiceContainer.js";
import { RoadServiceContainerMinimal } from "./infrastructure/container/RoadServiceContainer.js";
//# sourceMappingURL=index.d.ts.map