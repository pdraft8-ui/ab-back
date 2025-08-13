import {
  CallContainer,
  CallContainerMinimal,
} from "./infrastructure/container/CallContainer.js";

// Export container getters
export const getCallContainer = () => new CallContainer();
export const getCallContainerMinimal = () => new CallContainerMinimal();

// Export route factory
export const getCallRoutes = async () => {
  const container = new CallContainer();
  return container.getCallRoutes();
};

// Export individual components for direct import in tests
export { Call } from "./domain/entities/Call.entity.js";
export { GetCallRecordingUseCase } from "./application/usecases/GetCallRecordingUseCase.js";
export { GetAllCallsUseCase } from "./application/usecases/GetAllCallsUseCase.js";
export { GetCallsByCustomerUseCase } from "./application/usecases/GetCallsByCustomerUseCase.js";
export { GetCallStatsUseCase } from "./application/usecases/GetCallStatsUseCase.js";
export { CallController } from "./presentation/controllers/CallController.js";
export { CallRoutes } from "./presentation/routes/CallRoutes.js";
export { MongoCallRepository } from "./infrastructure/repositories/MongoCallRepository.js";
export { RecordingService } from "./infrastructure/services/RecordingService.js";
