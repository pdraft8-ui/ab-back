export function getAuditRoutes(): any;
export function getAuditContainer(): AuditContainer;
export function getAuditContainerMinimal(): AuditContainerMinimal;
export { AuditLog } from "./domain/entities/AuditLog.entity.js";
export { IAuditService } from "./domain/interfaces/IAuditService.js";
export { LogActionUseCase } from "./application/usecases/LogActionUseCase.js";
export { GetAuditLogsUseCase } from "./application/usecases/GetAuditLogsUseCase.js";
export { GetAuditLogByIdUseCase } from "./application/usecases/GetAuditLogByIdUseCase.js";
export { GetAuditStatsUseCase } from "./application/usecases/GetAuditStatsUseCase.js";
export { AuditService } from "./infrastructure/services/AuditService.js";
export { AuditController } from "./presentation/controllers/AuditController.js";
export { AuditRoutes } from "./presentation/routes/AuditRoutes.js";
import { AuditContainer } from "./infrastructure/container/AuditContainer.js";
import { AuditContainerMinimal } from "./infrastructure/container/AuditContainer.js";
//# sourceMappingURL=index.d.ts.map