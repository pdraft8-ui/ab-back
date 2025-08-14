import { AuditContainer, AuditContainerMinimal, } from "./infrastructure/container/AuditContainer.js";
export function getAuditRoutes() {
    const container = new AuditContainer();
    return container.getAuditRoutes();
}
export function getAuditContainer() {
    return new AuditContainer();
}
export function getAuditContainerMinimal() {
    return new AuditContainerMinimal();
}
// Export individual components for testing
export { AuditLog } from "./domain/entities/AuditLog.entity.js";
export { IAuditService } from "./domain/interfaces/IAuditService.js";
export { LogActionUseCase } from "./application/usecases/LogActionUseCase.js";
export { GetAuditLogsUseCase } from "./application/usecases/GetAuditLogsUseCase.js";
export { GetAuditLogByIdUseCase } from "./application/usecases/GetAuditLogByIdUseCase.js";
export { GetAuditStatsUseCase } from "./application/usecases/GetAuditStatsUseCase.js";
export { AuditService } from "./infrastructure/services/AuditService.js";
export { AuditController } from "./presentation/controllers/AuditController.js";
export { AuditRoutes } from "./presentation/routes/AuditRoutes.js";
//# sourceMappingURL=index.js.map