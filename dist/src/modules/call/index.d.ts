export function getCallContainer(): CallContainer;
export function getCallContainerMinimal(): CallContainerMinimal;
export function getCallRoutes(): Promise<import("./index.js").CallRoutes>;
export { Call } from "./domain/entities/Call.entity.js";
export { GetCallRecordingUseCase } from "./application/usecases/GetCallRecordingUseCase.js";
export { GetAllCallsUseCase } from "./application/usecases/GetAllCallsUseCase.js";
export { GetCallsByCustomerUseCase } from "./application/usecases/GetCallsByCustomerUseCase.js";
export { GetCallStatsUseCase } from "./application/usecases/GetCallStatsUseCase.js";
export { CallController } from "./presentation/controllers/CallController.js";
export { CallRoutes } from "./presentation/routes/CallRoutes.js";
export { MongoCallRepository } from "./infrastructure/repositories/MongoCallRepository.js";
export { RecordingService } from "./infrastructure/services/RecordingService.js";
import { CallContainer } from "./infrastructure/container/CallContainer.js";
import { CallContainerMinimal } from "./infrastructure/container/CallContainer.js";
//# sourceMappingURL=index.d.ts.map